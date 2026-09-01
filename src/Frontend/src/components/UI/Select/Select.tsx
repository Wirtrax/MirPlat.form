import s from './Select.module.scss';

import ArrowIсonSelect from '../../../assets/interface/arrowIconSelect.svg?react';

import { useState } from 'react';

import type { SelectProps } from './selectProps';

export default function Select({
  label,
  error,
  name,
  value,
  options,
  onChange,
}: SelectProps) {
  const [open, setOpen] = useState(false);

  const selected = options.find((option) => option.value === value);

  return (
    <div className={s.selectField}>
      {label && <label className={s.label}>{label}</label>}

      <div className={s.selectWrapper}>
        <button
          type="button"
          className={s.select}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span>{selected?.label ?? 'Выберите специализацию'}</span>
          <ArrowIсonSelect />
        </button>

        {open && (
          <ul className={s.dropdown}>
            {options.map((option) => (
              <li
                key={option.value}
                className={s.option}
                onClick={() => {
                  onChange({
                    target: {
                      name,
                      value: option.value,
                    },
                  });

                  setOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className={s.error}>{error}</p>}
    </div>
  );
}