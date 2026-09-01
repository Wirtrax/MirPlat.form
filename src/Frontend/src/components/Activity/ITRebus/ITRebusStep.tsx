import s from './ITRebus.module.scss';

import { useState } from 'react';
import { normalizeAnswer } from '../../../utils/normalizeAnswer';

import Substrate from '../../UI/Substrate/Substrate';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

import type { ITRebusStepProps } from './itRebusType';

export default function ITRebusStep({ data, onNext, onCheck }: ITRebusStepProps) {
    const [answer, setAnswer] = useState('')
    const [isAnswered, setIsAnswered] = useState(false)
    const [result, setResult] = useState<boolean | null>(null)

    const handleCheck = async () => {
        if (!answer.trim()) return
        const checkResult = await onCheck(normalizeAnswer(answer))

        setResult(checkResult)
        setIsAnswered(true)
    }

    const handleNextStep = () => {
        onNext()
        setAnswer('')
        setIsAnswered(false)
        setResult(null)
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
                        <span className={result ? s['rebus__status--correct'] : s['rebus__status--error']}>
                            {result ? 'ответ верный' : 'ответ неверный'}
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
