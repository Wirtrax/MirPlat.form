import { type QuizResultResponse, type PhotoCheckResponse, type TetrisLinkResponse, type TetrisSubmitResponse, type QuizSubmitRequest } from './features/activity/activitySliceType';
import type { createOrderResponse, Product } from './features/shop/shopType';
import type { CreateUser, User } from './features/user/userType';

import { getAuthToken, setAuthToken, request } from './utils/query';
interface AuthResponse {
  token: string;
}

// export const login = async () => {
//   const data = await request<{ token: string }>('/auth/signin', {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${getInitData()}`,
//       'Content-Type': 'application/json',
//     },
//   });

//   document.cookie = `token=${data.token}; path=/`
// }

const getInitData = (): string => {
  return window.Telegram?.WebApp?.initData || 'devtest1';
};

export const login = async () => {
  const data = await request<AuthResponse>('/auth/signin', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getInitData()}`,
      'Content-Type': 'application/json',
    },
  });
  setAuthToken(data.token);
  return data
};

export const logout = () => {
  setAuthToken(null);
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

export const devLogin = async (): Promise<User> => {
  await login();
  return getUser();
};

export const getProducts = () => {
  return request<Product[]>('/item', {
    method: 'GET',
  });
};

export const createOrder = (id: number): Promise<createOrderResponse> => {
  return request(`/item/${id}/purchase`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
};

export const getTetrisLink = () => {
  return request<TetrisLinkResponse>('/activities/tetris', {
    method: 'GET',
  });
};

export const sendTetrisPhoto = (photo_link: string) => {
  return request<TetrisSubmitResponse>('/activities/tetris', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ photo_link }),
  });
};

export const sendPhotoCheck = (flag: boolean) => {
  return request<PhotoCheckResponse>('/activities/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ flag }),
  });
};

export const completeQuiz = (flag: boolean) => {
  const data: QuizSubmitRequest = { flag };

  return request('/activities/quiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const getQuizResult = () => {
  return request<QuizResultResponse>('/activities/quiz/status', {
    method: 'GET',
  });
}