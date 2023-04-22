import JsSIP from "jssip";
import { useCallback, useEffect, useState } from "react";

interface IConfig {
  domain: string;
  webSocket: string;
  extension: string;
  secret: string;
}
export default function UserAgentHandler() {
  const [userAgent, setUserAgent] = useState<JsSIP.UA>();
  const [config, setConfig] = useState<IConfig | undefined>(undefined);

  const UserAgentRegister = useCallback(() => {
    if (config === undefined) return;
    const socket = new JsSIP.WebSocketInterface(config.webSocket);
    const configuration = {
      sockets: [socket],
      uri: "sip:" + config.extension + "@" + config.domain,
      password: config.secret,
    };
    const userAgent = new JsSIP.UA(configuration);
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
    setUserAgent(userAgent);
  }, [config]);

  useEffect(() => {
    if (config === undefined) return;
    UserAgentRegister();
  }, [UserAgentRegister, config]);

  return [userAgent, setConfig];
}
