import s from './RadioList.module.scss';

import Radio from '../Radio/Radio';

export const EXPERIENCE_LEVELS = [
  { label: 'Джун (junior)', value: 'junior' },
  { label: 'Мидл (middle)', value: 'middle' },
  { label: 'Сеньор (senior)', value: 'senior' },
  { label: 'Тимлид (team lead)', value: 'teamlead' },
  { label: 'СТО', value: 'cto' },
  { label: 'Другой', value: 'other' },
];

interface RadioListProps {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
}
export default function RadioList({ name, value, error, onChange }: RadioListProps) {
  return (
    <div className={s.wrapper}>
      <span className={s.radioTitle}>Выбери уровень</span>
      <div className={s.radioList}>
        {EXPERIENCE_LEVELS.map((level) => (
          <Radio
            text={level.label}
            key={level.value}
            name={name}
            value={level.value}
            checked={value === level.value}
            onChange={onChange}
          />
        ))}
      </div>
      {error && <p className={s.error}>{error}</p>}
    </div>
  );
}
