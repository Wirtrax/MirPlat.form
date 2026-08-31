import { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { fetchFindErrorStatus, fetchGetCodeLines, fetchSubmitFindError } from "../../../service/features/activity/activitySlice"

import type { GameStep } from "../gameStep"
import FindErrorRules from "./FindErrorRules"
import FindErrorStep from "./FindErrorStep"
import FindErrorSuccess from "./FindErrorSuccess"

import type { FindErrorAnswer } from "../../../service/features/activity/activitySliceType"
import { useActivityError } from "../../../hooks/useActivityError"
import Background from "../../UI/Background/Background"
import Loader from "../../UI/Loader/Loader"

export default function FindErrorPage() {
    const { findErrorStatus, correctAnswers, rewardFindError, error, codeLines } = useAppSelector(state => state.activity);
    const dispatch = useAppDispatch()

    const [step, setStep] = useState<GameStep>('rules')

    useEffect(() => {
        dispatch(fetchFindErrorStatus())
        dispatch(fetchGetCodeLines())
    }, [dispatch])

    useActivityError(error)

    const handleEndGame = async (answers: FindErrorAnswer[]) => {
        const result = await dispatch(fetchSubmitFindError(answers))

        if (fetchSubmitFindError.fulfilled.match(result)) {
            setStep('result')
        }
    }

    if (findErrorStatus === null || codeLines === null) return <Background><Loader /></Background>

    if (findErrorStatus) return <FindErrorSuccess status={true} />

    if (step === 'rules') return <FindErrorRules onStartGame={() => setStep('game')} />

    if (step === 'game') return <FindErrorStep onEndGame={handleEndGame} />

    if (step === 'result') return <FindErrorSuccess
        status={false}
        reward={rewardFindError ?? 0}
        correctAnswers={correctAnswers ?? 0}
    />
}
