import React, { useState } from "react";
import dummyImg from "@/assets/userAvatar.jpg";
import Image from "next/image";
import { UserRoundPlus } from "lucide-react";
import axios from "axios";

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
      <div className="flex items-center justify-between">
        {/* Profile Picture */}
        <div className="w-10 h-10 rounded-full overflow-hidden mr-1">
          <Image
            loader={customLoader}
            src={user.avatar ? user.avatar : dummyImg}
            alt="User Profile"
            width={40}
            height={40}
            className="w-[40px] h-[40px]"
          />
        </div>
        {/* User Info */}
        <div>
          <span className="block text-gray-700 font-medium">{user.name}</span>
          <p className="text-sm text-gray-500 text-nowrap">786 Connections</p>
        </div>
      </div>
      {/* Connect Button */}
      <button
        type="button"
        className="px-3 py-1 text-sm text-white bg-pink-500 rounded-full hover:bg-pink-600 transition text-nowrap"
        onClick={() => ConnectionRequest(user._id)}
      >
        {isRequest ? "Cancel" : <UserRoundPlus />}
        <span className="hidden">connect</span>
      </button>
    </div>
  );
};

export default SGUser;
