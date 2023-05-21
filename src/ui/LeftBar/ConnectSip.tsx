import { useStore } from "@/store/useStore";
import { eventUserAgent, initUserAgent } from "@/lib/userAgentHandler";

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
  } = useStore((state) => state);
  const { id, extension, secret, domain, websocket } = profileSelect;

  const UserRegister = async () => {
    if (id === undefined) return;
    const userAgent = await initUserAgent({
      extension,
      secret,
      domain,
      websocket,
    });
    setUserAgentData(userAgent);
    userAgent.start();
    userAgent.register();
    eventUserAgent(
      userAgent,
      (status) => setUserAgentStatus(status),
      (isRegistered) => setIsRegistered(isRegistered),
      (remoteStream) => setRemoteMediaStream(remoteStream),
      (session) => setSession(session)
    );
  };
  const UserUnregister = () => {
    userAgentData.unregister();
  };

  return (
    <>
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
