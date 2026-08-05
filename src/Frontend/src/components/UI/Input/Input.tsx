import s from './Input.module.scss';

import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { IMaskInput } from 'react-imask';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  mask?: string;
  value?: string;
}

export default function Input({ className, label, error, mask, ...props }: InputProps) {

  return (
    <div className={s.inputField}>
      {label && <label className={s.label}>{label}</label>}
      {mask ? (
        <IMaskInput
          mask={mask}
          prepare={(appended: string, masked: any) => {
            if (mask === '+7 000-000-00-00' && appended === '8' && masked.value === '') {
              return '';
            }
            return appended;
          }}
          className={clsx(s.input, className)}
          value={props.value}
          name={props.name}
          placeholder={props.placeholder}
          onAccept={(value) => {
            props.onChange?.({
              target: {
                name: props.name,
                value: value,
              },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
          onBlur={props.onBlur}
        />
      ) : (
        <input className={clsx(s.input, className)} {...props} />
      )}
      {error ? <p className={s.error}>{error}</p> : <p className={s.errorPlaceholder}></p>}
    </div>
  );
}
