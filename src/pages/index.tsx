import Head from "next/head";
import Sidebar from "@/components/Layout/Sidebar";
import MainView from "@/components/Layout/MainView";
import LocalVideo from "@/components/Video/LocalVideo";
import StatusConnection from "@/components/LeftPanel/StatusConnection";
import { useState } from "react";
import RemoteVideo from "@/components/Video/RemoteVideo";
import ProfileList from "@/components/LeftPanel/ProfileList";
import CallOut from "@/components/LeftPanel/CallOut";
import ConnectSip from "@/components/LeftPanel/ConnectSip";
import UserAgentHandler from "@/hooks/UserAgentHandler";

export default function Home() {
  const [userAgent, status] = UserAgentHandler();

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
          <StatusConnection status={status} />
          <CallOut />
        </Sidebar>
        <MainView>
          <RemoteVideo />
        </MainView>
      </main>
    </>
  );
}
