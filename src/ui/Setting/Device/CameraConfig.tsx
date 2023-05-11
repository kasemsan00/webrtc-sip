import { Fragment, useEffect, useRef, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { IDevice } from "@/ui/Setting/Device/Device";
import { useStore } from "@/store/useStore";

interface Props {
  devices: Array<IDevice>;
}

export default function CameraConfig({ devices }: Props) {
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const { mediaStreamLocal, setLocalMediaStream } = useStore((state) => state);

  useEffect(() => {
    if (mediaStreamLocal !== undefined) {
      videoPreviewRef.current!.srcObject = mediaStreamLocal;
    }
  }, [mediaStreamLocal]);

  const [selected, setSelected] = useState<IDevice>({
    label: "",
    deviceId: "",
    groupId: "",
    kind: "",
  });

  useEffect(() => {
    if (devices.length > 0 && mediaStreamLocal !== null && selected.deviceId === "") {
      const used_devices = mediaStreamLocal.getTracks().map((track: MediaStreamTrack) => track.getSettings().deviceId);
      const index = devices.findIndex((state) => state.deviceId === used_devices[1]);
      const device = devices[index];
      setSelected(device);
    }
  }, [devices, mediaStreamLocal, selected.deviceId]);

  const handleChange = (event: string) => {
    const index = devices.findIndex((state) => state.deviceId === event);
    const device = devices[index];
    setSelected(device);
    getNewCamera({ device }).then((r) => r);
  };

  const getNewCamera = async ({ device }: { device: IDevice }) => {
    mediaStreamLocal.getTracks().forEach((track: MediaStreamTrack) => {
      track.stop();
    });
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: device.deviceId,
      },
      audio: true,
    });
    videoPreviewRef.current!.srcObject = stream;
    setLocalMediaStream(stream);
  };

  return (
    <div className="w-full">
      <div className="flex flex-1 justify-center items-center h-60 bg-black rounded-md">
        <video className="h-full" ref={videoPreviewRef} playsInline autoPlay></video>
      </div>
      <span className="label-text">Camera</span>
      <Listbox value={selected.label} onChange={handleChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected?.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {devices.map((device, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={device.deviceId}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{device.label}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
