import { createSlice } from "@reduxjs/toolkit";

const initialState: any = null;

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession(state, action) {
      return action.payload;
    },
  },
});

export const { setSession } = sessionSlice.actions;
export default sessionSlice.reducer;
