import gameAvatar from '../assets/avatar/default.webp';
import type { CornerPositionT } from '../components/UI/CornerSquare/cornerSquareProps';
import { ROUTES } from '../routes/routes';

export interface Activity {
  id: string;
  reward: number;
  title: string;
  description: string[];
  buttonText: string;
  gameAvatar: string;
  link: string;

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
    link: ROUTES.TETRIS,

    positionSquare: 'top-left',
    mainSize: 64,
    accentHeight: 24,
    accentWidth: 24,
  },
  {
    id: 'photo_check',
    reward: 3,
    title: 'Фото-чек',
    description: [
      'Загрузи своё фото с мероприятия и получи персональный чек с твоим именем и лотерейным номером для участия в розыгрыше.',
      'Номер закрепляется за тобой и не меняется при повторной печати. Проверь свою удачу — возможно, именно ты станешь обладателем MacBook Neo!',
    ],
    buttonText: 'загрузить фото',
    gameAvatar: gameAvatar,
    link: ROUTES.PHOTO_CHECK,

    positionSquare: 'top-right',
    mainSize: 67,
    accentHeight: 25,
    accentWidth: 25,
  },
  {
    id: 'four_by_four',
    reward: 10,
    title: '4x4',
    description: [
      'Переворачивай соседние карточки и находи одинаковые пары на игровом поле 4х4. Тренируй свою внимательность, визуальную память и действуй быстро!',
      'Игра продолжается 5 минут — находи как можно больше совпадений до истечения времени или заверши игру сам, чтобы забрать набранные баллы!',
    ],
    buttonText: 'начать игру',
    gameAvatar: gameAvatar,
    link: ROUTES.FOUR_BY_FOUR,

    positionSquare: 'bottom-left',
    mainSize: 64,
    accentHeight: 24,
    accentWidth: 24,
  },
  {
    id: 'rebus',
    reward: 6,
    title: 'IT-ребус',
    description: [
      'Реши увлекательную серию интеллектуальных загадок-ребусов на IT-тематику! Проверь свою эрудицию, логическое мышление и нестандартный подход.',
      'За каждую верно разгаданную головоломку ты получаешь баллы. Испытай свои глубокие знания в сфере информационных технологий и забири награду!',
    ],
    buttonText: 'решить ребусы',
    gameAvatar: gameAvatar,
    link: ROUTES.IT_REBUS,

    positionSquare: 'top-left',
    mainSize: 76,
    accentHeight: 29,
    accentWidth: 29,
  },
  {
    id: 'quiz',
    reward: 3,
    title: 'Квиз',
    description: [
      'Мы подготовили интересные и каверзные вопросы по материалам мероприятия! Надеемся, ты внимательно читал наши статьи и готов проверить свою память.',
      'За каждый правильный ответ ты получишь ценные баллы в общий зачёт. Пройди квиз до конца, покажи отличную эрудицию и забери максимальную награду!',
    ],
    buttonText: 'пройти квиз',
    gameAvatar: gameAvatar,
    link: ROUTES.QUIZ,

    positionSquare: 'bottom-right',
    mainSize: 95,
    accentHeight: 35,
    accentWidth: 35,
  },
  {
    id: 'find_error',
    reward: 15,
    title: '"Найди ошибку"',
    description: [
      'Хей, кажется, кто-то снова сильно накосячил в коде! Помоги нашим непутёвым стажёрам быстро разобраться с проблемой и проведи внимательное ревью кода.',
      'Найди затаившийся баг, правильно исправь ошибку и наглядно докажи свой высокий уровень в разработке. Будь внимателен к деталям и забирай свои заслуженные баллы!',
    ],
    buttonText: 'найти ошибку',
    gameAvatar: gameAvatar,
    link: '/find_error',

    positionSquare: 'top-left',
    mainSize: 76,
    accentHeight: 29,
    accentWidth: 29,
  },
];
