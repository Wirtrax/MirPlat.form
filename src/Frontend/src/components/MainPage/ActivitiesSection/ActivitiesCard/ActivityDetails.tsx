import s from './ActivitiesCard.module.scss';

import { Link, useNavigate } from 'react-router-dom';

import Coin from '../../../../assets/interface/coin.svg?react';

import Button from '../../../UI/Button/Button';

import type { ActivityDetailsProps } from './ActivitiesCard.types';


export default function ActivityDetails({ card }: ActivityDetailsProps) {
  const navigate= useNavigate()
  return (
    <div className={s.openContent}>
      <p className={s.reward}>
        до {card.reward} <Coin />
      </p>

      <div className={s.description}>
        <img src={card.gameAvatar} alt={card.title} className={s.gameAvatar} />

        <p className={s.firstParagraph}>{card.description[0]}</p>

        <p className={s.secondParagraph}>{card.description[1]}</p>

        <Link to={card.link} className={s.buttonWrapper}>
          <Button onClick={()=>navigate('/tetris')} className={s.btn}>{card.buttonText}</Button>
        </Link>
      </div>
    </div>
  );
}
