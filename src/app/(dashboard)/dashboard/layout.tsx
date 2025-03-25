import MobileNavber from "@/components/mobile-navber";
import SidebarNavber from "@/components/SidebarNavber";
import Topbar from "@/components/Topbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-full relative">
        <div className="hidden overflow-y-auto h-full md:flex md:w-[24rem] md:flex-col md:fixed md:inset-y-0 z-[80] bg-[#111827]">
          <SidebarNavber />
        </div>

        <main className="md:pl-[24rem]  ">
          <div className="fixed flex w-full md:hidden z-[9999] top-0 left-0  ">
            <Topbar />
          </div>
          <div className="px-[0px]">{children}</div>
          <div className="fixed flex w-full md:hidden z-[9999] bottom-[-1px] left-0  ">
            <MobileNavber />
          </div>
        </main>
      </div>
    </>
  );
}
