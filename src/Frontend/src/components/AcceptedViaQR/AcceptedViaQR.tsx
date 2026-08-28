import { useEffect, useState } from 'react';
import Button from '../UI/Button/Button';
import clsx from 'clsx';
import s from './AcceptedViaQR.module.scss';
import { getOrderByCode, updateOrder } from '../../service/api';
import type { OrderWithItemId } from '../../types/OrderResponseType';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { toast } from 'sonner';

function AcceptedViaQR() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const { code } = useParams<{ code: string }>();

  const [order, setOrder] = useState<OrderWithItemId>();

  useEffect(() => {
    if (user && !user.is_admin) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (code) {
          const data = await getOrderByCode(code);
          setOrder(data);
        }
      } catch (error) {
        console.log('заказ не найден');
      }
    };
    fetchOrder();
  }, [code]);

  const handleAccept = async () => {
    const orderId = order?.orderId;
    if (!orderId) return;

    try {
      const response = await updateOrder(orderId, { status: 'received' });
      if (response.success) {
        toast.success('Вы подтвердили заказ');
        console.log('ура ура ура');
      }
    } catch (error) {
      toast.error('Подтвердить заказ не удалось');
      console.log('ошибка обновления', error);
    }
  };

  const handlReject = async () => {
    const orderId = order?.orderId;
    if (!orderId) return;

    try {
      const response = await updateOrder(orderId, { status: 'canceled' });
      if (response.success) {
        toast.success('Вы отменили заказ');
        console.log('ура ура ура');
      }
    } catch (error) {
      toast.error('Отменить заказ не удалось');
      console.log('ошибка обновления', error);
    }
  };

  return (
    <section className={clsx(s['order__wrapper'])}>
      <div></div>
      <div className={s['order__info']}>
        <img src={order?.image} alt="" className={s['order__info-image']} />
        <h4 className={s['order__info-name']}> {order?.itemName}</h4>
        <p className={s['order__info-user']}>
          получатель:
          <span> {order?.userFullName}</span>
        </p>
      </div>
      <div className={s['order__button']}>
        <Button className={s['order__button--accepted']} onClick={handleAccept}>
          Подтвердить
        </Button>
        <Button className={s['order__button--rejected']} onClick={handlReject}>
          Отклонить
        </Button>
      </div>
    </section>
  );
}

export default AcceptedViaQR;
