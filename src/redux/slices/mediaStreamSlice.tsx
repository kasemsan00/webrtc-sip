import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const mediaStreamSlice = createSlice({
  name: "mediaStreamLocal",
  initialState,
  reducers: {
    setLocalStream(state, action) {
      return action.payload;
    },
  },
});

export const { setLocalStream } = mediaStreamSlice.actions;
export default mediaStreamSlice.reducer;
