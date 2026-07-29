import type { InputHTMLAttributes } from 'react'
import s from './Radio.module.scss'

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
    text?: string;
    error?: string;
    type?: 'radio' | 'checkbox'
}
export default function Radio({ text, error, className, type = 'radio', ...props }: RadioProps) {
    return (
        <div className={s.radioContainer}>
         <label className={s.radioField}>
                <input
                    className={s.input}
                    type={type}
                    {...props}
                />

                <span className={`${s.customRadio} ${className ?? ''}`} />

                <span className={s.text}>
                    {text}
                </span>
            </label>
            {error && <p className={s.error}>{error}</p>}
        </div>

    )
}
