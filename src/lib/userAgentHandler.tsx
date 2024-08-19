import JsSIP from "jssip";
import { RTCSession } from "jssip/lib/RTCSession";
import { useStore } from "@/store/useStore";
interface Props {
  extension: string;
  secret: string;
  websocket: string;
  domain: string;
}

export const initUserAgent = ({ extension, secret, websocket, domain }: Props) => {
  const socket = new JsSIP.WebSocketInterface(websocket);
  const configuration = {
    sockets: [socket],
    uri: "sip:" + extension + "@" + domain,
    password: secret,
  };
  console.log(configuration);
  return new JsSIP.UA(configuration);
};

export const eventUserAgent = (
  mediaStreamLocal: MediaStream,
  userAgent: JsSIP.UA,
  handleStatus: (arg0: string) => void,
  handleIsRegister: (arg0: boolean) => void,
  handleRemoteStream: (arg0: MediaStream) => void,
  handleSession: (arg0: RTCSession) => void
) => {
  userAgent.on("connecting", (event) => {
    console.log(event);
    handleStatus("Connecting");
  });
  userAgent.on("registered", (event) => {
    handleStatus("Registered");
    handleIsRegister(true);
    console.log(event);
  });
  userAgent.on("unregistered", (event) => {
    if (event.cause !== null) {
      alert(event.cause);
    }
    console.log("UnRegistered");
    handleStatus("Unregistered");
    handleIsRegister(false);
    console.log(event);
  });
  userAgent.on("registrationFailed", (event) => {
    if (event.cause !== null) {
      alert(event.cause);
    }
    console.log("RegistrationFailed");
    handleStatus("RegistrationFailed");
    handleIsRegister(false);
    userAgent.stop();
    console.log(event);
  });
  userAgent.on("disconnected", (event) => {
    console.log("Disconnected");
    handleStatus("Disconnected");
    handleIsRegister(false);
    userAgent.stop();
    console.log(event);
  });
  userAgent.on("newRTCSession", (ev1: any) => {
    let newSession: RTCSession = ev1.session;
    console.log("direction", newSession.direction);
    if (newSession.direction === "incoming") {
      const option = {
        mediaStream: mediaStreamLocal,
        pcConfig: {
          iceServers: [
            {
              urls: "turn:turn.kasemsan.net:3478?transport=tcp",
              username: "turn01",
              credential: " Test1234",
            },
          ],
        },
        sessionTimersExpires: 9999,
      };
      newSession.answer(option);

      inComingCall(newSession);
    }
    if (newSession.direction === "outgoing" && newSession.connection !== null) {
      newSession.connection.addEventListener("addstream", (event: any) => {
        const { stream } = event;
        console.log("outgoing setRemoteMediaStream", stream);
        handleRemoteStream(stream);
      });
    }

    newSession.on("ended", () => {
      console.log("ended");
    });
    newSession.on("confirmed", (ev: any) => {
      // console.log("confirmed");
    });
    newSession.on("muted", () => {});
    newSession.on("unmuted", () => {});
    newSession.on("sdp", () => {});
    newSession.on("peerconnection", function () {
      console.log("peerconnection");
    });
    handleSession(newSession);
  });
  const inComingCall = (session: RTCSession) => {
    console.log("inComingCall session", session);
    session.connection.addEventListener("addstream", (event: any) => {
      const { stream } = event;
      console.log("incoming setRemoteMediaStream", stream);
      handleRemoteStream(stream);
    });
    session.on("progress", () => {});
    session.on("accepted", () => {});
    session.on("connecting", () => {
      console.log("inCommingCall call is in connecting ...");
    });
    session.on("confirmed", () => {
      console.log("confirmed");
    });
    session.on("ended", () => {});
    session.on("failed", () => {});
    session.on("peerconnection", (e) => {});
  };
};
