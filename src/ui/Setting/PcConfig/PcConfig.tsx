import React, { useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";
import { useForm } from "react-hook-form";
import { updateSetting, updateTurn } from "@/request/request";

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control w-full max-w-full focus:outline-none focus:border-none">
        <label className="label">
          <span className="label-text">Turn Enable</span>
        </label>
        <input type="checkbox" className="toggle toggle-info" onChange={handleToggle} checked={turn} />
        <label className="label">
          <span className="label-text">Url</span>
        </label>
        <input
          type="text"
          placeholder="URL"
          className="input input-sm input-bordered w-full focus:outline-none"
          {...register("url")}
          disabled={!turn}
        />
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          type="text"
          placeholder="Username"
          className="input input-sm input-bordered w-full focus:outline-none"
          {...register("username")}
          disabled={!turn}
        />
        <label className="label">
          <span className="label-text">Credential</span>
        </label>
        <input
          type="text"
          placeholder="Credential"
          className="input input-sm input-bordered w-full focus:outline-none"
          {...register("credential")}
          disabled={!turn}
        />
        <div className="flex justify-between items-center mt-4">
          <span className="text-green-600" ref={turnSaveInfoRef}>
            {/*Save Successful*/}
          </span>
          <input className="btn btn-primary btn-sm w-[100px]" type="submit" value="Save" />
        </div>
      </div>
    </form>
  );
}
