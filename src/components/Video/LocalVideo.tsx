import { useEffect } from "react";
import { setLocalStream } from "@/redux/slices/mediaStreamLocalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { BsFillCameraFill, BsFillMicFill } from "react-icons/bs";

export default function LocalVideo() {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.session);
  const mediaStreamLocal = useAppSelector((state) => state.mediaStreamLocal);

  useEffect(() => {
    async function getLocalMedia() {
      if (mediaStreamLocal !== null) return;
      console.log("GetUserMedia Local");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      dispatch(setLocalStream(stream));
      return null;
    }
    getLocalMedia().then((r) => r);
  }, [dispatch, mediaStreamLocal]);

  const handleClickVideoMuted = () => {
    session.muted({
      video: false,
      audio: true,
    });
  };
  const handleClickMicMuted = () => {
    session.muted({
      video: true,
      audio: false,
    });
  };

  return (
    <div className="flex flex-1 items-end justify-start w-full">
      <div className="absolute flex-row rounded-md cursor-pointer bg-slate-200 z-50 m-1 ">
        <div className="rounded-xl cursor-pointer m-1 bg-slate-200 z-50 w-6 h-6" onClick={handleClickVideoMuted}>
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-6flbmm"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="VideocamIcon"
          >
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"></path>
          </svg>
        </div>
        <div className="rounded-xl cursor-pointer m-1 bg-slate-200 z-50 w-6 h-6" onClick={handleClickMicMuted}>
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-6flbmm"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="MicIcon"
          >
            <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path>
          </svg>
        </div>
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
