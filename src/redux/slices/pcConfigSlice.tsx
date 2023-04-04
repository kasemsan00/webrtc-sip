import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  iceTransportPolicy: "all",
  rtcpMuxPolicy: "require",
  bundlePolicy: "balanced",
  iceCandidatePoolSize: 0,
};

const pcConfigSlice = createSlice({
  name: "pcConfig",
  initialState,
  reducers: {
    setIceTransportPolicy(state, action) {
      state.iceTransportPolicy = action.payload;
      return state;
    },
    setRtcpMuxPolicy(state, action) {
      state.rtcpMuxPolicy = action.payload;
      return state;
    },
    setBundlePolicy(state, action) {
      state.bundlePolicy = action.payload;
      return state;
    },
    setIceCandidatePoolSize(state, action) {
      state.iceCandidatePoolSize = action.payload;
      return state;
    },
  },
});

export const { setIceTransportPolicy, setRtcpMuxPolicy, setBundlePolicy, setIceCandidatePoolSize } = pcConfigSlice.actions;
export default pcConfigSlice.reducer;
