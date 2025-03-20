"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import dummyImg from "@/assets/userAvatar.jpg";
import axios, { AxiosError } from "axios";
import { Types } from "mongoose";
import { ApiResponse } from "@/helpers/ApiResponse";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Loader2 } from "lucide-react";
interface SlidingSearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}
interface User {
  _id: Types.ObjectId;
  name: string;
  email: string;
  bio: string;
  avatar: string;
}
const SlidingSearchBar: React.FC<SlidingSearchBarProps> = ({
  isOpen,
  onClose,
}) => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [setSearchError, setsetSearchError] = useState<string>("");

  const onChnage = (e: any) => {
    const newValue = e.target.value;
    setUsername(newValue);
  };
  useEffect(() => {
    const FindSearchResult = async () => {
      if (username) {
        try {
          setsetSearchError("");
          setUsers([]);
          setisLoading(true);
          const response = await axios.get(`/api/search?username=${username}`);
          if (response.data.data.length == 0) {
            setsetSearchError(response.data.message);
          } else {
            setUsers(response.data.data);
          }
        } catch (error) {
          setsetSearchError("Error occured while searching users");
        } finally {
          setisLoading(false);
        }
      }
    };
    FindSearchResult();
  }, [username]);

  const Connection = async () => {
    console.log("Connected");
  };
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
          value={username}
          onChange={onChnage}
        />
      </div>
      <div>
        {!isLoading && users.length == 0 && !setSearchError && (
          <div className="text-center px-2 md:px-4 nt-4">
            Start typing a name to find the user you're looking for.
          </div>
        )}
        {!isLoading && setSearchError && (
          <div className="text-center px-2 md:px-4 nt-4">{setSearchError}</div>
        )}
        {isLoading && (
          <div className="flex justify-center items-center gap-1 ">
            Searching...
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          </div>
        )}
        <div className="flex flex-col gap-2 md:map-3 px-2">
          {!isLoading &&
            users.map((user) => (
              <div  key={user.email} className="flex items-center justify-between bg-gray-100  py-2 px-2 md:px-4 rounded-lg shadow-sm">
                <Link href="/" className="flex items-center justify-between">
                  {/* Profile Picture */}
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-1">
                    <Avatar>
                      <AvatarImage src={user?.avatar} alt="@shadcn" />
                      <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  {/* User Info */}
                  <div>
                    <span className="block text-gray-700 font-medium">
                      {user.name}
                    </span>
                    <p className="text-sm text-gray-500 text-nowrap">
                      786 Connections
                    </p>
                  </div>
                </Link>
                {/* Connect Button */}
                <button
                  className="bg-blue-100 font-semibold text-black px-4 py-2 rounded-md flex my-auto gap-2"
                  onClick={() => Connection()}
                >
                  Connect
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SlidingSearchBar;
