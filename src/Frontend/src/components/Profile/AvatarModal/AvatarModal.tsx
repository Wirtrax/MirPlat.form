import s from './AvatarModal.module.scss';
import profileStyles from '../Profile.module.scss';
import clsx from 'clsx';

import avatarImg from '../../../assets/avatar/avatarIcon.webp';

import { useState } from 'react';

import { AVATAR_THEMES, type AvatarTheme } from '../avatarThemes';
import Slider from '../../Instructions/Slider/Slider';
import Button from '../../UI/Button/Button';

interface AvatarModalProps {
    currentTheme: AvatarTheme;
    onSelectTheme: (theme: AvatarTheme) => void;
    onClose?: () => void;
}

export default function AvatarModal({ currentTheme, onSelectTheme, onClose }: AvatarModalProps) {
    const initialIndex = AVATAR_THEMES.findIndex(theme => theme.id === currentTheme)
    const [selectedTheme, setSelectedTheme] = useState(initialIndex)

    return (
        <div className={s['avatar-modal']}>
            <h3 className={s['avatar-modal__title']}>Изображение профиля</h3>

            <div className={s['avatar-modal__slider-wrapper']}>
                <Slider
                    showDots={false}
                    slidesPerView={1.6}
                    options={{
                        centeredSlides: true,
                        initialSlide: initialIndex,
                    }}
                    onSlideChange={setSelectedTheme}
                >
                    {AVATAR_THEMES.map((theme, index) => {
                        const isSelected = index === selectedTheme;

                        return (
                            <div
                                key={theme.id}
                                className={s['avatar-modal__slide-content']}
                            >
                                <picture
                                    className={clsx(
                                        profileStyles['profile__user-avatar'],
                                        theme.id !== 'default' && profileStyles[`profile__user-avatar--${theme.id}`],
                                        s['avatar-modal__avatar'],
                                        isSelected && s['avatar-modal__avatar--selected']
                                    )}
                                >
                                    <img src={avatarImg} alt="Превью аватара" />
                                </picture>
                            </div>
                        );
                    })}
                </Slider>
            </div>

            <Button className={s['avatar-modal__submit-btn']}
                onClick={
                    () => {
                        onSelectTheme(AVATAR_THEMES[selectedTheme].id);
                        onClose?.();
                    }
                }
            >
                ПОДТВЕРДИТЬ
            </Button>
        </div>
    );
}