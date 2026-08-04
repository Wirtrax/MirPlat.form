import type { ResultStepProps } from './ResultStep.type';
import s from './ResultStep.module.scss';

import Button from '../../UI/Button/Button';

export default function ResultStep({ title, description, buttonText, onButtonClick, children }: ResultStepProps) {
  return (
    <div className={s['resultCard']}>
      <h2 className={s.resultTitle}>{title}</h2>
      <p className={s.resultDescription}>{description}</p>
      <Button onClick={onButtonClick}>{buttonText}</Button>
      <div className={s.btnSkip}>{children}</div>
    </div>
  );
}
