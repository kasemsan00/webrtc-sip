import { StateCreator } from "zustand/esm";

interface MediaStreamRemote {
  mediaStreamRemote: MediaStream | null;
  setRemoteMediaStream: (arg0: MediaStream) => void;
}

const mediaStreamRemoteSlice: StateCreator<MediaStreamRemote> = (set, get) => ({
  mediaStreamRemote: null,
  setRemoteMediaStream(data) {
    set(() => ({ mediaStreamRemote: data }));
  },
});
export default mediaStreamRemoteSlice;
