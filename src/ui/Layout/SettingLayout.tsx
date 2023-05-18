import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function SettingLayout({ children }: Props) {
  return <div className="flex flex-col gap-2 w-full">{children}</div>;
}
