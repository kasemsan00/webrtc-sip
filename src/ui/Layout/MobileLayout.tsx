export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="fixed top-0 flex flex-1 flex-col justify-center items-center z-[999] bg-white w-full h-screen gap-4
        md:hidden"
    >
      {children}
    </div>
  );
}
