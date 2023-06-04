"use client";

import SidebarLayout from "@/ui/Layout/SidebarLayout";
import RemoteLayout from "@/ui/Layout/RemoteLayout";
import LocalVideo from "@/ui/Video/LocalVideo";
import { useStore } from "@/store/useStore";
import React, { useEffect, useState } from "react";
import { getExtension, getSetting, getTurn } from "@/request/request";
import CallOut from "@/ui/LeftBar/CallOut";
import StatusConnection from "@/ui/LeftBar/StatusConnection";
import ConnectSip from "@/ui/LeftBar/ConnectSip";
import ProfileList from "@/ui/LeftBar/ProfileList";
import Setting from "@/ui/Setting/Setting";
import RemoteVideo from "@/ui/Video/RemoteVideo";
import Box from "@/ui/Chat/Box";
import IceServersStatus from "@/ui/LeftBar/IceServersStatus";
import SettingButton from "@/ui/Setting/SettingButton";
import MobileLayout from "@/ui/Layout/MobileLayout";
import Config from "@/ui/Mobile/Config/Config";
import DialPad from "@/ui/Mobile/Dialpad/DialPad";

export default function Page() {
  const { isRegistered, setProfile, iceServer, setIceServer, setTurnEnable } = useStore(
    (state) => state
  );
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
      setIceServer(resp);
      // const { id, url, username, credential } = resp[0];
      // const iceServers = { id, url, username, credential };
      // setIceServer(iceServers);
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
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSettingOpen(false);
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <main className="flex flex-row h-screen bg-white">
      <MobileLayout>
        <Config />
        {isRegistered && <DialPad />}
      </MobileLayout>
      <SidebarLayout>
        <div className="flex flex-col gap-2 w-full">
          <LocalVideo />
          <ProfileList />
          <ConnectSip />
          <StatusConnection />
          <CallOut />
          <Box />
          <IceServersStatus />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <SettingButton handleClick={setIsSettingOpen} />
        </div>
      </SidebarLayout>
      <RemoteLayout>
        <RemoteVideo />
      </RemoteLayout>
      <Setting open={isSettingOpen} setOpen={setIsSettingOpen} />
    </main>
  );
}
