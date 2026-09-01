import s from './FindError.module.scss';

import clsx from 'clsx';

import ActivityLayout from '../ActivityLayout/ActivityLayout';
import Button from '../../UI/Button/Button';

import type { FindErrorRulesProps } from './findErrorType';


export default function FindErrorRules({ onStartGame }: FindErrorRulesProps) {
    return (
        <ActivityLayout
            title="Найди ошибку"
        >
            <div className={s['game__rules-card']}>
                <h2 className={s['game__rules-title']}>Правила</h2>

                <ol className={s['game__rules-list']}>
                    <li className={s['game__rules-item']}>
                        Проанализируй код на экране.
                    </li>
                    <li className={s['game__rules-item']}>
                        Найди ошибку во фрагменте кода.
                    </li>
                    <li className={s['game__rules-item']}>
                        Выдели ошибку, нажав на соответсвующую строчку.
                    </li>
                    <li className={s['game__rules-item']}>
                        Перейди к следующему фрагменту кода.
                    </li>
                </ol>
                <div className={s['game__rules-area']}>
                    <p className={s['game__rules-subtitle']}>
                        Важно:
                    </p>
                    <ul className={clsx(s['game__rules-list'], s['game__rules-list--unordered'])}>
                        <li className={s['game__rules-item']}>
                            1 попытка на каждый фрагмент.
                        </li>
                        <li className={s['game__rules-item']}>
                            В каждом фрагменте только 1 ошибка.
                        </li>
                        <li className={s['game__rules-item']}>
                            Время ограничено — 60 сек. для решения 7 задач.
                        </li>
                    </ul>
                </div>

                <Button className={s['game__rules-action']} onClick={onStartGame}>ИГРАТЬ</Button>
            </div>
        </ActivityLayout>
    )
}
