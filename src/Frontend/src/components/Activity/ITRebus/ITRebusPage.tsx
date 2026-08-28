import { useEffect, useState } from 'react'

import { IT_REBUS } from '../../../mock/itRebus'

import ActivityLayout from '../ActivityLayout/ActivityLayout'
import ITRebusStep from './ITRebusStep'
import ITRebusSuccess from './ITRebusSuccess'
import ProgressBar from './ProgressBar/ProgressBar'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { fetchRebusReward, fetchRebusStatus, fetchSubmitRebus } from '../../../service/features/activity/activitySlice'


export default function ITRebusPage() {
    const dispatch = useAppDispatch()
    const { rebusStatus } = useAppSelector(state => state.activity)
    const [rightAnswers, setRightAnswers] = useState(0)

    const [currentStep, setCurrentStep] = useState(0)
    const [isFinished, setIsFinished] = useState(false)

    useEffect(() => {
        dispatch(fetchRebusStatus())
    }, [])

    const onCheck = async (answer: string) => {
        const result = await dispatch(fetchSubmitRebus({
            questionId: IT_REBUS[currentStep].id,
            answer,
        })).unwrap()

        if (result) {
            setRightAnswers(prev => prev + 1)
        }

        return result
    }

    const handleNextStep = () => {

        if (currentStep < IT_REBUS.length - 1) {
            setCurrentStep(prev => prev + 1)
        } else {
            dispatch(fetchRebusReward(rightAnswers))
            setIsFinished(true)
        }
    }

    if (rebusStatus === true) {
        return <ITRebusSuccess score={0} length={IT_REBUS.length} isAlreadyCompleted={true} />
    }
    if (isFinished) return <ITRebusSuccess score={rightAnswers} length={IT_REBUS.length} isAlreadyCompleted={false} />

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
                onNext={handleNextStep}
                onCheck={onCheck}
            />
        </ActivityLayout>
    )
}
