import { useParams } from 'react-router-dom';
import AdminButton from '../../UI/AdminButton/AdminButton';
import AdminInput from '../../UI/Input/AdminInput';
import SubstrateForFrom from '../../UI/SubstrateAdmin/SubstrateForFrom/SubstrateForFrom';
import SubstrateForUser from '../../UI/SubstrateAdmin/SubstrateForUser/SubstrateForUser';
import { useEffect, useState } from 'react';
import type { User } from '../../../../service/features/user/userType';
import { deleteUser, getUsers, updateUser } from '../../../../service/api';
import { getFirstLetters } from '../../helper/utils';
import s from './UserPage.module.scss';

function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    patronym: '',
    telegram_id: '',
    email: '',
    phone_number: '',
    balance: 0,
    profile_picture: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  //область хи-хи ха-ха о которой я узнал 18 числа в 21:00
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUsers();
        const foundUser = data.find((user) => user.id === Number(id));
        if (foundUser) {
          setUser(foundUser);
          setFormData({
            first_name: foundUser.first_name || '',
            last_name: foundUser.last_name || '',
            patronym: foundUser.patronym || '',
            telegram_id: foundUser.telegram_id || '',
            email: foundUser.email || '',
            phone_number: foundUser.phone_number || '',
            balance: foundUser.balance || 0,
            profile_picture: foundUser.profile_picture || '',
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log('пользователь не найден');
        setUser(null);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Пользователь не найден</div>;
  }

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await deleteUser(id);
      console.log('пользователь удален успешно', response);
    } catch (error) {
      console.log('ошибка удаления', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedUserData: User = {
        ...user,
        ...formData,
        balance: Number(formData.balance),
      };

      const response = await updateUser(user.id, updatedUserData);
      console.log('данные обновлены успешно', response);
      setUser(updatedUserData);
    } catch (error) {
      console.log('ошибка обновления', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <SubstrateForUser className={s['substrate']}>
        <dl className={s['substrate__info-wrapper']}>
          <dt className={s['substrate__avatar']}>{getFirstLetters(`${user.first_name} ${user.last_name}`)}</dt>
          <dd className={s['substrate__info-container']}>
            <dl className={s['substrate__user-details']}>
              <dt className={s['substrate__full-name']}>
                {user.first_name} {user.last_name} {user.patronym}
              </dt>
              <dd className={s['substrate__details']}>
                {user.specialization} {user.programming_level} {user.id}
              </dd>
            </dl>
          </dd>
        </dl>
        <AdminButton className={s['substrate__delete-btn']} onClick={() => handleDeleteUser(user.id)}>
          удалить
        </AdminButton>
      </SubstrateForUser>
      <SubstrateForFrom title="Данные пользователя">
        <form onSubmit={handleSubmit} className={s['form']}>
          <AdminInput
            label="Имя"
            value={formData.first_name}
            onChange={handleInputChange}
            name="first_name"
            type="text"
            placeholder="Имя"
          />
          <AdminInput
            label="Фамилия"
            value={formData.last_name}
            onChange={handleInputChange}
            name="last_name"
            type="text"
            placeholder="Фамилия"
          />
          <AdminInput
            label="Отчество"
            value={formData.patronym}
            onChange={handleInputChange}
            name="patronym"
            type="text"
            placeholder="Отчество"
          />
          <AdminInput
            label="Telegram ID"
            value={formData.telegram_id}
            onChange={handleInputChange}
            name="telegram_id"
            type="text"
            placeholder="Telegram ID"
            disabled
          />
          <AdminInput
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            type="email"
            placeholder="Email"
          />
          <AdminInput
            label="Телефон"
            value={formData.phone_number}
            onChange={handleInputChange}
            name="phone_number"
            type="tel"
            placeholder="Телефон"
          />
          <AdminInput
            label="Баланс баллов"
            value={formData.balance}
            onChange={handleInputChange}
            name="balance"
            type="number"
            placeholder="Баланс баллов"
          />
          <AdminInput
            label="Фото профиля (URL)"
            value={formData.profile_picture}
            onChange={handleInputChange}
            name="profile_picture"
            type="text"
            placeholder="Фото профиля (URL)"
          />
          <AdminButton type="submit" disabled={isSubmitting} className={s['form__button']}>
            {isSubmitting ? 'Обновление...' : 'Обновить данные'}
          </AdminButton>
        </form>
      </SubstrateForFrom>
    </section>
  );
}

export default UserPage;
