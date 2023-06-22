import { StateCreator } from "zustand";

interface Profile {
  [index: string]: ProfileData;
}
interface ProfileData {
  profileData: Array<Profile>;
  setProfile: (arg0: Array<Profile>) => void;
}

const profileDataSlice: StateCreator<ProfileData> = (set, get) => ({
  profileData: [],
  setProfile(data: Array<Profile>) {
    set(() => ({ profileData: data }));
  },
});

export default profileDataSlice;
