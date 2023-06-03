import { ReactNode, useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";

export default function MobileLayout({ children }: { children: ReactNode }) {
  const mobileLayoutRef = useRef<HTMLDivElement>(null);
  const { userAgentStatus } = useStore((state) => state);
  useEffect(() => {
    if (userAgentStatus === "Calling") {
      mobileLayoutRef.current?.classList.add("hidden");
    }
  }, [userAgentStatus]);
  return (
    <div
      ref={mobileLayoutRef}
      className="fixed top-0 flex flex-1 flex-col justify-center items-center z-[999] bg-white w-full h-screen gap-4
        md:hidden"
    >
      {children}
    </div>
  );
}
