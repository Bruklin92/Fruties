import { combineReducers } from "redux";
import counterSlice from "./counter.slice";
import productSlice from "./product.slice";
import  categorySlice  from "./category.slice";

export const rootReducer = combineReducers({
  count: counterSlice,
  product: productSlice,
  category: categorySlice,
});
