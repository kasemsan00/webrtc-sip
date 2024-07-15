import React, { useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";
import { useForm, useFieldArray } from "react-hook-form";
import { addTurn, updateSetting } from "@/request/request";
import { MdDelete } from "react-icons/md";
const init = { urls: "", username: "", credential: "" };

export default function PcConfig() {
  const turnSaveInfoRef = useRef<HTMLSpanElement>(null);
  const { turn, iceServer, setTurnEnable, setIceServer } = useStore((state) => state);
  const { register, control, handleSubmit } = useForm({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  useEffect(() => {
    if (iceServer.length !== 0) return;
    append(init);
  }, [append, iceServer]);

  useEffect(() => {
    if (fields.length !== 0) return;
    iceServer.forEach((item: any) => {
      append({
        id: item.id,
        urls: item.urls,
        username: item.username,
        credential: item.credential,
      });
    });
  }, [append, fields, iceServer]);

  const handleToggle = () => setTurnEnable(!turn);

  // const addMoreTurn = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   append(init);
  // };

  const onSubmit = async (data: any) => {
    turnSaveInfoRef.current!.innerHTML = "Saving...";
    await updateSetting({
      name: "turn",
      value: turn,
    });
    let resp = await addTurn(data.test);
    if (resp.message === "insert complete") turnSaveInfoRef.current!.innerHTML = "Save Successful";
    // setIceServer
    setIceServer(data.test);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className="form-control w-full max-w-full focus:outline-none focus:border-none gap-2
      max-h-[450px] overflow-hidden"
      >
        {fields.map((item, index) => (
          <table key={index}>
            <tbody>
              {index === 0 && (
                <tr>
                  <td className="text-sm">Enable</td>
                  <td>
                    <input
                      type="checkbox"
                      className="toggle toggle-info"
                      onChange={handleToggle}
                      checked={turn}
                    />
                  </td>
                </tr>
              )}
              <tr key={index}>
                <td className="w-[100px] text-sm">Url</td>
                <td>
                  <input
                    type="text"
                    placeholder="URL"
                    className="input input-sm input-bordered w-full focus:outline-none"
                    {...register(`test.${index}.urls`)}
                    disabled={!turn}
                  />
                </td>
                <td>
                  <div
                    onClick={() => {
                      if (fields.length > 1) remove(item.id as any);
                    }}
                    className="h-full w-full flex justify-center items-center text-red-700 cursor-pointer"
                  >
                    <MdDelete></MdDelete>
                  </div>
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
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="space-x-2">
          {/*<button className="btn btn-warning btn-sm w-[150px]" onClick={addMoreTurn}>*/}
          {/*  Add More*/}
          {/*</button>*/}
          <span className="text-green-600" ref={turnSaveInfoRef}></span>
        </div>
        <input className="btn btn-primary btn-sm w-[150px]" type="submit" value="Save" />
      </div>
    </form>
  );
}
