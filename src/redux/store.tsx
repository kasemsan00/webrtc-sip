import { configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";
import userAgentSlice from "./slices/userAgentSlice";
import mediaStreamSlice from "./slices/mediaStreamSlice";
import profileDataSlice from "./slices/profileDataSlice";
import profileSelectSlice from "./slices/profileSelectSlice";
import registerStatusSlice from "./slices/registerStatusSlice";
import proxyServerSlice from "./slices/proxyServerSlice";
import pcConfigSlice from "./slices/pcConfigSlice";
import constraintsSlice from "@/redux/slices/constraintsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const middleware = [reduxThunk];

const store = configureStore({
  reducer: {
    constraints: constraintsSlice,
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
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
