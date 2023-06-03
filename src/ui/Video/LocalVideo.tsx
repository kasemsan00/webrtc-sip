"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/useStore";
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsFillMicFill,
  BsFillMicMuteFill,
} from "react-icons/bs";
import { motion } from "framer-motion";

const variants = {
  hidden: {
    opacity: 0,
    // scale: 0,
  },
  shown: {
    opacity: 1,
    // scale: 1,
  },
};

export default function LocalVideo() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const { mediaStreamLocal, session, setLocalMediaStream } = useStore((state) => state);
  const [isMuted, setIsMuted] = useState({ video: true, audio: true });
  const [variant, setVariant] = useState("hidden");

  useEffect(() => {
    localVideoRef.current!.srcObject = mediaStreamLocal;
  }, [mediaStreamLocal]);

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
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setIsMuted({
        video: true,
        audio: true,
      });
      setLocalMediaStream(stream);
      return null;
    }
    getLocalMedia().then((r) => r);
  }, [mediaStreamLocal, setLocalMediaStream]);

  const handleTest = () => {
      console.log("Hell World")
  }

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

  const handleMouse = (value: string) => {
    if (variant === value) return;
    setVariant(value);
  };

  return (
    <motion.div
      className="flex flex-1 items-end justify-start w-full"
      onMouseOver={() => handleMouse("shown")}
      onMouseLeave={() => handleMouse("hidden")}
    >
      <motion.div
        className="absolute flex flex-row rounded-md cursor-pointer bg-slate-200 z-50 m-1 "
        variants={variants}
        initial="hidden"
        animate={variant}
        transition={{ duration: 0.1 }}
      >
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
          {isMuted.audio ? (
            <BsFillMicFill className="w-5 h-5" />
          ) : (
            <BsFillMicMuteFill className="w-5 h-5 text-red-700" />
          )}
        </motion.div>
      </motion.div>
      <video
        ref={localVideoRef}
        className="bg-black rounded-md h-40"
        autoPlay
        muted
        playsInline
        id="local-video"
        width="100%"
        height="100%"
      ></video>
    </motion.div>
  );
}
