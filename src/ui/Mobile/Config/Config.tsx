import ProfileList from "@/ui/LeftBar/ProfileList";
import React from "react";
import { useStore } from "@/store/useStore";

export default function Config() {
  const { profileSelect, userAgentData } = useStore((state) => state);
  const handleRegister = () => {};

  return (
    <div className="flex flex-col gap-4 w-full p-2">
      <div>Select Profile</div>
      <ProfileList />
      <div>
        <div className="flex flex-row">
          <div className="mr-2">Domain : </div>
          <div>{profileSelect.domain}</div>
        </div>
        <div className="flex flex-row">
          <div className="mr-2">Websocket : </div>
          <div>{profileSelect.websocket}</div>
        </div>
        <div className="flex flex-row">
          <div className="mr-2">Extension : </div>
          <div>{profileSelect.extension}</div>
        </div>
      </div>
      <button onClick={handleRegister} className="btn btn-primary">
        UserAgent Start
      </button>
    </div>
  );
}
