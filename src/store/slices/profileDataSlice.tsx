import { StateCreator } from "zustand";

interface IProfile {
  [index: string]: IProfileData;
}
interface IProfileData {
  profileData: Array<IProfile>;
  setProfile: (arg0: Array<IProfile>) => void;
}

const profileDataSlice: StateCreator<IProfileData> = (set, get) => ({
  profileData: [],
  setProfile(data: Array<IProfile>) {
    set(() => ({ profileData: data }));
  },
});

export default profileDataSlice;
