import s from './ActivitiesCard.module.scss';
import type { ActivityDetailsProps } from './ActivitiesCard.types';
import Coin from '../../../../assets/interface/coin.svg?react'
import Button from '../../../UI/Button/Button';

export default function ActivityDetails({ card }: ActivityDetailsProps) {
    return (
        <div className={s.openContent}>
            <p className={s.reward}>
                до {card.reward} <Coin />
            </p>

            <div className={s.description}>
                <img
                    src={card.gameAvatar}
                    alt={card.title}
                    className={s.gameAvatar}
                />

                <p className={s.firstParagraph}>
                    {card.description[0]}
                </p>

                <p className={s.secondParagraph}>
                    {card.description[1]}
                </p>

                <div className={s.buttonWrapper}>
                    <Button className={s.btn}>
                        {card.buttonText}
                    </Button>
                </div>
            </div>
        </div>
    )
}
