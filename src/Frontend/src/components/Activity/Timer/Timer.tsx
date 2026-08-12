import s from './Timer.module.scss';
import clsx from 'clsx';

import { useEffect, useState } from "react"

interface TimerProps {
    duration: number;
    danger: number;
}

export default function Timer({ duration, danger }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(duration)
    const isDanger = timeLeft <= danger

    useEffect(() => {
        if (timeLeft <= 0) return

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [timeLeft])

    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`

    return (
        <p className={clsx(s['timer'], isDanger && s['timer__danger'])}>{formattedTime}</p>
    )
}
