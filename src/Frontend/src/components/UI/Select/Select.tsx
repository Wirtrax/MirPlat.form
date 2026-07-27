import type { ReactNode, SelectHTMLAttributes } from "react";
import s from './Select.module.scss'
import ArrowIсonSelect from '../../../assets/interface/arrowIconSelect.svg?react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    children?: ReactNode;
}

export default function Select({ className, label, children, ...props }: SelectProps) {
    return (
        <div className={s.selectField}>
            {label && <label className={s.label}>{label}</label>}
            <div className={s.selectWrapper}>
                <select
                    className={`${s.select} ${className ?? ''}`}
                    {...props}>
                    {children}
                </select>
                <ArrowIсonSelect />
            </div>

        </div>
    )
}
