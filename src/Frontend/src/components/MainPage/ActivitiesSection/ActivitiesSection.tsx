import s from './ActivitiesSection.module.scss';
import clsx from 'clsx';
import QR_Icon from '../../../assets/ico/interface/qr.svg?react'
import { Link } from 'react-router-dom';
import ActivitiesCard from './ActivitiesCard/ActivitiesCard';
import { useState } from 'react';

export default function ActivitiesSection() {
    const [openCard, setOpenCard] = useState<string | null>(null)

    return (
        <section className={clsx('container', s.wrapper)}>
            <div className={s.header}>
                <h2 className={s.title}>Активности</h2>
                <Link to={'/'}>
                    <QR_Icon />
                </Link>
            </div>
            <ActivitiesCard openCard={openCard} setOpenCard={setOpenCard} />

        </section>
    )
}
