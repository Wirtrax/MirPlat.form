import React, { useState } from 'react';
import s from './AdminLoginForm.module.scss';
import Input from '../../UI/Input/SearchInput';
import AdminButton from '../../UI/AdminButton/AdminButton';
import { adminLogin } from '../../../../service/api';
import type { AdminLoginFormProps } from './adminLoginFormProps';
import { setSuperAdmin, unsetSuperAdmin } from '../../../../service/features/superAdmin/superAdminSlice';
import { useAppDispatch } from '../../../../hooks/redux';
import { useNavigate } from 'react-router-dom';

const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ className = '', onSuccess }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!login.trim() || !password.trim()) {
      setError('Заполните логин и пароль');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await adminLogin(login, password);
      dispatch(setSuperAdmin(true));
      navigate('/admin/users');
    } catch (err) {
      setError('Неверный логин или пароль');
      dispatch(unsetSuperAdmin());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${s['admin-login']} ${className}`}>
      <div className={s['admin-login__card']}>
        <div className={s['admin-login__illustration']}>
          <div className={s['admin-login__illustration-circle']}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={s['admin-login__illustration-icon']}
              aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>

          <span className={`${s['admin-login__shape']} ${s['admin-login__shape--circle']}`} />
          <span className={`${s['admin-login__shape']} ${s['admin-login__shape--triangle']}`} />
          <span className={`${s['admin-login__shape']} ${s['admin-login__shape--square']}`} />
        </div>

        <form className={s['admin-login__form']} onSubmit={handleSubmit}>
          <h1 className={s['admin-login__title']}>Вход в панель</h1>
          <p className={s['admin-login__subtitle']}>Доступ только для администраторов</p>

          <div className={s['admin-login__fields']}>
            <Input
              label="Логин"
              placeholder="Введите логин"
              type="text"
              autoComplete="username"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              disabled={isLoading}
            />

            <Input
              label="Пароль"
              placeholder="Введите пароль"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {error && <p className={s['admin-login__error']}>{error}</p>}

          <AdminButton type="submit" disabled={isLoading} className={s['admin-login__submit']}>
            {isLoading ? 'Вход...' : 'Войти'}
          </AdminButton>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginForm;
