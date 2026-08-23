import s from './Shop.module.scss';
import currency from '../../assets/ico/interface/currency.svg';
import clsx from 'clsx';
import Background from '../UI/Background/Background';
import Substrate from '../UI/Substrate/Substrate';
import ProductCard from '../UI/ProductCard/ProductCard';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useState, useEffect } from 'react';
import { fetchProduct } from '../../service/features/shop/shopSlice';
import { fetchUser } from '../../service/features/user/userSlice';
import Loader from '../UI/Loader/Loader';

import Modal from '../UI/Modal/Modal';
import ProductModal from '../UI/Modal/ProductModal/ProductModal';
import PurchaseSuccessModal from '../UI/Modal/PurchaseSuccessModal/PurchaseSuccessModal';

import { createOrder } from '../../service/api';
import type { Product } from '../../service/features/shop/shopType';

function Shop() {
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector((state) => state.product);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const selectedProduct = products.find((p: Product) => p.id === selectedProductId) ?? null;

  const [isBuying, setIsBuying] = useState(false);
  const [successCode, setSuccessCode] = useState<string | null>(null);

  const handleOpenProduct = (productId: number) => {
    setSelectedProductId(productId);
    setSuccessCode(null);
  };

  const handleCloseModal = () => {
    setSelectedProductId(null);
    setSuccessCode(null);
    setIsBuying(false);
  };

  const handleBuy = async () => {
    if (!selectedProduct || isBuying) return;
    setIsBuying(true);

    try {
      const response = await createOrder(selectedProduct.id);
      const code = response?.code;
      setSuccessCode(code);
      dispatch(fetchUser());
    } catch (e: unknown) {
      console.log('ошибка генерации qr', e);
    } finally {
      setIsBuying(false);
    }
  };

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
              <ProductCard
                key={product.id}
                purchase={product}
                withPrice={true}
                onClick={() => handleOpenProduct(product.id)}
              />
            ))}
          </section>
        ) : (
          <p className={s['shop--mishap']}>Товаров пока нет...</p>
        )}
      </div>

      {selectedProduct && (
        <Modal onClose={handleCloseModal} className={clsx(successCode && s['shop__modal'])}>
          {successCode ? (
            <PurchaseSuccessModal qrValue={successCode} />
          ) : (
            <ProductModal
              src={selectedProduct.image}
              title={selectedProduct.name}
              price={selectedProduct.price}
              userBalance={user?.balance}
              onClick={handleBuy}
              isLoading={isBuying}
            />
          )}
        </Modal>
      )}
    </Background>
  );
}

export default Shop;
