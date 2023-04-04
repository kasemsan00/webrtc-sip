import JsSIP from "jssip";
import { useAppSelector } from "@/redux/store";
import { useCallback, useEffect, useState } from "react";

interface Props {
  server: string;
  webSocket: string;
  extension: string;
  password: string;
}
export default function UserAgentHandle({ server, webSocket, extension, password }: Props) {
  const [userAgent, setUserAgent] = useState<JsSIP.UA>();
  const [isStartUserRegister, setStartUserRegister] = useState(false);

  const ConfigUserAgent = () => {
    const socket = new JsSIP.WebSocketInterface(webSocket);
    const configuration = {
      sockets: [socket],
      uri: "sip:" + extension + "@" + server,
      password: password,
      traceSip: true,
    };
    setUserAgent(new JsSIP.UA(configuration));
  };
  const UserAgentRegister = useCallback(() => {
    if (userAgent === undefined) return;
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
  }, [userAgent]);

  useEffect(() => {
    if (userAgent !== undefined) {
      UserAgentRegister();
    }
  }, [UserAgentRegister, userAgent]);

  return [userAgent, setStartUserRegister];
}
