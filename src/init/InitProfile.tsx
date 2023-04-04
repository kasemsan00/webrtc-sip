import { useDispatch } from "react-redux";
import { setSelectProfile } from "@/redux/slices/profileSelectSlice";

const dispatch = useDispatch;

const init = () => {
  if (localStorage.getItem("profileSelect") === null) {
    localStorage.setItem("profileSelect", initialProfile);
    dispatch(setSelectProfile(initialProfile));
  } else {
    dispatch(setSelectProfile(localStorage.getItem("profileSelect")));
  }
};
