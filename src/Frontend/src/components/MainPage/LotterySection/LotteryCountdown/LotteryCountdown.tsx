import s from './LotteryCountdown.module.scss';
import laptop from '../../../../assets/interface/laptop.png';
import { useEffect, useState } from 'react';

interface LotteryCountdownProps {
    endDate: string;
}

export default function LotteryCountdown({ endDate }: LotteryCountdownProps) {
    const getTime = () => {
        const difference = new Date(endDate).getTime() - Date.now();

        if (difference <= 0) {
            return {
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        return {
            hours: Math.floor(difference / (1000 * 60 * 60)),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        }
    }
    const [time, setTime] = useState(getTime())

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTime())
        }, 1000)

        return () => clearInterval(interval)
    }, [endDate])

    return (
        <div className={s.wrapper}>
            <h4 className={s.title}>
                До начала розыгрыша:
            </h4>
            <div className={s.time}>
                {String(time.hours).padStart(2, '0')}:
                {String(time.minutes).padStart(2, '0')}:
                {String(time.seconds).padStart(2, '0')}
            </div>

            <img src={laptop} alt="MacBook Neo" className={s.laptopImg} />
        </div>
    );
}