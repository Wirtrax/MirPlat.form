import s from './ProductCard.module.scss';

import currency from '../../../assets/ico/interface/currency.svg';
import placeholderImage from '../../../assets/interface/church.ico';

import Substrate from '../Substrate/Substrate';

import type { productCardType } from './productCardType';

function ProductCard({ purchase, withPrice, hasBuy, received, onClick }: productCardType) {
  return (
    <Substrate className={s['product']}>
      <div className={s['product__state']} onClick={onClick}>
        {hasBuy && received && <span className={s['product__state-icon--check']}></span>}

        <img className={s['product__state-image']} src={purchase?.image || placeholderImage} alt="Нет покупок" />
        <p className={s['product__state-title']}>{purchase?.name}</p>

        {withPrice && (
          <span className={s['product__state-price']}>
            {purchase?.price}

            <img src={currency} alt="валюта" />
          </span>
        )}
      </div>
    </Substrate>
  );
}

export default ProductCard;
