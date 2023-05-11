import { StateCreator } from "zustand";

interface IUserAgentSlice {
  isRegistered: boolean;
  userAgentData: any;
  setUserAgentData: (arg0: any) => void;
}

const userAgentDataSlice: StateCreator<IUserAgentSlice> = (set, get) => ({
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
