import React, { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/useStore";
import { useForm } from "react-hook-form";

export default function PcConfig() {
  const turnSaveInfoRef = useRef<HTMLSpanElement>(null);
  const { iceServer, setTurnEnable } = useStore((state) => state);
  const [isTurnEnable, setIsTurnEnable] = useState(true);
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleToggle = () => {
    setIsTurnEnable((state) => !state);
  };
  useEffect(() => {
    setTurnEnable(isTurnEnable);
  }, [isTurnEnable, setTurnEnable]);
  const handleChangeURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
  };
  const handleSave = () => {};

  return (
    <div className="form-control w-full max-w-full focus:outline-none focus:border-none">
      <label className="label">
        <span className="label-text">Turn Enable</span>
      </label>
      <input type="checkbox" className="toggle toggle-info" onChange={handleToggle} checked={isTurnEnable} />
      <label className="label">
        <span className="label-text">Url</span>
      </label>
      <input
        type="text"
        placeholder="URL"
        className="input input-sm input-bordered w-full focus:outline-none"
        {...register("url")}
      />
      <label className="label">
        <span className="label-text">Username</span>
      </label>
      <input
        type="text"
        placeholder="Username"
        className="input input-sm input-bordered w-full focus:outline-none"
        {...register("username")}
      />
      <label className="label">
        <span className="label-text">Credential</span>
      </label>
      <input
        type="text"
        placeholder="Credential"
        className="input input-sm input-bordered w-full focus:outline-none"
        {...register("credential")}
      />
      <div className="flex justify-between items-center mt-4">
        <span className="text-green-600" ref={turnSaveInfoRef}>
          Save Successful
        </span>
        <button className="btn btn-primary w-40" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
