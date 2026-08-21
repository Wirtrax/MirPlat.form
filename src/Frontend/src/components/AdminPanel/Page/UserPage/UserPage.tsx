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
import SelectAdmin from '../../UI/Select/SelectAdmin';
import { specializationOptions } from '../../UI/Select/specializationOptions';
import { levelOptions } from '../../UI/Select/programmingLeveloptions';
import ChekboxAdmin from '../../UI/Chekbox/ChekboxAdmin';

function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    patronym: '',
    telegram_id: '',
    email: '',
    specialization: '',
    programming_level: '',
    phone_number: '',
    balance: 0,
    profile_picture: '',
    send_notifications: false,
    is_admin: false,
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
            specialization: foundUser.specialization || '',
            programming_level: foundUser.programming_level || '',
            email: foundUser.email || '',
            phone_number: foundUser.phone_number || '',
            balance: foundUser.balance || 0,
            profile_picture: foundUser.profile_picture || '',
            send_notifications: foundUser.send_notifications || false,
            is_admin: foundUser.is_admin || false,
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    const type = 'type' in e.target ? e.target.type : undefined;
    const checked = 'checked' in e.target ? e.target.checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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
        <form className={s['form']}>
          <AdminInput
            label="Имя"
            value={formData.first_name}
            onChange={handleChange}
            name="first_name"
            type="text"
            placeholder="Имя"
          />
          <AdminInput
            label="Фамилия"
            value={formData.last_name}
            onChange={handleChange}
            name="last_name"
            type="text"
            placeholder="Фамилия"
          />
          <AdminInput
            label="Отчество"
            value={formData.patronym}
            onChange={handleChange}
            name="patronym"
            type="text"
            placeholder="Отчество"
          />
          <AdminInput
            label="Telegram ID"
            value={formData.telegram_id}
            onChange={handleChange}
            name="telegram_id"
            type="text"
            placeholder="Telegram ID"
            disabled
          />
          <SelectAdmin
            label="Специализация"
            options={specializationOptions}
            name="specialization"
            onChange={handleChange}
            value={formData.specialization}
          />
          <SelectAdmin
            label="Уровень программирования"
            options={levelOptions}
            name="programming_level"
            onChange={handleChange}
            value={formData.programming_level}
          />
          <AdminInput
            label="Email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email"
          />
          <AdminInput
            label="Телефон"
            value={formData.phone_number}
            onChange={handleChange}
            name="phone_number"
            type="tel"
            placeholder="Телефон"
          />
          <AdminInput
            label="Баланс баллов"
            value={formData.balance}
            onChange={handleChange}
            name="balance"
            type="number"
            placeholder="Баланс баллов"
          />
          <AdminInput
            label="Фото профиля (URL)"
            value={formData.profile_picture}
            onChange={handleChange}
            name="profile_picture"
            type="text"
            placeholder="Фото профиля (URL)"
          />
          <div className={s['form__checkbox-panel']}>
            <ChekboxAdmin
              label="Уведомления"
              subtitle="Получать уведомления в Telegram"
              name="send_notifications"
              isCheck={formData.send_notifications}
              onChange={handleChange}
            />
            <span className={s['form__line']}></span>
            <ChekboxAdmin
              label="Права администратора"
              subtitle="Доступ к админ-панели"
              name="is_admin"
              isCheck={formData.is_admin}
              onChange={handleChange}
            />
          </div>
        </form>
        <AdminButton type="submit" disabled={isSubmitting} className={s['form__button']} onClick={handleSubmit}>
          {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
        </AdminButton>
      </SubstrateForFrom>
    </section>
  );
}

export default UserPage;
