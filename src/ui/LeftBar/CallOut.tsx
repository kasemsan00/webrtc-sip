import { MdDialerSip } from "react-icons/md";
import { useStore } from "@/store/useStore";
import useLocalStorageState from "use-local-storage-state";
import React from "react";

export default function CallOut() {
  const {
    isRegistered,
    iceServer,
    session,
    mediaStreamLocal,
    userAgentData,
    setUserAgentStatus,
    setRemoteMediaStream,
  } = useStore((state) => state);

  const { turn } = useStore((state) => state);
  const { domain } = useStore((state) => state.profileSelect);
  const [destination, setDestination] = useLocalStorageState("", {
    defaultValue: "",
  });

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
        // alert(data.cause);
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

    // let iceServers: Array<IceServers> = [];
    // if (turn) {
    //   iceServers = [
    //     {
    //       urls: "turn:turn-ttrs.ttrs.in.th?transport=tcp",
    //       username: "turn01",
    //       credential: "Test1234",
    //     },
    //     {
    //       urls: "turn:turn.ttrs.in.th?transport=tcp",
    //       username: "turn01",
    //       credential: "Test1234",
    //     },
    //   ];
    // }
    const options = {
      eventHandlers,
      mediaStream: mediaStreamLocal,
      pcConfig: {
        iceServers: turn ? iceServer : undefined,
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
      <div className="form-control flex items-center justify-around gap-1">
        <label className="input-group">
          <span>
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
        </label>
      </div>
      <button className="btn btn-success" onClick={HandleCallOut} disabled={!isRegistered}>
        Call
      </button>
      <button className="btn btn-warning" onClick={HandleHangUp} disabled={!isRegistered}>
        HangUp
      </button>
    </>
  );
}
