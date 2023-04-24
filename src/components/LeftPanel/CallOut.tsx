import { MdDialerSip } from "react-icons/md";
import { useAppSelector } from "@/redux/store";
import { Sess } from "jssip";

export default function CallOut() {
  const userAgent: any = useAppSelector((state) => state.userAgent);

  const HandleCallOut = () => {};
  const HandleHangUp = () => {};

  const callOut = () => {
    if (userAgent === null) return;
    userAgent.on("newRTCSession", (ev1: any) => {
      const callID = ev1.request.call_id;
      console.log(" *** newRTCSession", ev1.originator, ev1.request.method, ev1);
      const newSession = ev1.session;
      newSession.on("ended", (event) => {
        console.log("ended", callID);
        setRemoteStream((remoteStream) => remoteStream.filter((data) => data.callID !== callID));
        setSessionData((sessionData) => sessionData.filter((data) => data.callID !== callID));
      });
      newSession.on("confirmed", function () {
        console.log("add localVideo");
        callOutRef.current.classList.replace("fixed", "hidden");
      });
      newSession.on("muted", function (event) {
        if (event.video) {
          setLocalVideoStatus((prevState) => ({ ...prevState, video: true }));
        }
        if (event.audio) {
          setLocalVideoStatus((prevState) => ({ ...prevState, audio: true }));
        }
      });
      newSession.on("unmuted", (event) => {
        if (event.video) {
          setLocalVideoStatus((prevState) => ({ ...prevState, video: false }));
        }
        if (event.audio) {
          setLocalVideoStatus((prevState) => ({ ...prevState, audio: false }));
        }
      });
      newSession.on("addstream", (event) => {
        console.log(event);
      });
      newSession.on("sdp", (event) => {
        // event.sdp = event.sdp.replace("SAVPF", "AVPF");
        // event.sdp = event.sdp.replace("SAVPF", "AVPF");
        // console.log(event.sdp);
      });
      newSession.on("peerconnection", function (ev2) {
        console.log(ev2);
        ev2.peerconnection.onaddstream = function (event) {
          console.log(event.stream);
          setRemoteStream((remoteStream) => [
            ...remoteStream,
            {
              callID: callID,
              stream: event.stream,
            },
          ]);
        };
        ev2.peerconnection.onremovestream = function (ev3) {
          console.log("setRemoteStream");
          setRemoteStream((remoteStream) => remoteStream.filter((data) => data.callID !== callID));
          setSessionData((sessionData) => sessionData.filter((data) => data.callID !== callID));
        };
      });
    });
  };

  return (
    <>
      <div className="flex items-center justify-around gap-1">
        <span className="w-[30px]">
          <MdDialerSip style={{ width: "30px", height: "30px" }} />
        </span>
        <input type="text" placeholder="Call Number" className="input w-full max-w-xs" />
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
