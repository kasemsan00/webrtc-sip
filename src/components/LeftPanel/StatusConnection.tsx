import { BsFillCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
interface Props {
  status: string | undefined;
}
export default function StatusConnection({ status }: Props) {
  const [statusColor, setStatusColor] = useState<string>("gray");

  useEffect(() => {
    switch (status) {
      case "Connected":
        setStatusColor("green");
        break;
      case "Disconnected":
        setStatusColor("red");
        break;
      case "Connecting":
        setStatusColor("orange");
        break;
      default:
        break;
    }
  }, [status]);

  return (
    <div className="flex flex-row items-center space-x-1">
      <BsFillCircleFill style={{ color: statusColor }}></BsFillCircleFill>
      <div className="flex justify-center items-center h-[40px]">{status}</div>
    </div>
  );
}
