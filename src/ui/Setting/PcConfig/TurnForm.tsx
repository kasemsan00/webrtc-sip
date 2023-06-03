import React from "react";
interface Props {
  register: any;
  enable: boolean;
}

export const TurnForm = ({ register, enable }: Props) => {
  return (
    <>
      <div className="flex flex-row justify-center items-center gap-2">
        <span className="w-24 text-sm">Url :</span>
        <input
          type="text"
          placeholder="URL"
          className="input input-sm input-bordered w-full focus:outline-none"
          {...register("url")}
          disabled={!enable}
        />
      </div>
      <div className="flex flex-row justify-center items-center gap-2">
        <span className="w-24 text-sm">Username : </span>
        <input
          type="text"
          placeholder="Username"
          className="input input-sm input-bordered w-full focus:outline-none"
          {...register("username")}
          disabled={!enable}
        />
      </div>
      <div className="flex flex-row justify-center items-center gap-2">
        <span className="w-24 text-sm">Credential :</span>
        <input
          type="text"
          placeholder="Credential"
          className="input input-sm input-bordered w-full focus:outline-none"
          {...register("credential")}
          disabled={!enable}
        />
      </div>
    </>
  );
};
