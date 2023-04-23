import Head from "next/head";
import Sidebar from "@/components/Layout/Sidebar";
import MainView from "@/components/Layout/MainView";
import LocalVideo from "@/components/Video/LocalVideo";
import { useEffect, useState } from "react";
import RemoteVideo from "@/components/Video/RemoteVideo";
import ProfileList from "@/components/LeftPanel/ProfileList";
import CallOut from "@/components/LeftPanel/CallOut";
import UserAgentHandler from "@/hooks/UserAgentHandler";
import MyDialog from "@/components/Setting/Setting";
import { getExtension } from "@/request/request";
import { setProfile } from "@/redux/slices/profileDataSlice";
import { useAppDispatch } from "@/redux/store";

export default function Home() {
  const dispatch = useAppDispatch();
  const [userAgent, status] = UserAgentHandler();
  useEffect(() => {
    (async () => {
      dispatch(setProfile(await getExtension()));
    })();
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>WebRTC Test</title>
        <meta name="description" content="WebRTC" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <Sidebar>
          <LocalVideo />
          <ProfileList />
          {/*<ConnectSip status={status} setStatus={setStatus} />*/}
          {/*<StatusConnection status={status} />*/}
          <CallOut />
        </Sidebar>
        <MainView>
          <RemoteVideo />
        </MainView>
        <MyDialog />
      </main>
    </>
  );
}
