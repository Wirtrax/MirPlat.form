import s from './Quiz.module.scss';

import Coin from '../../../assets/interface/coin.svg?react';
import smile_mascot from '../../../assets/mascot/smilingMascotWithSmilingEyes.webp';
import sad_mascot from '../../../assets/mascot/smilingMascotWithSweat.webp';

import { Link, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../hooks/redux';
import { ROUTES } from '../../../routes/routes';

import ResultStep from "../../UI/ResultStep/ResultStep";
import ActivityLayout from '../ActivityLayout/ActivityLayout';

import type { QuizSuccessProps } from './quizType';

export default function QuizSuccess({ success, error }: QuizSuccessProps) {
  const { quizReward } = useAppSelector(state => state.activity)

  const navigate = useNavigate()

  const descriptionSuccess = (
    <>
      Тебе начислено {quizReward} <Coin />
    </>
  )
  const descriptionError = (
    <>
      Тебе начислено {quizReward} <Coin />
    </>
  )

  return (
    <>
      <ActivityLayout
        title="Квиз"
        description='Исследуй социальные сети Мир Plat.Form, ответь на 3 вопроса и получи «Приветы»!'
      >
        {
          success &&
          <div>
            <ResultStep
              title="Ты ответил верно!"
              description={descriptionSuccess}
              buttonText="В ПРОФИЛЬ"
              onButtonClick={() => navigate(ROUTES.PROFILE)}
              hideBachground={true}
              className={s.quiz__result}
            >
              <Link to={ROUTES.ACTIVITIES}>К ДРУГИМ АКТИВНОСТЯМ</Link>
            </ResultStep>
            <div className={s['game__mascot-container']}>
              <img className={s['game__mascot-img']} src={smile_mascot} alt='smile mascot' />
            </div>
          </div>
        }

        {
          error &&
          <div>
            <ResultStep
              title="Ответ неверный"
              description={descriptionError}
              buttonText="В ПРОФИЛЬ"
              onButtonClick={() => navigate(ROUTES.PROFILE)}
              hideBachground={true}
              className={s.quiz__result}
            >
              <Link to={ROUTES.ACTIVITIES}>К ДРУГИМ АКТИВНОСТЯМ</Link>
            </ResultStep>
            <div className={s['game__mascot-container']}>
              <img className={s['game__mascot-img']} src={sad_mascot} alt='sad mascot' />
            </div>
          </div>
        }
      </ActivityLayout>
    </>

  )
}
