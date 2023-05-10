import { StateCreator } from "zustand";

interface IUserAgentSlice {
  userAgentData: any;
  setUserAgentData: (arg0: any) => void;
}

const userAgentDataSlice: StateCreator<IUserAgentSlice> = (set, get) => ({
  userAgentData: undefined,
  setUserAgentData(data: any) {
    set(() => ({ userAgentData: data }));
  },
});

export default userAgentDataSlice;
