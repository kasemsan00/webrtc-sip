import React from "react";
interface Props {
  index: number;
  register: any;
  enable: boolean;
}

export const TurnForm = ({ index, register, enable }: Props) => {
  return (
    <>
      <div className="flex flex-row justify-center items-center gap-2">
        <span className="w-24 text-sm">Url :</span>
        <input
          type="text"
          placeholder="URL"
          className="input input-sm input-bordered w-full focus:outline-none"
          {...register("url" + index)}
          disabled={!enable}
        />
      </div>
      <div className="flex flex-row justify-center items-center gap-2">
        <span className="w-24 text-sm">Username : </span>
        <input
          type="text"
          placeholder="Username"
          className="input input-sm input-bordered w-full focus:outline-none"
          {...register("username" + index)}
          disabled={!enable}
        />
      </div>
      <div className="flex flex-row justify-center items-center gap-2">
        <span className="w-24 text-sm">Credential :</span>
        <input
          type="text"
          placeholder="Credential"
          className="input input-sm input-bordered w-full focus:outline-none"
          {...register("credential" + index)}
          disabled={!enable}
        />
      </div>
    </>
  );
};
