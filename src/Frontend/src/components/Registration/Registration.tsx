import { useEffect, useState } from 'react';

import { useAppDispatch } from '../../hooks/redux';
import { loginUser } from '../../service/features/user/userSlice';

import RegistrationForm from './RegistrationForm/RegistrationForm';
import SuccessStep from './SuccessStep/SuccessStep';
import ErrorStep from './ErrorStep/ErrorStep';

export default function Registration() {
  const [step, setStep] = useState<'form' | 'success' | 'error'>('form');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loginUser());
  }, [dispatch]);

  return (
    <>
      {step === 'form' && <RegistrationForm onSuccess={() => setStep('success')} onError={() => setStep('error')} />}
      {step === 'success' && <SuccessStep />}
      {step === 'error' && <ErrorStep onRetry={() => setStep('form')} />}
    </>
  );
}
