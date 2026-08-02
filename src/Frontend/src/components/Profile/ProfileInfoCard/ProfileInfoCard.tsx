import Substrate from '../../UI/Substrate/Substrate';
import s from './ProfileInfoCard.module.scss';
import type { ProfileInfoCardProps } from './ProfileInfoCard.types';

export default function ProfileInfoCard({ title, items }: ProfileInfoCardProps) {
  return (
    <Substrate>
      <section className={s['card']}>
        <h3 className={s['card-title']}>{title}</h3>
        <dl className={s['cardDetails']}>
          {items.map((item) => (
            <div className={s.item} key={item.id}>
              <div className={s.iconWrapper}>{item.icon}</div>
              <div className={s.details}>
                <dt className={s.label}>{item.label}</dt>
                <dd className={s.value}>{item.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>
    </Substrate>
  );
}
