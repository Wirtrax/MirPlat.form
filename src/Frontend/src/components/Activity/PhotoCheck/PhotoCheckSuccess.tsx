import s from './PhotoCheck.module.scss';

import Coin from '../../../assets/interface/coin.svg?react';

import { Link, useNavigate } from 'react-router-dom';

import ResultStep from '../../UI/ResultStep/ResultStep';
import { ROUTES } from '../../../routes/routes';

interface PhotoCheckSuccessProps {
    hasSubmittedPhoto: boolean;
}

export default function PhotoCheckSuccess({ hasSubmittedPhoto }: PhotoCheckSuccessProps) {
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
                onButtonClick={() => navigate(ROUTES.PROFILE)}
                closeButton={true}
                className={
                    hasSubmittedPhoto
                        ? ''
                        : s['resultCard__photoCheck']}

            >
                <Link to={ROUTES.ACTIVITIES}>К ДРУГИМ АКТИВНОСТЯМ</Link>
            </ResultStep>
        </>
    )
}
