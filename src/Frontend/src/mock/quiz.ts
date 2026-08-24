export interface QuizQuestion {
    id: number;
    question: string;
    hint: string;
    buttonText: string;
    buttonLink: string;
    inputPlaceholder: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        id: 1,
        question: 'Какое место команда Мир Plat.Form заняла в общем рейтинге ИТ-брендов работодателей 2025 среди финтех-отрасли? ',
        hint: 'Ответ ищи в нашем Telegram-канале.',
        buttonText: 'ПЕРЕЙТИ В TELEGRAM',
        buttonLink: import.meta.env.VITE_TELEGRAM_URL,
        inputPlaceholder: 'Введи число...',
    },
    {
        id: 2,
        question: 'Как называется один из ключевых процессов карточной платёжной системы?',
        hint: 'Ответ найдёшь в статье «Под капотом платежей: чем отличаются ПС "Мир" и СБП» на Хабр',
        buttonText: 'ПЕРЕЙТИ НА ХАБР',
        buttonLink: import.meta.env.VITE_HABR_URL,
        inputPlaceholder: 'Введи слово...',
    },
    {
        id: 3,
        question: 'В каком городе прошёл наш последний митап прошлого года?',
        hint: 'Изучи наш сайт внимательно!',
        buttonText: 'ПЕРЕЙТИ НА САЙТ',
        buttonLink: import.meta.env.VITE_SITE_URL,
        inputPlaceholder: 'Введи город...',
    },
];