import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const mediaStreamRemoteSlice = createSlice({
  name: "mediaStreamRemote",
  initialState,
  reducers: {
    setRemoteStream(state, action) {
      return action.payload;
    },
  },
});

export const { setRemoteStream } = mediaStreamRemoteSlice.actions;
export default mediaStreamRemoteSlice.reducer;
