import { createSlice } from "@reduxjs/toolkit";

interface IConfig {
  id: number | undefined;
  domain: string;
  websocket: string;
  extension: string;
  secret: string;
}

const initialState: IConfig = {
  id: undefined,
  domain: "",
  websocket: "",
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
