"use client";

import SidebarLayout from "@/ui/Layout/SidebarLayout";
import RemoteLayout from "@/ui/Layout/RemoteLayout";
import LocalVideo from "@/ui/Video/LocalVideo";
import { useStore } from "@/store/useStore";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { getExtension, getSetting, getTurn } from "@/request/request";
import CallOut from "@/ui/LeftBar/CallOut";
import StatusConnection from "@/ui/LeftBar/StatusConnection";
import ConnectSip from "@/ui/LeftBar/ConnectSip";
import ProfileList from "@/ui/LeftBar/ProfileList";
import Setting from "@/ui/Setting/Setting";
import RemoteVideo from "@/ui/Video/RemoteVideo";
import Box from "@/ui/Chat/Box";
import IceServersStatus from "@/ui/LeftBar/IceServersStatus";
import DialPad from "@/ui/Dialpad/DialPad";
import { isMobile } from "react-device-detect";
import SettingLayout from "@/ui/Layout/SettingLayout";
import SettingButton from "@/ui/Setting/SettingButton";
import dynamic from "next/dynamic";
const MainLayout = dynamic(() => import("@/ui/Layout/MainLayout"), { ssr: false });

export default function Home() {
  const { userAgentStatus, setProfile, setIceServer, setTurnEnable } = useStore((state) => state);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isDisplayDialPad, setIsDisplayDialPad] = useState(false);
  const demo = useState<boolean>(isMobile);

  useEffect(() => {
    if (demo === undefined) return;
    if (demo) {
      console.log("isMobile");
    } else {
      console.log("isDesktop");
    }
  }, [demo]);

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
      const { id, url, username, credential } = resp[0];
      const iceServers = { id, url, username, credential };
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

  // useEffect(() => {
  //   if (!isMobile) return;
  //   if (userAgentStatus === "Terminate") {
  //     setIsDisplayDialPad(true);
  //     return;
  //   }
  // }, [setIsDisplayDialPad, userAgentStatus]);

  return (
    <main className="flex flex-row h-screen bg-white">
      <MainLayout>
        {demo ? (
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
            <SettingLayout>
              <SettingButton handleClick={setIsSettingOpen} />
            </SettingLayout>
          </SidebarLayout>
        ) : (
          <DialPad isVisible={true} setIsVisible={setIsDisplayDialPad} />
        )}

        <RemoteLayout>
          <RemoteVideo />
        </RemoteLayout>
        <Setting open={isSettingOpen} setOpen={setIsSettingOpen} />
      </MainLayout>
    </main>
  );
}
