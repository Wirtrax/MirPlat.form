import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { isValid, parse } from '@telegram-apps/init-data-node';
import dotenv from 'dotenv';
import { User } from './types';
import path from 'path';

dotenv.config();

// ============ НАСТРОЙКИ ============
// Получаем нофеденциальные данные для проверок из файла ../.env
const app = express();
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN!;
const JWT_SECRET = process.env.JWT_SECRET!;

// ============ ХРАНИЛИЩЕ (вместо БД) ============
// Временная БД для проверки подключения пользователей
const users = new Map<number, User>();

// ============ MIDDLEWARE ============
app.use(express.json()); //< Преобразует полученные данные в json
app.use(cookieParser()); //< Парсит cookies из заголовка Cookie запроса и преобразует их в объект req.cookies

// Настройка CORS для Telegram

app.use(cors({
    origin: [
        'https://moneywise-badass-gusty.ngrok-free.dev',
        'https://*.ngrok-free.dev',
        'https://telegram.org',
        'https://t.me',
        'https://web.telegram.org'
    ], //< Сайты с которых сервер может получатьзапросы
    credentials: true, //< Разрешает отправку cookies и заголовков авторизации в кросс-доменных запросах.
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //< Разрешённые HTTP-методы
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'] //< Разрешённые заголовки запросов
}));

// ============ СТАТИЧЕСКИЕ ФАЙЛЫ ============
const frontendPath = path.join(__dirname, '../../frontend');

// Важно: Добавляем заголовки для Telegram WebApp
app.use((req, res, next) => {
    // Разрешаем iframe для Telegram
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://t.me https://web.telegram.org https://*.telegram.org");
    next();
});

// Раздаём статические файлы
app.use(express.static(frontendPath));

// Отправляем index.html на сервер
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// ============ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ============
/**
 * Ищет пользователя в БД и при необходимости создаёт нового
 * @param tgUser - данные полученные поля user после парсиснга initData
 * @returns ПОльзователь из БД
 */
function findOrCreateUser(tgUser: any): User {
  let user = users.get(tgUser.id);
  
  if (!user) {
    user = {
      id: tgUser.id,
      first_name: tgUser.firstName || 'User',
      last_name: tgUser.lastName || '',
      username: tgUser.username || '',
    };
    users.set(tgUser.id, user);
    console.log(`Новый пользователь: ${user.id}`);
  } else {
    console.log(`Вход пользователя: ${user.id}`);
  }

  console.log(user)
  
  return user;
}

/**
 * Создание JWT токена для сессии
 * @param userId - ID пользователя из БД
 * @returns токен сессии, сгенерированный на основе секреиного JWT слова и ID пользователя
 */
function generateToken(userId: number): string {
//  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30s' });
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

/**
 * Получает ID пользователя из JWT токена
 * @param token - JWT токен сессии
 * @returns ID пользователя закреплённое за этим токеном при постоянном ключевом слове
 */
function verifyToken(token: string): number | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    return decoded.userId;
  } catch {
    return null;
  }
}

// ============ ЭНДПОИНТЫ ============
app.post('/auth/signin', (req: Request, res: Response) => {
  const { initData } = req.body;
  
  console.log('Запрос на авторизацию');
  
  if (!initData) {
    return res.status(400).json({ error: 'initData обязателен' });
  }

  const isValidData = isValid(initData, BOT_TOKEN);
  console.log(`Валидация: ${isValidData}`);
  
  if (!isValidData) {
    return res.status(401).json({ error: 'Невалидные данные' });
  }

  const parsed = parse(initData);
  const tgUser = parsed.user;
  
  if (!tgUser?.id) {
    return res.status(400).json({ error: 'Нет ID пользователя' });
  }

  const user = findOrCreateUser(tgUser);
  const token = generateToken(user.id);

  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: true, //< Всегда true для HTTPS
    sameSite: 'none', //< Важно для кросс-доменных запросов
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  console.log(`Авторизован: ${user.id}`);
  
  res.json({
    success: true,
    user: {
      id: user.id,
      first_name: user.first_name,
    }
  });
});

app.get('/auth/me', (req: Request, res: Response) => {
  const token = req.cookies?.auth_token;
  
  if (!token) {
    return res.status(401).json({ error: 'Не авторизован' });
  }

  const userId = verifyToken(token);
  if (!userId) {
    return res.status(401).json({ error: 'Невалидный токен' });
  }

  const user = users.get(userId);
  if (!user) {
    return res.status(401).json({ error: 'Пользователь не найден' });
  }

  res.json({
    authenticated: true,
    user: {
      id: user.id,
      first_name: user.first_name,
      username: user.username,
    }
  });
});

app.post('/auth/logout', (req: Request, res: Response) => {
  res.clearCookie('auth_token', {
    secure: true,
    sameSite: 'none'
  });
  res.json({ success: true, message: 'Выход выполнен' });
});

app.get('/users', (req: Request, res: Response) => {
  res.json({
    total: users.size,
    users: Array.from(users.values())
  });
});

// Запуск
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║  Сервер запущен                     ║
  ║  http://localhost:${PORT}           ║
  ╠════════════════════════════════════════╣
  ║  GET   /           - HTML страница     ║
  ║  POST  /auth/signin  - авторизация     ║
  ║  GET   /auth/me      - проверка        ║
  ║  POST  /auth/logout  - выход           ║
  ║  GET   /users       - список (отладка) ║
  ╚════════════════════════════════════════╝
  `);
});