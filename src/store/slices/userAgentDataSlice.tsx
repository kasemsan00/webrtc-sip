import { StateCreator } from "zustand";

interface UserAgentSlice {
  isRegistered: boolean;
  userAgentData: any;
  setUserAgentData: (arg0: any) => void;
  setIsRegistered: (arg0: boolean) => void;
}

const userAgentDataSlice: StateCreator<UserAgentSlice> = (set) => ({
  isRegistered: false,
  userAgentData: undefined,
  setUserAgentData(data: any) {
    set(() => ({ userAgentData: data }));
  },
  setIsRegistered(data: boolean) {
    set(() => ({ isRegistered: data }));
  },
});

export default userAgentDataSlice;
