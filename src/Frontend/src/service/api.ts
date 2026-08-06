import type { CreateUser, User } from './features/user/userType';

import { request } from './utils/query';

const getInitData = (): string => {
  return window.Telegram?.WebApp?.initData || 'devtest2'
}

export const login = () => {
  return request('/auth/signin', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getInitData()}`,
      'Content-Type': 'application/json',
    },
  });
};

export const logout = () => {
  return request('/auth/logout', {
    method: 'POST',
  });
};

export const postUser = (data: CreateUser) => {
  return request<User>('/user', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getInitData()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const getUser = () => {
  return request<User>('/user', {
    method: 'GET',
  });
};
