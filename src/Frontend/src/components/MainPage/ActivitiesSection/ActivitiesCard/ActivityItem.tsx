import { CornerSquare } from '../../../UI/CornerSquare/CornerSquare';
import Substrate from '../../../UI/Substrate/Substrate';
import clsx from 'clsx';
import ActivityDetails from './ActivityDetails';
import s from './ActivitiesCard.module.scss';
import type { ActivityItemProps } from './ActivitiesCard.types';


export default function ActivityItem({ card, isOpen, setOpenCard }: ActivityItemProps) {

    const getSquareClass = (id: string) => {
        switch (id) {
            case 'tetris':
                return s.squareTetris;
            case 'transactions':
                return s.squareTransactions;
            case 'photo_booth':
                return s.squarePhoto;
            case 'qr':
                return s.squareQr;
            case 'quiz':
                return s.squareQuiz;
            default:
                return '';
        }
    };

    return (
        <Substrate
            className={s.substrate}
            onClick={() => setOpenCard(isOpen ? null : card.id)}
        >
            <div className={s.squareBlur}>
                <CornerSquare
                    position={card.positionSquare}
                    mainSize={card.mainSize}
                    accentHeight={card.accentHeight}
                    accentWidth={card.accentWidth}
                    className={clsx(
                        getSquareClass(card.id),
                        isOpen && s.openOpacity
                    )}
                />
            </div>

            {!isOpen && (
                <p className={s.subtitle}>
                    награда в приветах
                </p>
            )}

            <div className={s.wrapper}>
                <h3 className={clsx(s.title, !isOpen && s.closeTitle)}>
                    {card.title}
                </h3>

                {isOpen && (
                    <ActivityDetails card={card} />
                )}
            </div>

        </Substrate>
    )
}