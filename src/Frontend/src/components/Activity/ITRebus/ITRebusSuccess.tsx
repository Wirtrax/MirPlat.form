import s from './ITRebus.module.scss';

import Coin from '../../../assets/interface/coin.svg?react';

import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../routes/routes';

import ResultStep from '../../UI/ResultStep/ResultStep';
import ActivityLayout from '../ActivityLayout/ActivityLayout';
import ProgressBar from './ProgressBar/ProgressBar';

import type { ITRebusSuccessProps } from './itRebusType';

export default function ITRebusSuccess({ score, length, isAlreadyCompleted }: ITRebusSuccessProps) {
    const navigate = useNavigate()
    const title = (
        <>
            {score} из {length} правильных ответов
        </>
    )
    const descriptionSuccess = (
        <>
            Тебе начислили {score} <Coin />
        </>
    )

    return (
        <>
            <ActivityLayout
                title="ИТ-ребус"
                description='Отгадай ребус. Свой вариант ответа запиши в поле. Получи баллы за правильные ответы.'
            >
                <ProgressBar current={length} total={length} />

                {isAlreadyCompleted ? (

                    <ResultStep
                        title='Баллы за эту активность уже получены'
                        description='Исследуй другие активности!'
                        buttonText="В ПРОФИЛЬ"
                        onButtonClick={() => navigate(ROUTES.PROFILE)}
                        hideBachground={true}
                        className={s.rebus__result}
                    >
                        <Link to={ROUTES.ACTIVITIES}>К ДРУГИМ АКТИВНОСТЯМ</Link>
                    </ResultStep>
                ) : (

                    <ResultStep
                        title={title}
                        description={descriptionSuccess}
                        buttonText="В ПРОФИЛЬ"
                        onButtonClick={() => navigate(ROUTES.PROFILE)}
                        hideBachground={true}
                        className={s.rebus__result}
                    >
                        <Link to={ROUTES.ACTIVITIES}>К ДРУГИМ АКТИВНОСТЯМ</Link>
                    </ResultStep>
                )}

            </ActivityLayout>
        </>

    )
}
