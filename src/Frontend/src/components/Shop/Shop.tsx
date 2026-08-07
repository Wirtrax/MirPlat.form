import s from './Shop.module.scss';
import currency from '../../assets/ico/interface/currency.svg';
import clsx from 'clsx';
import Background from '../UI/Background/Background';
import Substrate from '../UI/Substrate/Substrate';
import ProductCard from '../UI/ProductCard/ProductCard';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useEffect } from 'react';
import { fetchProduct } from '../../service/features/shop/shopSlice';
import Loader from '../UI/Loader/Loader';

function Shop() {
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector((state) => state.product);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <Background>
      <div className={clsx('container', s.shop)}>
        <h1 className="shop__title">Магазин</h1>

        <Substrate className={s['shop__total-reserve']}>
          <span>{user?.balance ?? -1}</span>
          <img src={currency} alt="currency" />
        </Substrate>

        {status === 'loading' ? (
          <Loader />
        ) : status === 'failed' ? (
          <p className={s['shop--mishap']}>{error || 'Что-то пошло не так...'}</p>
        ) : products.length > 0 ? (
          <section className={s['shop__list']}>
            {products.map((product) => (
              <ProductCard key={product.id} purchase={product} withPrice={true} />
            ))}
          </section>
        ) : (
          <p className={s['shop--mishap']}>Товаров пока нет...</p>
        )}
      </div>
    </Background>
  );
}

export default Shop;
