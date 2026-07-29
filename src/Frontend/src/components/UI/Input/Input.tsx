import type { InputHTMLAttributes } from 'react'
import s from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({ className, label, error, ...props }: InputProps) {
    return (
        <div className={s.inputField}>
            {label && <label className={s.label}>{label}</label>}
            <input
                className={`${s.input} ${className ?? ''}`}
                {...props}
            />
            {error ? (<p className={s.error}>{error}</p>) : (<p className={s.errorPlaceholder}></p>)}
        </div>
    )
}
