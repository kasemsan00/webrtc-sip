import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { MdCallEnd } from "react-icons/md";
const variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    onanimationend: {
      display: "none",
    },
  },
  shown: {
    opacity: 1,
    scale: 1,
    display: "block",
  },
};
export default function RemoteVideo() {
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { userAgentStatus, mediaStreamRemote } = useStore((state) => state);
  const [variant, setVariant] = useState("hidden");

  useEffect(() => {
    if (userAgentStatus === "Calling") {
      console.log("Calling");
      setVariant("shown");
    }
    if (userAgentStatus === "Terminated") {
      setVariant("hidden");
    }
  }, [userAgentStatus]);

  useEffect(() => {
    if (mediaStreamRemote === undefined) {
      return;
    }
    if (remoteVideoRef.current !== null) {
      remoteVideoRef.current.srcObject = mediaStreamRemote;
    }
  }, [mediaStreamRemote]);

  return (
    <>
      <motion.div variants={variants} initial="hidden" animate={variant} transition={{ duration: 0.2 }}>
        {/*<div className="absolute flex justify-center items-center rounded-xl">*/}
        {/*  <MdCallEnd className="bg-red-500 w-20 h-20 p-2" />*/}
        {/*</div>*/}
        <video
          style={{ display: mediaStreamRemote !== undefined ? "block" : "none" }}
          ref={remoteVideoRef}
          className="w-full h-full rounded-md bg-black"
          autoPlay
          playsInline
        ></video>
      </motion.div>
    </>
  );
}
