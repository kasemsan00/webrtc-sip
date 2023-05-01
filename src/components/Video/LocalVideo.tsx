import { useEffect } from "react";
import { setLocalStream } from "@/redux/slices/mediaStreamLocalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export default function LocalVideo() {
  const dispatch = useAppDispatch();
  const mediaStreamLocal = useAppSelector((state) => state.mediaStreamLocal);

  useEffect(() => {
    async function getLocalMedia() {
      if (mediaStreamLocal !== null) return;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      dispatch(setLocalStream(stream));
      return null;
    }
    getLocalMedia().then((r) => r);
  }, [dispatch, mediaStreamLocal]);

  return (
    <div className="h-40">
      <video
        ref={(video) => {
          if (video) {
            video.srcObject = mediaStreamLocal;
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
