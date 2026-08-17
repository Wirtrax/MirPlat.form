import s from './Quiz.module.scss'

import mascot from '../../../assets/mascot/mascotWithQuestion.webp'

import { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../../mock/quiz';

import ActivityLayout from "../ActivityLayout/ActivityLayout";
import QuizStep from './QuizStep';
import QuizSuccess from './QuizSuccess';

const QUIZ_RESULT_KEY = 'quizResult';

export default function QuizPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [quizResult, setQuizResult] = useState<'success' | 'error' | null>(
        () => localStorage.getItem(QUIZ_RESULT_KEY) as 'success' | 'error' | null
    )

    const currentQuestion = QUIZ_QUESTIONS[currentStep];

    const normalizeAnswer = (value: string) => {
        return value
            .trim()
            .toLocaleLowerCase('ru-RU')
            .replace(/\s+/g, ' ');
    }

    const handleFinishQuiz = (finalAnswers: string[]) => {
        const isAllCorrect = QUIZ_QUESTIONS.every((question, index) => {
            const userAnswer = normalizeAnswer(finalAnswers[index])

            return question.correctAnswer.some(
                answer => normalizeAnswer(answer) === userAnswer
            )
        })

        const result = isAllCorrect ? 'success' : 'error'

        localStorage.setItem(QUIZ_RESULT_KEY, result)
        setQuizResult(result)
    }

    const handleNextStep = (answer: string) => {
        const updatedAnswers = [...userAnswers, answer];

        setUserAnswers(updatedAnswers)

        if (currentStep < QUIZ_QUESTIONS.length - 1) {
            setCurrentStep(prev => prev + 1)
        } else {
            handleFinishQuiz(updatedAnswers)
        }
    }

    if (quizResult === 'success') {
        return <QuizSuccess success />;
    }

    if (quizResult === 'error') {
        return <QuizSuccess error />;
    }

    return (
        <ActivityLayout
            title="Квиз"
            description='Исследуй социальные сети Мир Plat.Form, ответь на 3 вопроса и получи «Приветы»!'
        >
            {currentQuestion ? (
                <QuizStep
                    key={currentQuestion.id}
                    data={currentQuestion}
                    onNext={handleNextStep}
                />
            ) : (
                <div>Квиз пройден! Ожидайте результаты...</div>
            )}

            <div className={s['game__mascot-container']}>
                <img className={s['game__mascot-img']} src={mascot} alt='smile mascot' />
            </div>

        </ActivityLayout>
    )
}
