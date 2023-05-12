import React, { useLayoutEffect, useRef } from "react";
import { isMobile } from "react-device-detect";

interface Props {
  children: React.ReactNode;
}

export default function Sidebar({ children }: Props) {
  const sideBarRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (isMobile) {
      sideBarRef.current?.classList.add("hidden");
    }
  }, []);
  return (
    <div
      ref={sideBarRef}
      className="flex-col justify-between top-0 min-w-72 w-72 h-full z-50 -d left-0 bg-slate-200
    shadow-md drop-shadow-md overflow-hidden p-2 flex
    "
    >
      {children}
    </div>
  );
}
