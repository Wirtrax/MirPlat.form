import clsx from 'clsx';
import s from './ActivityLayout.module.scss';

import CloseIcon from '../../../assets/icons/closeIcon.svg?react'

import { useNavigate } from 'react-router-dom';

import Background from '../../UI/Background/Background';

import type { ActivityProps } from './activityLayoutType';
import Button from '../../UI/Button/Button';

export default function ActivityLayout({
    title,
    description,
    timer,
    children,
    buttonText,
    buttonDisabled,
    onButtonClick,
}: ActivityProps) {

    const navigate = useNavigate()

    const handleClose = () => {
        navigate('/main#activities')
    }
    return (
        <Background>
            <section className={clsx(s['wrapper'], 'container')}>
                <span className={s['close-icon']} onClick={handleClose}>
                    <CloseIcon />
                </span>
                <h1 className={s['title']}>{title}</h1>
                {timer}
                {description && <p className={s['description']}>{description}</p>}
                {children}
                <Button disabled={buttonDisabled} onClick={onButtonClick}>{buttonText}</Button>
            </section>
        </Background>
    )
}


