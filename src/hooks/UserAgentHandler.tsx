import JsSIP from "jssip";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setUserAgent } from "@/redux/slices/userAgentSlice";

export default function UserAgentHandler() {
  const dispatch = useAppDispatch();
  const profileSelect = useAppSelector((state) => state.profileSelect);
  const [userAgent, setUA] = useState<JsSIP.UA>();
  const [status, setStatus] = useState<string | undefined>();

  useEffect(() => {
    if (
      profileSelect.websocket !== "" &&
      profileSelect.extension !== "" &&
      profileSelect.domain !== "" &&
      profileSelect.extension !== "" &&
      profileSelect.secret !== ""
    ) {
      const socket = new JsSIP.WebSocketInterface(profileSelect.websocket);
      const configuration = {
        sockets: [socket],
        uri: "sip:" + profileSelect.extension + "@" + profileSelect.domain,
        password: profileSelect.secret,
        traceSip: true,
      };
      setUA(new JsSIP.UA(configuration));
    }
  }, [profileSelect]);

  const handleRegister = () => {
    console.log("Register", profileSelect.extension);
    console.log(userAgent);
    console.log(status);
    if (userAgent === undefined) return;
    if (status === "registered") userAgent.unregister();
    userAgent.start();
    userAgent.register();

    userAgent.on("connecting", (event) => {
      setStatus("Connecting");
      console.log("connecting");
      console.log(event);
    });
    userAgent.on("registered", (event) => {
      console.log("registered");
      setStatus("Registered");
      console.log(event);
    });
    userAgent.on("unregistered", (event) => {
      console.log("UnRegistered");
      setStatus("unregistered");
      console.log(event);
    });
    userAgent.on("registrationFailed", (event) => {
      console.log("RegistrationFailed");
      setStatus("registrationFailed");
      console.log(event);
    });
    userAgent.on("disconnected", (event) => {
      console.log("Disconnected");
      setStatus("disconnected");
      console.log(event);
    });
    dispatch(setUserAgent(userAgent));
  };
  const handleUnRegister = () => {
    if (userAgent !== undefined) userAgent.unregister();
  };

  return [userAgent, status, handleRegister, handleUnRegister];
}
