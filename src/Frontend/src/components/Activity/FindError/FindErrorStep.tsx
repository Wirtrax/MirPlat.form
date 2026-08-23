import s from './FindError.module.scss';
import clsx from 'clsx';

import { useState } from "react";
import { TASKS_DATA } from "../../../mock/find_error";

import Substrate from "../../UI/Substrate/Substrate";
import ActivityLayout from "../ActivityLayout/ActivityLayout";
import Timer from "../Timer/Timer";

import type { FindErrorGameProps } from "./findErrorType";
import Button from '../../UI/Button/Button';



export default function FindErrorStep({ onEndGame }: FindErrorGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedLine, setSelectedLine] = useState<number | null>(null)
  const [countCorrected, setCountCorrected] = useState(0)

  const currentTask = TASKS_DATA[currentIndex]

  const handleNextStep = () => {
    if (selectedLine === currentTask.correctLineIndex) {
      setCountCorrected(prev => prev + 1)
    }

    if (currentIndex + 1 >= TASKS_DATA.length) {
      onEndGame(countCorrected)
    } else {
      setCurrentIndex(prev => prev + 1)
      setSelectedLine(null)
    }
  }

  const handleTimeout = () => {
    if (currentIndex + 1 >= TASKS_DATA.length) {
      onEndGame(countCorrected);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedLine(null);
    }
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
            {currentIndex + 1}/{TASKS_DATA.length}
          </p>
        </div>

      </Substrate>

    </ActivityLayout>
  )
}
