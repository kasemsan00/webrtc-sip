import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

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
