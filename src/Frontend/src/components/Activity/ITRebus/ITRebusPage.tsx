import { useEffect, useState } from 'react'

import { IT_REBUS } from '../../../mock/itRebus'

import ActivityLayout from '../ActivityLayout/ActivityLayout'
import ITRebusStep from './ITRebusStep'
import ITRebusSuccess from './ITRebusSuccess'
import ProgressBar from './ProgressBar/ProgressBar'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { fetchRebusStatus, fetchSubmitRebus } from '../../../service/features/activity/activitySlice'

const REBUS_COMPLETED_KEY = 'it_rebus_completed'

export default function ITRebusPage() {
    const dispatch = useAppDispatch()
    const { rebusStatus, rewardRebus } = useAppSelector(state => state.activity)

    const [currentStep, setCurrentStep] = useState(0)
    const [userAnswers, setUserAnswers] = useState<string[]>([])

    useEffect(() => {
        dispatch(fetchRebusStatus())
    }, [])

    const handleNextStep = (answer: string) => {
        const updateAnswers = [...userAnswers, answer]

        if (currentStep < IT_REBUS.length - 1) {
            setCurrentStep(prev => prev + 1)
        } else {
            dispatch(fetchSubmitRebus(updateAnswers))
        }
    }

    if (rebusStatus === true) {
        return <ITRebusSuccess score={0} length={IT_REBUS.length} isAlreadyCompleted={true} />
    }
    if (rewardRebus !== null) return <ITRebusSuccess score={rewardRebus} length={IT_REBUS.length} isAlreadyCompleted={false} />

    const currentQuestion = IT_REBUS[currentStep]

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



