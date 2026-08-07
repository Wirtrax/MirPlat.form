import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { devLogin, getUser, login, postUser } from '../../api';

import type { CreateUser, UserState } from './userType';

export const loginUser = createAsyncThunk('user/loginUser', async () => {
  const data = await login();
  return data;
});

export const devLoginUser = createAsyncThunk('user/devLoginUser', async () => {
  const data = await devLogin();
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
      .addCase(devLoginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state) => {})
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(devLoginUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = 'success';
        state.user = null;
      })
      .addCase(devLoginUser.rejected, (state, action) => {
        // state.status = 'error';
        state.user = null;
        state.error = action.error.message ?? 'Dev auth failed';
      });
  },
});

export default userSlice.reducer;
