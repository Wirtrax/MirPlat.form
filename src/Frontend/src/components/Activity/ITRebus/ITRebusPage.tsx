import { useEffect, useState } from 'react'

import { IT_REBUS } from '../../../mock/itRebus'

import ActivityLayout from '../ActivityLayout/ActivityLayout'
import ITRebusStep from './ITRebusStep'
import ITRebusSuccess from './ITRebusSuccess'
import ProgressBar from './ProgressBar/ProgressBar'

const REBUS_COMPLETED_KEY = 'it_rebus_completed'

export default function ITRebusPage() {
    const [currentStep, setCurrentStep] = useState(0)
    const [score, setScore] = useState(0)
    const [isCompleted, setIsCompleted] = useState(false)

    const [isAlreadyCompleted, setIsAlreadyCompleted] = useState(false)
    useEffect(() => {
        const completedBefore = localStorage.getItem(REBUS_COMPLETED_KEY)
        if (completedBefore) {
            setIsAlreadyCompleted(true)
        }
    }, [])

    const currentQuestion = IT_REBUS[currentStep]

    const handleNextStep = (isCorrect: boolean) => {
        if (isCorrect) {
            setScore(prev => prev + 1)
        }
        if (currentStep < IT_REBUS.length - 1) {
            setCurrentStep(prev => prev + 1)
        } else {

            localStorage.setItem(REBUS_COMPLETED_KEY, 'true')

            setIsCompleted(true)
        }
    }

    if (isAlreadyCompleted) {
        return <ITRebusSuccess score={0} length={IT_REBUS.length} isAlreadyCompleted={true} />
    }
    if (isCompleted) return <ITRebusSuccess score={score} length={IT_REBUS.length} isAlreadyCompleted={false} />

    return (
        <ActivityLayout
            title='ИТ-ребус'
            description='Отгадай ребус. Свой вариант ответа запиши в поле. Получи «Приветы» за правильные ответы.'
        >
            <ProgressBar current={currentStep + 1} total={IT_REBUS.length} />
            <ITRebusStep
                key={currentQuestion.id}
                data={currentQuestion}
                onNext={handleNextStep} />
        </ActivityLayout>
    )
}
