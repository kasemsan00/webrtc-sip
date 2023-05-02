import { configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";
import mediaStreamLocalSlice from "./slices/mediaStreamLocalSlice";
import mediaStreamRemoteSlice from "./slices/mediaStreamRemoteSlice";
import profileDataSlice from "./slices/profileDataSlice";
import profileSelectSlice from "./slices/profileSelectSlice";
import userAgentSlice from "./slices/userAgentSlice";
import userAgentStatusSlice from "./slices/userAgentStatusSlice";
import proxyServerSlice from "./slices/proxyServerSlice";
import pcConfigSlice from "./slices/pcConfigSlice";
import constraintsSlice from "@/redux/slices/constraintsSlice";
import sessionSlice from "./slices/sessionSlice";
import chatSlice from "./slices/chatSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const middleware = [reduxThunk];

const store = configureStore({
  reducer: {
    chat: chatSlice,
    constraints: constraintsSlice,
    proxyServer: proxyServerSlice,
    pcConfig: pcConfigSlice,
    profileSelect: profileSelectSlice,
    profileData: profileDataSlice,
    mediaStreamLocal: mediaStreamLocalSlice,
    mediaStreamRemote: mediaStreamRemoteSlice,
    userAgent: userAgentSlice,
    userAgentStatus: userAgentStatusSlice,
    session: sessionSlice,
  },
  middleware,
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
