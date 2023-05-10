import { create } from "zustand";
import userAgentDataSlice from "./slices/userAgentDataSlice";
import profileSelectSlice from "@/store/slices/profileSelectSlice";
import profileDataSlice from "./slices/profileDataSlice";
import mediaStreamLocalSlice from "@/store/slices/mediaStreamLocalSlice";
import mediaStreamRemoteSlice from "@/store/slices/mediaStreamRemoteSlice";
import userAgentStatusSlice from "@/store/slices/userAgentStatusSlice";
import sessionSlice from "@/store/slices/sessionSlice";

export const useStore = create<any>()((...arg) => ({
  ...userAgentDataSlice(...arg),
  ...userAgentStatusSlice(...arg),
  ...sessionSlice(...arg),
  ...profileSelectSlice(...arg),
  ...profileDataSlice(...arg),
  ...mediaStreamLocalSlice(...arg),
  ...mediaStreamRemoteSlice(...arg),
}));
