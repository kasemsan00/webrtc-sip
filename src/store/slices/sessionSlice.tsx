import { StateCreator } from "zustand";

interface ISessionSlice {
  session: any;
  setSession: (arg0: any) => void;
}

const sessionSlice: StateCreator<ISessionSlice> = (set, get) => ({
  session: null,
  setSession(data) {
    set(() => ({ session: data }));
  },
});

export default sessionSlice;
