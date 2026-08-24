import s from './FindError.module.scss'

import smile_mascot from '../../../assets/mascot/smilingMascotWithSmilingEyes.webp'
import Coin from '../../../assets/interface/coin.svg?react';

import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes';

import ActivityLayout from "../ActivityLayout/ActivityLayout";
import Timer from "../Timer/Timer";
import ResultStep from '../../UI/ResultStep/ResultStep';

export default function FindErrorSuccess() {
  const navigate = useNavigate()

  const titleCoins = <>
    3 из 7 правильных ответов
  </>
  const descriptionCoins = <>
    Тебе начислили 7 <Coin />
  </>
  return (
    <>
      <ActivityLayout
        title="Найди ошибку"
        timer={<Timer staticTime='00:00' />}
      >
        <ResultStep
          title={titleCoins}
          description={descriptionCoins}
          buttonText="В ПРОФИЛЬ"
          onButtonClick={() => navigate(ROUTES.PROFILE)}
          hideBachground={true}
          className={s['game__success-card']}
        >
          <Link to={ROUTES.ACTIVITIES}>К ДРУГИМ АКТИВНОСТЯМ</Link>
        </ResultStep>
        {/* <ResultStep
          title='Баллы за эту активность уже получены'
          description='Исследуй другие активности!'
          buttonText="В ПРОФИЛЬ"
          onButtonClick={() => navigate(ROUTES.PROFILE)}
          hideBachground={true}
          className={s['game__success-card']}
        >
          <Link to={ROUTES.ACTIVITIES}>К ДРУГИМ АКТИВНОСТЯМ</Link>
        </ResultStep> */}

        <div className={s['game__mascot-container']}>
          <img className={s['game__mascot-img']} src={smile_mascot} alt='smile mascot' />
        </div>
      </ActivityLayout>
    </>
  )
}
