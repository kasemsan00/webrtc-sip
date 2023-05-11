import { StateCreator } from "zustand/esm";

interface IMediaStreamLocal {
  mediaStreamLocal: MediaStream | null;
  setLocalMediaStream: (arg0: MediaStream) => void;
}

const mediaStreamLocalSlice: StateCreator<IMediaStreamLocal> = (set, get) => ({
  mediaStreamLocal: null,
  setLocalMediaStream(data) {
    set(() => ({ mediaStreamLocal: data }));
  },
});
export default mediaStreamLocalSlice;
