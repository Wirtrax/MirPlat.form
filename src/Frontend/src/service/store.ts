import { combineReducers, configureStore } from '@reduxjs/toolkit';
const rootReducer = combineReducers({});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

type StoreType = ReturnType<typeof setupStore>;
export type RootState = ReturnType<StoreType['getState']>;
export type AppDispatch = StoreType['dispatch'];
