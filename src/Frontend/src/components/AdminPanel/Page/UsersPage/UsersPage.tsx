import { useEffect, useState } from 'react';
import AdminButton from '../../UI/AdminButton/AdminButton';
import Input from '../../UI/Input/SearchInput';
import Table from '../../UI/Table/Table';
import Title from '../../UI/Title/Title';
import type { User } from '../../../../service/features/user/userType';
import { getUsers } from '../../../../service/api';
import type { TableColumn } from '../../UI/Table/tableProps';
import s from './UsersPage.module.scss';
import pageStyle from '../Page.module.scss';
import clsx from 'clsx';
import { generateBlueGray, getFirstLetters } from '../../helper/utils';

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns: TableColumn<User>[] = [
    {
      key: 'first_name',
      title: 'ФИО',
      render: (_, item) => {
        return (
          <span className={s['table__initials']}>
            <span style={{ backgroundColor: generateBlueGray() }} className={s['table__initials-letter']}>
              {getFirstLetters(`${item.last_name} ${item.first_name}`)}
            </span>
            <span>
              <span className={s['table__initials-name']}>
                {item.last_name} {item.first_name}
              </span>
              <span className={s['table__initials-patronym']}> {item.patronym}</span>
            </span>
          </span>
        );
      },
    },
    {
      key: 'specialization',
      title: 'Специализация',
    },
    {
      key: 'programming_level',
      title: 'Уровень',
      render: (_, item) => {
        return <span className={s['table__programming-level']}>{item.programming_level}</span>;
      },
    },
    {
      key: 'email',
      title: 'Контакты',
      render: (_, item) => {
        return (
          <span>
            <span className={s['table__contacts-email']}>{item.email}</span>
            <span className={s['table__contacts-phone']}> {item.phone_number}</span>
          </span>
        );
      },
    },
    {
      key: 'balance',
      title: 'Баланс',
      render: (_, item) => {
        return <span className={s['table__balance']}>{item.balance}</span>;
      },
    },
    {
      key: 'is_admin',
      title: 'Роль',
      render: (_, item) => {
        return (
          <span className={clsx(s['table__role'], item.is_admin && s['table__role--admin'])}>
            {item.is_admin ? 'Admin' : 'User'}
          </span>
        );
      },
    },
  ];

  return (
    <section>
      <div className={pageStyle['header']}>
        <Title title="Пользователи" subtitle="Нажмите на участника, чтобы открыть его страницу и изменить данные" />
        <div className={pageStyle['search']}>
          <Input placeholder="поиск по имени, email, телефон..." type="search" />
          <AdminButton withPlus>добавить</AdminButton>
        </div>
      </div>
      <Table title="Список пользователей" countElements={`${users.length} записей`} columns={columns} data={users} />
    </section>
  );
}

export default UsersPage;
