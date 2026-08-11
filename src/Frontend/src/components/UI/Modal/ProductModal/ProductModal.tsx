import QRCode from 'react-qr-code';
import s from './ProductModal.module.scss';
import currency from '../../../../assets/ico/interface/currency.svg';
import Button from '../../Button/Button';
import type { ProductModalProps } from '../modalProp';

function ProductModal({ src, title, price, onClick, userBalance, code }: ProductModalProps) {
  const disabled = !userBalance || !price || userBalance < price;
  const isPurchased = Boolean(code);
  return (
    <div className={s['product']}>
      <img src={src} alt="product" className={s['product__image--modal']} />
      <h2 className={s['product__title--modal']}>{title}</h2>

      {isPurchased ? (
        <div className={s['product__qr-block--modal']}>
          <p className={s['product__qr-hint--modal']}>QR-код для получения: </p>
          {code ? (
            <QRCode value={code} size={180} className={s['product__qr--modal']} />
          ) : (
            <div>Нет данных для QR-кода</div>
          )}
        </div>
      ) : (
        <>
          <div className={s['product__price-block--modal']}>
            <span className={s['product__price-value--modal']}>{price}</span>
            <img src={currency} alt="currency" />
          </div>
          <p className={s['product__deficit--modal']}>{disabled && 'Недостаточно «Приветов»'}</p>
          <Button onClick={onClick} disabled={disabled}>
            купить
          </Button>
        </>
      )}
    </div>
  );
}

export default ProductModal;
