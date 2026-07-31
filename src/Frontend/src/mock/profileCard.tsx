import type { User, ProfileInfoCardProps, Purchase } from '../components/Profile/profileType';
import EmailIcon from '../assets/profile/contacts/email.svg?react';
import PhoneIcon from '../assets/profile/contacts/phone.svg?react';
import SpecializationIcon from '../assets/profile/contacts/specialization.svg?react';
import LevelIcon from '../assets/profile/contacts/level.svg?react';

// Мок для карточки "О тебе"
export const aboutCardMock: ProfileInfoCardProps = {
  title: 'О тебе',
  items: [
    {
      id: 'spec',
      icon: <SpecializationIcon />,
      label: 'Специализация',
      value: 'ML инженер',
    },
    {
      id: 'level',
      icon: <LevelIcon />,
      label: 'Уровень',
      value: 'Сеньор (senior)',
    },
  ],
};

// Мок для карточки "Контакты"
export const contactCardMock: ProfileInfoCardProps = {
  title: 'Контакты',
  items: [
    {
      id: 'email',
      icon: <EmailIcon />,
      label: 'E-mail',
      value: 'MirEvent@nspk.ru',
    },
    {
      id: 'phone',
      icon: <PhoneIcon />,
      label: 'Номер телефона',
      value: '+7 999-999-99-99',
    },
  ],
};

// Мок для покупок
export const purchasesMock: Purchase[] = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/potato1/200/200',
    title: 'Картошка',
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/potato2/200/200',
    title: 'Картошка фри',
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/potato3/200/200',
    title: 'Картошка по-деревенски',
  },
  {
    id: 4,
    image: 'https://picsum.photos/seed/potato4/200/200',
    title: 'Картофель молодой',
  },
];

// Основной мок пользователя
export const userMock: User = {
  background: '#F5F5F5',
  userName: 'Иванов Иван Иванович',
  uniqId: 100000,
  balance: 120,
  aboutCard: aboutCardMock,
  contactCard: contactCardMock,
  purchases: purchasesMock,
};

// Альтернативный вариант с большим количеством покупок
export const userWithManyPurchasesMock: User = {
  background: '#E8F5E9',
  userName: 'Петров Петр Петрович',
  uniqId: 200000,
  balance: 350,
  aboutCard: {
    title: 'О тебе',
    specialization: 'Frontend Developer',
    level: 'Мидл (middle)',
  },
  contactCard: {
    title: 'Контакты',
    email: 'petrov@example.com',
    phone: '+7 888-888-88-88',
  },
  purchases: [
    {
      id: 5,
      image: 'https://picsum.photos/seed/product1/200/200',
      title: 'Ноутбук',
    },
    {
      id: 6,
      image: 'https://picsum.photos/seed/product2/200/200',
      title: 'Мышь',
    },
    {
      id: 7,
      image: 'https://picsum.photos/seed/product3/200/200',
      title: 'Клавиатура',
    },
    {
      id: 8,
      image: 'https://picsum.photos/seed/product4/200/200',
      title: 'Монитор',
    },
    {
      id: 9,
      image: 'https://picsum.photos/seed/product5/200/200',
      title: 'Наушники',
    },
    {
      id: 10,
      image: 'https://picsum.photos/seed/product6/200/200',
      title: 'Веб-камера',
    },
  ],
};

// Мок для пустого состояния покупок
export const userWithEmptyPurchasesMock: User = {
  background: '#FFF3E0',
  userName: 'Сидоров Сидор Сидорович',
  uniqId: 300000,
  balance: 0,
  aboutCard: {
    title: 'О тебе',
    specialization: 'QA Engineer',
    level: 'Джун (junior)',
  },
  contactCard: {
    title: 'Контакты',
    email: 'sidorov@example.com',
    phone: '+7 777-777-77-77',
  },
  purchases: [],
};
