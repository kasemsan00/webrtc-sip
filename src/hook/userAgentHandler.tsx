import JsSIP from "jssip";
import { useEffect, useState } from "react";
import { RTCSession } from "jssip/lib/RTCSession";
import { useStore } from "@/store/useStore";

export default function UserAgentHandler() {
  const { profileSelect, setRemoteMediaStream, setSession, setUserAgentData, setUserAgentStatus } = useStore((state) => state);
  const [userAgent, setUA] = useState<JsSIP.UA>();
  const [status, setStatus] = useState<string | undefined>();

  useEffect(() => {
    if (status !== undefined) {
      setUserAgentStatus(status);
    }
  }, [setUserAgentStatus, status]);

  useEffect(() => {
    // if (
    //   profileSelect.websocket === null ||
    //   profileSelect.extension === null ||
    //   profileSelect.domain === null ||
    //   profileSelect.secret === null
    // ) {
    //   return;
    // }
    // if (
    //   profileSelect.websocket === "" ||
    //   profileSelect.extension === "" ||
    //   profileSelect.domain === "" ||
    //   profileSelect.secret === ""
    // ) {
    //   return;
    // }
    try {
      const socket = new JsSIP.WebSocketInterface(profileSelect.websocket);
      const configuration = {
        sockets: [socket],
        uri: "sip:" + profileSelect.extension + "@" + profileSelect.domain,
        password: profileSelect.secret,
        traceSip: true,
      };
      setUA(new JsSIP.UA(configuration));
    } catch (e) {
      // console.log(e);
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
      setStatus("Unregistered");
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
    userAgent.on("newRTCSession", (ev1: any) => {
      const callID = ev1.request.call_id;
      // console.log(" *** newRTCSession", ev1.originator, ev1.request.method, ev1);
      let newSession: RTCSession = ev1.session;

      newSession.connection.addEventListener("addstream", (event: any) => {
        const { stream } = event;
        setRemoteMediaStream(stream);
      });
      newSession.on("ended", () => {
        console.log("ended", callID);
        // setRemoteStream((remoteStream) => remoteStream.filter((data) => data.callID !== callID));
        // setSessionData((sessionData) => sessionData.filter((data) => data.callID !== callID));
      });
      newSession.on("confirmed", function () {
        console.log("add localVideo");
        // callOutRef.current.classList.replace("fixed", "hidden");
      });
      newSession.on("muted", function (event) {
        if (event.video) {
          // setLocalVideoStatus((prevState) => ({ ...prevState, video: true }));
        }
        if (event.audio) {
          // setLocalVideoStatus((prevState) => ({ ...prevState, audio: true }));
        }
      });
      newSession.on("unmuted", (event) => {
        if (event.video) {
          // setLocalVideoStatus((prevState) => ({ ...prevState, video: false }));
        }
        if (event.audio) {
          // setLocalVideoStatus((prevState) => ({ ...prevState, audio: false }));
        }
      });
      // newSession.on("addstream", (event) => {});
      newSession.on("sdp", () => {});
      newSession.on("peerconnection", function () {
        // console.log(ev2);
        // ev2.peerconnection.onaddstream = function (event) {
        //   console.log(event.stream);
        // };
        // ev2.peerconnection.addEventListener("onaddstream", (event) => {
        //   // console.log(event.stream)
        // })
        // ev2.peerconnection.onremovestream = function (ev3) {
        //   console.log("setRemoteStream");
        //   setRemoteStream((remoteStream) => remoteStream.filter((data) => data.callID !== callID));
        //   setSessionData((sessionData) => sessionData.filter((data) => data.callID !== callID));
        // };
      });
      setSession(newSession);
    });
    setUserAgentData(userAgent);
  };
  const handleUnRegister = () => {
    if (userAgent !== undefined) userAgent.unregister();
  };

  return [status, handleRegister, handleUnRegister];
}
