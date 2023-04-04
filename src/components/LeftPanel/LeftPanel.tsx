import { IoMdSettings } from "react-icons/Io";

export default function LeftPanel() {
  const UserRegister = () => {};
  const UserUnregister = () => {};

  return (
    <div className="left-panel">
      <div className="">
        <select className="select-option">
          <option>Profile1</option>
          <option>Profile2</option>
        </select>
        <IoMdSettings className="setting-btn" />
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
