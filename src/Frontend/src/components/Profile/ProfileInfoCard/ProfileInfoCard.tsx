import Substrate from '../../UI/Substrate/Substrate';
import s from './ProfileInfoCard.module.scss';
import type { ProfileInfoCardProps } from './ProfileInfoCard.types';

export default function ProfileInfoCard({ title, items }: ProfileInfoCardProps) {
  console.log('Рендер компонента ProfileInfoCard');
  return (
    <Substrate>
      <section className={s['profile-info-card']}>
        <h3 className={s['profile-info-card__title']}>{title}</h3>
        <dl className={s['profile-info-card__details']}>
          {items.map(({ id, icon, label, value }) => (
            <div className={s['profile-info-card__item']} key={id}>
              <div className={s['profile-info-card__icon-wrapper']} aria-hidden="true">
                {icon}
              </div>
              <div className={s['profile-info-card__item-content']}>
                <dt className={s['profile-info-card__label']}>{label}</dt>
                <dd className={s['profile-info-card__value']}>{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>
    </Substrate>
  );
}
