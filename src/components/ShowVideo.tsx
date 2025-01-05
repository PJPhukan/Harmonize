"use client";
import Image from "next/image";
import React from "react";
import dummyImg from "@/assets/architecture.jpg";

import { Button } from "./ui/button";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
const ShowVideo = () => {
  return (
    <div className="w-full  rounded-md mt-3 overflow-hidden min-h-[5rem] p-1 border-b">
      <div className="flex justify-between items-center gap-3 flex-col md:flex-row  ">
        <div className="flex gap-3">
          <Image
            src={dummyImg}
            alt="profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h2 className="font-semibold text-gray-700 flex items-center text-nowrap">
            Parag jy phukan
          </h2>
        </div>
        <Button className="bg-blue-500 rounded-full font-semibold text-white flex items-center ">
          + Connect
        </Button>
      </div>
      <video
        src="../assets/sample.mp4"
        className="mt-2 w-full h-full rounded-md max-h-[25rem]"
      />

      <div className="flex gap-2 cursor-pointer">
        <IoMdHeart width={40} height={40} />
        <IoMdHeartEmpty />
      </div>
      <p className="font-semibold text-gray-700 flex items-center text-nowrap mt-1 mb-2">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore neque
        minima corporis officiis amet quis facilis nam esse tempora unde.
      </p>
    </div>
  );
};

export default ShowVideo;
