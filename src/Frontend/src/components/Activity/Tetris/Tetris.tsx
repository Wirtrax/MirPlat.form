import s from './Tetris.module.scss';

import PhotoTetris from '../../../assets/activity/photoTetris.svg?react'

import { useEffect, useState } from 'react';

import ActivityLayout from "../ActivityLayout/ActivityLayout";
import Substrate from '../../UI/Substrate/Substrate';

interface TetrisProps {
  onSubmitPhoto: (photo_link: string) => void;
}

export default function Tetris({ onSubmitPhoto }: TetrisProps) {
  const [photo, setPhoto] = useState<File | null>(null)

  const description = 'Собери головоломку из деталей, повторяя принцип тетриса. Когда конструкция будет готова — загрузи фото результата. После проверки модератором ты получишь баллы.'

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) setPhoto(file)
  }

  const preview = photo ? URL.createObjectURL(photo) : null

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <ActivityLayout
      title='Стек-тетрис'
      description={description}
      buttonText='ОТПРАВИТЬ'
      buttonDisabled={!photo}
      // onButtonClick={onSubmitPhoto}
    >
      <Substrate className={s['tetris__photo-area']}>
        {preview ? (
          <div className={s['tetris__photo-wrapper']}>
            <img
              className={s['tetris__photo']}
              src={preview}
              alt="загруженное фото"
            />
          </div>
        ) : (
          <label className={s['tetris__upload']}>
            <PhotoTetris />

            <span className={s['tetris__upload-text']}>
              Загрузить фото
            </span>

            <input
              className={s['tetris__input']}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </label>
        )}

      </Substrate>
    </ActivityLayout>
  )
}
