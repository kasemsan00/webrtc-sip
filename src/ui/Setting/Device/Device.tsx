import CameraConfig from "@/ui/Setting/Device/CameraConfig";
import { useEffect, useState } from "react";

export interface Device {
  deviceId: string;
  groupId: string;
  kind: string;
  label: string;
}

export default function Device() {
  const [videoInput, setVideoInput] = useState<Array<Device>>([]);
  const [audioInput, setAudioInput] = useState<Array<Device>>([]);

  useEffect(() => {
    async function getDeviceList() {
      const resp = await navigator.mediaDevices.enumerateDevices();
      const videoInput: Array<Device> = [];
      const audioInput: Array<Device> = [];
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
