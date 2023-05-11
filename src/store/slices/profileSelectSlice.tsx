import { StateCreator } from "zustand";
interface IConfig {
  id: number | undefined;
  domain: string;
  websocket: string;
  extension: string;
  secret: string;
}
interface IProfileSelect {
  profileSelect: IConfig;
  setSelectProfile: (arg0: any) => void;
}

const profileSelectSlice: StateCreator<IProfileSelect> = (set, get) => ({
  profileSelect: {
    id: undefined,
    domain: "",
    websocket: "",
    extension: "",
    secret: "",
  },
  setSelectProfile(data: IConfig) {
    set(() => ({ profileSelect: data }));
  },
});
export default profileSelectSlice;
