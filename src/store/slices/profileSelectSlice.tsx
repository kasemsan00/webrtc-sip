import { StateCreator } from "zustand";
interface Config {
  id: number | undefined;
  domain: string;
  websocket: string;
  extension: string;
  secret: string;
}
interface ProfileSelect {
  profileSelect: Config;
  setSelectProfile: (arg0: any) => void;
}

const profileSelectSlice: StateCreator<ProfileSelect> = (set, get) => ({
  profileSelect: {
    id: undefined,
    domain: "",
    websocket: "",
    extension: "",
    secret: "",
  },
  setSelectProfile(data: Config) {
    set(() => ({ profileSelect: data }));
  },
});
export default profileSelectSlice;
