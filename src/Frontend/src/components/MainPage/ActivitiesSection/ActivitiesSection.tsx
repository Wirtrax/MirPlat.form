import s from './ActivitiesSection.module.scss';

import QR_Icon from '../../../assets/ico/interface/qr.svg?react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ROUTES } from '../../../routes/routes';

import ActivitiesCard from './ActivitiesCard/ActivitiesCard';

export default function ActivitiesSection() {
  const [openCard, setOpenCard] = useState<string | null>(null);

  return (
    <section className={clsx('container', s.wrapper)} id='activities'>
      <div className={s.header}>
        <h2 className={s.title}>Активности</h2>
        <Link to={ROUTES.ACTIVITIES}>
          <QR_Icon />
        </Link>
      </div>
      <ActivitiesCard openCard={openCard} setOpenCard={setOpenCard} />
    </section>
  );
}
