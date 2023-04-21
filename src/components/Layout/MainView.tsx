import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function MainView({ children }: Props) {
  return <div className="fixed flex ml-64 h-full justify-center p-2">{children}</div>;
}
