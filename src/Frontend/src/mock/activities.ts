import gameAvatar from '../assets/avatar/default.webp';
import type { CornerPositionT } from '../components/UI/CornerSquare/cornerSquareProps';

export interface Activity {
  id: string;
  reward: number;
  title: string;
  description: string[];
  buttonText: string;
  gameAvatar: string;
  positionSquare: CornerPositionT;
  mainSize: number;
  accentHeight: number;
  accentWidth: number;
}

export const activitiesMock: Activity[] = [
  {
    id: 'tetris',
    reward: 50,
    title: 'Стек-тетрис',
    description: [
      'Собери реальную головоломку «Стек-тетрис», повторяя правильную комбинацию фигур. Когда закончишь — сделай фото результата и отправь его через форму на лендинге.',
      'Проверь свою логику и внимательность: здесь важна не только скорость, но и точность. Собери правильно — и преврати решение в реальные призы.',
    ],
    buttonText: 'загрузить фото',
    gameAvatar: gameAvatar,
    positionSquare: 'top-left',
    mainSize: 64,
    accentHeight: 24,
    accentWidth: 24,
  },
  {
    id: 'transactions',
    reward: 150,
    title: 'Путь транзакции',
    description: [
      'Собери реальную головоломку «Стек-тетрис», повторяя правильную комбинацию фигур. Когда закончишь — сделай фото результата и отправь его через форму на лендинге.',
      'Проверь свою логику и внимательность: здесь важна не только скорость, но и точность. Собери правильно — и преврати решение в реальные призы.',
    ],
    buttonText: 'загрузить фото',
    gameAvatar: gameAvatar,
    positionSquare: 'top-right',
    mainSize: 64,
    accentHeight: 24,
    accentWidth: 24,
  },
  {
    id: 'photo_booth',
    reward: 50,
    title: 'Фотобудка СБП',
    description: [
      'Собери реальную головоломку «Стек-тетрис», повторяя правильную комбинацию фигур. Когда закончишь — сделай фото результата и отправь его через форму на лендинге.',
      'Проверь свою логику и внимательность: здесь важна не только скорость, но и точность. Собери правильно — и преврати решение в реальные призы.',
    ],
    buttonText: 'загрузить фото',
    gameAvatar: gameAvatar,
    positionSquare: 'bottom-left',
    mainSize: 67,
    accentHeight: 25,
    accentWidth: 25,
  },
  {
    id: 'qr',
    reward: 50,
    title: 'QR-стена',
    description: [
      'Собери реальную головоломку «Стек-тетрис», повторяя правильную комбинацию фигур. Когда закончишь — сделай фото результата и отправь его через форму на лендинге.',
      'Проверь свою логику и внимательность: здесь важна не только скорость, но и точность. Собери правильно — и преврати решение в реальные призы.',
    ],
    buttonText: 'загрузить фото',
    gameAvatar: gameAvatar,
    positionSquare: 'top-left',
    mainSize: 76,
    accentHeight: 29,
    accentWidth: 29,
  },
  {
    id: 'quiz',
    reward: 50,
    title: 'Квиз',
    description: [
      'Собери реальную головоломку «Стек-тетрис», повторяя правильную комбинацию фигур. Когда закончишь — сделай фото результата и отправь его через форму на лендинге.',
      'Проверь свою логику и внимательность: здесь важна не только скорость, но и точность. Собери правильно — и преврати решение в реальные призы.',
    ],
    buttonText: 'загрузить фото',
    gameAvatar: gameAvatar,
    positionSquare: 'bottom-right',
    mainSize: 95,
    accentHeight: 35,
    accentWidth: 35,
  },
];
