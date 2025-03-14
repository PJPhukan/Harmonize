"use client";
import Image from "next/image";
import React from "react";
import dummyImg from "@/assets/architecture.jpg";
import { Button } from "./ui/button";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import PostOwner from "./postOwner";
const ShowPost = ({
  post,
  isUser,
  name,
  avatar,
  isConnected = false,
}: {
  post: any;
  isUser: boolean;
  name: string;
  avatar: string;
  isConnected?: boolean;
}) => {
  const customLoader = ({ src }: { src: string }) => src;
  return (
    <div className="w-full  rounded-md mt-3 overflow-hidden min-h-[5rem] p-1 border-b">
      <PostOwner
        name={name}
        avatar={avatar}
        isUser={isUser}
        isConnected={isConnected}
      />
      <Image
        loader={customLoader}
        src={post.url}
        alt=""
        className="mt-2 w-full h-full rounded-md max-h-[20rem]"
        width={200}
        height={400}
        // className="rounded-md"
      />

      <div className="flex gap-2 cursor-pointer ">
        <IoMdHeart width={40} height={40} />
        <IoMdHeartEmpty />
      </div>
      <p className="font-semibold text-gray-700 flex items-center md:text-nowrap mt-1 mb-2 text-wrap">
        {post.description}
      </p>
    </div>
  );
};

export default ShowPost;
