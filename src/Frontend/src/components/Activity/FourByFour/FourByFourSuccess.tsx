import s from './FourByFour.module.scss';

import smile_mascot from '../../../assets/mascot/smilingMascotWithSmilingEyes.webp';
import Coin from '../../../assets/interface/coin.svg?react';

import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../routes/routes';

import ResultStep from '../../UI/ResultStep/ResultStep';
import ActivityLayout from '../ActivityLayout/ActivityLayout';
import Timer from '../Timer/Timer';

import type { FourByFourSuccessProps } from './fourByFourType';

export default function FourByFourSuccess({ coins }: FourByFourSuccessProps) {
  const navigate = useNavigate()

  const description = (
    <>
      Тебе начислили {coins} <Coin />
    </>
  )

  return (

    <ActivityLayout
    title='4x4'
    timer={<Timer staticTime='00:00' />}
    >
      <ResultStep
        title="Ты отлично справился!"
        description={description}
        buttonText="В ПРОФИЛЬ"
        onButtonClick={() => navigate(ROUTES.PROFILE)}
        hideBachground={true}
        className={s['game__success-card']}
      >
        <Link to={ROUTES.ACTIVITIES}>К ДРУГИМ АКТИВНОСТЯМ</Link>
      </ResultStep>
      <div className={s['game__mascot-container']}>
        <img className={s['game__mascot-img']} src={smile_mascot} alt='smile mascot' />
      </div>
    </ActivityLayout>

  )
}
