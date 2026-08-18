import React, { useId } from 'react';
import clsx from 'clsx';
import s from './Input.module.scss';
import type { InputProps } from './InputProps';

const AdminInput: React.FC<InputProps> = ({
  className = '',
  label,
  type = 'text',
  showSearchIcon,
  disabled,
  id,
  ...rest
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const isSearch = showSearchIcon ?? type === 'search';

  return (
    <div className={clsx(s.input, className)}>
      {label && (
        <label htmlFor={inputId} className={s['input__label']}>
          {label}
        </label>
      )}

      <div className={clsx(s['input__field'], { [s['input__field--disabled']]: disabled })}>
        {isSearch && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={s['input__icon']}
            aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        )}

        <input
          id={inputId}
          type={type}
          disabled={disabled}
          className={clsx(s['input__control'], { [s['input__control--with-icon']]: isSearch })}
          {...rest}
        />
      </div>
    </div>
  );
};

export default AdminInput;
