import s from './ActivitiesSection.module.scss';

import QR_Icon from '../../../assets/ico/interface/qr.svg?react';

import clsx from 'clsx';
import { lazy, Suspense, useState } from 'react';

import ActivitiesCard from './ActivitiesCard/ActivitiesCard';
import Modal from '../../UI/Modal/Modal';

const QrScanner = lazy(() => import('../../QrScanner/QrScanner'))

export default function ActivitiesSection() {
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [openScanner, setOpenScanner] = useState(false)

  return (
    <section className={clsx('container', s.wrapper)} id='activities'>
      <div className={s.header}>
        <h2 className={s.title}>Активности</h2>

        <button
          type='button'
          onClick={() => setOpenScanner(true)}
        >
          <QR_Icon />
        </button>
      </div>
      <ActivitiesCard openCard={openCard} setOpenCard={setOpenCard} />

      {
        openScanner &&
        <Modal
        className={s.modal}
          onClose={() => setOpenScanner(false)}
        >
          <Suspense fallback={<div>Загрузка сканера...</div>}>
            <QrScanner onClose={() => setOpenScanner(false)} />
          </Suspense>
        </Modal>
      }

    </section>
  );
}
