import { useEffect, useState } from "react";
import { setLocalStream } from "@/redux/slices/mediaStreamLocalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { BsFillCameraVideoFill, BsFillCameraVideoOffFill, BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { motion } from "framer-motion";

export default function LocalVideo() {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.session);
  const mediaStreamLocal = useAppSelector((state) => state.mediaStreamLocal);
  const [isMuted, setIsMuted] = useState({ video: true, audio: true });

  useEffect(() => {
    if (session === null) return;
    session.on("ended", () => {
      setIsMuted({
        video: true,
        audio: true,
      });
    });
  }, [session]);

  useEffect(() => {
    async function getLocalMedia() {
      if (mediaStreamLocal !== null) return;
      console.log("GetUserMedia Local");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setIsMuted({
        video: true,
        audio: true,
      });
      dispatch(setLocalStream(stream));
      return null;
    }
    getLocalMedia().then((r) => r);
  }, [dispatch, mediaStreamLocal]);

  const handleClickVideoMuted = () => {
    if (session === null) return;
    const { video } = session.isMuted();
    if (!video) {
      console.log("mute video");
      session.mute({
        video: true,
      });
    }
    if (video) {
      console.log("unmute video");
      session.unmute({
        video: true,
      });
    }
    setIsMuted((state) => ({ ...state, ["video"]: video }));
  };
  const handleClickMicMuted = () => {
    if (session === null) return;
    const { audio } = session.isMuted();
    if (!audio) {
      console.log("mute audio");
      session.mute({
        audio: true,
      });
    }
    if (audio) {
      console.log("unmute audio");
      session.unmute({
        audio: true,
      });
    }
    setIsMuted((state) => ({ ...state, ["audio"]: audio }));
  };

  return (
    <div className="flex flex-1 items-end justify-start w-full">
      <div className="absolute flex-row rounded-md cursor-pointer bg-slate-200 z-50 m-1 ">
        <motion.div
          className="flex justify-center items-center rounded-xl cursor-pointer m-1 bg-slate-200 z-50 w-6 h-6"
          whileTap={{ scale: 0.8 }}
          onClick={handleClickVideoMuted}
        >
          {isMuted.video ? (
            <BsFillCameraVideoFill className="w-5 h-5" />
          ) : (
            <BsFillCameraVideoOffFill className="w-5 h-5 text-red-700" />
          )}
        </motion.div>
        <motion.div
          className="flex justify-center items-center rounded-xl cursor-pointer m-1 bg-slate-200 z-50 w-6 h-6"
          whileTap={{ scale: 0.8 }}
          onClick={handleClickMicMuted}
        >
          {isMuted.audio ? <BsFillMicFill className="w-5 h-5" /> : <BsFillMicMuteFill className="w-5 h-5 text-red-700" />}
        </motion.div>
      </div>
      <video
        ref={(video) => {
          if (video && video.srcObject === null) {
            video.srcObject = mediaStreamLocal;
          }
        }}
        className="bg-black rounded-md h-40"
        autoPlay
        muted
        playsInline
        id="local-video"
        width="100%"
        height="100%"
      ></video>
    </div>
  );
}
