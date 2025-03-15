import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@/types/user.types";

const ConnectedUser = ({ user }: { user: User }) => {
  return (
    <div className=" bg-gray-100 mx-1 md:mx-3 md:px-2 md:py-1 px-3 py-2 relative flex justify-between items-center rounded-md">
      <Link
        href={`/dashboard/profile/${user._id}`}
        className="flex justify-center items-center gap-2"
      >
        <Avatar className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] ">
          <AvatarImage src={user.avatar} alt="Profile" />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-md md:text-xl font-medium">{user.name}</span>
          <span className="text-opacity-50">pjphukan</span>
        </div>
      </Link>
      <span className="bg-blue-100 font-medium text-blue-600 px-3 py-1 md:px-5 md:py-2 rounded-sm">
        Disconnect
      </span>
    </div>
  );
};

export default ConnectedUser;
