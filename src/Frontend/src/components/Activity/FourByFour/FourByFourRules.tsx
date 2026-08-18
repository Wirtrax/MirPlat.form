import s from './FourByFour.module.scss';

import ActivityLayout from '../ActivityLayout/ActivityLayout';
import Button from '../../UI/Button/Button';

import type { FourByFourRulesProps } from './fourByFourType';
import Timer from '../Timer/Timer';

export default function FourByFourRules({ onStartGame }: FourByFourRulesProps) {
    return (
        <ActivityLayout title="4x4" timer={<Timer staticTime='5:00' />}>
            <div className={s['game__rules-card']}>
                <h2 className={s['game__rules-title']}>Правила</h2>

                <ol className={s['game__rules-list']}>
                    <li className={s['game__rules-item']}>
                        Перед тобой появится поле 4×4 с карточками.
                    </li>
                    <li className={s['game__rules-item']}>
                        Найди 4 группы карточек и объедини их по смыслу. <br /> В каждой группе — 4 карточки.
                    </li>
                    <li className={s['game__rules-item']}>
                        Если выбрал правильно — появятся новые карточки. Если нет — попробуй снова.
                    </li>
                    <li className={s['game__rules-item']}>
                        У тебя есть 5 минут, чтобы собрать все группы.
                    </li>
                </ol>
                <Button className={s['game__rules-action']} onClick={onStartGame}>ИГРАТЬ</Button>
            </div>
        </ActivityLayout>
    );
}