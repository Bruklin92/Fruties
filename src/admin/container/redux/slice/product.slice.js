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

export const addProduct = createAsyncThunk(
  "producr/addProduct",
  async (data) => {
    const responce = await fetch("http://localhost:4000/product", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const rdata = await responce.json();
    console.log(rdata);

    return rdata;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    const responce = await fetch("http://localhost:4000/product/" + id, {
      method: "DELETE",
    });
    const data = await responce.json();
    console.log(data);
    return data.id;
  }
);

export const updateProduct = createAsyncThunk(
  "producr/updateProduct",
  async (data) => {
    const responce = await fetch("http://localhost:4000/product/" + data.id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const rdata = await responce.json();
    console.log(rdata);

    return rdata;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(productUser.fulfilled, (state, action) => {
      state.product = action.payload;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.product.concat(action.payload);
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const i = state.product.findIndex((v) => v.id === action.payload);
      state.product.splice(i, 1);
      console.log(i);
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const i = state.product.findIndex(v => v.id === action.payload.id);
      state.product[i] = action.payload;
    });
  },
});

export default productSlice.reducer;
