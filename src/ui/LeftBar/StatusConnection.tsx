import { BsFillCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
export default function StatusConnection() {
  const { userAgentStatus } = useStore((state) => state);
  const [statusColor, setStatusColor] = useState<string>("gray");

  useEffect(() => {
    switch (userAgentStatus) {
      case "Connected":
        setStatusColor("green");
        break;
      case "Registered":
        setStatusColor("green");
        break;
      case "Unregistered":
        setStatusColor("orange");
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
  }, [userAgentStatus]);

  return (
    <div className="flex flex-row items-center space-x-1">
      <BsFillCircleFill style={{ color: statusColor }}></BsFillCircleFill>
      <div className="flex justify-center items-center h-[40px]">
        {userAgentStatus}
      </div>
    </div>
  );
}
