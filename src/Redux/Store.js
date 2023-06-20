import { configureStore } from "@reduxjs/toolkit";
import mySlice from "./MySlice";

export const Store = configureStore({
    reducer :{
        mySlice,
    }
})