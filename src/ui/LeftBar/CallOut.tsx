import { MdDialerSip } from "react-icons/md";
import { useState } from "react";
import { useStore } from "@/store/useStore";

export default function CallOut() {
  const { session, mediaStreamLocal, userAgentData, setUserAgentStatus, setRemoteMediaStream } = useStore((state) => state);

  const { turn } = useStore((state) => state);
  const { domain } = useStore((state) => state.profileSelect);
  const [destination, setDestination] = useState("");

  const HandleCallOut = () => callOut();
  const HandleHangUp = () => {
    try {
      session.terminate();
      setRemoteMediaStream(null);
    } catch (e) {
      console.log(e);
    }
  };

  const callOut = () => {
    if (destination.trim() === "") return;
    setUserAgentStatus("Calling");

    const eventHandlers = {
      progress: function (data: any) {
        console.log(data);
        /* Your code here */
      },
      failed: function (data: any) {
        console.log(data);
        setUserAgentStatus(data.cause);
        alert(data.cause);
        /* Your code here */
      },
      confirmed: function (data: any) {
        console.log(data);
        /* Your code here */
      },
      ended: function (data: any) {
        console.log(data);
        setUserAgentStatus(data.cause);
        /* Your code here */
      },
    };

    let iceServers: any = [];
    if (turn) {
      iceServers = [
        {
          urls: "turn:test-local3.ttrs.in.th?transport=tcp",
          username: "turn01",
          credential: "Test1234",
        },
      ];
    }

    const options = {
      eventHandlers,
      mediaStreamLocal,
      pcConfig: {
        iceServers: iceServers,
        iceTransportPolicy: "all",
        rtcpMuxPolicy: "require",
        iceCandidatePoolSize: 0,
      },
      sessionTimersExpires: 9999,
    };
    userAgentData.call("sip:" + destination + "@" + domain, options);
  };

  return (
    <>
      <div className="flex items-center justify-around gap-1">
        <span className="w-[30px]">
          <MdDialerSip style={{ width: "30px", height: "30px" }} />
        </span>
        <input
          type="text"
          placeholder="Call Number"
          className="input w-full focus:outline-none"
          value={destination}
          onChange={(event) => {
            setDestination(event.target.value);
          }}
        />
      </div>
      <button className="btn btn-success" onClick={HandleCallOut}>
        Call
      </button>
      <button className="btn btn-warning" onClick={HandleHangUp}>
        HangUp
      </button>
    </>
  );
}
