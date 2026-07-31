import s from './Profile.module.scss';
import ProfileInfoCard from './ProfileInfoCard/ProfileInfoCard';
import { userMock } from '../../mock/profileCard';
import type { User } from './profileType';
import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
import Substrate from '../UI/Substrate/Substrate';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
// import Background from '../UI/Background/Background';

export default function Profile() {
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
    <section className={clsx(s['profile'], 'container')}>
      <div className={s['profile__navigation']}>
        <Link to={'/'}>
          <span className={s['profile__nav-link']}>на главную</span>
        </Link>
      </div>

      <div className={s['profile__header']}>
        <div className={s['profile__user-info']}>
          <img
            className={s['profile__avatar']}
            src=""
            alt="Аватар пользователя"
            style={{ backgroundColor: data.background }}
          />
          <button className={s['profile__edit-btn']}>
            <img src="" alt="Редактировать" />
          </button>
          <h3 className={s['profile__name']}>{data.userName}</h3>
          <p className={s['profile__id']}>
            ID: <span className={s['profile__id-value']}>{data.uniqId}</span>
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
          data.purchases.map((purchase, index) => (
            <Substrate className={s['profile__purchases']} key={index}>
              <div className={s['profile__state']}>
                <img className={s['profile__state-image']} src={purchase.image} alt="Нет покупок" />
                <p className={s['profile__state-info']}>{purchase.title}</p>
              </div>
            </Substrate>
          ))
        ) : (
          <p className={s['profile__empty-text']}>Пока тут ничего нет...</p>
        )}

        <div className={s['profile__purchases-action']}>
          <Link to={'/'}>
            <Button className={s['profile__shop-btn']}>В МАГАЗИН</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
