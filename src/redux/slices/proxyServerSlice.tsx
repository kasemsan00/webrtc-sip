import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  url: "",
  username: "",
  password: "",
};

const proxyServerSlice = createSlice({
  name: "proxyServer",
  initialState,
  reducers: {
    setProxyServer(state, action) {
      state.type = action.payload;
      return state;
    },
    setProxyUrl(state, action) {
      state.url = action.payload;
      return state;
    },
    setProxyUsername(state, action) {
      state.username = action.payload;
      return state;
    },
    setProxyPassword(state, action) {
      state.password = action.payload;
      return state;
    },
  },
});

export const { setProxyServer, setProxyUrl, setProxyUsername, setProxyPassword } = proxyServerSlice.actions;
export default proxyServerSlice.reducer;
