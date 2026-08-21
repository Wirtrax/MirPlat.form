import React, { useEffect, useRef, useState } from 'react';
import s from './SelectAdmin.module.scss';
import clsx from 'clsx';

export interface Option {
  value: string;
  label: string;
}
export interface SelectProps {
  label?: string;
  error?: string;
  name: string;
  value: string;
  options: Option[];
  disabled?: boolean;

  onChange: (e: {
    target: {
      name: string;
      value: string;
    };
  }) => void;
}
export const SelectAdmin: React.FC<SelectProps> = ({ label, error, name, value, options, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: Option) => {
    onChange({
      target: {
        name,
        value: option.value,
      },
    });
    setIsOpen(false);
  };

  return (
    <div className={s.select} ref={rootRef}>
      {label && <span className={s.select__label}>{label}</span>}

      <div
        className={clsx(
          s.select__field,
          disabled ? s['select__field--disabled'] : '',
          error ? s['select__field--error'] : ''
        )}
        onClick={handleToggle}>
        <button
          type="button"
          className={s.select__control}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={disabled}>
          {selected?.label}
        </button>

        <svg
          className={[s.select__icon, isOpen ? s['select__icon--open'] : ''].join(' ')}
          width="16"
          height="16"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true">
          <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {isOpen && (
          <ul className={s.select__menu} role="listbox">
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                className={clsx(s.select__option, option.value === value ? s['select__option--selected'] : '')}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option);
                }}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <span className={s.select__error}>{error}</span>}
    </div>
  );
};

export default SelectAdmin;
