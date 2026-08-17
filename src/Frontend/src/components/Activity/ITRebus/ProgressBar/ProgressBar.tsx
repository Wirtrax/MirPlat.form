import s from './ProgressBar.module.scss'

import type { ProgressBarProps } from './progressBarType'

export default function ProgressBar({current, total}: ProgressBarProps) {
    const percentage = Math.min(
        Math.max((current / total) * 100, 0),
        100
    );

    const fillWidth = current === total
        ? '100%'
        : `calc(${percentage}% - 17px)`;

    const steps = Array.from({ length: total }, (_, i) => i + 1);

    return (
        <div className={s.progress}>
            <div className={s.progress__track}>
                <div
                    className={s.progress__fill}
                    style={{ width: fillWidth }}
                />
            </div>

            <div className={s.progress__steps}>
                {steps.map((step) => (
                    <span key={step} className={s.progress__step}>
                        {step}
                    </span>
                ))}
            </div>
        </div>
  )
}
