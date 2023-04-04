import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userAgentSlice = createSlice({
  name: "alertData",
  initialState,
  reducers: {
    setUserAgent(state, action) {
      return initialState;
    },
    removeUserAgent() {
      return initialState;
    },
  },
});

export const { setUserAgent, removeUserAgent } = userAgentSlice.actions;
export default userAgentSlice.reducer;
