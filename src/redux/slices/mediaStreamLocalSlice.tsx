import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const mediaStreamLocalSlice = createSlice({
  name: "mediaStreamLocal",
  initialState,
  reducers: {
    setLocalStream(state, action) {
      return action.payload;
    },
  },
});

export const { setLocalStream } = mediaStreamLocalSlice.actions;
export default mediaStreamLocalSlice.reducer;
