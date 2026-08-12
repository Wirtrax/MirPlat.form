import s from './PhotoCheck.module.scss';

import Coin from '../../../assets/interface/coin.svg?react';

import { Link, useNavigate } from 'react-router-dom';

import ResultStep from '../../UI/ResultStep/ResultStep';

interface PhotoCheckProps {
    hasSubmittedPhoto: boolean;
}

export default function PhotoCheckSuccess({ hasSubmittedPhoto }: PhotoCheckProps) {
    const navigate = useNavigate()

    const description = (
        <>
            Тебе начислено 15 <Coin />
        </>
    )

    return (
        <>
            <ResultStep
                title={
                    hasSubmittedPhoto
                        ? "Задание выполнено!"
                        : "Готово!"
                }
                description={description}
                buttonText="В ПРОФИЛЬ"
                onButtonClick={() => navigate('/profile')}
                closeButton={true}
                className={
                    hasSubmittedPhoto
                        ? ''
                        : s['resultCard__photoCheck']}

            >
                <Link to={'/main#activities'}>К ДРУГИМ АКТИВНОСТЯМ</Link>
            </ResultStep>
        </>
    )
}
