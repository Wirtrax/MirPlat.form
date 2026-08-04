import s from './WelcomeSection.module.scss';

import clsx from 'clsx';

import avatarIcon from '../../../assets/avatar/avatarIcon.webp';

import BackgroundMain from './BackgroundMain';

export default function WelcomeSection() {
  return (
    <section className={s.section}>
      <div className={clsx(s.wrapper, 'container')}>
        <h1 className={s.title}>
          Привет! <br />
          Это веб-апп от Мир Plat.Form
        </h1>
        <h2 className={s.subTitle}>Как всё устроено?</h2>
        <p className={s.description}>
          Проходи активности, зарабатывай «Приветы» и обменивай их на мерч <br /> <br />В разделе{' '}
          <span>«Активности»</span> ты найдёшь встроенный сканер QR-кодов — воспользуйся им, чтобы участвовать в
          активностях и получить «Приветы»
        </p>
        <div className={s.avatarContainer}>
          <img src={avatarIcon} alt="avatar" />
        </div>
      </div>
      <BackgroundMain />
    </section>
  );
}
