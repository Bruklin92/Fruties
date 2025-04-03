import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  product: [],
  error: null,
};

export const productUser = createAsyncThunk("product/productUser", async () => {
  const responce = await fetch("http://localhost:4000/product");
  const data = await responce.json();
  console.log(data);

  return data;
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(productUser.fulfilled, (state, action) => {
        state.product=action.payload
    });
  },
});

export default productSlice.reducer