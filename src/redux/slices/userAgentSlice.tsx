import { createSlice } from "@reduxjs/toolkit";
import JsSIP from "jssip";

const initialState: JsSIP.UA | null = null;

const userAgentSlice = createSlice({
  name: "userAgents",
  initialState,
  reducers: {
    setUserAgent(state, action) {
      return action.payload;
    },
    removeUserAgent() {
      return initialState;
    },
  },
});

export const { setUserAgent, removeUserAgent } = userAgentSlice.actions;
export default userAgentSlice.reducer;
