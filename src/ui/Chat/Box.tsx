import React, { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/useStore";

interface IMessageData {
  user: string;
  message: string;
}

export default function Box() {
  const [input, setInput] = useState("");
  const { session, userAgentData } = useStore((state) => state);
  const { domain } = useStore((state) => state.profileSelect);
  const [messageData, setMessageData] = useState<Array<IMessageData>>([]);

  useEffect(() => {
    if (userAgentData === null) return;
    if (userAgentData === undefined) return;
    userAgentData.on("newMessage", (event: any) => {
      console.log(event);
      if (event.originator === "remote") {
      }
    });
  }, [userAgentData]);
  const handleSendMessage = () => {
    setInput("");
    if (userAgentData === null) return;
    const destination = session.remote_identity.uri.user;
    userAgentData.sendMessage("sip:" + destination + "@" + domain, input);
    const obj = {
      user: "local",
      message: input,
    };
    setMessageData([...messageData, obj]);
  };

  return (
    <div className="bottom-0 border border-gray-400 w-full h-62 rounded-md">
      <div className="bg-white rounded-t-md px-2">Chat</div>
      <div className="bg-gray-100 max-h-40 h-40 overflow-auto overflow-y-scroll w-full flex flex-col items-start justify-end p-2">
        {messageData.map((item: IMessageData, index: number) => (
          <div key={index}>{item.message}</div>
        ))}
      </div>
      <input
        className="w-full p-2 z-20 h-10 rounded-b-md border-t focus:outline-none"
        type="text"
        onChange={(event) => {
          setInput(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSendMessage();
          }
        }}
        value={input}
      />
    </div>
  );
}
