import s from './Profile.module.scss';
import avatarStyle from './AvatarModal/AvatarModal.module.scss'

import avatar from '../../assets/avatar/avatarIcon.webp';
import editPen from '../../assets/ico/profile/pen.svg';
import EmailIcon from '../../assets/profile/contacts/email.svg?react';
import PhoneIcon from '../../assets/profile/contacts/phone.svg?react';
import SpecializationIcon from '../../assets/profile/contacts/specialization.svg?react';
import LevelIcon from '../../assets/profile/contacts/level.svg?react';

import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
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
import ModalOverlay from '../UI/Modal/ModalOverlay/ModalOverlay';

export default function Profile() {
  console.log('Рендер компонента Profile');

  const { user, status } = useAppSelector((state) => state.user);
  const [selectedPurchase, setSelectedPurchase] = useState<createOrderResponse | null>(null);

  const [avatarTheme, setAvatarTheme] = useState<AvatarTheme>(() => {
    return (localStorage.getItem('user_avatar_theme') as AvatarTheme) || 'default';
  });

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const handleSelectTheme = (theme: AvatarTheme) => {
    setAvatarTheme(theme);
    localStorage.setItem('user_avatar_theme', theme);
    setIsAvatarModalOpen(false);
  };

  if (status === 'loading' || status === 'idle') {
    return <Loader />;
  }
  if (!user) {
    return <div>Данные не найдены</div>;
  }

  const purchases: createOrderResponse[] = user.purchases || [];

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
        value: user.specialization,
      },
      {
        id: 'level',
        icon: <LevelIcon />,
        label: 'Уровень',
        value: user.programming_level,
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
                className={clsx(s['profile__user-avatar'],
                  avatarTheme !== 'default' && s[`profile__user-avatar--${avatarTheme}`]
                )}
                onClick={() => setIsAvatarModalOpen(true)}
              >
                <img src={avatar} alt="Аватар пользователя" />
              </picture>
              <button
                className={s['profile__edit-btn']}
                onClick={() => setIsAvatarModalOpen(true)}
              >
                <img src={editPen} alt="Редактировать" />
              </button>
            </div>
            <h3 className={s['profile__user-name']}>{fullName}</h3>
            <p className={s['profile__user-id']}>
              ID: <span className={s['profile__user-id-value']}>{user?.id}</span>
            </p>
          </div>

          <div className={s['profile__balance']}>
            <p className={s['profile__balance-label']}>Баланс «Приветов»:</p>
            <p className={s['profile__balance-value']}>{user?.balance}</p>
          </div>
        </div>

        <Link to={ROUTES.ACTIVITIES} >
          <Button className={s['profile__activities-btn']}>АКТИВНОСТИ</Button>
        </Link>

        <div className={s['profile__cards']}>
          <ProfileInfoCard {...aboutCardData} />
          <ProfileInfoCard {...contactCardData} />
        </div>

        <div className={s['profile__purchases']}>
          <h3 className={s['profile__purchases-title']}>Мои покупки</h3>

          {purchases.length > 0 ? (
            <div role="list" className={s['profile__purchases-list']}>
              {purchases.map((purchase, index) => (
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
          />
        </Modal>
      )}

      {
        isAvatarModalOpen && (
          <Modal
            className={avatarStyle['modal']}
            onClose={() => setIsAvatarModalOpen(false)}>
            <AvatarModal
              currentTheme={avatarTheme}
              onSelectTheme={handleSelectTheme}
            />
          </Modal>
        )
      }
    </Background>
  );
}