"use client";
import React, { useEffect, useState } from "react";
import {
  Bell,
  Bomb,
  House,
  MessageCircle,
  Search,
  SquarePlay,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SlidingSearchBar from "./SlidingSearchBar";
import SlidingNotificationsPanel from "./SlidingNotificationsPanel";
import axios from "axios";

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
  const [notifications, setNotifications] = useState<Notification[]>([
    // { id: 1, type: "info", message: "You have a new friend request." },
    // {
    //   id: 2,
    //   type: "connection-request",
    //   message: "Parag Jy Phukan has sent you a connection request.",
    //   from: "Parag Jy Phukan",
    // },
    // { id: 3, type: "info", message: "Your post received 5 new likes!" },
  ]);

  const toggleSearchBar = () => setSearchOpen((prev) => !prev);
  const toggleNotificationsPanel = () => setNotificationsOpen((prev) => !prev);

  const NavItem = [
    {
      id: 1,
      name: "Home",
      icon: House,
    },
    {
      id: 2,
      name: "Explore",
      icon: Bomb,
    },
    {
      id: 3,
      name: "Search",
      icon: Search,
    },
    {
      id: 4,
      name: "Reels",
      icon: SquarePlay,
    },
    {
      id: 5,
      name: "Profile",
      icon: UserRound,
    },
  ];
  return (
    <div className="relative">
      <div
        id="sidebar"
        className="w-full bg-white border-b lg:border-b-0 lg:border-r border-gray-200 py-4 px-6 overflow-x-hidden overflow-y-auto scrollbar-hide relative"
      >
        <h1 className="text-xl font-bold text-purple-600 mb-6 text-center lg:text-left">
          Harmonize
        </h1>
        <nav>
          <ul className="flex justify-start gap-2 flex-col mt-10">
            <li>
              <Link
                href="/user"
                className={`flex items-center space-x-2 text-gray-700 cursor-pointer rounded hover:bg-gray-200 px-2 py-2.5 ${
                  pathname === "/user" ? "bg-gray-200 font-semibold" : ""
                }`}
              >
                <House />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/user/explore"
                className={`flex items-center space-x-2 text-gray-700 cursor-pointer rounded hover:bg-gray-200 px-2 py-2.5 ${
                  pathname.includes("/user/explore")
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                <Bomb />
                <span>Explore</span>
              </Link>
            </li>
            <li>
              <button
                onClick={toggleSearchBar}
                className={`flex items-center space-x-2 text-gray-700 cursor-pointer rounded hover:bg-gray-200 px-2 py-2.5 w-full ${
                  pathname === "/user/search" || isSearchOpen
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                <Search />
                <span>Search</span>
              </button>
            </li>
            <li>
              <button
                onClick={toggleNotificationsPanel}
                className={`flex items-center space-x-2 text-gray-700 cursor-pointer rounded hover:bg-gray-200 px-2 py-2.5 w-full ${
                  pathname === "/user/notifications" || isNotificationsOpen
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                <Bell />
                <span>Notifications</span>
              </button>
            </li>
            <li>
              <Link
                href="/user/message"
                className={`flex items-center space-x-2 text-gray-700 cursor-pointer rounded hover:bg-gray-200 px-2 py-2.5 ${
                  pathname.includes("/user/message")
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                <MessageCircle />
                <span>Messages</span>
              </Link>
            </li>
            <li>
              <Link
                href="/user/me"
                className={`flex items-center space-x-2 text-gray-700 cursor-pointer rounded hover:bg-gray-200 px-2 py-2.5 ${
                  pathname === "/user/me" ? "bg-gray-200 font-semibold" : ""
                }`}
              >
                <UserRound />
                <span>You</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* mobile navber  */}
      <nav className="absolute bg-red-600 buttom-0 left-0 z-50 ">
        <ul className="flex md:hidden ">
          {NavItem.map((item) => {
            return (
              <li className="flex bg-green-500 flex-col" key={item.id}>
                <Link
                  href="/user/me"
                  className={`flex items-center space-x-2 text-gray-700 cursor-pointer rounded hover:bg-gray-200 px-2 py-2.5 ${
                    pathname === item.name ? "bg-gray-200 font-semibold" : ""
                  }`}
                >
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <SlidingSearchBar isOpen={isSearchOpen} onClose={toggleSearchBar} />
      <SlidingNotificationsPanel
        isOpen={isNotificationsOpen}
        onClose={toggleNotificationsPanel}
      />
    </div>
  );
};

export default SidebarNavbar;
