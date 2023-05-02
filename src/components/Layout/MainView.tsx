import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function MainView({ children }: Props) {
  return <div className="flex w-full h-full justify-center p-2">{children}</div>;
}
