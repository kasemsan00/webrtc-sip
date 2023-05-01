import { MdDialerSip } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { RTCSession } from "jssip/lib/RTCSession";
import { useState } from "react";
import { setRemoteStream } from "@/redux/slices/mediaStreamRemoteSlice";
let newSession: RTCSession;

export default function CallOut() {
  const dispatch = useAppDispatch();
  const userAgent: any = useAppSelector((state) => state.userAgent);
  const mediaStream = useAppSelector((state) => state.mediaStreamLocal);
  const { domain } = useAppSelector((state) => state.profileSelect);

  const [destination, setDestination] = useState("");

  const HandleCallOut = () => {
    callOut();
  };
  const HandleHangUp = () => {
    try {
      newSession.terminate();
    } catch (e) {
      console.log(e);
    }
  };

  const callOut = () => {
    if (userAgent === null) return;
    userAgent.on("newRTCSession", (ev1: any) => {
      const callID = ev1.request.call_id;
      // console.log(" *** newRTCSession", ev1.originator, ev1.request.method, ev1);
      newSession = ev1.session;

      newSession.connection.addEventListener("addstream", (event: any) => {
        const { stream } = event;
        dispatch(setRemoteStream(stream));
      });
      newSession.on("ended", (event) => {
        console.log("ended", callID);
        // setRemoteStream((remoteStream) => remoteStream.filter((data) => data.callID !== callID));
        // setSessionData((sessionData) => sessionData.filter((data) => data.callID !== callID));
      });
      newSession.on("confirmed", function () {
        console.log("add localVideo");
        // callOutRef.current.classList.replace("fixed", "hidden");
      });
      newSession.on("muted", function (event) {
        if (event.video) {
          // setLocalVideoStatus((prevState) => ({ ...prevState, video: true }));
        }
        if (event.audio) {
          // setLocalVideoStatus((prevState) => ({ ...prevState, audio: true }));
        }
      });
      newSession.on("unmuted", (event) => {
        if (event.video) {
          // setLocalVideoStatus((prevState) => ({ ...prevState, video: false }));
        }
        if (event.audio) {
          // setLocalVideoStatus((prevState) => ({ ...prevState, audio: false }));
        }
      });
      // newSession.on("addstream", (event) => {});
      newSession.on("sdp", (event) => {});
      newSession.on("peerconnection", function (ev2) {
        // console.log(ev2);
        // ev2.peerconnection.onaddstream = function (event) {
        //   console.log(event.stream);
        // };
        // ev2.peerconnection.addEventListener("onaddstream", (event) => {
        //   // console.log(event.stream)
        // })
        // ev2.peerconnection.onremovestream = function (ev3) {
        //   console.log("setRemoteStream");
        //   setRemoteStream((remoteStream) => remoteStream.filter((data) => data.callID !== callID));
        //   setSessionData((sessionData) => sessionData.filter((data) => data.callID !== callID));
        // };
      });
    });

    const options = {
      mediaStream,
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
          onChange={(event) => setDestination(event.target.value)}
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
