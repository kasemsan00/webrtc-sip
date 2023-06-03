import React, { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/useStore";
import { useForm } from "react-hook-form";
import { updateSetting, updateTurn } from "@/request/request";
import { TurnForm } from "@/ui/Setting/PcConfig/TurnForm";

export default function PcConfig() {
  const turnSaveInfoRef = useRef<HTMLSpanElement>(null);
  const { turn, iceServer, setTurnEnable } = useStore((state) => state);
  const {
    register,
    setValue,
    handleSubmit,
    formState: {},
  } = useForm();

  useEffect(() => {
    if (iceServer.id !== "") setValue("id", iceServer.id);
    if (iceServer.url !== "") setValue("url", iceServer.url);
    if (iceServer.username !== "") setValue("username", iceServer.username);
    if (iceServer.credential !== "") setValue("credential", iceServer.credential);
  }, [iceServer.credential, iceServer.id, iceServer.url, iceServer.username, setValue]);

  const handleToggle = () => {
    setTurnEnable(!turn);
  };

  const onSubmit = async (data: any) => {
    turnSaveInfoRef.current!.innerHTML = "Saving..";
    let resp = await updateTurn({
      id: data.id,
      url: data.url,
      username: data.username,
      credential: data.credential,
    });
    await updateSetting({
      name: "turn",
      value: turn + "",
    });
    if (resp.serverStatus === 2) {
      turnSaveInfoRef.current!.innerHTML = "Save Successful";
    }
  };

  const [inputList, setInputList] = useState<any>([]);
  useEffect(() => {
    setInputList(inputList.concat(<TurnForm register={register} enable={turn} />));
  }, []);
  const addMoreTurn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setInputList(inputList.concat(<TurnForm register={register} enable={turn} />));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control w-full max-w-full focus:outline-none focus:border-none gap-2">
        <div className="flex flex-row items-center">
          <label className="label">
            <span className="label-text">Turn Enable</span>
          </label>
          <input
            type="checkbox"
            className="toggle toggle-info"
            onChange={handleToggle}
            checked={turn}
          />
        </div>
        {inputList}
        {/*<TurnForm register={register} enable={turn} />*/}
        <div className="flex justify-between items-center mt-4">
          <div className="space-x-2">
            <button className="btn btn-warning btn-sm w-[150px]" onClick={addMoreTurn}>
              Add More
            </button>
            <span className="text-green-600" ref={turnSaveInfoRef}></span>
          </div>
          <input className="btn btn-primary btn-sm w-[150px]" type="submit" value="Save" />
        </div>
      </div>
    </form>
  );
}
