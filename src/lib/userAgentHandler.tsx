import JsSIP from "jssip";
import { RTCSession } from "jssip/lib/RTCSession";

interface Props {
  extension: string;
  secret: string;
  websocket: string;
  domain: string;
}

export const initUserAgent = ({ extension, secret, websocket, domain }: Props) => {
  console.log({ extension, secret, websocket, domain });
  const socket = new JsSIP.WebSocketInterface(websocket);
  const configuration = {
    sockets: [socket],
    uri: "sip:" + extension + "@" + domain,
    password: secret,
  };
  return new JsSIP.UA(configuration);
};

export const eventUserAgent = (
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
    console.log("UnRegistered");
    handleStatus("Unregistered");
    handleIsRegister(false);
    console.log(event);
  });
  userAgent.on("registrationFailed", (event) => {
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

    newSession.connection.addEventListener("addstream", (event: any) => {
      const { stream } = event;
      console.log("setRemoteMediaStream", stream);
      handleRemoteStream(stream);
    });
    newSession.on("ended", () => {});
    newSession.on("confirmed", () => {});
    newSession.on("muted", () => {});
    newSession.on("unmuted", () => {});
    newSession.on("sdp", () => {});
    newSession.on("peerconnection", function () {});
    handleSession(newSession);
  });
};
