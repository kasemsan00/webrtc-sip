import { useEffect, useState } from "react";

export default function LocalVideo() {
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (stream !== null) return;
    async function getLocalMedia() {
      console.log("XX");
      setStream(
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
      );
      return null;
    }
    getLocalMedia().then((r) => r);
  }, [stream]);

  return (
    <div className="h-40">
      <video
        ref={(video) => {
          if (video) {
            video.srcObject = stream;
          }
        }}
        className="bg-black rounded-md h-full"
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
