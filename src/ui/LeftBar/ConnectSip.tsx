import { useStore } from "@/store/useStore";
import { eventUserAgent, initUserAgent } from "@/lib/userAgentHandler";
import { useEffect, useRef } from "react";

export default function ConnectSip() {
  const {
    isRegistered,
    userAgentData,
    profileSelect,
    setUserAgentData,
    setUserAgentStatus,
    setIsRegistered,
    setRemoteMediaStream,
    setSession,
    mediaStreamLocal,
  } = useStore((state) => state);
  const { id, extension, secret, domain, websocket } = profileSelect;
  const UserRegister = async () => {
    if (id === undefined) return;
    const userAgent = initUserAgent({
      extension,
      secret,
      domain,
      websocket,
    });
    setUserAgentData(userAgent);
    userAgent.start();
    userAgent.register();
    eventUserAgent(
      mediaStreamLocal,
      userAgent,
      (status) => setUserAgentStatus(status),
      (isRegistered) => setIsRegistered(isRegistered),
      (remoteStream) => setRemoteMediaStream(remoteStream),
      (session) => setSession(session)
    );
  };
  const UserUnregister = () => userAgentData.unregister();
  // const testRef = useRef<HTMLVideoElement>(null);
  // useEffect(() => {
  //   testRef.current.srcObject = mediaStreamLocal;
  // }, [mediaStreamLocal]);
  return (
    <>
      {/*<video ref={testRef} className="w-20 h-20 bg-black" autoPlay playsInline></video>*/}
      {isRegistered && (
        <button className="btn btn-error" onClick={UserUnregister}>
          Disconnect
        </button>
      )}
      {!isRegistered && (
        <button className="btn btn-success" onClick={UserRegister}>
          Register
        </button>
      )}
    </>
  );
}
