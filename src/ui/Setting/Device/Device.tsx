import CameraConfig from "@/ui/Setting/Device/CameraConfig";
import MicrophoneConfig from "@/ui/Setting/Device/MicrophoneConfig";
import { useEffect, useState } from "react";

export interface IDevice {
  deviceId: string;
  groupId: string;
  kind: string;
  label: string;
}

export default function Device() {
  const [videoInput, setVideoInput] = useState<Array<IDevice>>([]);
  const [audioInput, setAudioInput] = useState<Array<IDevice>>([]);

  useEffect(() => {
    async function getDeviceList() {
      const resp = await navigator.mediaDevices.enumerateDevices();
      const videoInput: Array<IDevice> = [];
      const audioInput: Array<IDevice> = [];
      resp.map((device) => {
        if (device.kind === "videoinput") {
          videoInput.push(device);
        }
        if (device.kind === "audioinput") {
          audioInput.push(device);
        }
      });
      setVideoInput(videoInput);
      setAudioInput(audioInput);
    }
    getDeviceList().then((r) => r);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <CameraConfig devices={videoInput} />
      {/*<MicrophoneConfig />*/}
    </div>
  );
}
