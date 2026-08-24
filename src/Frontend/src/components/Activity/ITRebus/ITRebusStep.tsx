import s from './ITRebus.module.scss'

import { useState } from 'react'
import { normalizeAnswer } from '../../../utils/normalizeAnswer'

import Substrate from '../../UI/Substrate/Substrate'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'

import type { ITRebusStepProps } from './itRebusType'



export default function ITRebusStep({ data, onNext }: ITRebusStepProps) {
    const [answer, setAnswer] = useState('')
    const [isAnswered, setIsAnswered] = useState(false)

    const handleCheck = () => {
        if (!answer.trim()) return
        const userAnswer = normalizeAnswer(answer)

        setIsAnswered(true)
    }
    const handleNextStep = () => {
        onNext(answer)

        setAnswer('')
        setIsAnswered(false)

    }

    return (

        <>
            <Substrate>
                <div className={s.rebus__card} >
                    <p className={s.rebus__question}>{data.question}</p>
                    <span className={s.rebus__span}>Введите ответ:</span>
                    <Input
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className={s.rebus__input}
                        disabled={isAnswered}
                    />
                    {isAnswered && (
                        <span className={isCorrected ? s['rebus__status--correct'] : s['rebus__status--error']}>
                            {isCorrected ? 'ответ верный' : 'ответ неверный'}
                        </span>
                    )}
                </div>
            </Substrate>
            {
                isAnswered ?
                    <Button type="button" onClick={handleNextStep} className={s['rebus__submit-btn']}>
                        ДАЛЬШЕ
                    </Button>
                    : <Button type="button" onClick={handleCheck} className={s['rebus__submit-btn']}>
                        ОТВЕТИТЬ
                    </Button>
            }
        </>

    )
}
