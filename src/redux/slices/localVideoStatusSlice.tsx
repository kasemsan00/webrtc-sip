import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  video: true,
  audio: true,
};

const localVideoStatusSlice = createSlice({
  name: "localVideoStatus",
  initialState,
  reducers: {
    setToggleLocalVideo(state) {
      state.video = !state.video;
      return state;
    },
    setToggleLocalAudio(state) {
      state.audio = !state.audio;
      return state;
    },
  },
});

export const { setToggleLocalVideo, setToggleLocalAudio } = localVideoStatusSlice.actions;
export default localVideoStatusSlice.reducer;
