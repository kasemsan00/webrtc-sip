import Head from "next/head";
import Sidebar from "@/components/Layout/Sidebar";
import MainView from "@/components/Layout/MainView";
import LocalVideo from "@/components/Video/LocalVideo";
import StatusConnection from "@/components/LeftPanel/StatusConnection";
import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<string>("");

  const UserRegister = () => {
    setStatus("Connected");
  };
  const UserUnregister = () => {
    setStatus("Disconnected");
  };
  const HandleCallOut = () => {};
  const HandleHangUp = () => {};
  return (
    <>
      <Head>
        <title>SipTest</title>
        <meta name="description" content="WebRTC" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <Sidebar>
          <LocalVideo />
          <StatusConnection status={status} />
          {status === "Connected" && (
            <button className="btn btn-error" onClick={UserUnregister}>
              Disconnect
            </button>
          )}
          {status === "" || status === "Disconnected" ? (
            <button className="btn btn-success" onClick={UserRegister}>
              Register
            </button>
          ) : null}
          <button className="btn btn-success" onClick={HandleCallOut}>
            Call
          </button>
          <button className="btn btn-warning" onClick={HandleHangUp}>
            HangUp
          </button>
        </Sidebar>
        <MainView>
          <div></div>
        </MainView>
      </main>
    </>
  );
}
