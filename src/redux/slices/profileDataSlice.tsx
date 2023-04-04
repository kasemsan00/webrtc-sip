import { createSlice } from "@reduxjs/toolkit";

const profileData = {
  server: "",
  websocket: "",
  extension: "",
  password: "",
};
const initialState: Array<typeof profileData> = [];

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action) {
      return action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
