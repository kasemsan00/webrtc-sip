import { StateCreator } from "zustand/esm";

interface IMediaStreamRemote {
  turn: boolean;
  iceServers: any;
  setTurnEnable: (arg0: boolean) => void;
}

const pcConfigSlice: StateCreator<IMediaStreamRemote> = (set) => ({
  turn: true,
  iceServers: [],
  setTurnEnable(data) {
    set(() => ({ turn: data }));
  },
});
export default pcConfigSlice;
