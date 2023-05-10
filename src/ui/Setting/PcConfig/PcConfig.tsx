import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";

export default function PcConfig() {
  const { iceServers, setTurnEnable } = useStore((state) => state);
  const [isTurnEnable, setIsTurnEnable] = useState(true);

  const handleToggle = () => {
    setIsTurnEnable((state) => !state);
  };

  useEffect(() => {
    setTurnEnable(isTurnEnable);
  }, [isTurnEnable, setTurnEnable]);

  // useEffect(() => {
  //   // console.log(iceServers);
  // }, [iceServers]);

  return (
    <div className="form-control w-full max-w-full focus:outline-none focus:border-none">
      <label className="label">
        <span className="label-text">Turn Enable</span>
      </label>
      <input type="checkbox" className="toggle toggle-info" onChange={handleToggle} checked={isTurnEnable} />
      <label className="label">
        <span className="label-text">Url</span>
      </label>
      <input type="text" placeholder="URL" className="input input-sm input-bordered w-full focus:outline-none" />
      <label className="label">
        <span className="label-text">Username</span>
      </label>
      <input type="text" placeholder="Username" className="input input-sm input-bordered w-full focus:outline-none" />
      <label className="label">
        <span className="label-text">Credential</span>
      </label>
      <input type="text" placeholder="Credential" className="input input-sm input-bordered w-full focus:outline-none" />
    </div>
  );
}
