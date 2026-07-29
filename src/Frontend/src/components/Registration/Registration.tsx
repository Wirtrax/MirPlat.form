import { useState } from 'react';
import s from './Registration.module.scss';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import SuccessStep from './SuccessStep/SuccessStep';
import ErrorStep from './ErrorStep/ErrorStep';

export default function Registration() {
    const [step, setStep] = useState<'form' | 'success' | 'error'>('form')

    return (
        <div className={s.wrapper}>
            {
                step === 'form' &&
                <RegistrationForm
                    onSuccess={() => setStep('success')}
                    onError={() => setStep('error')}
                />
            }
            {
                step === 'success' && <SuccessStep />
            }
            {
                step === 'error' && <ErrorStep onRetry={() => setStep('form')} />
            }
        </div>
    )
}
