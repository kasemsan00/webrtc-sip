import React, { useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";
import { useForm, useFieldArray } from "react-hook-form";
import { updateTurn } from "@/request/request";
import { useMutation } from "@tanstack/react-query";
const init = { urls: "", username: "", credential: "" };

export default function PcConfig() {
  const turnSaveInfoRef = useRef<HTMLSpanElement>(null);
  const { turn, iceServer, setIceServer } = useStore((state) => state);
  const { register, control, handleSubmit } = useForm({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  const { mutate: server_updateTurn, isPending } = useMutation({
    mutationFn: updateTurn,
    onSuccess: (resp) => {
      if (resp.message === "insert complete") {
        turnSaveInfoRef.current!.innerHTML = "Save Successful";
      }
    },
    onError: (resp) => {
      console.log("error", resp);
    },
  });

  useEffect(() => {
    if (iceServer.length !== 0) return;
    append(init);
  }, [append, iceServer]);

  useEffect(() => {
    if (fields.length !== 0) return;
    remove(0);
    iceServer.forEach((item: any) => {
      append({
        id: item.id,
        urls: item.urls,
        username: item.username,
        credential: item.credential,
      });
    });
  }, [append, fields, iceServer, remove]);

  const onSubmit = async (data: any) => {
    // turnSaveInfoRef.current!.innerHTML = "Saving...";
    server_updateTurn(data.test);
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
          <span className="text-green-600" ref={turnSaveInfoRef}></span>
        </div>
        <input
          disabled={isPending}
          className="btn btn-primary btn-sm w-[150px]"
          type="submit"
          value="Save"
        />
      </div>
    </form>
  );
}
