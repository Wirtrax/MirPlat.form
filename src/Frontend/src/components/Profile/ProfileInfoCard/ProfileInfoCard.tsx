import Substrate from '../../Substrate/Substrate';
import s from './ProfileInfoCard.module.scss';
import type { ProfileInfoCardProps } from './ProfileInfoCard.types';

export default function ProfileInfoCard({ title, items }: ProfileInfoCardProps) {
  return (
    <Substrate>
      <div className={s['card']}>
        <h3 className={s['card-title']}>{title}</h3>
        <div className={s['cardDetails']}>
          {items.map((item) => (
            <div className={s.item} key={item.id}>
              <div className={s.iconWrapper}>{item.icon}</div>
              <div className={s.details}>
                <span className={s.label}>{item.label}</span>
                <span className={s.value}>{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Substrate>
  );
}
