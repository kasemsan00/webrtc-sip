import { useRef } from "react";
import { useAppSelector } from "@/redux/store";
import SipAccountModal from "@/components/Setting/SipAccountModal";

export default function SipAccountList() {
  const profileData = useAppSelector((state) => state.profileData);
  return (
    <div className="flex flex-cols mt-4 gap-1 active:none">
      <div className=" rounded-md w-[calc(100%-70px)]">
        <select className="w-full" name="Cars" size={20}>
          {profileData.map((item: any, index: number) => (
            <option className="px-1" key={index} value={item.extension}>
              {item.extension}@{item.domain}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <button className="btn btn-info">Add</button>
        <button className="btn btn-warning">Edit</button>
        <button className="btn btn-error">Remove</button>
      </div>
    </div>
  );
}
