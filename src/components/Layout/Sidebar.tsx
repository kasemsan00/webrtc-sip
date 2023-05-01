import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Sidebar({ children }: Props) {
  return (
    <div className="fixed flex flex-col justify-between top-0 w-72 h-full z-50 -d left-0 bg-slate-200 shadow-xl overflow-hidden p-2">
      {children}
    </div>
  );
}
