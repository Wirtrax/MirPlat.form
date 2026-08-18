import s from './Quiz.module.scss'

import Coin from '../../../assets/interface/coin.svg?react';
import smile_mascot from '../../../assets/mascot/smilingMascotWithSmilingEyes.webp'
import sad_mascot from '../../../assets/mascot/smilingMascotWithSweat.webp'

import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes';

import ResultStep from "../../UI/ResultStep/ResultStep";

import type { QuizSuccessProps } from './quizType';
import ActivityLayout from '../ActivityLayout/ActivityLayout';

export default function QuizSuccess({ success, error }: QuizSuccessProps) {
  const navigate = useNavigate()
  const descriptionSuccess = (
    <>
      Тебе начислено {15} <Coin />
    </>
  )
  const descriptionError = (
    <>
      Тебе начислено {0} <Coin />
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
