import { createSlice } from "@reduxjs/toolkit";

interface IProfile {
  [index: string]: IProfileData;
}
interface IProfileData {
  id: number | undefined;
  extension: string;
  secret: string;
  domain: string;
  webSocket: string;
}
const initialState: Array<IProfile> = [];

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
