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

  const handlePrepare = (appended: string, masked: any) => {
    if (mask === '+7 000-000-00-00') {

      if (!appended) return appended;

      let cleanAppended = appended.replace(/\D/g, '');

      if (!masked.value || masked.value === '+7 ') {
        if (cleanAppended.startsWith('8') || cleanAppended.startsWith('7')) {
          cleanAppended = cleanAppended.slice(1);
        }

        if (cleanAppended.length > 0) {
          return '9' + cleanAppended.slice(1);
        }

        return '';
      }
      const currentDigits = masked.unmaskedValue || '';
      if (currentDigits.length === 0 && cleanAppended.length > 0) {
        return '9' + cleanAppended.slice(1);
      }
    }

    return appended;
  };


  return (
    <div className={s.inputField}>
      {label && <label className={s.label}>{label}</label>}
      {mask ? (
        <IMaskInput
          mask={mask}
          prepare={handlePrepare}
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
