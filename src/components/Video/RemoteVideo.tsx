import { useAppSelector } from "@/redux/store";

export default function RemoteVideo() {
  const mediaStreamRemote = useAppSelector((state) => state.mediaStreamRemote);
  return (
    <div className="w-full h-full">
      <video
        ref={(video) => {
          if (video) {
            video.srcObject = mediaStreamRemote;
          }
        }}
        className="bg-gray-400 w-full h-full rounded-md"
        autoPlay
        playsInline
      ></video>
    </div>
  );
}
