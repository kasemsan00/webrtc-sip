import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Call from "@/ui/Mobile/Dialpad/Call";
import { useStore } from "@/store/useStore";
import { MdSettings, MdBackspace } from "react-icons/md";

const Number = ({
  number,
  handleClick,
}: {
  number: string;
  handleClick: (arg0: string) => void;
}) => {
  return (
    <motion.button
      onClick={() => handleClick(number)}
      className="flex justify-center items-center rounded-full w-20 h-20 text-3xl cursor-pointer
      bg-gray-200
      active:bg-gray-300
      "
      whileTap={{ scale: 0.9 }}
    >
      {number}
    </motion.button>
  );
};

const ActionButton = ({
  children,
  handleClick,
}: {
  children: React.ReactNode;
  handleClick: () => void;
}) => {
  return (
    <motion.button
      onClick={handleClick}
      className="flex justify-center items-center rounded-full w-20 h-20 text-3xl cursor-pointer "
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.button>
  );
};

export default function DialPad() {
  const dialPadRef = useRef<HTMLDivElement>(null);
  const { userAgentData, mediaStreamLocal, iceServers, profileSelect, setUserAgentStatus } =
    useStore((state) => state);
  const [destination, setDestination] = useState<string>("");

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
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed top-0 flex flex-1 flex-col justify-center items-center z-[999] bg-white w-full h-screen gap-4
        md:hidden
        "
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
          <ActionButton handleClick={handleDelete}>
            <MdSettings className="text-gray-400" />
          </ActionButton>
          <Call handleClick={handleCall} />
          {destination !== "" ? (
            <ActionButton handleClick={handleDelete}>
              <MdBackspace className="text-gray-400" />
            </ActionButton>
          ) : (
            <div className="w-20"></div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
