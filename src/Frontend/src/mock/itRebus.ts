export interface ItRebusType {
    id: number;
    question: string;
    correctAnswer: string[];
}

export const IT_REBUS: ItRebusType[] = [
    {
        id: 1,
        question: '🐍+ "3"',
        correctAnswer:['python3'],
    },
    {
        id: 2,
        question: '🎶+🎈+ П',
        correctAnswer: ['с#', 'c#'],
    },
    {
        id: 3,
        question: '🧠+ 🍆',
        correctAnswer: ['brainfuck'], 
    },
    {
        id: 4,
        question: '5`🎤+ 🖬',
        correctAnswer: ['microsoft'],
    },
    {
        id: 5,
        question: '⭐ + 🐧',
        correctAnswer: ['astra linux'],
    },
    {
        id: 6,
        question: '`🏠+ `🐅+`🍄‍🟫+`💡',
        correctAnswer: ['html'],
    },
];
