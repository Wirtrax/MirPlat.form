import s from './PurchaseSuccessModal.module.scss';

import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../../../routes/routes';

import Button from '../../Button/Button';

import type { PurchaseSuccessContentProps } from '../modalProp';

function PurchaseSuccessContent({ qrValue }: PurchaseSuccessContentProps) {
  return (
    <div className={s['success']}>
      <h2 className={s['success__title']}>Покупка подтверждена!</h2>

      <p className={s['success__subtitle']}>QR-код для получения:</p>

      <div className={s['success__qr-block']}>
        <QRCode value={qrValue} size={168} className={s['success__qr']} />
      </div>

      <p className={s['success__hint']}>
        Покажи его промоутеру,
        <br />и подарок твой
      </p>

      <h3 className={s['success__question']}>Не хочешь отвлекаться?</h3>

      <p className={s['success__description']}>
        Проходи следующие активности и копи баллы. А когда надумаешь забрать подарок — открой профиль → раздел «Мои
        покупки». Код будет ждать там.
      </p>

      <Link to={ROUTES.PROFILE}>
        <Button>мои покупки</Button>
      </Link>
    </div>
  );
}

export default PurchaseSuccessContent;
