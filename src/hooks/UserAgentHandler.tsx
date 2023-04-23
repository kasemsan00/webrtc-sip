import JsSIP from "jssip";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";

interface IUserAgentRegister {
  domain: string;
  webSocket: string;
  extension: string;
  secret: string;
}
export default function UserAgentHandler() {
  const profileSelect = useAppSelector((state) => state.profileSelect);
  const [userAgent, setUserAgent] = useState<JsSIP.UA>();
  const [status, setStatus] = useState<string>("none");

  const UserAgentRegister = useCallback(({ webSocket, domain, extension, secret }: IUserAgentRegister) => {
    const socket = new JsSIP.WebSocketInterface(webSocket);
    const configuration = {
      sockets: [socket],
      uri: "sip:" + extension + "@" + domain,
      password: secret,
    };
    const userAgent = new JsSIP.UA(configuration);
    userAgent.start();
    userAgent.on("connecting", (event) => {
      setStatus("connecting");
      console.log("connecting");
      console.log(event);
    });
    userAgent.on("registered", (event) => {
      console.log("registered");
      setStatus("registered");
      console.log(event);
    });
    userAgent.on("unregistered", (event) => {
      console.log("unregistered");
      setStatus("unregistered");
      console.log(event);
    });
    userAgent.on("registrationFailed", (event) => {
      console.log("registrationFailed");
      setStatus("registrationFailed");
      console.log(event);
    });
    userAgent.on("disconnected", (event) => {
      console.log("disconnected");
      setStatus("disconnected");
      console.log(event);
    });
    setUserAgent(userAgent);
  }, []);

  useEffect(() => {
    if (
      profileSelect.webSocket !== "" &&
      profileSelect.extension !== "" &&
      profileSelect.domain !== "" &&
      profileSelect.extension !== "" &&
      profileSelect.secret !== ""
    ) {
      if (userAgent !== undefined) userAgent.unregister();
      // UserAgentRegister({
      //   webSocket: profileSelect.webSocket,
      //   domain: profileSelect.domain,
      //   extension: profileSelect.extension,
      //   secret: profileSelect.secret,
      // });
    }
  }, [UserAgentRegister, profileSelect, userAgent]);

  return [userAgent, status];
}
