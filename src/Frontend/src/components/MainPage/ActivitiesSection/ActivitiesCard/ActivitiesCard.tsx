import { activitiesMock } from '../../../../mock/activities';
import ActivityItem from './ActivityItem';
import s from './ActivitiesCard.module.scss';
import type { ActivitiesCardProps } from './ActivitiesCard.types';


export default function ActivitiesCard({ openCard, setOpenCard }: ActivitiesCardProps) {

    return (
        <div className={s.cardList}>
            {activitiesMock.map(card => (
                <ActivityItem
                    key={card.id}
                    card={card}
                    isOpen={openCard === card.id}
                    setOpenCard={setOpenCard}
                />
            ))}
        </div>
    )
}