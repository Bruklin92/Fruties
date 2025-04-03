import { combineReducers } from "redux";
import counterSlice from "./counter.slice";
import  productSlice  from "./product.slice";

export const rootReducer = combineReducers({
    count: counterSlice,
    product: productSlice,
})