import { createSlice } from "@reduxjs/toolkit";

interface IConfig {
  id: number | undefined;
  domain: string;
  webSocket: string;
  extension: string;
  secret: string;
}

const initialState: IConfig = {
  id: undefined,
  domain: "",
  webSocket: "",
  extension: "",
  secret: "",
};

const profileSelectSlice = createSlice({
  name: "profileSelect",
  initialState,
  reducers: {
    setSelectProfile(state, action) {
      return action.payload;
    },
  },
});

export const { setSelectProfile } = profileSelectSlice.actions;
export default profileSelectSlice.reducer;
