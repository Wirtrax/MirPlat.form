import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser, login, postUser } from '../../api';
import { auth } from '../../auth';
import type { CreateUser, UserState } from './userType';

export const loginUser = createAsyncThunk('user/loginUser', async () => {
  const data = await login();

  auth.setToken(data.token);

  return data.token;
});

export const createUser = createAsyncThunk('user/createUser', async (user: CreateUser) => {
  const data = await postUser(user);
  return data;
});
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const data = await getUser();
  return data;
});

const initialState: UserState = {
  user: null,
  token: auth.getToken() || null,
  isRegistered: false,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.token = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.isRegistered = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
