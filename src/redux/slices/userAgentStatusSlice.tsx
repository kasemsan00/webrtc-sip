import { createSlice } from "@reduxjs/toolkit";

const userAgentStatusSlice = createSlice({
  name: "userAgentStatus",
  initialState: "",
  reducers: {
    setUserAgentStatus(state, action) {
      return action.payload;
    },
  },
});

export const { setUserAgentStatus } = userAgentStatusSlice.actions;
export default userAgentStatusSlice.reducer;
