import s from './Shop.module.scss';

import currency from '../../assets/ico/interface/currency.svg';

import clsx from 'clsx';
import { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createOrder } from '../../service/api';
import { fetchProduct } from '../../service/features/shop/shopSlice';
import { fetchUser } from '../../service/features/user/userSlice';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { showToast } from '../../utils/showToast';

import Background from '../UI/Background/Background';
import Modal from '../UI/Modal/Modal';
import ProductModal from '../UI/Modal/ProductModal/ProductModal';
import PurchaseSuccessModal from '../UI/Modal/PurchaseSuccessModal/PurchaseSuccessModal';
import Substrate from '../UI/Substrate/Substrate';
import ShopContent from './ShopContent';

import type { Product } from '../../service/features/shop/shopType';

function Shop() {
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector((state) => state.product);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  useEffect(() => {
    if (error) showToast(getErrorMessage(error));
  }, [error]);

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
      const code = `${import.meta.env.VITE_TELEGRAM_FULL_URL_ON_BOT}?startapp=handOverOrder_${response.code}`;
      setSuccessCode(code);
      dispatch(fetchUser());
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : null;
      showToast(getErrorMessage(message));
    } finally {
      dispatch(fetchProduct())
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

        <ShopContent status={status} error={error} products={products} handleOpenProduct={handleOpenProduct} />
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
