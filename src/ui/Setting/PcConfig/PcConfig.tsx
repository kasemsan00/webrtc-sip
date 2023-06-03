import React, { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/useStore";
import { useForm, useFieldArray } from "react-hook-form";
import { addTurn } from "@/request/request";

export default function PcConfig() {
  const turnSaveInfoRef = useRef<HTMLSpanElement>(null);
  const { turn, iceServer, setTurnEnable } = useStore((state) => state);
  const { register, control, handleSubmit } = useForm({});
  const { fields, append } = useFieldArray({
    control,
    name: "test",
  });

  useEffect(() => {
    if (fields.length !== 0) return;
    iceServer.forEach((item: any) => {
      append({
        id: item.id,
        urls: item.urls,
        username: item.urls,
        credential: item.credential,
      });
    });
  }, [append, fields, iceServer]);

  const handleToggle = () => setTurnEnable(!turn);

  const addMoreTurn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    append({ id: "", urls: "", username: "", credential: "" });
  };

  const onSubmit = async () => {
    console.log(fields);
    // turnSaveInfoRef.current!.innerHTML = "Saving..";
    let resp = await addTurn(fields);
    // if (resp.serverStatus === 2) {
    //   turnSaveInfoRef.current!.innerHTML = "Save Successful";
    // }
  };

  const deleteTurnItem = (id: string) => {
    console.log(id);
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
        {fields.map((item, index) => (
          <div key={index}>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="text-sm">Url</td>
                  <td>
                    <input
                      type="text"
                      placeholder="URL"
                      className="input input-sm input-bordered w-full focus:outline-none"
                      {...register(`test.${index}.urls`)}
                      disabled={!turn}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-sm">Username</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Username"
                      className="input input-sm input-bordered w-full focus:outline-none"
                      {...register(`test.${index}.username`)}
                      disabled={!turn}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-sm">Credential</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Credential"
                      className="input input-sm input-bordered w-full focus:outline-none"
                      {...register(`test.${index}.credential`)}
                      disabled={!turn}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="btn btn-error block ring-1 btn-sm"
              onClick={() => deleteTurnItem(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
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
