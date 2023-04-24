import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const constraintsSlice = createSlice({
  name: "constraints",
  initialState,
  reducers: {
    setConstraints(state, action) {
      return action.payload;
    },
  },
});

export const { setConstraints } = constraintsSlice.actions;
export default constraintsSlice.reducer;
