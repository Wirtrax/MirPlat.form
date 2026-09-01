import s from './FindError.module.scss';

import { useState } from 'react';
import clsx from 'clsx';

import { useAppSelector } from '../../../hooks/redux';

import Background from '../../UI/Background/Background';
import Loader from '../../UI/Loader/Loader';
import Substrate from '../../UI/Substrate/Substrate';

import ActivityLayout from '../ActivityLayout/ActivityLayout';
import Button from '../../UI/Button/Button';
import Timer from '../Timer/Timer';

import type { FindErrorGameProps } from "./findErrorType";
import type {
  FindErrorAnswer,
  FindErrorCode,
} from '../../../service/features/activity/activitySliceType';


export default function FindErrorStep({ onEndGame }: FindErrorGameProps) {
  const { codeLines } = useAppSelector(state => state.activity)
  const [answers, setAnswers] = useState<FindErrorAnswer[]>([])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedLine, setSelectedLine] = useState<number | null>(null)

  if (!codeLines) return <Background><Loader /></Background>
  const currentTask: FindErrorCode = codeLines[currentIndex];

  const handleNextStep = () => {
    if (selectedLine === null) return

    const answer: FindErrorAnswer = {
      id: currentTask.id,
      indexInputLine: selectedLine,
    }

    const updateAnswers = [...answers, answer]

    if (currentIndex + 1 >= codeLines.length) {
      onEndGame(updateAnswers)
      return
    }
    setAnswers(updateAnswers)
    setCurrentIndex(prev => prev + 1)
    setSelectedLine(null)
  }

  const handleTimeout = () => {
    const answer: FindErrorAnswer = {
      id: currentTask.id,
      indexInputLine: selectedLine ?? -1,
    };

    const updatedAnswers = [...answers, answer]

    if (currentIndex + 1 >= codeLines.length) {
      onEndGame(updatedAnswers)
      return
    }

    setAnswers(updatedAnswers)
    setCurrentIndex(prev => prev + 1)
    setSelectedLine(null)
  }

  const handleChoose = (index: number) => {
    if (selectedLine !== null) return
    setSelectedLine(index)
  }

  return (
    <ActivityLayout
      title="Найди ошибку"
      timer={<Timer
        key={currentIndex}
        duration={60}
        danger={15}
        onFinish={handleTimeout}
      />}
    >
      <Substrate className={s['find__substrate']}>
        <div className={s['find__card']}>
          <p className={clsx(s['find__level'], s[`find__level--${currentTask.difficulty}`])}>
            {currentTask.difficulty}
          </p>
          <ul className={s['find__list']}>
            {
              currentTask.codeLines.map((line, index) => {
                const isSelected = selectedLine === index
                return (
                  <li
                    key={index}
                    className={clsx(s['find__list-item'], isSelected && s['find__list-item__selected'])}
                    onClick={() => handleChoose(index)}
                  >
                    {line}
                  </li>
                )
              })
            }
          </ul>

          <Button
            onClick={() => handleNextStep()}
            className={s['find__btn']}>
            ДАЛЬШЕ
          </Button>

          <p className={s['find__index']}>
            {currentIndex + 1}/{codeLines.length}
          </p>
        </div>

      </Substrate>

    </ActivityLayout>
  )
}
