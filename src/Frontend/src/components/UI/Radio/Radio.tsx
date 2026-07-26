import type { InputHTMLAttributes } from 'react'
import s from './Radio.module.scss'

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
    text?: string;
    error?: string;
}
export default function Radio({ text, error, className, ...props }: RadioProps) {
    return (
        <>
         <label className={s.radioField}>
                <input
                    className={s.input}
                    type="radio"
                    {...props}
                />

                <span className={`${s.customRadio} ${className ?? ''}`} />

                <span className={s.text}>
                    {text}
                </span>
            </label>
            {error && <p className={s.error}>{error}</p>}
        </>

    )
}
