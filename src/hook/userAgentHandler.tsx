import JsSIP from "jssip";
import { useEffect, useState } from "react";
import { RTCSession } from "jssip/lib/RTCSession";
import { useStore } from "@/store/useStore";

export default function UserAgentHandler() {
  const { profileSelect, setRemoteMediaStream, setSession, setUserAgentData, setUserAgentStatus, setIsRegistered } = useStore(
    (state) => state
  );
  const [userAgent, setUA] = useState<JsSIP.UA>();
  const [status, setStatus] = useState<string | undefined>();

  useEffect(() => {
    if (status !== undefined) {
      setUserAgentStatus(status);
    }
  }, [setUserAgentStatus, status]);

  useEffect(() => {
    try {
      const socket = new JsSIP.WebSocketInterface(profileSelect.websocket);
      const configuration = {
        sockets: [socket],
        uri: "sip:" + profileSelect.extension + "@" + profileSelect.domain,
        password: profileSelect.secret,
      };
      setUA(new JsSIP.UA(configuration));
    } catch (e) {
      // console.log(e);
    }
  }, [profileSelect.domain, profileSelect.extension, profileSelect.secret, profileSelect.websocket]);

  const handleRegister = () => {
    console.log("Register", profileSelect.extension);
    if (status === "registered") userAgent?.unregister();
    if (userAgent === undefined) return;

    console.log("init");
    userAgent?.start();
    userAgent?.register();
    userAgent.on("connecting", (event) => {
      setStatus("Connecting");
      console.log("connecting");
      console.log(event);
    });
    userAgent.on("registered", (event) => {
      console.log("registered");
      setStatus("Registered");
      setIsRegistered(true);
      console.log(event);
    });
    userAgent.on("unregistered", (event) => {
      console.log("UnRegistered");
      setStatus("Unregistered");
      setIsRegistered(false);
      console.log(event);
    });
    userAgent.on("registrationFailed", (event) => {
      console.log("RegistrationFailed");
      setStatus("RegistrationFailed");
      setIsRegistered(false);
      userAgent.stop();
      console.log(event);
    });
    userAgent.on("disconnected", (event) => {
      console.log("Disconnected");
      setStatus("Disconnected");
      setIsRegistered(false);
      userAgent.stop();
      console.log(event);
    });
    userAgent.on("newRTCSession", (ev1: any) => {
      let newSession: RTCSession = ev1.session;

      newSession.connection.addEventListener("addstream", (event: any) => {
        const { stream } = event;
        console.log("setRemoteMediaStream", stream);
        setRemoteMediaStream(stream);
      });
      newSession.on("ended", () => {});
      newSession.on("confirmed", function () {});
      newSession.on("muted", function (event) {});
      newSession.on("unmuted", (event) => {});
      newSession.on("sdp", () => {});
      newSession.on("peerconnection", function () {});
      setSession(newSession);
    });
    setUserAgentData(userAgent);
    console.log("setUserAgent Data");
  };
  const handleUnRegister = () => {
    if (userAgent !== undefined) userAgent.unregister();
  };

  return [status, handleRegister, handleUnRegister, userAgent] as const;
}
