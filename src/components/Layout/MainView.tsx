import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function MainView({ children }: Props) {
  return <div className="fixed flex top-10 w-full justify-center">{children}</div>;
}
