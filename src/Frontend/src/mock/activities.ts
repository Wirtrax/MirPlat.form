import gameAvatar from '../assets/avatar/default.webp';
import type { CornerPositionT } from '../components/UI/CornerSquare/cornerSquareProps';

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
    link: '/tetris',

    positionSquare: 'top-left',
    mainSize: 64,
    accentHeight: 24,
    accentWidth: 24,
  },
  {
    id: 'photo_check',
    reward: 15,
    title: 'Фото-чек',
    description: [
      'Загрузи фото и получи персональный чек с твоим именем и лотерейным номером для участия в розыгрыше. Номер закрепляется за тобой и не меняется при повторной печати.',
      'Проверь свою логику и внимательность: здесь важна не только скорость, но и точность. Собери правильно — и преврати решение в реальные призы.',
    ],
    buttonText: 'загрузить фото',
    gameAvatar: gameAvatar,
    link: '/photo_check',

    positionSquare: 'top-right',
    mainSize: 67,
    accentHeight: 25,
    accentWidth: 25,
  },
  {
    id: 'four_by_four',
    reward: 150,
    title: '4x4',
    description: [
      'Собери реальную головоломку «Стек-тетрис», повторяя правильную комбинацию фигур. Когда закончишь — сделай фото результата и отправь его через форму на лендинге.',
      'Проверь свою логику и внимательность: здесь важна не только скорость, но и точность. Собери правильно — и преврати решение в реальные призы.',
    ],
    buttonText: 'начать игру',
    gameAvatar: gameAvatar,
    link: '/four_by_four',

    positionSquare: 'bottom-left',
    mainSize: 64,
    accentHeight: 24,
    accentWidth: 24,
  },
  {
    id: 'find_error',
    reward: 50,
    title: '"Найди ошибку"',
    description: [
      'Собери реальную головоломку «Стек-тетрис», повторяя правильную комбинацию фигур. Когда закончишь — сделай фото результата и отправь его через форму на лендинге.',
      'Проверь свою логику и внимательность: здесь важна не только скорость, но и точность. Собери правильно — и преврати решение в реальные призы.',
    ],
    buttonText: 'загрузить фото',
    gameAvatar: gameAvatar,
    link: '/find_error',

    positionSquare: 'top-left',
    mainSize: 76,
    accentHeight: 29,
    accentWidth: 29,
  },
  {
    id: 'rebus',
    reward: 50,
    title: 'IT-ребус',
    description: [
      'Собери реальную головоломку «Стек-тетрис», повторяя правильную комбинацию фигур. Когда закончишь — сделай фото результата и отправь его через форму на лендинге.',
      'Проверь свою логику и внимательность: здесь важна не только скорость, но и точность. Собери правильно — и преврати решение в реальные призы.',
    ],
    buttonText: 'загрузить фото',
    gameAvatar: gameAvatar,
    link: '/rebus',

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
    link: '/quiz',

    positionSquare: 'bottom-right',
    mainSize: 95,
    accentHeight: 35,
    accentWidth: 35,
  },
];
