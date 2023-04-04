import { useEffect, useRef, useState } from "react";
import { isChrome, isFirefox, isIOS, isSafari } from "react-device-detect";
import JsSIP from "jssip";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterStatus } from "@/redux/slices/registerStatusSlice";
// import CodecHandler from "../middleware/CodecHandler";
import { setProxyPassword, setProxyServer, setProxyUrl, setProxyUsername } from "@/redux/slices/proxyServerSlice";
import { setBundlePolicy, setIceCandidatePoolSize, setIceTransportPolicy, setRtcpMuxPolicy } from "@/redux/slices/pcConfigSlice";

let userAgent: JsSIP.UA;
let newSession: any = null;

export default function SipMain() {
  const dispatch = useDispatch();

  const proxyServer = useSelector((state) => state.proxyServer);
  const pcConfigSetting = useSelector((state) => state.pcConfig);
  const registerStatus = useSelector((state) => state.registerStatus);
  const profileSelect = useSelector((state) => state.profileSelect);
  const profileData = useSelector((state) => state.profileData);
  const mediaStream = useSelector((state) => state.mediaStream);
  const callOutRef = useRef(null);

  const [destination, setDestination] = useState("");
  const [sessionData, setSessionData] = useState([]);
  const [remoteStream, setRemoteStream] = useState([]);
  const [localVideoStatus, setLocalVideoStatus] = useState({ video: false, audio: false });

  useEffect(() => {
    if (localStorage.getItem("destination") !== null) {
      setDestination(localStorage.getItem("destination"));
    }

    const pcConfig = {
      iceTransportPolicy: "all",
      rtcpMuxPolicy: "require",
      bundlePolicy: "balanced",
      iceCandidatePoolSize: 0,
    };

    if (localStorage.getItem("iceTransportPolicy") === null) {
      dispatch(setIceTransportPolicy(pcConfig.iceTransportPolicy));
      localStorage.setItem("iceTransportPolicy", pcConfig.iceTransportPolicy);
    } else {
      dispatch(setIceTransportPolicy(localStorage.getItem("iceTransportPolicy")));
    }
    if (localStorage.getItem("rtcpMuxPolicy") === null) {
      dispatch(setRtcpMuxPolicy(pcConfig.rtcpMuxPolicy));
      localStorage.setItem("rtcpMuxPolicy", pcConfig.rtcpMuxPolicy);
    } else {
      dispatch(setRtcpMuxPolicy(localStorage.getItem("rtcpMuxPolicy")));
    }
    if (localStorage.getItem("bundlePolicy") === null) {
      dispatch(setBundlePolicy(pcConfig.bundlePolicy));
      localStorage.setItem("bundlePolicy", pcConfig.bundlePolicy);
    } else {
      dispatch(setBundlePolicy(localStorage.getItem("bundlePolicy")));
    }
    if (localStorage.getItem("iceCandidatePoolSize") === null) {
      dispatch(setIceCandidatePoolSize(pcConfig.iceCandidatePoolSize));
      localStorage.setItem("iceCandidatePoolSize", pcConfig.iceCandidatePoolSize);
    } else {
      dispatch(setIceCandidatePoolSize(localStorage.getItem("iceCandidatePoolSize")));
    }
    if (localStorage.getItem("proxyServer") === null) {
      const init = {
        type: "turn",
        url: "turn:turn.ttrs.in.th?transport=tcp",
        username: "turn01",
        password: "Test1234",
      };
      dispatch(setProxyServer(init.type));
      dispatch(setProxyUrl(init.url));
      dispatch(setProxyUsername(init.username));
      dispatch(setProxyPassword(init.password));
      localStorage.setItem("proxyServer", init.type);
      localStorage.setItem("proxyUrl", init.url);
      localStorage.setItem("proxyUsername", init.username);
      localStorage.setItem("proxyPassword", init.password);
    } else {
      dispatch(setProxyServer(localStorage.getItem("proxyServer")));
      dispatch(setProxyUrl(localStorage.getItem("proxyUrl")));
      dispatch(setProxyUsername(localStorage.getItem("proxyUsername")));
      dispatch(setProxyPassword(localStorage.getItem("proxyPassword")));
    }
  }, [dispatch]);

  useEffect(() => {
    const table = {
      iOS: isIOS,
      Safari: isSafari,
      Chrome: isChrome,
      Firefox: isFirefox,
    };
    console.table(table);
  }, []);

  const registerSip = () => {
    console.log("registerSip");
    const socket = new JsSIP.WebSocketInterface(profileData[profileSelect].websocket);
    const configuration = {
      sockets: [socket],
      uri: "sip:" + profileData[profileSelect].extension + "@" + profileData[profileSelect].server,
      password: profileData[profileSelect].password,
      traceSip: true,
    };

    userAgent = new JsSIP.UA(configuration);
    userAgent.start();
    dispatch(setRegisterStatus("registerProcess"));

    userAgent.on("connecting", (event) => {
      console.log("connecting");
      console.log(event);
      dispatch(setRegisterStatus("connecting"));
    });
    userAgent.on("registered", (event) => {
      console.log("registered");
      console.log(event);
      dispatch(setRegisterStatus("registered"));
    });
    userAgent.on("unregistered", (event) => {
      console.log("unregistered");
      console.log(event);
      dispatch(setRegisterStatus("unregistered"));
    });
    userAgent.on("registrationFailed", (event) => {
      console.log("registrationFailed");
      console.log(event);
      dispatch(setRegisterStatus("registrationFailed"));
    });
    userAgent.on("disconnected", (event) => {
      console.log("disconnected");
      console.log(event);
      dispatch(setRegisterStatus("disconnected"));
    });

    userAgent.on("newRTCSession", (ev1) => {
      const callID = ev1.request.call_id;
      console.log(" *** newRTCSession", ev1.originator, ev1.request.method, ev1);
      let view = false;

      newSession = ev1.session;

      if (ev1.originator === "local") {
        newSession.connection.addEventListener("addstream", (event) => {
          console.log("SetCodec");
          if (isSafari) {
            const transceiver = event.currentTarget.getTransceivers().find((t) => t.sender && t.sender.track === mediaStream.getVideoTracks()[0]);
            const codecs = [
              {
                clockRate: 90000,
                mimeType: "video/H264",
                sdpFmtpLine: "level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f",
              },
            ];
            console.log("setCodec", codecs);
            transceiver.setCodecPreferences(codecs);
          }
          if (isChrome) {
            const transceiver = event.currentTarget.getTransceivers().find((t) => t.sender && t.sender.track === mediaStream.getVideoTracks()[0]);
            const codecs = [
              {
                clockRate: 90000,
                mimeType: "video/H264",
                sdpFmtpLine: "level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f",
              },
            ];
            console.log("setCodec", codecs);
            transceiver.setCodecPreferences(codecs);
          }

          const video_track = mediaStream.getVideoTracks()[0];
          const audio_track = mediaStream.getAudioTracks()[0];
          let testVideoMediaStream = new MediaStream();
          testVideoMediaStream.addTrack(video_track);
          let testAudioMediaStream = new MediaStream();
          testAudioMediaStream.addTrack(audio_track);

          setRemoteStream((remoteStream) => [
            ...remoteStream,
            {
              callID: callID,
              stream: testVideoMediaStream,
              steamAudio: testAudioMediaStream,
            },
          ]);
        });
      } else if (ev1.originator === "remote") {
        view = true;
      }
      setSessionData((sessionData) => [
        ...sessionData,
        {
          callID: callID,
          displayName: ev1.request.from._uri._user,
          session: ev1,
          view: view,
        },
      ]);

      newSession.on("ended", (event) => {
        console.log("ended", callID);
        setRemoteStream((remoteStream) => remoteStream.filter((data) => data.callID != callID));
        setSessionData((sessionData) => sessionData.filter((data) => data.callID != callID));
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
        console.log(event);
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

  const sipCall = () => {
    if (registerStatus !== "registered") return null;
    var eventHandlers = {
      progress: (e) => {
        callOutRef.current.innerText = "Call " + destination;
        console.log("call is in progress");
      },
      failed: (e) => {
        callOutRef.current.innerText = e.cause;
        console.log("call failed with cause: " + e);
      },
      ended: (event) => {
        console.log(event);
        // remoteVideoRef.current.classList.add("hidden");
      },
      confirmed: (e) => {
        console.log("call confirmed", e);
        callOutRef.current.innerText = "";
        console.log("add localVideo");
      },
      muted: (e) => {
        console.log("muted", e);
        if (e.video) {
          setLocalVideoStatus((prevState) => ({ ...prevState, video: true }));
        }
        if (e.audio) {
          setLocalVideoStatus((prevState) => ({ ...prevState, audio: true }));
        }
      },
      unmuted: (e) => {
        if (e.video) {
          setLocalVideoStatus((prevState) => ({ ...prevState, video: false }));
        }
        if (e.audio) {
          setLocalVideoStatus((prevState) => ({ ...prevState, audio: false }));
        }
      },
      peerconnection: (pc) => {
        console.log(pc.peerconnection);
        // const transceiver = pc.peerconnection.getTransceivers().find((t) => t.sender && t.sender.track === localStream.getVideoTracks()[0]);
        // console.log(pc.peerconnection);
        // transceiver.setCodecPreferences(localStorage.getItem("codec"));
      },
    };

    const options = {
      eventHandlers: eventHandlers,
      mediaStream: mediaStream,
      pcConfig: pcConfig(),
      sessionTimersExpires: 9999,
    };
    console.log(options);
    userAgent.call("sip:" + destination + "@" + profileData[profileSelect].server, options);
  };

  const pcConfig = () => {
    const { type, url, username, password } = proxyServer;
    let iceServers = {};
    if (type === "turn") {
      iceServers = [{ urls: url, username: username, credential: password }];
    }
    if (type === "stun") {
      iceServers = [{ urls: url }];
    }
    // return {
    //   iceServers: iceServers,
    //   iceTransportPolicy: pcConfigSetting.iceTransportPolicy,
    //   rtcpMuxPolicy: pcConfigSetting.rtcpMuxPolicy,
    //   bundlePolicy: pcConfigSetting.bundlePolicy,
    //   gatheringTimeout: 2000,
    //   iceCandidatePoolSize: parseInt(pcConfigSetting.iceCandidatePoolSize),
    // };
    return {
      iceServers: iceServers,
      iceTransportPolicy: "relay",
      rtcpMuxPolicy: pcConfigSetting.rtcpMuxPolicy,
      bundlePolicy: pcConfigSetting.bundlePolicy,
      gatheringTimeout: 2000,
      iceCandidatePoolSize: 0,
    };
  };

  const handleRegister = () => {
    if (userAgent !== null) {
      userAgent.stop();
    }
    registerSip();
  };

  const handleUnRegister = () => {
    if (userAgent !== null) {
      userAgent.stop();
    }
  };

  const handleRenegotiate = () => {
    newSession.renegotiate();
  };

  const handleCall = () => {
    console.log("register status", registerStatus);
    if (registerStatus !== "registered") return null;
    localStorage.setItem("destination", destination);
    callOutRef.current.innerText = "Call " + destination;
    callOutRef.current.classList.replace("hidden", "fixed");
    sipCall();
    console.log("🚀 ~ file: SipMain.js ~ line 283 ~ handleCall ~ sipCall", sipCall);
  };
  const handleHangUp = async () => {
    try {
      if (registerStatus !== "registered") return null;
      sessionData.forEach((incoming) => {
        incoming.session.session.terminate();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptCall = (callID) => {
    const _session = sessionData.find((data) => data.callID === callID);
    console.log("callID", _session);
    _session.session.session.answer({
      mediaStream: mediaStream,
      pcConfig: pcConfig(),
      sessionTimersExpires: 9999,
    });
    _session.view = false;

    const index = sessionData.findIndex((data) => data.callID === callID);
    const newSessionData = [...sessionData];
    newSessionData[index] = _session;
    setSessionData(newSessionData);
  };
  const handleDeclineCall = (callID) => {
    const _session = sessionData.find((data) => data.callID === callID);
    _session.session.session.terminate();
    _session.view = false;

    const index = sessionData.findIndex((data) => data.callID === callID);
    const newSessionData = [...sessionData];
    newSessionData[index] = _session;
    setSessionData(newSessionData);
  };

  const handleMuteVideo = (muted) => {
    if (newSession !== null) {
      if (muted) {
        newSession.mute({ video: true });
      } else if (!muted) {
        newSession.unmute({ video: true });
      }
    }
  };
  const handleMutedMicrophone = (muted) => {
    if (newSession !== null) {
      if (muted) {
        newSession.mute({ audio: true });
      } else if (!muted) {
        newSession.unmute({ audio: true });
      }
    }
  };
  const sendMessage = (text) => {
    userAgent.sendMessage("sip:" + destination + "@" + profileData[profileSelect].server, text);
  };

  return <div></div>;
}
