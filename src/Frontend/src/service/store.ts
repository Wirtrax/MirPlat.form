import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import productReducer from './features/shop/shopSlice';

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

type StoreType = ReturnType<typeof setupStore>;
export type RootState = ReturnType<StoreType['getState']>;
export type AppDispatch = StoreType['dispatch'];
