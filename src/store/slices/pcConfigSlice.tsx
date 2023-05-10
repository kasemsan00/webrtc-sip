import { StateCreator } from "zustand/esm";

interface IMediaStreamRemote {
  turn: boolean;
  iceServer: any;
  setTurnEnable: (arg0: boolean) => void;
  setIceServer: (arg0: any) => void;
}

const pcConfigSlice: StateCreator<any> = (set) => ({
  turn: true,
  iceServer: [],
  setTurnEnable(data: any) {
    set(() => ({ turn: data }));
  },
  setIceServers(data: any) {
    set(() => ({ iceServer: data }));
  },
});
export default pcConfigSlice;
