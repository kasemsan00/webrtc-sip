import { createSlice } from "@reduxjs/toolkit";

const initialState: Array<[]> = [];

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat(state, action) {
      return action.payload;
    },
  },
});

export const { addChat } = chatSlice.actions;
export default chatSlice.reducer;
