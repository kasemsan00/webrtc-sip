import { StateCreator } from "zustand/esm";

interface TurnConfig {
  id: string;
  urls: string;
  username: string;
  credential: string;
}

interface PcConfig {
  turn: boolean;
  setTurnEnable: (arg0: boolean) => void;
  iceServer: Array<TurnConfig>;
  setIceServer: (arg0: Array<TurnConfig>) => void;
}

const pcConfigSlice: StateCreator<PcConfig> = (set) => ({
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
