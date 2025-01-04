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
    <div className="w-screen flex">
      <div className="w-1/6">
        <SidebarNavber />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
