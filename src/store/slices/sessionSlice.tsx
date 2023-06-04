import { StateCreator } from "zustand";

interface SessionSlice {
  session: any;
  setSession: (arg0: any) => void;
}

const sessionSlice: StateCreator<SessionSlice> = (set, get) => ({
  session: null,
  setSession(data) {
    set(() => ({ session: data }));
  },
});

export default sessionSlice;
