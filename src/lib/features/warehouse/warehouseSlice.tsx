import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Warehouse } from '~/interfaces/Product';

const initialState: Array<Warehouse> = [];

const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {
    addToWarehouse(state, action: PayloadAction<Warehouse>) {
      state.push(action.payload);
    },
    removeItemFromWarehouse(state, action: PayloadAction<number>) {
      state.splice(action.payload, 1);
    },
  },
});

export const { addToWarehouse, removeItemFromWarehouse } = warehouseSlice.actions;

export default warehouseSlice.reducer;
