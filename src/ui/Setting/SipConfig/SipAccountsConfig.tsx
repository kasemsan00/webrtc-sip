import { useForm } from "react-hook-form";
import { getExtension, insertExtension, updateExtension } from "@/request/request";
import React, { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { useMutation } from "@tanstack/react-query";

interface Props {
  setIsOpen: (arg0: boolean) => void;
  configAction: string | undefined;
  configIndex: number | undefined;
}

export default function SipAccountsConfig({ setIsOpen, configAction, configIndex }: Props) {
  const { profileData, setProfile } = useStore((state) => state);
  const {
    register,
    setValue,
    handleSubmit,
    formState: {},
  } = useForm();

  const { mutate: server_insertExtension, isPending: isPendingInsert } = useMutation({
    mutationFn: insertExtension,
    onSuccess: async (resp) => {
      if (resp.affectedRows === undefined) return;
      if (resp.affectedRows === 1) {
        setIsOpen(false);
        setProfile(await getExtension());
      }
    },
  });
  const { mutate: server_updateExtension, isPending: isPendingUpdate } = useMutation({
    mutationFn: updateExtension,
    onSuccess: async (resp) => {
      if (resp.affectedRows === undefined) return;
      if (resp.affectedRows === 1) {
        setIsOpen(false);
        setProfile(await getExtension());
      }
    },
  });

  const onSubmit = async (data: any) => {
    switch (configAction) {
      case "Add":
        server_insertExtension({
          domain: data.domain,
          webSocket: data.webSocket,
          extension: data.extension,
          password: data.password,
        });
        break;
      case "Edit":
        server_updateExtension({
          id: data.id,
          domain: data.domain,
          webSocket: data.webSocket,
          extension: data.extension,
          password: data.password,
        });
        break;
    }
  };
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(false);
  };

  useEffect(() => {
    if (configIndex === undefined) return;
    const profileSelect = profileData.find((state: any) => state.id === configIndex);
    if (profileSelect === undefined) return;
    setValue("id", profileSelect.id);
    setValue("domain", profileSelect.domain);
    setValue("webSocket", profileSelect.websocket);
    setValue("extension", profileSelect.extension);
    setValue("password", profileSelect.secret);
  }, [configIndex, profileData, register, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full space-y-1 mt-4">
        <div className="flex flex-row items-center form-control rounded-none">
          <span className="bg-red w-[120px]">Domain</span>
          <input
            type="text"
            placeholder="Domain"
            className="input input-bordered input-sm w-full focus:outline-none"
            {...register("domain")}
          />
        </div>
        <div className="flex flex-row items-center form-control rounded-none">
          <span className="bg-red w-[120px]">WebSocket</span>
          <input
            type="text"
            placeholder="WebSocket"
            className="input input-bordered input-sm w-full focus:outline-none"
            {...register("webSocket")}
          />
        </div>
        <div className="flex flex-row items-center form-control rounded-none">
          <span className="bg-red w-[120px]">Extension</span>
          <input
            type="text"
            placeholder="Extension"
            className="input input-bordered input-sm w-full focus:outline-none"
            {...register("extension")}
          />
        </div>
        <div className="flex flex-row items-center form-control rounded-none">
          <span className="bg-red w-[120px]">Password</span>
          <input
            type="text"
            placeholder="Password"
            className="input input-bordered input-sm w-full focus:outline-none"
            {...register("password")}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <button className="btn btn-warning btn-sm w-[100px]" onClick={handleCancel}>
          Cancel
        </button>
        <input
          disabled={configAction === "ADD" ? isPendingInsert : isPendingUpdate}
          className="btn btn-primary btn-sm w-[100px]"
          type="submit"
          value="OK"
        />
      </div>
    </form>
  );
}
