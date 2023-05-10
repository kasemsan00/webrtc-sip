import { StateCreator } from "zustand/esm";

interface IPcConfig {
  turn: boolean;
  iceServer: any;
  setTurnEnable: (arg0: any) => void;
  setIceServer: (arg0: any) => void;
}

const pcConfigSlice: StateCreator<IPcConfig> = (set) => ({
  turn: true,
  iceServer: [],
  setTurnEnable(data: any) {
    set(() => ({ turn: data }));
  },
  setIceServer(data: any) {
    set(() => ({ iceServer: data }));
  },
});
export default pcConfigSlice;
