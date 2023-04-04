import { IoMdSettings } from "react-icons/Io";
import MyListbox from "@/components/LeftPanel/MyListBox";
import StatusConnection from "@/components/LeftPanel/StatusConnection";

export default function LeftPanel() {
  const UserRegister = () => {};
  const UserUnregister = () => {};

  return (
    <div className="left-panel">
      <div className="view-local">
        <div className="local-video"></div>
      </div>
      <div className="input-form">
        <select className="select-option">
          <option>Profile1</option>
          <option>Profile2</option>
        </select>
        <IoMdSettings className="setting-btn" />
      </div>
      <div>
        <StatusConnection status={"connected"} />
      </div>
      <button className="btn-primary" onClick={UserRegister}>
        Register
      </button>
      <button className="btn-secondary" onClick={UserUnregister}>
        UnRegister
      </button>
    </div>
  );
}
