import { useEffect, useState } from 'react';
import clsx from 'clsx';
import s from './AcceptedViaQR.module.scss';
import { acceptOrderViaCode, cancelOrderViaCode, getItemByIdItem, getOrderByCode } from '../../service/api';
import type { OrderWithItemId } from '../../types/OrderResponseType';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { toast } from 'sonner';
import StatusBadge from '../UI/StatusBadge/StatusBadge';
import Substrate from '../UI/Substrate/Substrate';
import { getFirstLetters } from '../../utils/firstLetters';
import Loader from '../UI/Loader/Loader';

type OrderResult = 'accepted' | 'rejected' | null;

function AcceptedViaQR() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const { code } = useParams<{ code: string }>();

  const [order, setOrder] = useState<OrderWithItemId & { image: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<OrderResult>(null);

  useEffect(() => {
    if (user && !user.is_admin) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      setIsNotFound(false);

      try {
        if (!code) {
          setIsNotFound(true);
          return;
        }

        const orderData = await getOrderByCode(code);
        const itemData = await getItemByIdItem(orderData.itemId);
        setOrder({ ...orderData, image: itemData.image });
      } catch (error) {
        console.log('заказ не найден', error);
        setIsNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [code]);

  const handleAccept = async () => {
    const orderId = order?.orderId;
    if (!orderId || isSubmitting || !code) return;

    setIsSubmitting(true);

    try {
      const response = await acceptOrderViaCode(code);
      if (response.success) {
        setOrder((prev) => (prev ? { ...prev, status: 'received' } : prev));
        toast.success('Вы подтвердили заказ');
        setResult('accepted');
      }
    } catch (error) {
      toast.error('Подтвердить заказ не удалось');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    const orderId = order?.orderId;
    if (!orderId || isSubmitting || !code) return;

    setIsSubmitting(true);

    try {
      const response = await cancelOrderViaCode(code);
      if (response.success) {
        setOrder((prev) => (prev ? { ...prev, status: 'canceled' } : prev));
        toast.success('Вы отменили заказ');
        setResult('rejected');
      }
    } catch (error) {
      toast.error('Отменить заказ не удалось');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section className={clsx(s['order'])}>
        <Loader />
      </section>
    );
  }

  if (isNotFound || !order) {
    return (
      <section className={clsx(s['order'])}>
        <p className={clsx(s['order__state'])}>Заказ не найден. Проверьте QR-код и попробуйте ещё раз.</p>
        <button className={clsx(s['order__back'])} onClick={() => navigate('/')}>
          В приложение
        </button>
      </section>
    );
  }

  return (
    <section className={clsx(s['order'], 'container')}>
      <button className={clsx(s['order__back'])} onClick={() => navigate('/')}>
        В приложение
      </button>

      <div className={clsx(s['order__card'])}>
        <div className={clsx(s['order__header'])}>
          <span className={clsx(s['order__header-label'])}>Статус товара</span>
          <StatusBadge
            variant={order.status == 'waiting' ? 'pending' : order.status == 'received' ? 'received' : 'cancelled'}
          />
        </div>

        <div className={clsx(s['order__image'])}>
          <img src={order.image ?? ''} alt={order.itemName ?? 'Изображение товара'} />
        </div>

        <hr className={clsx(s['order__divider'])} />

        <div className={clsx(s['order__item'])}>
          <span className={clsx(s['order__item-label'])}>Название товара</span>
          <span className={clsx(s['order__item-value'])}>{order.itemName}</span>
        </div>
      </div>

      <Substrate>
        <div className={clsx(s['order__recipient'])}>
          <div className={clsx(s['order__recipient-avatar'])}>{getFirstLetters(order.userFullName, 2)}</div>
          <div className={clsx(s['order__recipient-info'])}>
            <span className={clsx(s['order__recipient-label'])}>Получатель</span>
            <span className={clsx(s['order__recipient-name'])}>{order.userFullName}</span>
          </div>
        </div>
      </Substrate>

      <p className={clsx(s['order__hint'])}>
        Сверьте товар с описанием заказа перед выдачей. Если товар не соответствует заказу или отсутствует — отклоните
        выдачу.
      </p>

      <div className={clsx(s['order__spacer'])} />

      {result === null ? (
        <div className={clsx(s['order__button'])}>
          <button
            className={clsx(s['order__action'], s['order__action--rejected'])}
            onClick={handleReject}
            disabled={isSubmitting}>
            Отклонить
          </button>
          <button
            className={clsx(s['order__action'], s['order__action--accepted'])}
            onClick={handleAccept}
            disabled={isSubmitting}>
            Подтвердить
          </button>
        </div>
      ) : (
        <p className={clsx(s['order__result'])}>
          {result === 'accepted' ? 'Заказ подтверждён и выдан получателю.' : 'Выдача заказа отклонена.'}
        </p>
      )}
    </section>
  );
}

export default AcceptedViaQR;
