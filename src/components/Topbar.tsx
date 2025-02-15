import Image from "next/image";
import React from "react";
import Logo from "@/assets/logo2.png";
import User from "@/assets/userAvatar.jpg";
import { Bell, MessageCircle, Search } from "lucide-react";
const Topbar = () => {
  return (
    <div className="w-[100vw] md:w-[95vw] lg:w-[90vw] border-b-2 m-auto flex justify-between">
      {/* left protion  */}
      <div className="flex items-center gap-0">
        <Image src={Logo} alt="H" height={70} />
        <p className="text-2xl font-bold">Harmonize</p>
      </div>
      {/* search bar section  */}
      <div className="flex items-center ">
        <div className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-md min-w-[30vw]">
          <Search />
          <input
            type="text"
            id="textSearch"
            placeholder="Search anything"
            className="bg-transparent w-full outline-none text-xl"
          />
          <label htmlFor="textSearch" className="hidden">
            Search what you thinking
          </label>
        </div>
      </div>

      {/* right section  */}
      <div className="flex items-center gap-4">
        <Search
          width={30}
          className="h-[30px] cursor-pointer hover:translate-y-[-2px] transition-all duration-500 hover:scale-110 text-gray-500 block md:hidden "
        />
        <Bell
          width={30}
          className="h-[30px] cursor-pointer hover:translate-y-[-2px] transition-all duration-500 hover:scale-110 text-gray-500"
        />
        <MessageCircle
          width={30}
          className="h-[30px] cursor-pointer hover:translate-y-[-2px] transition-all duration-500 hover:scale-110 text-gray-500"
        />
        <Image
          src={User}
          alt="You"
          className="rounded-full w-[60px] h-[60px]"
        />
      </div>
    </div>
  );
};

export default Topbar;
