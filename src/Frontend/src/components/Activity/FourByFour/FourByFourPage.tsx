import { useState } from "react"
import FourByFourRules from "./FourByFourRules"
import FourByFourGame from "./FourByFourGame"
import FourByFourSuccess from "./FourByFourSuccess"

type GameStep = 'rules' | 'game' | 'result'

export default function FourByFourPage() {
  const [step, setStep] = useState<GameStep>('rules')
  const [coins, setCoins] = useState<number>(0)

  const handleEndGame = (guessedCount: number) => {
    const coinsEarned = (guessedCount / 4) * 15
    setCoins(coinsEarned)
    setStep('result')
  }

  if (step === 'rules') return <FourByFourRules onStartGame={() => setStep('game')} />

  if (step === 'game') return <FourByFourGame onEndGame={handleEndGame} />

  if (step === 'result') return <FourByFourSuccess  coins={coins}/>

}
