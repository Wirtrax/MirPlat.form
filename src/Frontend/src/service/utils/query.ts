import { checkResponse } from './responseCheck';

const API_URL = 'https://bootcamp.game-back.ru/api';

export const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: 'include',
    ...options
  });
  return checkResponse(res);
};
