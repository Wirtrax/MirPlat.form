import s from './ErrorStep.module.scss';

import Background from '../../UI/Background/Background';
import ResultStep from '../ResultStep/ResultStep';

interface ErrorStepProps {
  onRetry: () => void;
}

export default function ErrorStep({ onRetry }: ErrorStepProps) {
  return (
    <Background variant="alternative">
      <div className="container">
        <div className={s.wrapper}>
          <span className={s.errorPage}></span>
          <ResultStep
            title="Что-то пошло не так..."
            description="Попробуй ещё раз"
            buttonText="РЕГИСТРАЦИЯ"
            onButtonClick={onRetry}></ResultStep>
        </div>
      </div>
    </Background>
  );
}
