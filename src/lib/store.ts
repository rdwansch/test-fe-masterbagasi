import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cart/cartSlice';
import warehouseSlice from './features/warehouse/warehouseSlice';
import useLocalStorage from '~/components/Localstorage';

export const MakeStore = () => {
  const preloadCartState = JSON.parse(useLocalStorage() || '[]');
  return configureStore({
    reducer: {
      cart: cartSlice,
      warehouse: warehouseSlice,
    },
    preloadedState: {
      cart: preloadCartState,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof MakeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
