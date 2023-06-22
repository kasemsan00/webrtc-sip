import { StateCreator } from "zustand";

interface UserAgentStatusSlice {
  userAgentStatus: string;
  setUserAgentStatus: (arg0: string) => void;
}

const userAgentStatusSlice: StateCreator<UserAgentStatusSlice> = (set, get) => ({
  userAgentStatus: "",
  setUserAgentStatus(data) {
    set(() => ({ userAgentStatus: data }));
  },
});

export default userAgentStatusSlice;
