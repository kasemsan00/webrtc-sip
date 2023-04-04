import { createSlice } from "@reduxjs/toolkit";

interface IProfile {
  [index: string]: IProfileData;
}
interface IProfileData {
  server: string;
  websocket: string;
  extension: string;
  password: string;
}
const initialState = {} as IProfile;

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
