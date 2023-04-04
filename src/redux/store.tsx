import { configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";
import userAgentSlice from "./slices/userAgentSlice";
import mediaStreamSlice from "./slices/mediaStreamSlice";
import profileDataSlice from "./slices/profileDataSlice";
import profileSelectSlice from "./slices/profileSelectSlice";
import registerStatusSlice from "./slices/registerStatusSlice";
import proxyServerSlice from "./slices/proxyServerSlice";
import pcConfigSlice from "./slices/pcConfigSlice";

const middleware = [reduxThunk];

const store = configureStore({
  reducer: {
    proxyServer: proxyServerSlice,
    pcConfig: pcConfigSlice,
    registerStatus: registerStatusSlice,
    profileSelect: profileSelectSlice,
    profileData: profileDataSlice,
    mediaStream: mediaStreamSlice,
    userAgent: userAgentSlice,
  },
  middleware,
});

export default store;
