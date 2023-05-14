import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Delete from "@/ui/Dialpad/Delete";
import Number from "@/ui/Dialpad/Number";
import Call from "@/ui/Dialpad/Call";
import { useStore } from "@/store/useStore";
import { isMobile } from "react-device-detect";
import { initUserAgent, eventUserAgent } from "@/lib/userAgentHandler";

interface Props {
  isVisible: boolean;
  setIsVisible: (arg0: boolean) => void;
}

export default function DialPad({ isVisible, setIsVisible }: Props) {
  const dialPadRef = useRef<HTMLDivElement>(null);
  const {
    userAgentData,
    mediaStreamLocal,
    iceServers,
    profileSelect,
    setUserAgentData,
    setUserAgentStatus,
    setIsRegistered,
    setRemoteMediaStream,
    setSession,
  } = useStore((state) => state);
  const { id, extension, secret, domain, websocket } = profileSelect;
  const [destination, setDestination] = useState<string>("");

  useEffect(() => {
    if (!isMobile) return;
    if (profileSelect.id === undefined) return;
    (async () => {
      const userAgent = await initUserAgent({
        extension,
        secret,
        domain,
        websocket,
      });
      userAgent.start();
      userAgent.register();
      eventUserAgent(
        userAgent,
        (status) => setUserAgentStatus(status),
        (isRegister) => setIsRegistered(isRegister),
        (remoteStream) => setRemoteMediaStream(remoteStream),
        (session) => setSession(session)
      );
      setUserAgentData(userAgent);
    })();
  }, [
    domain,
    extension,
    id,
    secret,
    websocket,
    setIsRegistered,
    setRemoteMediaStream,
    setSession,
    setUserAgentData,
    setUserAgentStatus,
    profileSelect.id,
    profileSelect.extension,
    profileSelect.secret,
    profileSelect.domain,
    profileSelect.websocket,
  ]);

  const handleClickNumber = (number: string) => {
    if (destination.length >= 10) return;
    setDestination((state) => state + number);
  };
  const handleDelete = () => {
    if (destination.length === 0) return;
    setDestination((state) => state.slice(0, -1));
  };
  const handleCall = () => {
    setUserAgentStatus("Calling");
    const options = {
      mediaStream: mediaStreamLocal,
      pcConfig: {
        iceServers: iceServers,
        iceTransportPolicy: "all",
        rtcpMuxPolicy: "require",
        iceCandidatePoolSize: 0,
      },
      sessionTimersExpires: 9999,
    };
    userAgentData.call("sip:" + destination + "@" + profileSelect.domain, options);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={dialPadRef}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed flex flex-1 flex-col justify-center items-center z-[999] bg-white w-full h-screen gap-4"
        >
          <div className="mb-4">
            <input
              className="text-4xl text-center focus:outline-none"
              type="text"
              placeholder=""
              value={destination}
              onChange={() => {}}
            />
          </div>
          <div className="flex flex-row gap-4 justify-center items-center">
            <Number number={"1"} handleClick={handleClickNumber} />
            <Number number={"2"} handleClick={handleClickNumber} />
            <Number number={"3"} handleClick={handleClickNumber} />
          </div>
          <div className="flex flex-row gap-4 justify-center items-center">
            <Number number={"4"} handleClick={handleClickNumber} />
            <Number number={"5"} handleClick={handleClickNumber} />
            <Number number={"6"} handleClick={handleClickNumber} />
          </div>
          <div className="flex flex-row gap-4 justify-center items-center">
            <Number number={"7"} handleClick={handleClickNumber} />
            <Number number={"8"} handleClick={handleClickNumber} />
            <Number number={"9"} handleClick={handleClickNumber} />
          </div>
          <div className="flex flex-row gap-4 justify-center items-center">
            <Number number={"*"} handleClick={handleClickNumber} />
            <Number number={"0"} handleClick={handleClickNumber} />
            <Number number={"#"} handleClick={handleClickNumber} />
          </div>
          <div className="flex flex-row gap-4 justify-center items-center">
            <div className="w-20"></div>
            <Call handleClick={handleCall} />
            {destination !== "" ? (
              <Delete handleClick={handleDelete} />
            ) : (
              <div className="w-20"></div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
