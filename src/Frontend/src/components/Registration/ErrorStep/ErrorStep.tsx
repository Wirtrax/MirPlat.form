import ResultStep from '../ResultStep/ResultStep'
import s from './ErrorStep.module.scss'

interface ErrorStepProps {
    onRetry: () => void;
}

export default function ErrorStep({ onRetry }: ErrorStepProps) {

    return (
        <div className={s.wrapper}>
            <ResultStep
                title='Что-то пошло не так...'
                description='Попробуй ещё раз'
                buttonText='РЕГИСТРАЦИЯ'
                onButtonClick={onRetry}
            >
            </ResultStep>
        </div>
    )
}
