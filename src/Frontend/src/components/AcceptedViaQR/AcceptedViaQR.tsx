import { useEffect, useState } from 'react';
import Button from '../UI/Button/Button';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import s from './AcceptedViaQR.module.scss';

function AcceptedViaQR() {
  //   const { code } = useParams();
  const [code, setCode] = useState();
  const [order, setOrder] = useState();

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    if (tg?.initDataUnsafe?.start_param) {
      setCode(tg.initDataUnsafe.start_param); // проверить мб как то по другому можно получить данны из параметров
    }
  }, [code]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrder(code);
        setOrder(data);
      } catch (error) {
        console.log('заказ не найден');
      }
    };
    fetchOrder();
  }, []);

  const handleAccept = async () => {
    try {
      const response = await updateOrder(order.id, { status: 'accept' }); // появляется анимая выдачи заказа и вместо заказа будет написано, что заказ выдан
      if (response.sucsses) console.log('данные обновлены успешно');
    } catch (error) {
      console.log('ошибка обновления', error);
    }
  };

  const handlReject = async () => {
    try {
      const response = await updateOrder(order.id, { status: 'reject' });
      if (response.sucsses) console.log('данные обновлены успешно'); // появляется анимация отклонения заказа и сам заказ становится тусклым
    } catch (error) {
      console.log('ошибка обновления', error);
    }
  };

  return (
    <section className={clsx(s['order__wrapper'], 'container')}>
      <div></div>
      <div className={s['order__info']}>
        <img src={order.image} alt="" className={s['order__info-image']} />
        <h4 className={s['order__info-name']}>{order.name}</h4>
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
