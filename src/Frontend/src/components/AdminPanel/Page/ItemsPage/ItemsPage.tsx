import { useEffect, useState } from 'react';
import AdminButton from '../../UI/AdminButton/AdminButton';
import Input from '../../UI/Input/SearchInput';
import Table from '../../UI/Table/Table';
import Title from '../../UI/Title/Title';
import StatusBadge from '../../UI/StatusBadge/StatusBadge';
import { getItems } from '../../../../service/api';
import type { TableColumn } from '../../UI/Table/tableProps';
import s from './ItemsPage.module.scss';
import pageStyle from '../Page.module.scss';
import type { Product } from '../../../../service/features/shop/shopType';

function ItemsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const data = await getItems();
        setItems(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const columns: TableColumn<Product>[] = [
    {
      key: 'name',
      title: 'Название',
      render: (_, item) => {
        return <span className={s['table__name']}>{item.name}</span>;
      },
    },
    {
      key: 'description',
      title: 'Описание',
    },
    {
      key: 'quantity',
      title: 'Количество на складе',
      render: (_, item) => {
        return <span className={s['table__quantity']}>{item.quantity > 0 ? item.quantity : 'нет в наличии'}</span>;
      },
    },
    {
      key: 'price',
      title: 'Цена',
      render: (_, item) => {
        return <span className={s['table__price']}>{item.price}</span>;
      },
    },
    {
      key: 'is_active',
      title: 'Статус активности',
      render: (_, item) => {
        return <StatusBadge variant={item.is_active ? 'active' : 'hidden'} />;
      },
    },
  ];

  return (
    <section>
      <div className={pageStyle['header']}>
        <Title title="Товары" subtitle="Каталог наград, доступных за баллы — нажмите на товар для редактирования" />
        <div className={pageStyle['search']}>
          <Input placeholder="поиск по названию" type="search" />
          <AdminButton withPlus>добавить товар</AdminButton>
        </div>
      </div>
      <Table title="Каталог" countElements={`${items.length} позиций`} columns={columns} data={items} />
    </section>
  );
}

export default ItemsPage;
