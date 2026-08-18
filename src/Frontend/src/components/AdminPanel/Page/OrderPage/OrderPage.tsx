import { useEffect, useState } from 'react';
import Input from '../../UI/Input/AdminInput';
import Table from '../../UI/Table/Table';
import Title from '../../UI/Title/Title';
import { getOrders } from '../../../../service/api';
import type { TableColumn } from '../../UI/Table/tableProps';
import s from './OrderPage.module.scss';
import pageStyle from '../Page.module.scss';
import type { OrdersState } from '../../../../types/ordersType';

function OrderPage() {
  const [order, setOrder] = useState<OrdersState[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const data = await getOrders();
        setOrder(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  const columns: TableColumn<OrdersState>[] = [
    {
      key: 'name',
      title: 'Название',
      render: (_, item) => {
        return <span className={s['table__name']}>{item.name}</span>;
      },
    },
    {
      key: 'full_name',
      title: 'Заказчик',
      render: (_, item) => {
        return <span className={s['table__price']}>{item.full_name}</span>;
      },
    },
    {
      key: 'count',
      title: 'Количество',
      render: (_, item) => {
        return <span className={s['table__price']}>{item.count}</span>;
      },
    },
  ];

  return (
    <section>
      <div className={pageStyle['header']}>
        <Title title="Товары" subtitle="Каталог наград, доступных за баллы — нажмите на товар для редактирования" />
        <div className={pageStyle['search']}>
          <Input placeholder="поиск по названию" type="search" />
        </div>
      </div>
      <Table title="Каталог" countElements={`${order.length} позиций`} columns={columns} data={order} />
    </section>
  );
}

export default OrderPage;
