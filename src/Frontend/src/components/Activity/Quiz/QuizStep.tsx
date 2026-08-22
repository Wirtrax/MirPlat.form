import s from './Quiz.module.scss'
import buttonStyles from '../../UI/Button/Button.module.scss';
import clsx from 'clsx';

import { useState } from "react";

import Substrate from "../../UI/Substrate/Substrate";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

import type { QuizStepProps } from './quizType';
import { normalizeAnswer } from '../../../utils/normalizeAnswer';

export default function QuizStep({ data, onNext }: QuizStepProps) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const handleCheck = () => {
    if (!answer.trim()) {
      setError('Заполните поле');
      return;
    }
    setError('');
    onNext(normalizeAnswer(answer));
    setAnswer('');
  };

  return (
    <>
      <Substrate >
        <div className={s.quiz__card} >
          <p className={s.quiz__question}>{data.question}</p>
          <p className={s.quiz__hint}>{data.hint}</p>
          <a
            href={data.buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              buttonStyles.button,
              s['quiz__link-btn']
            )}
          >
            {data.buttonText}
          </a>

          <Input
            placeholder={data.inputPlaceholder}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            error={error}
            className={s.quiz__input}
          />
        </div>
      </Substrate>

      <Button type="button" onClick={handleCheck} className={s['quiz__submit-btn']}>
        ПРОВЕРИТЬ
      </Button>
    </>

  );
}
