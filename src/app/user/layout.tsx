import SidebarNavber from "@/components/SidebarNavber";
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
    <div className="w-screen flex px-[5rem]">
      <div className="w-2/6  md:sticky top-0 left-0 h-screen ">
        <SidebarNavber />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
