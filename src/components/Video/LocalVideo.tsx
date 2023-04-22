import { useEffect } from "react";
import { setLocalStream } from "@/redux/slices/mediaStreamSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export default function LocalVideo() {
  const dispatch = useAppDispatch();
  const mediaStream = useAppSelector((state) => state.mediaStream);

  useEffect(() => {
    async function getLocalMedia() {
      if (mediaStream !== null) return;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      dispatch(setLocalStream(stream));
      return null;
    }
    getLocalMedia().then((r) => r);
  }, [dispatch, mediaStream]);

  return (
    <div className="h-40">
      <video
        ref={(video) => {
          if (video) {
            video.srcObject = mediaStream;
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
