import { StateCreator } from "zustand/esm";

interface IMediaStreamRemote {
  turn: boolean;
  setTurnEnable: (arg0: boolean) => void;
}

const pcConfigSlice: StateCreator<IMediaStreamRemote> = (set, get) => ({
  turn: true,
  setTurnEnable(data) {
    set(() => ({ turn: data }));
  },
});
export default pcConfigSlice;
