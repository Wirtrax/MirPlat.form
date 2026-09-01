import { useState } from 'react';

import RegistrationForm from './RegistrationForm/RegistrationForm';
import SuccessStep from './SuccessStep/SuccessStep';
import ErrorStep from './ErrorStep/ErrorStep';

export default function Registration() {
  const [step, setStep] = useState<'form' | 'success' | 'error'>('form');

  return (
    <>
      {step === 'form' && <RegistrationForm onSuccess={() => setStep('success')} onError={() => setStep('error')} />}
      {step === 'success' && <SuccessStep />}
      {step === 'error' && <ErrorStep onRetry={() => setStep('form')} />}
    </>
  );
}
