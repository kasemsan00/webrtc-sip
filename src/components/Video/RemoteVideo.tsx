import { useRef } from "react";

export default function RemoteVideo() {
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  return (
    <div className="w-full h-full">
      <video className="bg-gray-400 w-full h-full rounded-md" autoPlay playsInline ref={remoteVideoRef}></video>
    </div>
  );
}
