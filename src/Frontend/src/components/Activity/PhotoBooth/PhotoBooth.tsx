import s from './PhotoBooth.module.scss';

import PhotoBoothIcon from '../../../assets/activity/photoTetris.svg?react'

import { useEffect, useState } from 'react';
import ActivityLayout from '../ActivityLayout/ActivityLayout';
import Substrate from '../../UI/Substrate/Substrate';

interface PhotoBoothProps {
    onSubmitPhoto: () => void;
}

export default function PhotoBooth({ onSubmitPhoto }: PhotoBoothProps) {
    const [photo, setPhoto] = useState<File | null>(null)

    const description = 'Загрузи фото и получи персональный чек с твоим именем и лотерейным номером для участия в розыгрыше. Номер закрепляется за тобой и не меняется при повторной печати.'

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
            title='Фото-чек'
            description={description}
            buttonText='ПЕЧАТЬ'
            buttonDisabled={!photo}
            onButtonClick={onSubmitPhoto}
        >
            <Substrate className={s['booth__photo-area']}>
                {preview ? (
                    <div className={s['booth__photo-wrapper']}>
                        <img
                            className={s['booth__photo']}
                            src={preview}
                            alt="загруженное фото"
                        />
                    </div>
                ) : (
                    <label className={s['booth__upload']}>
                        <PhotoBoothIcon />

                        <span className={s['booth__upload-text']}>
                            Загрузить фото
                        </span>

                        <input
                            className={s['booth__input']}
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
