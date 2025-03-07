"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Bell,
  ClapperboardIcon,
  CompassIcon,
  Home,
  LogOut,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

import { usePathname } from "next/navigation";
import SlidingSearchBar from "./SlidingSearchBar";
import SlidingNotificationsPanel from "./SlidingNotificationsPanel";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import { Button } from "./ui/button";

const montserret = Montserrat({ weight: "600", subsets: ["latin"] });

const SidebarNavbar = () => {
  interface Notification {
    _id: string;
    owner: string;
    message: string;
    postId?: string; // For connection requests
    requesterURL?: string; // For connection requests
    requester?: string; // For connection requests
  }
  const pathname = usePathname();
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const toggleSearchBar = () => setSearchOpen((prev) => !prev);
  const toggleNotificationsPanel = () => setNotificationsOpen((prev) => !prev);

  const userLogOut = async () => {
    console.log("User logout button was clicked");
  };

  const routes = [
    {
      label: "Home",
      icon: Home,
      url: "/dashboard",
      color: "text-sky-500",
    },
    {
      label: "Explore",
      icon: CompassIcon,
      url: "/explore",
      color: "text-violet-500",
    },
    {
      label: "Reels",
      icon: ClapperboardIcon,
      url: "/reels",
      color: "text-pink-700",
    },
    {
      label: "Search",
      icon: SearchIcon,
      url: "",
      toggleSliding: toggleSearchBar,
      color: "text-orange-700",
    },
    {
      label: "Notification",
      icon: Bell,
      url: "",
      toggleSliding: toggleNotificationsPanel,
      color: "text-green-700",
    },
    {
      label: "Connections",
      icon: UsersIcon,
      url: "/connections",
      color: "text-emerald-700",
    },
    {
      label: "Settings",
      icon: SettingsIcon,
      url: "/settings",
      color: "text-white",
    },
  ];
  return (
    <div className="flex space-y-0 py-4 flex-col h-full bg-[#111827] text-white z-40 ">
      <div className="px-7 py-5 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-11 w-14 mr-2">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <div className={cn("text-2xl font-bold")}>Harmonize</div>
        </Link>
        <div className="space-y-1 ">
          {routes.map((route) => {
            return route.url != "" ? (
              <Link
                href={route.url}
                key={route.url}
                className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",  pathname === route.url
                  ? "text-white bg-white/10"
                  : " text-zinc-400")}
                
              >
                <div className="flex items-center flex-1 gap-2">
                  <route.icon className={(cn("h-4 w-4 mr-3"), route.color)} />
                  {route.label}
                </div>
              </Link>
            ) : (
              <div
                key={route.label}
                className=" text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition text-zinc-400 "
                onClick={route.toggleSliding}
              >
                <div className="flex items-center flex-1 gap-2">
                  <route.icon className={(cn("h-4 w-4 mr-3"), route.color)} />
                  {route.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="px-7 py-5 ">
        <div
          className="text-sm md:text-md group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition"
          onClick={userLogOut}
        >
          <div className="flex items-center flex-1 gap-2">
            <LogOut className="h-6 w-6 " />
            Log out
          </div>
        </div>
      </div>

      <SlidingSearchBar isOpen={isSearchOpen} onClose={toggleSearchBar} />
      <SlidingNotificationsPanel
        isOpen={isNotificationsOpen}
        onClose={toggleNotificationsPanel}
      />
    </div>
  );
};

export default SidebarNavbar;
