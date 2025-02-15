import SidebarNavber from "@/components/SidebarNavber";
import Topbar from "@/components/Topbar";
import type { Metadata } from "next";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Harmonize",
  description: "Harmonize is a music community website .",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="w-screen  overflow-x-hidden">
        {/* Topbar  */}
        <Topbar/>
        {/* Sidebar Section */}
        {/* <div className="w-1.5/6 h-screen sticky top-0">
          <SidebarNavber />
        </div> */}
  
        {/* Main Content Section */}
        {/* <div className="w-4.5/6 hidden md:block">{children}</div> */}
      </div>
    );

}
