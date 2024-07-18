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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Page() {
  const { isRegistered, setProfile, setIceServer, setTurnEnable } = useStore((state) => state);
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
      setIceServer(await getTurn());
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
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex flex-row h-screen bg-white">
        {/*<MobileLayout>*/}
        {/*  <Config />*/}
        {/*  {isRegistered && <DialPad />}*/}
        {/*</MobileLayout>*/}
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
          <div className="fixed w-[calc(100%-15px)] mb-2 bottom-0">
            <SettingButton handleClick={setIsSettingOpen} />
          </div>
        </SidebarLayout>
        <RemoteLayout>
          <RemoteVideo />
        </RemoteLayout>
        <Setting open={isSettingOpen} setOpen={setIsSettingOpen} />
      </main>
    </QueryClientProvider>
  );
}
