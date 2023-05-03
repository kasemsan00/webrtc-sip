import { useAppSelector } from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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
  const userAgentStatus = useAppSelector((state) => state.userAgentStatus);
  const mediaStreamRemote = useAppSelector((state) => state.mediaStreamRemote);
  const [variant, setVariant] = useState("hidden");

  useEffect(() => {
    if (userAgentStatus === "Calling") {
      setVariant((prevVariant) => (prevVariant === "hidden" ? "shown" : "hidden"));
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
    <motion.div variants={variants} initial="hidden" animate={variant} transition={{ duration: 0.3 }}>
      <video
        style={{ display: mediaStreamRemote !== undefined ? "block" : "none" }}
        ref={remoteVideoRef}
        className="w-full h-full rounded-md"
        autoPlay
        playsInline
      ></video>
    </motion.div>
  );
}
