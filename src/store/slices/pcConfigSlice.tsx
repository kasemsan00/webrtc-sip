import { StateCreator } from "zustand/esm";

interface ITurnConfig {
  id: string;
  url: string;
  username: string;
  credential: string;
}

interface IPcConfig {
  turn: boolean;
  iceServer: ITurnConfig;
  setTurnEnable: (arg0: boolean) => void;
  setIceServer: (arg0: ITurnConfig) => void;
}

const pcConfigSlice: StateCreator<IPcConfig> = (set) => ({
  turn: true,
  iceServer: {
    id: "",
    url: "",
    username: "",
    credential: "",
  },
  setTurnEnable(data: any) {
    set(() => ({ turn: data }));
  },
  setIceServer(data: any) {
    set(() => ({ iceServer: data }));
  },
});
export default pcConfigSlice;
