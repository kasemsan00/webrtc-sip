"use client";

import Sidebar from "@/ui/Layout/Sidebar";
import MainView from "@/ui/Layout/MainView";
import LocalVideo from "@/ui/Video/LocalVideo";
import { useStore } from "@/store/useStore";
import UserAgentHandler from "@/hook/userAgentHandler";
import { useEffect, useState } from "react";
import { getExtension, getSetting, getTurn } from "@/request/request";
import CallOut from "@/ui/LeftBar/CallOut";
import StatusConnection from "@/ui/LeftBar/StatusConnection";
import ConnectSip from "@/ui/LeftBar/ConnectSip";
import ProfileList from "@/ui/LeftBar/ProfileList";
import Setting from "@/ui/Setting/Setting";
import RemoteVideo from "@/ui/Video/RemoteVideo";
import Box from "@/ui/Chat/Box";
import IceServersStatus from "@/ui/LeftBar/IceServersStatus";

export default function Home() {
  const { setProfile, setIceServer, setTurnEnable } = useStore((state) => state);
  const [status, handleRegister, handleUnRegister] = UserAgentHandler();
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  useEffect(() => {
    const getSettingData = async () => {
      const resp = await getSetting();
      resp.forEach((item: { name: string; value: string }) => {
        if (item.name === "turn") {
          setTurnEnable(JSON.parse(item.value));
        }
      });
    };
    const getTurnData = async () => {
      const resp = await getTurn();
      const iceServers = {
        id: resp[0].id,
        url: resp[0].url,
        username: resp[0].username,
        credential: resp[0].credential,
      };
      setIceServer(iceServers);
    };
    getSettingData().then((r) => r);
    getTurnData().then((r) => r);
  }, [setIceServer, setTurnEnable]);

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
          <IceServersStatus />
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
