import Radio from '../Radio/Radio'
import s from './RadioList.module.scss'

export const EXPERIENCE_LEVELS = [
    { label: 'Джун (junior)', value: 'junior' },
    { label: 'Мидл (middle)', value: 'middle' },
    { label: 'Сеньор (senior)', value: 'senior' },
    { label: 'Тимлид (team lead)', value: 'teamlead' },
    { label: 'СТО', value: 'cto' },
    { label: 'Другой', value: 'other' },
]

export default function RadioList() {
    return (
        <>
            <span className={s.radioTitle}>Выбери уровень</span>
            <div className={s.radioList}>
                {
                    EXPERIENCE_LEVELS.map(level => (
                        <Radio text={level.label} />
                    ))
                }
            </div>
        </>

    )
}
