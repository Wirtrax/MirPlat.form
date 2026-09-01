import s from './Quiz.module.scss';

import mascot from '../../../assets/mascot/mascotWithQuestion.webp';

import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useActivityError } from '../../../hooks/useActivityError';
import { QUIZ_QUESTIONS } from '../../../mock/quiz';
import { fetchCompleteQuiz, fetchQuizResult } from '../../../service/features/activity/activitySlice';

import ActivityLayout from "../ActivityLayout/ActivityLayout";
import QuizStep from './QuizStep';
import QuizSuccess from './QuizSuccess';
import Background from '../../UI/Background/Background';
import Loader from '../../UI/Loader/Loader';

import type { QuizAnswer } from '../../../service/features/activity/activitySliceType';

export default function QuizPage() {
    const dispatch = useAppDispatch()
    const { quizStatus, quizReward, error } = useAppSelector(state => state.activity)

    const [currentStep, setCurrentStep] = useState(0);
    const [userAnswers, setUserAnswers] = useState<QuizAnswer[]>([]);

    const currentQuestion = QUIZ_QUESTIONS[currentStep];

    useEffect(() => {
        dispatch(fetchQuizResult())
    }, [])

    useActivityError(error)

    const handleNextStep = (answer: string) => {
        const quizAnswer: QuizAnswer = {
            questionId: currentQuestion.id,
            answer,
        }

        const updatedAnswers = [...userAnswers, quizAnswer];
        setUserAnswers(updatedAnswers)

        if (currentStep < QUIZ_QUESTIONS.length - 1) {
            setCurrentStep(prev => prev + 1)
        } else {
            dispatch(fetchCompleteQuiz(updatedAnswers))
        }
    }

    if (quizStatus === null) return <Background><Loader /></Background>

    if (quizStatus === true && quizReward !== null && quizReward > 0) {
        return <QuizSuccess success />;
    }

    if (quizStatus === true && quizReward !== null && quizReward === 0) {
        return <QuizSuccess error />;
    }

    return (
        <ActivityLayout
            title="Квиз"
            description='Исследуй социальные сети Мир Plat.Form, ответь на 3 вопроса и получи «Приветы»!'
        >
            <QuizStep
                key={currentQuestion.id}
                data={currentQuestion}
                onNext={handleNextStep}
            />

            <div className={s['game__mascot-container']}>
                <img className={s['game__mascot-img']} src={mascot} alt='smile mascot' />
            </div>

        </ActivityLayout>
    )
}
