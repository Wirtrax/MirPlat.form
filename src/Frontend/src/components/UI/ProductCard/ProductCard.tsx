import s from './ProductCard.module.scss';

import currency from '../../../assets/ico/interface/currency.svg';

import Substrate from '../Substrate/Substrate';

import type { productCardType } from './productCardType';

function ProductCard({ purchase, withPrice, hasBuy }: productCardType) {
  return (
    <Substrate className={s['product']}>
      <div className={s['product__state']}>
        {hasBuy && <span className={s['product__state-icon--check']}></span>}

        <img className={s['product__state-image']} src={purchase.image} alt="Нет покупок" />
        <p className={s['product__state-title']}>{purchase.name}</p>

        {withPrice && (
          <span className={s['product__state-price']}>
            {purchase.price}

            <img src={currency} alt="валюта" />
          </span>
        )}
      </div>
    </Substrate>
  );
}

export default ProductCard;
