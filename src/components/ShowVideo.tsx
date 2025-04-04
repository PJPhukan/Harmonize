"use client";
import React from "react";
import { Types } from "mongoose";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import PostOwner from "./postOwner";
const ShowVideo = ({
  video,
  isUser,
  name,
  avatar,
  id,
  isConnected = false,
}: {
  video: any;
  isUser: boolean;
  name: string;
  avatar: string;
  isConnected?: boolean;
  id?: Types.ObjectId;
}) => {
  return (
    <div className="w-full  rounded-md mt-3 overflow-hidden min-h-[5rem] p-1 border-b">
      <PostOwner
        name={name}
        avatar={avatar}
        isUser={isUser}
        isConnected={isConnected}
        id={id}
      />
      <video
        controls
        src={video.url}
        className="mt-2 w-full h-full rounded-md max-h-[25rem]"
      />

      <p className="font-semibold text-gray-700 flex items-center text-wrap md:text-nowrap mt-1 mb-2">
        {video.description}
      </p>
    </div>
  );
};

export default ShowVideo;
