import Cookies from 'js-cookie';

export const auth = {
  getToken: () => Cookies.get('token'),

  setToken: (token: string) => {
    Cookies.set('token', token, {
      expires: 7,
      sameSite: 'lax',
    });
  },

  clearToken: () => Cookies.remove('token'),
};
