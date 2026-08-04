import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice'

const rootReducer = combineReducers({
  user: userReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

type StoreType = ReturnType<typeof setupStore>;
export type RootState = ReturnType<StoreType['getState']>;
export type AppDispatch = StoreType['dispatch'];
