import { StateCreator } from "zustand/esm";

interface IMediaStreamRemote {
  mediaStreamRemote: MediaStream | null;
  setRemoteMediaStream: (arg0: MediaStream) => void;
}

const mediaStreamRemoteSlice: StateCreator<IMediaStreamRemote> = (
  set,
  get
) => ({
  mediaStreamRemote: null,
  setRemoteMediaStream(data) {
    set(() => ({ mediaStreamRemote: data }));
  },
});
export default mediaStreamRemoteSlice;
