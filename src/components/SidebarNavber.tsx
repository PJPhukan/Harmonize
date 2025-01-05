"use client";
import React from "react";
import {
  Bell,
  Bomb,
  House,
  MessageCircle,
  Search,
  UserRound,
} from "lucide-react";
import { MdTravelExplore } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";
const SidebarNavber = () => {
  const pathname = usePathname();
  return (
    <div
      id="sidebar"
      className="w-full bg-white border-b lg:border-b-0 lg:border-r border-gray-200 py-4 px-6 hidden md:block h-screen sticky top-0 left-0"
    >
      <h1 className="text-xl font-bold text-purple-600 mb-6 text-center lg:text-left">
        Harmonize
      </h1>
      <nav>
        <ul className="flex justify-start gap-2 flex-col mt-10">
          <li>
            <Link
              href="/user"
              className={`flex items-center space-x-2 text-gray-700  cursor-pointer rounded hover:bg-gray-200 px-2 py-2.5 ${
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
              className={`flex items-center space-x-2 text-gray-700  cursor-pointer rounded hover:bg-gray-200 px-2 py-2.5 ${
                pathname.includes("/user/explore")
                  ? "bg-gray-200 font-semibold"
                  : ""
              }`}
            >
              {/* <MdTravelExplore width={30}/> */}
              <Bomb />
              <span>Explore</span>
            </Link>
          </li>
          <li>
            <Link
              href="/user/search"
              className={`flex items-center space-x-2 text-gray-700  cursor-pointer rounded hover:bg-gray-200 px-2 py-2.5 ${
                pathname.includes("/user/search")
                  ? "bg-gray-200 font-semibold"
                  : ""
              }`}
            >
              <Search />
              <span>Search</span>
            </Link>
          </li>
          <li>
            <Link
              href="/user/notifications"
              className={`flex items-center space-x-2 text-gray-700  cursor-pointer rounded hover:bg-gray-200 px-2 py-2.5 ${
                pathname.includes("/user/notifications")
                  ? "bg-gray-200 font-semibold"
                  : ""
              }`}
            >
              <Bell />
              <span>Notifications</span>
            </Link>
          </li>
          <li>
            <Link
              href="/user/message"
              className={`flex items-center space-x-2 text-gray-700  cursor-pointer rounded hover:bg-gray-200 px-2 py-2.5 ${
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
              className={`flex items-center space-x-2 text-gray-700  cursor-pointer rounded hover:bg-gray-200 px-2 py-2.5 ${
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
  );
};

export default SidebarNavber;
