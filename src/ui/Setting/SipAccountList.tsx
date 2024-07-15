import React, { useEffect, useRef } from "react";
import { deleteExtension, getExtension } from "@/request/request";
import { useStore } from "@/store/useStore";

interface Props {
  setIsSipConfigOpen: (arg0: boolean) => void;
  setConfigAction: (arg0: string | undefined) => void;
  configIndex: number | undefined;
  onSelectIndex: (arg0: number | undefined) => void;
}

export default function SipAccountList({
  setIsSipConfigOpen,
  setConfigAction,
  configIndex,
  onSelectIndex,
}: Props) {
  const { profileData, setProfile } = useStore((state) => state);
  const handleClick = (e: React.MouseEvent<HTMLOptionElement>) => {
    onSelectIndex(parseInt(e.currentTarget.value));
  };
  const handleDoubleClick = (e: React.MouseEvent<HTMLOptionElement>) => {
    onSelectIndex(parseInt(e.currentTarget.value));
    setIsSipConfigOpen(true);
    setConfigAction("Edit");
  };
  const handleClickEdit = () => {
    if (configIndex === undefined) return;
    setIsSipConfigOpen(true);
    setConfigAction("Edit");
  };
  const handleClickAdd = () => {
    onSelectIndex(undefined);
    setIsSipConfigOpen(true);
    setConfigAction("Add");
  };
  const handleDelete = async () => {
    const resp = await deleteExtension(configIndex);
    if (resp.affectedRows !== 0) {
      setProfile(await getExtension());
    }
  };

  return (
    <div className="flex flex-cols gap-1 h-full active:outline-none focus:outline-none">
      <div className="rounded-md w-[calc(100%-70px)] active:outline-none focus:outline-none">
        <select className="w-full active:outline-none focus:outline-none h-full" size={20}>
          {profileData.map((item: any, index: number) => (
            <option
              onClick={handleClick}
              onDoubleClick={handleDoubleClick}
              className="px-1"
              key={index}
              value={item.id}
            >
              {item.extension}@{item.domain}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <button className="btn btn-info btn-sm" onClick={handleClickAdd}>
          Add
        </button>
        <button className="btn btn-warning btn-sm" onClick={handleClickEdit}>
          Edit
        </button>
        <button className="btn btn-error btn-sm" onClick={handleDelete}>
          Remove
        </button>
      </div>
    </div>
  );
}
