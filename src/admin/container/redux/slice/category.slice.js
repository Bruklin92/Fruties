import { Category } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  isLodding: false,
  category: [],
  error: null,
};

export const categoryUser = createAsyncThunk(
  "category/categoryUser",
  async () => {
    const responce = await fetch("http://localhost:4000/category");
    const data = await responce.json();
    return data;
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (data) => {
    const responce = await fetch("http://localhost:4000/category", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-Type": "application/json",
      },
    });
    const rData = await responce.json();
    console.log(rData);
    return rData;
  }
);

export const updatecategory = createAsyncThunk(
  "producr/updatecategory",
  async (data) => {
    const responce = await fetch("http://localhost:4000/category/" + data.id, {
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

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id) => {
    const responce = await fetch("http://localhost:4000/category/" + id, {
      method: "DELETE",
    });
    const data = await responce.json();
    return data.id;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(categoryUser.fulfilled, (state, action) => {
      state.category = action.payload;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.category.concat(action.payload);
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      const i = state.category.findIndex((v) => v.id === action.payload);
      state.category.splice(i, 1);
      console.log(i);
    });
    builder.addCase(updatecategory.fulfilled, (state, action) => {
      const i = state.category.findIndex((v) => v.id === action.payload.id);
      state.category[i] = action.payload;
    });
  },
});

export default categorySlice.reducer;
