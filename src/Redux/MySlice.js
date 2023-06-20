import { createSlice } from "@reduxjs/toolkit";

const mySlice = createSlice({
  name: "updateCart",
  initialState: {
    Item: 0, // Initialize Item with a default value
  },
  reducers: {
    increaseItem: (state) => {
      state.Item += 1; // Increment the Item value
    },
    decreaseItem: (state) => {
      state.Item -= 1; // Decrement the Item value
    },
  },
});

export const { increaseItem, decreaseItem } = mySlice.actions;
export default mySlice.reducer;
