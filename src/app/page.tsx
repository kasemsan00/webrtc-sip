"use client";

import Sidebar from "@/ui/Layout/Sidebar";
import MainView from "@/ui/Layout/MainView";
import LocalVideo from "@/ui/Video/LocalVideo";
import { useStore } from "@/store/useStore";
import UserAgentHandler from "@/hook/userAgentHandler";
import { useEffect, useState } from "react";
import { getExtension, getTurn } from "@/request/request";
import CallOut from "@/ui/LeftBar/CallOut";
import StatusConnection from "@/ui/LeftBar/StatusConnection";
import ConnectSip from "@/ui/LeftBar/ConnectSip";
import ProfileList from "@/ui/LeftBar/ProfileList";
import Setting from "@/ui/Setting/Setting";
import RemoteVideo from "@/ui/Video/RemoteVideo";
import Box from "@/ui/Chat/Box";

export default function Home() {
  const { iceServer, setProfile, setIceServer } = useStore((state) => state);
  const [status, handleRegister, handleUnRegister] = UserAgentHandler();
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  useEffect(() => {
    const getTurnData = async () => {
      const resp = await getTurn();
      const iceServers = {
        url: resp[0].url,
        username: resp[0].username,
        credential: resp[0].credential,
      };
      setIceServer(iceServers);
    };
    getTurnData().then((r) => r);
  }, [setIceServer]);

  useEffect(() => {
    console.log(iceServer);
  }, [iceServer]);

  useEffect(() => {
    (async () => {
      setProfile(await getExtension());
    })();
  }, [setProfile]);

  useEffect(() => {
    function handleEscapeKey(event: any) {
      if (event.key === "Escape") setIsSettingOpen(false);
    }
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);
  return (
    <main className="flex flex-row h-screen bg-gray-100">
      <Sidebar>
        <div className="flex flex-col gap-2 w-full">
          <LocalVideo />
          <ProfileList />
          <ConnectSip status={status} handleRegister={handleRegister} handleUnRegister={handleUnRegister} />
          <StatusConnection />
          <CallOut />
          <Box />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <button className="btn btn-ghost focus:outline-none" onClick={() => setIsSettingOpen(true)}>
            Setting
          </button>
        </div>
      </Sidebar>
      <MainView>
        <RemoteVideo />
      </MainView>
      <Setting open={isSettingOpen} setOpen={setIsSettingOpen} />
    </main>
  );
}
