import { StateCreator } from "zustand";

interface IUserAgentStatusSlice {
  userAgentStatus: string;
  setUserAgentStatus: (arg0: string) => void;
}

const userAgentStatusSlice: StateCreator<IUserAgentStatusSlice> = (
  set,
  get
) => ({
  userAgentStatus: "",
  setUserAgentStatus(data) {
    set(() => ({ userAgentStatus: data }));
  },
});

export default userAgentStatusSlice;
