import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";

export default function PcConfig() {
  const { setTurnEnable } = useStore((state) => state);
  const [isTurnEnable, setIsTurnEnable] = useState(true);

  const handleToggle = () => {
    setIsTurnEnable((state) => !state);
  };
  useEffect(() => {
    setTurnEnable(isTurnEnable);
  }, [isTurnEnable, setTurnEnable]);
  return (
    <div className="flex flex-col mt-4">
      <div className="flex flex-row">
        <div className="mr-2">Turn : </div>
        <div className="flex flex-row gap-2">
          <div>Disable</div>
          <div>
            <input type="checkbox" className="toggle toggle-info" onChange={handleToggle} checked={isTurnEnable} />
          </div>
          <div>Enable</div>
        </div>
      </div>
    </div>
  );
}
