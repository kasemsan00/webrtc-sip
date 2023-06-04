import { StateCreator } from "zustand/esm";

interface MediaStreamLocal {
  mediaStreamLocal: MediaStream | null;
  setLocalMediaStream: (arg0: MediaStream) => void;
}

const mediaStreamLocalSlice: StateCreator<MediaStreamLocal> = (set, get) => ({
  mediaStreamLocal: null,
  setLocalMediaStream(data) {
    set(() => ({ mediaStreamLocal: data }));
  },
});
export default mediaStreamLocalSlice;
