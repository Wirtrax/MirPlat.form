import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUser, login, postUser } from '../../api';

import type { CreateUser, UserState } from './userType';

export const loginUser = createAsyncThunk('user/loginUser', async () => {
  const data = await login();
  return data;
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
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(loginUser.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(createUser.fulfilled, (state) => {
        state.status = 'success';
        state.isRegistered = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
        state.isRegistered = true;
      });
  },
});

export default userSlice.reducer;
