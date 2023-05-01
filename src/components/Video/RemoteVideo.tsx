import { useAppSelector } from "@/redux/store";
import { useEffect, useRef } from "react";

export default function RemoteVideo() {
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRemote = useAppSelector((state) => state.mediaStreamRemote);

  useEffect(() => {
    if (mediaStreamRemote === undefined) {
      return;
    }
    if (remoteVideoRef.current !== null) {
      remoteVideoRef.current.srcObject = mediaStreamRemote;
    }
  }, [mediaStreamRemote]);

  return (
    <div className="w-full h-full">
      <video
        style={{ display: mediaStreamRemote !== undefined ? "block" : "none" }}
        ref={remoteVideoRef}
        className="bg-gray-400 w-full h-full rounded-md"
        autoPlay
        playsInline
      ></video>
    </div>
  );
}
