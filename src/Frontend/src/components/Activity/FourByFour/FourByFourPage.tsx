import { useEffect, useState } from "react"

import FourByFourRules from "./FourByFourRules"
import FourByFourGame from "./FourByFourGame"
import FourByFourSuccess from "./FourByFourSuccess"

import type { GameStep } from "../gameStep"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { fetchCardGame, fetchFourGameStatus, fetchSubmitFourGame } from "../../../service/features/activity/activitySlice"
import { useActivityError } from "../../../hooks/useActivityError"
import Background from "../../UI/Background/Background"
import Loader from "../../UI/Loader/Loader"

export default function FourByFourPage() {
  const dispatch = useAppDispatch()
  const { rewardFourGame, cardsGame, fourGameStatus, fourGameStatusReward, error } = useAppSelector(state => state.activity)
  const [step, setStep] = useState<GameStep>('rules')

  useEffect(() => {
    dispatch(fetchFourGameStatus())
    dispatch(fetchCardGame())
  }, [])

  useActivityError(error)

  const handleEndGame = async (guessedCount: number) => {
    const count_group = guessedCount / 4

    await dispatch(fetchSubmitFourGame(count_group)).unwrap()
    setStep('result')
  }

  if (fourGameStatus === null || cardsGame === null) return <Background><Loader /></Background>

  if (fourGameStatus) return <FourByFourSuccess coins={fourGameStatusReward} />

  if (step === 'rules') return <FourByFourRules onStartGame={() => setStep('game')} />

  if (step === 'game') return <FourByFourGame onEndGame={handleEndGame} cards={cardsGame} />

  if (step === 'result') return <FourByFourSuccess coins={rewardFourGame} />

}
