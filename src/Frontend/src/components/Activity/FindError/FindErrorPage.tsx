import { useState } from "react"

import type { GameStep } from "../gameStep"
import FindErrorRules from "./FindErrorRules"
import FindErrorStep from "./FindErrorStep"
import FindErrorSuccess from "./FindErrorSuccess"


export default function FindErrorPage() {
    const [step, setStep] = useState<GameStep>('result')

    const handleEndGame = () => {
        setStep('result')
    }

    if (step === 'rules') return <FindErrorRules onStartGame={() => setStep('game')} />
    if (step === 'game') return <FindErrorStep />
    if (step === 'result') return <FindErrorSuccess />
}
