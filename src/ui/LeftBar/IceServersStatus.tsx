import { BsFillCircleFill } from "react-icons/bs";
import { useStore } from "@/store/useStore";

export default function IceServerStatus() {
  const turn = useStore((state) => state.turn);
  const iceServer = useStore((state) => state.iceServer);

  return (
    <div className="flex flex-row items-center gap-2">
      Turn
      <div className="tooltip tooltip-right z-[999] tooltip-info" data-tip={`${iceServer.url}`}>
        <BsFillCircleFill style={{ color: turn ? "green" : "gray" }}></BsFillCircleFill>
      </div>
    </div>
  );
}
