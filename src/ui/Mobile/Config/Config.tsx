import ProfileList from "@/ui/LeftBar/ProfileList";
import { useStore } from "@/store/useStore";
import { eventUserAgent, initUserAgent } from "@/lib/userAgentHandler";

export default function Config() {
  const {
    isRegistered,
    profileSelect,
    setUserAgentStatus,
    setIsRegistered,
    setRemoteMediaStream,
    setSession,
    setUserAgentData,
    mediaStreamLocal,
  } = useStore((state) => state);

  const handleRegister = async () => {
    const { extension, domain, secret, websocket } = profileSelect;

    const userAgent = initUserAgent({
      extension,
      domain,
      websocket,
      secret,
    });
    userAgent.register();
    userAgent.start();

    eventUserAgent(
      mediaStreamLocal,
      userAgent,
      (status) => setUserAgentStatus(status),
      (isRegistered) => setIsRegistered(isRegistered),
      (remoteStream) => setRemoteMediaStream(remoteStream),
      (session) => setSession(session)
    );

    setUserAgentData(userAgent);
  };

  if (!isRegistered) {
    return (
      <div className="flex flex-col gap-4 w-full p-2">
        <div>Select Profile</div>
        <ProfileList />
        <div>
          <div className="flex flex-row">
            <div className="text-sm mr-2">Domain : </div>
            <div className="text-sm">{profileSelect.domain}</div>
          </div>
          <div className="flex flex-row">
            <div className="text-sm mr-2">Websocket : </div>
            <div className="text-sm">{profileSelect.websocket}</div>
          </div>
          <div className="flex flex-row">
            <div className="text-sm mr-2">Extension : </div>
            <div className="text-sm">{profileSelect.extension}</div>
          </div>
        </div>
        <button onClick={handleRegister} className="btn btn-primary">
          UserAgent Start
        </button>
      </div>
    );
  }

  return <></>;
}
