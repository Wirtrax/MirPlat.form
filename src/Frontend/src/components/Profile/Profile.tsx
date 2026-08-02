import s from './Profile.module.scss';
import ProfileInfoCard from './ProfileInfoCard/ProfileInfoCard';
import { userMock } from '../../mock/profileCard';
import type { User } from './profileType';
import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
// import Background from '../UI/Background/Background';

import avatra from '../../assets/avatar/default.png';
import editPen from '../../assets/ico/profile/pen.svg';
import ProductCard from '../UI/ProductCard/ProductCard';
import Background from '../UI/Background/Background';

export default function Profile() {
  console.log('Рендер компонента Profile');

  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(userMock);
      setLoading(false);
    }, 100);
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }
  if (!data) {
    return <div>Данные не найдены</div>;
  }
  return (
    <Background variant='minimal'>
      <main className={clsx(s['profile'], 'container')}>
        <nav className={s['profile__nav']}>
          <Link to={'/'}>
            <span className={s['profile__nav-arrow']}> </span>
            <span className={s['profile__nav-link']}>на главную</span>
          </Link>
        </nav>

        <div className={s['profile__header']}>
          <div className={s['profile__user-info']}>
            <div className={s['profile__user-avatar-wrapper']}>
              <picture style={{ backgroundColor: data.background }} className={s['profile__user-avatar']}>
                <img src={avatra} alt="Аватар пользователя" width={80} height={146} />
              </picture>
              <button className={s['profile__edit-btn']}>
                <img src={editPen} alt="Редактировать" />
              </button>
            </div>
            <h3 className={s['profile__user-name']}>{data.userName}</h3>
            <p className={s['profile__user-id']}>
              ID: <span className={s['profile__user-id-value']}>{data.uniqId}</span>
            </p>
          </div>

          <div className={s['profile__balance']}>
            <p className={s['profile__balance-label']}>Баланс «Приветов»:</p>
            <p className={s['profile__balance-value']}>{data.balance}</p>
          </div>
        </div>

        <Button className={s['profile__activities-btn']}>АКТИВНОСТИ</Button>

        <div className={s['profile__cards']}>
          <ProfileInfoCard {...data.aboutCard} />
          <ProfileInfoCard {...data.contactCard} />
        </div>

        <div className={s['profile__purchases']}>
          <h3 className={s['profile__purchases-title']}>Мои покупки</h3>

          {data.purchases.length > 0 ? (
            <div role="list" className={s['profile__purchases-list']}>
              {data.purchases.map((purchase, index) => (
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
      </main>
    </Background>
  );
}