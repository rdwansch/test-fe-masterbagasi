import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '~/interfaces/Product';

let initialState: Array<CartItem> = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const productExist = state.findIndex(product => product.nama == action.payload.nama);

      if (productExist !== -1) {
        state[productExist].kuantitas += 1;
      } else {
        state.unshift({
          nama: action.payload.nama,
          foto: action.payload.foto,
          berat_barang: action.payload.berat_barang,
          harga_barang: action.payload.harga_barang,
          jumlah_barang: action.payload.jumlah_barang,
          total_berat: action.payload.total_berat,
          total_harga: action.payload.total_harga,
          kuantitas: 1,
          isSelected: false,
        });
      }

      localStorage.setItem('cart', JSON.stringify(state));
    },
    substractFromCart(state, action: PayloadAction<CartItem>) {
      const productId = state.findIndex(product => product.nama == action.payload.nama);

      if (state[productId].kuantitas > 1) {
        state[productId].kuantitas -= 1;
      } else {
        state.splice(productId, 1);
      }

      localStorage.setItem('cart', JSON.stringify(state));
    },
    selectItem(state, action: PayloadAction<number>) {
      state[action.payload].isSelected = !state[action.payload].isSelected;
    },
    selectAllItem(state, action: PayloadAction<boolean>) {
      for (let i = 0; i < state.length; i++) {
        state[i].isSelected = action.payload;
      }
    },
    removeItemFromCart(state, action: PayloadAction<number>) {
      state.splice(action.payload, 1);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeAllCart(state, action: PayloadAction<void>) {
      state = initialState;
      localStorage.setItem('cart', JSON.stringify(state));
      return state;
    },
  },
});

export const { addToCart, substractFromCart, removeItemFromCart, selectItem, selectAllItem, removeAllCart } =
  cartSlice.actions;

export default cartSlice.reducer;
