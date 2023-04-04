import Head from "next/head";
import JsSIP, { UA } from "jssip";

let userAgent: UA;

export default function Home() {
  const UserRegister = () => {
    const socket = new JsSIP.WebSocketInterface(profileData[profileSelect].websocket);
    const configuration = {
      sockets: [socket],
      uri: "sip:" + profileData[profileSelect].extension + "@" + profileData[profileSelect].server,
      password: profileData[profileSelect].password,
      traceSip: true,
    };

    userAgent = new JsSIP.UA(configuration);
    userAgent.start();

    userAgent.on("connecting", (event) => {
      console.log("connecting");
      console.log(event);
    });
    userAgent.on("registered", (event) => {
      console.log("registered");
      console.log(event);
    });
    userAgent.on("unregistered", (event) => {
      console.log("unregistered");
      console.log(event);
    });
    userAgent.on("registrationFailed", (event) => {
      console.log("registrationFailed");
      console.log(event);
    });
    userAgent.on("disconnected", (event) => {
      console.log("disconnected");
      console.log(event);
    });
  };

  return (
    <>
      <Head>
        <title>WebRTC</title>
        <meta name="description" content="WebRTC" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <button>Register</button>
        <button>UnRegister</button>
      </main>
    </>
  );
}
