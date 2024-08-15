import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { MdCallEnd } from "react-icons/md";
const variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  shown: {
    opacity: 1,
    scale: 1,
  },
};
const variantsControl = {
  hidden: {
    opacity: 0,
    scale: 1,
  },
  shown: {
    opacity: 1,
    scale: 1,
  },
};
export default function RemoteVideo() {
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { session, userAgentStatus, mediaStreamRemote, setRemoteMediaStream } = useStore(
    (state) => state
  );
  const [variant, setVariant] = useState("hidden");
  const [variantControl, setVariantControl] = useState("hidden");

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
    if (mediaStreamRemote !== null) {
      console.log(mediaStreamRemote);
      setVariant("shown");
    }
    if (remoteVideoRef.current !== null) {
      remoteVideoRef.current.srcObject = mediaStreamRemote;
    }
    console.log(mediaStreamRemote);
  }, [mediaStreamRemote]);

  const handleEndCall = () => {
    session.terminate();
    setRemoteMediaStream(null);
    setVariant("hidden");
  };

  const handleOnMouse = (value: string) => {
    if (variantControl === value) return;
    setVariantControl(value);
  };

  return (
    <>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={variant}
        transition={{ duration: 0.2 }}
        className="relative w-full h-full"
        onMouseOver={() => handleOnMouse("shown")}
        onMouseLeave={() => handleOnMouse("hidden")}
      >
        <motion.div
          initial="hidden"
          variants={variantsControl}
          animate={variantControl}
          transition={{ duration: 0.1 }}
          className="z-40 absolute flex w-full justify-center items-center bottom-10 bg-transparent rounded-xl"
        >
          <MdCallEnd
            className="bg-red-500 w-20 h-20 p-2 rounded-md cursor-pointer"
            onClick={handleEndCall}
          />
        </motion.div>
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
