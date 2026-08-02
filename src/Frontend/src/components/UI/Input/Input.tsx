import type { InputHTMLAttributes } from 'react'
import s from './Input.module.scss'
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({ className, label, error, ...props }: InputProps) {
    return (
        <div className={s.inputField}>
            {label && <label className={s.label}>{label}</label>}
            <input
                className={clsx(s.input, className)}
                {...props}
            />
            {error ? (<p className={s.error}>{error}</p>) : (<p className={s.errorPlaceholder}></p>)}
        </div>
    )
}
