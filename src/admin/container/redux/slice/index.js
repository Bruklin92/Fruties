import { combineReducers } from "redux";
import counterSlice from "./counter.slice";

export const rootReducer = combineReducers({
    count: counterSlice
})