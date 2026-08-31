import s from './Profile.module.scss';
import avatarStyle from './AvatarModal/AvatarModal.module.scss';

import avatar from '../../assets/avatar/avatarIcon.webp';
import editPen from '../../assets/ico/profile/pen.svg';
import EmailIcon from '../../assets/profile/contacts/email.svg?react';
import PhoneIcon from '../../assets/profile/contacts/phone.svg?react';
import SpecializationIcon from '../../assets/profile/contacts/specialization.svg?react';
import LevelIcon from '../../assets/profile/contacts/level.svg?react';

import { options } from '../Registration/RegistrationForm/specializationOptions';
import { EXPERIENCE_LEVELS } from '../UI/RadioList/RadioList';

import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ROUTES } from '../../routes/routes';

import ProfileInfoCard from './ProfileInfoCard/ProfileInfoCard';
import Button from '../UI/Button/Button';
import ProductCard from '../UI/ProductCard/ProductCard';
import Background from '../UI/Background/Background';
import Loader from '../UI/Loader/Loader';

import Modal from '../UI/Modal/Modal';
import ProductModal from '../UI/Modal/ProductModal/ProductModal';

import type { ProfileInfoCardProps } from './profileType';
import type { createOrderResponse } from '../../service/features/shop/shopType';
import type { AvatarTheme } from './avatarThemes';
import AvatarModal from './AvatarModal/AvatarModal';
import { fetchUser } from '../../service/features/user/userSlice';

export default function Profile() {
  console.log('Рендер компонента Profile');

  const dispatch = useAppDispatch()
  const { user, status } = useAppSelector((state) => state.user);
  const [selectedPurchase, setSelectedPurchase] = useState<createOrderResponse | null>(null);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const [avatarTheme, setAvatarTheme] = useState<AvatarTheme>(() => {
    return (localStorage.getItem('user_avatar_theme') as AvatarTheme) || 'default';
  });

  const [showAllPurchases, setShowAllPurchases] = useState(false);

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const handleSelectTheme = (theme: AvatarTheme) => {
    setAvatarTheme(theme);
    localStorage.setItem('user_avatar_theme', theme);
    setIsAvatarModalOpen(false);
  };

  if (!user && (status === 'loading' || status === 'idle')) return <Background><Loader /></Background>

  if (!user) {
    return <div>Данные не найдены</div>;
  }

  const purchases: createOrderResponse[] = user.purchases || [];

  const visiblePurchases = showAllPurchases ? purchases : purchases.slice(-4);

  const specializationLabel = options.find((option) => option.value === user?.specialization);
  const levelLabel = EXPERIENCE_LEVELS.find((level) => level.value === user?.programming_level);

  console.log(purchases);

  const fullName = `${user?.last_name} ${user?.first_name} ${user?.patronym}`.trim();
  const contactCardData: ProfileInfoCardProps = {
    title: 'Контакты',
    items: [
      {
        id: 'email',
        icon: <EmailIcon />,
        label: 'E-mail',
        value: user.email,
      },
      {
        id: 'phone',
        icon: <PhoneIcon />,
        label: 'Номер телефона',
        value: user.phone_number,
      },
    ],
  };

  const aboutCardData: ProfileInfoCardProps = {
    title: 'О тебе',
    items: [
      {
        id: 'spec',
        icon: <SpecializationIcon />,
        label: 'Специализация',
        value: specializationLabel?.label ?? user.specialization,
      },
      {
        id: 'level',
        icon: <LevelIcon />,
        label: 'Уровень',
        value: levelLabel?.label ?? user.specialization,
      },
    ],
  };

  return (
    <Background variant="minimal">
      <main className={clsx(s['profile'], 'container')}>
        <nav className={s['profile__nav']}>
          <Link to={ROUTES.HOME}>
            <span className={s['profile__nav-arrow']}> </span>
            <span className={s['profile__nav-link']}>на главную</span>
          </Link>
        </nav>

        <div className={s['profile__header']}>
          <div className={s['profile__user-info']}>
            <div className={s['profile__user-avatar-wrapper']}>
              <picture
                // style={{ backgroundColor: user?.profile_picture }}
                className={clsx(
                  s['profile__user-avatar'],
                  avatarTheme !== 'default' && s[`profile__user-avatar--${avatarTheme}`]
                )}
                onClick={() => setIsAvatarModalOpen(true)}>
                <img src={avatar} alt="Аватар пользователя" />
              </picture>
              <button className={s['profile__edit-btn']} onClick={() => setIsAvatarModalOpen(true)}>
                <img src={editPen} alt="Редактировать" />
              </button>
            </div>
            <h3 className={s['profile__user-name']}>{fullName}</h3>
            <p className={s['profile__user-id']}>
              ID: <span className={s['profile__user-id-value']}>{user?.id}</span>
            </p>
          </div>

          <dl className={s['profile__balance']}>
            <dt className={s['profile__balance-label']}>Баланс «Приветов»:</dt>
            <dd className={s['profile__balance-value']}>{user?.balance}</dd>
          </dl>
        </div>

        <Link to={ROUTES.ACTIVITIES}>
          <Button className={s['profile__activities-btn']}>АКТИВНОСТИ</Button>
        </Link>

        <div className={s['profile__cards']}>
          <ProfileInfoCard {...aboutCardData} />
          <ProfileInfoCard {...contactCardData} />
        </div>

        <div className={s['profile__purchases']}>
          <h3 className={s['profile__purchases-title']}>Мои покупки</h3>

          {purchases.length > 0 ? (
            <>
              <div role="list" className={s['profile__purchases-list']}>
                {visiblePurchases.map((purchase, index) => (
                  <ProductCard
                    key={purchase.id ?? index}
                    purchase={purchase.item}
                    withPrice={false}
                    hasBuy={true}
                    received={purchase.status === 'received'}
                    onClick={() => setSelectedPurchase(purchase)}
                  />
                ))}
              </div>

              {purchases.length > 4 && !showAllPurchases && (
                <button type="button" className={s['profile__show-all']} onClick={() => setShowAllPurchases(true)}>
                  Посмотреть все товары
                </button>
              )}
            </>
          ) : (
            <p className={s['profile__empty-text']}>Пока тут ничего нет...</p>
          )}
          <Link to={ROUTES.SHOP}>
            <Button className={s['profile__shop-btn']}>В МАГАЗИН</Button>
          </Link>
        </div>
      </main>

      {selectedPurchase && (
        <Modal onClose={() => setSelectedPurchase(null)}>
          <ProductModal
            src={selectedPurchase.item?.image}
            title={selectedPurchase.item?.name}
            code={selectedPurchase.code}
            received={selectedPurchase.status === 'received'}
          />
        </Modal>
      )}

      {isAvatarModalOpen && (
        <Modal className={avatarStyle['modal']} onClose={() => setIsAvatarModalOpen(false)}>
          <AvatarModal currentTheme={avatarTheme} onSelectTheme={handleSelectTheme} />
        </Modal>
      )}
    </Background>
  );
}
