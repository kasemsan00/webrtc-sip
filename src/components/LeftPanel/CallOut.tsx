import { MdDialerSip } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { setRemoteStream } from "@/redux/slices/mediaStreamRemoteSlice";
import { setUserAgentStatus } from "@/redux/slices/userAgentStatusSlice";

export default function CallOut() {
  const dispatch = useAppDispatch();

  const session = useAppSelector((state) => state.session);
  const userAgent: any = useAppSelector((state) => state.userAgent);
  const mediaStream = useAppSelector((state) => state.mediaStreamLocal);
  const { domain } = useAppSelector((state) => state.profileSelect);
  const [destination, setDestination] = useState("");
  useEffect(() => {
    if (userAgent === null) return;
    console.log("init UA");
  }, [dispatch, mediaStream, userAgent]);

  const HandleCallOut = () => {
    callOut();
  };
  const HandleHangUp = () => {
    try {
      session.terminate();
      dispatch(setRemoteStream(null));
    } catch (e) {
      console.log(e);
    }
  };

  const callOut = () => {
    dispatch(setUserAgentStatus("Calling"));
    const eventHandlers = {
      progress: function (data: any) {
        console.log(data);
        /* Your code here */
      },
      failed: function (data: any) {
        console.log(data);
        dispatch(setUserAgentStatus(data.cause));
        alert(data.cause);
        /* Your code here */
      },
      confirmed: function (data: any) {
        console.log(data);
        /* Your code here */
      },
      ended: function (data: any) {
        console.log(data);
        dispatch(setUserAgentStatus(data.cause));
        /* Your code here */
      },
    };
    const options = {
      eventHandlers,
      mediaStream,
      pcConfig: {
        iceServers: [{ urls: "turn:turn.ttrs.in.th?transport=tcp", username: "turn01", credential: "Test1234" }],
        iceTransportPolicy: "all",
        rtcpMuxPolicy: "require",
        iceCandidatePoolSize: 0,
      },
      sessionTimersExpires: 9999,
    };
    userAgent.call("sip:" + destination + "@" + domain, options);
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
          className="input w-full max-w-xs"
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
