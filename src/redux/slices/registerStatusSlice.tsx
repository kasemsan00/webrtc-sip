import { createSlice } from "@reduxjs/toolkit";

const registerStatusSlice = createSlice({
  name: "registerStatus",
  initialState: "",
  reducers: {
    setRegisterStatus(state, action) {
      return action.payload;
    },
  },
});

export const { setRegisterStatus } = registerStatusSlice.actions;
export default registerStatusSlice.reducer;
