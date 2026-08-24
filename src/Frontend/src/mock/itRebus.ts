export interface ItRebusType {
    id: number;
    question: string;
    correctAnswer: string[];
}

export const IT_REBUS: ItRebusType[] = [
    {
        id: 1,
        question: '🐍 + «3»',
        correctAnswer:['python3'],
    },
    {
        id: 2,
        question: '☕ + 📜',
        correctAnswer: ['javascript', 'js', 'java script'],
    }, 
    {
        id: 3,
        question: '🧠+ 🍆',
        correctAnswer: ['brainfuck'], 
    },
    {
        id: 4,
        question: '🔥 + 🦊',
        correctAnswer: ['firefox', 'fire fox', 'файрфокс', 'фаерфокс'],
    },
    {
        id: 5,
        question: '⭐ + 🐧',
        correctAnswer: ['astra linux', 'astralinux'],
    },
    {
        id: 6,
        question: '🐘 + 🐬',
        correctAnswer: ['php', 'пхп'],
    },
];
