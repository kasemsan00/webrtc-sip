import { MdDialerSip } from "react-icons/md";

export default function CallOut() {
  const HandleCallOut = () => {};
  const HandleHangUp = () => {};
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
