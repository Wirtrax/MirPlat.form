import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../../api';
import type { productState } from './shopType';

export const fetchProduct = createAsyncThunk('product/fetchProduct', async () => {
  const data = await getProducts();
  return data;
});

const initialState: productState = {
  products: [],
  status: 'loading',
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'success';
        state.products = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null
        state.products = [];
      });
  },
});

export default productSlice.reducer;
