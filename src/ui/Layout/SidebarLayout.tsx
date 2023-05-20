"use client";

interface Props {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: Props) {
  return (
    <>
      <div
        className="flex-col justify-between top-0 min-w-72 w-72 h-full z-50 -d left-0 bg-slate-200
        shadow-md drop-shadow-md overflow-hidden p-2
        hidden
        sm:flex
        "
      >
        {children}
      </div>
    </>
  );
}
