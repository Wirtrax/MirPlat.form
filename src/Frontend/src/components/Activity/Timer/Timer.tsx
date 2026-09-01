import s from './Timer.module.scss';

import clsx from 'clsx';

import { useEffect, useState } from "react"

import type { TimerProps } from './timerType';

export default function Timer({ duration = 0, danger = 0, staticTime, classNameMargin, onFinish }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(duration)
    const isDanger = timeLeft <= danger

    useEffect(() => {
        if (staticTime || timeLeft <= 0) {
            return
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [timeLeft, staticTime])

    useEffect(() => {
        if (!staticTime && timeLeft === 0) {
            onFinish?.()
        }
    }, [timeLeft, staticTime, onFinish])

    const renderTime = () => {
        if (staticTime) return staticTime

        const minutes = Math.floor(timeLeft / 60)
        const seconds = timeLeft % 60
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    };

    return (
        <p className={clsx(s['timer'], classNameMargin, isDanger && !staticTime && s['timer__danger'])}>
            {renderTime()}
        </p>
    );
}
