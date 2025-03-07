"use client";
import Link from "next/link";
import React from "react";
import dummyImg from "@/assets/userAvatar.jpg";
import Image from "next/image";
import { Button } from "./ui/button";
interface SlidingSearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlidingSearchBar: React.FC<SlidingSearchBarProps> = ({
  isOpen,
  onClose,
}) => {
  console.log("Showing pannel");
  return (
    <div
      className={`fixed top-0 left-0 h-full w-full md:w-[24rem] bg-white shadow-lg z-50 transform transition-transform duration-300 text-black ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } `}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Search</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition"
        >
          ✕
        </button>
      </div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border  focus:outline-none focus:ring focus:ring-purple-300 rounded-full"
        />
      </div>

      <div className="flex justify-between w-full px-3 flex-col gap-2">
        <Link
          href="/user/profile/234"
          className="flex justify-between  bg-gray-200 px-5 py-2 rounded-md"
        >
          <div className="flex gap-2 items-center">
            <Image
              src={dummyImg}
              alt="profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p>Parag jy Phukan</p>
              <p className="text-ellipsis overflow-hidden  whitespace-nowrap text-sm">
                Assam, India
              </p>
            </div>
          </div>

          <span className="bg-blue-200 font-semibold text-blue-600 px-4 py-2 rounded-md flex my-auto">
            Connect
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SlidingSearchBar;
