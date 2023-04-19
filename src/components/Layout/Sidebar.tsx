import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Sidebar({ children }: Props) {
  return (
    <div className="fixed flex flex-col gap-2 top-0 bottom-0 w-64 h-full z-50 -d left-0 bg-slate-200 shadow-xl overflow-hidden p-2">{children}</div>
  );
}
