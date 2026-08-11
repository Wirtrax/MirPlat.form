import s from './Profile.module.scss';

import avatra from '../../assets/avatar/default.png';
import editPen from '../../assets/ico/profile/pen.svg';
import EmailIcon from '../../assets/profile/contacts/email.svg?react';
import PhoneIcon from '../../assets/profile/contacts/phone.svg?react';
import SpecializationIcon from '../../assets/profile/contacts/specialization.svg?react';
import LevelIcon from '../../assets/profile/contacts/level.svg?react';

import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { useAppSelector } from '../../hooks/redux';


import ProfileInfoCard from './ProfileInfoCard/ProfileInfoCard';
import Button from '../UI/Button/Button';
import ProductCard from '../UI/ProductCard/ProductCard';
import Background from '../UI/Background/Background';
import Loader from '../UI/Loader/Loader';

import type { ProfileInfoCardProps } from './profileType';

export default function Profile() {
  console.log('Рендер компонента Profile');

  const { user, status } = useAppSelector((state) => state.user);

  if (!user) {
    return <div>Данные не найдены</div>;
  }
  const purchases: any[] = (user as any).purchases || [];

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
          <Link to={'/'}>
            <span className={s['profile__nav-arrow']}> </span>
            <span className={s['profile__nav-link']}>на главную</span>
          </Link>
        </nav>
        {
          status === 'loading' || status === 'idle'
            ? <Loader className={s.height} />
            :
            <>
              <div className={s['profile__header']}>
                <div className={s['profile__user-info']}>
                  <div className={s['profile__user-avatar-wrapper']}>
                    <picture style={{ backgroundColor: user?.profile_picture }} className={s['profile__user-avatar']}>
                      <img src={avatra} alt="Аватар пользователя" width={80} height={146} />
                    </picture>
                    <button className={s['profile__edit-btn']}>
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

              <Button className={s['profile__activities-btn']}>АКТИВНОСТИ</Button>

              <div className={s['profile__cards']}>
                <ProfileInfoCard {...aboutCardData} />
                <ProfileInfoCard {...contactCardData} />
              </div>

              <div className={s['profile__purchases']}>
                <h3 className={s['profile__purchases-title']}>Мои покупки</h3>

                {purchases.length > 0 ? (
                  <div role="list" className={s['profile__purchases-list']}>
                    {purchases.map((purchase, index) => (
                      <ProductCard key={index} purchase={purchase} withPrice={true} hasBuy={true} />
                    ))}
                  </div>
                ) : (
                  <p className={s['profile__empty-text']}>Пока тут ничего нет...</p>
                )}

                <Link to={'/'}>
                  <Button className={s['profile__shop-btn']}>В МАГАЗИН</Button>
                </Link>
              </div>
            </>
        }

      </main>
    </Background>
  );
}
