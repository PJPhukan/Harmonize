import Image from "next/image";
import React from "react";
import dummyImg from "@/assets/architecture.jpg";
const PostOwner = ({
  name,
  avatar,
  isUser,
  isConnected,
}: {
  name: string;
  avatar: string;
  isUser: Boolean;
  isConnected: Boolean;
}) => {
  const customLoader = ({ src }: { src: string }) => src;

  return (
    <div className="flex h-full justify-between items-center gap-3  md:flex-row  ">
      <div className="flex gap-3">
        <Image
          loader={customLoader}
          src={avatar ? avatar : dummyImg}
          alt="profile"
          width={40}
          height={40}
          className="rounded-full img"
        />
        <h2 className="font-semibold text-gray-700 flex items-center text-nowrap">
          {name}
        </h2>
      </div>
      {!isUser && (
        <span className=" font-semibold text-white flex items-center cursor-pointer">
          {isConnected ? (
            <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-sm">
              Disconnect
            </span>
          ) : (
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-sm">
              Connect
            </span>
          )}
        </span>
      )}
    </div>
  );
};

export default PostOwner;
