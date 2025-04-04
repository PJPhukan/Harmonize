"use client";

import Image from "next/image";
import React, { useState } from "react";
import Logo from "@/assets/logo2.png";
import User from "@/assets/userAvatar.jpg";
import { Bell, MessageCircle, Search } from "lucide-react";
import SlidingSearchBar from "./SlidingSearchBar";
import SlidingNotificationsPanel from "./SlidingNotificationsPanel";

const Topbar = () => {
  const [isSearchOpen, setSearchOpen] = useState(false);

  const [isNotificationsOpen, setNotificationsOpen] = useState(false);

  const toggleSearchBar = () => setSearchOpen((prev) => !prev);
  const toggleNotificationBar = () => setNotificationsOpen((prev) => !prev);
  const openChat = () => {
    console.log("OPENING CHAT");
  };
  const navItem = [
    {
      icon: Search,
      func: toggleSearchBar,
    },
    {
      icon: Bell,
      func: toggleNotificationBar,
    },
    {
      icon: MessageCircle,
      func: openChat,
    },
  ];
  return (
    <div className="w-[100vw] md:w-[95vw] lg:w-[90vw] border-b-2 m-auto flex justify-between bg-white px-3 h-18">
      {/* left protion  */}
      <div className="flex items-center gap-0 ">
        <Image src={Logo} alt="H" height={60} className="" />
        <p className="text-2xl font-bold hidden md:block">Harmonize</p>
      </div>
      {/* search bar section  */}
      <div className=" items-center hidden md:flex">
        <div className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-md min-w-[30vw]">
          <Search />
          <input
            type="text"
            id="textSearch"
            placeholder="Search anything"
            className="bg-transparent w-full outline-none text-xl "
          />
          <label htmlFor="textSearch" className="hidden">
            Search what you thinking
          </label>
        </div>
      </div>

      {/* right section  */}
      <div className="flex items-center gap-4">
        {navItem.map((item, i) => (
          <item.icon
            width={20}
            className="h-[30px] cursor-pointer  transition-all duration-500  text-gray-500 block md:hidden "
            onClick={item.func}
            key={i}
          />
        ))}

        <Image
          src={User}
          alt="You"
          className="rounded-full w-[50px] h-[50px]"
        />
      </div>
      <SlidingSearchBar isOpen={isSearchOpen} onClose={toggleSearchBar} />
      <SlidingNotificationsPanel
        isOpen={isNotificationsOpen}
        onClose={toggleNotificationBar}
      />
    </div>
  );
};

export default Topbar;
