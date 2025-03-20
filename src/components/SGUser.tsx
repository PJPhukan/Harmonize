import React, { useState } from "react";
import dummyImg from "@/assets/userAvatar.jpg";
import Image from "next/image";
import { UserRoundPlus } from "lucide-react";
import axios from "axios";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const SGUser = ({
  user,
}: {
  user: {
    name: string;
    avatar: string;
    genres: string[];
    bio: string;
    _id: any;
  };
}) => {
  // console.log("User ,", user);

  const [isRequest, setIsRequest] = useState(false);
  const ConnectionRequest = async (id: string) => {
    if (!isRequest) {
      setIsRequest(true);
      const response = await axios.post("/api/connection-request", {
        requesteeId: id,
      });
      console.log("Response Connection request ", response);
    } else {
      setIsRequest(false);
      const response = await axios.delete("/api/connection-cencel", {
        data: { requesteeId: id },
      });
      console.log("Response ", response);
    }
  };
  const customLoader = ({ src }: { src: string }) => src;
  return (
    <div className="flex items-center justify-between bg-gray-100  py-2 px-2 rounded-md shadow-sm">
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
          <span className="block text-gray-700 font-medium">{user.name}</span>
          <p className="text-sm text-gray-500 text-nowrap">786 Connections</p>
        </div>
      </Link>
      {/* Connect Button */}
      <button
        className="bg-blue-100 font-semibold text-black px-4 py-2 rounded-md flex my-auto gap-2"
        onClick={() => ConnectionRequest(user._id)}
      >
        {isRequest ? (
          "Cancel"
        ) : (
          <>
            Connect <UserRoundPlus />
          </>
        )}
      </button>
    </div>
  );
};

export default SGUser;
