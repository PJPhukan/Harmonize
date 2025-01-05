"use client";
import Image from "next/image";
import React, { useState } from "react";
import dummyImg from "@/assets/architecture.jpg";
import { AudioWaveform, Edit, Edit2, Play, Users } from "lucide-react";
import Link from "next/link";
import ShowAudioTrack from "@/components/ShowAudioTrack";
import UserActivity from "@/components/UserActivity";
import UserPost from "@/components/UserPost";
import UserTrack from "@/components/UserTrack";
import UserVideo from "@/components/UserVideo";
const page = () => {
  const [activity, setActivity] = useState(true);
  const [tracks, setTracks] = useState(false);
  const [post, setPost] = useState(false);
  const [video, setVideo] = useState(false);

  const handleActivity = (s: string) => {
    if (s === "activity") {
      setActivity(true);
      setPost(false);
      setTracks(false);
      setVideo(false);
    } else if (s === "post") {
      setActivity(false);
      setPost(true);
      setTracks(false);
      setVideo(false);
    } else if (s === "tracks") {
      setActivity(false);
      setPost(false);
      setTracks(true);
      setVideo(false);
    }
    if (s === "video") {
      setActivity(false);
      setPost(false);
      setTracks(false);
      setVideo(true);
    }
  };

  return (
    <div className="flex-1 px-3 md:px-5 py-1">
      {/* profile  */}
      <div className="bg-gray-200 rounded-md mt-3 overflow-hidden min-h-[10rem] ">
        <div className="flex justify-end items-center gap-3 flex-col md:flex-row p-3 mt-[2rem] md:mt-[5rem]">
          <div className="flex flex-col  md:flex-row gap-3 items-center">
            <div className="flex flex-col gap-3 items-center">
              <Image
                src={dummyImg}
                alt="profile"
                width={130}
                height={130}
                className="rounded-full"
              />
              <Link
                href="/user/me/edit"
                className="flex gap-1 bg-gray-600 text-white px-3 py-1.5 rounded-full "
              >
                <Edit2 width={20} />
                <span className="text-nowrap text-sm">Edit Profile</span>
              </Link>
            </div>

            {/* details  */}
            <div className="flex flex-col gap-1 items-center md:items-start">
              <p className="text-2xl font-bold">Krishi Pratim Sharma</p>
              {/* skills */}
              <div className="w-full mt-2">
                <div className="flex gap-1.5 items-center md:items-start">
                  <span className=" text-sm px-3 bg-white py-1 rounded-full ">
                    Songwriter
                  </span>
                  <span className="text-sm px-3 bg-white py-1 rounded-full ">
                    Music Composer
                  </span>
                </div>
              </div>
              {/* gonre */}
              <div className="w-full mt-1">
                <div className="flex gap-1.5 ">
                  <span className="text-sm px-3 bg-white py-1 rounded-full ">
                    EDM
                  </span>
                  <span className="text-sm px-3 bg-white py-1 rounded-full ">
                    Pop
                  </span>
                </div>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A fuga
                et deleniti inventore dolorum ipsa sequi! Officia fuga alias
                nam.
              </p>
            </div>
          </div>

          {/* connection  */}
          <div className="flex gap-3 items-center mt-3 md:mt-0 mr-3">
            <div className="flex flex-col items-center font-extrabold">
              <p className="text-xl">10.2K</p>
              <p className="">Connections</p>
            </div>
            <div className="flex flex-col items-center font-extrabold">
              <p className="text-xl">11.2K</p>
              <p className="">Tracks</p>
            </div>

            <div className="flex flex-col items-center font-extrabold">
              <p className="text-xl">9.2K</p>
              <p className="">Plays</p>
            </div>
          </div>
        </div>
      </div>
      {/* navber */}
      <p className="h-1 border-b mt-4" />
      <div className="flex">
        <div className="mt-2 w-2/3 ">
          <ul className="flex gap-2 md:gap-6 justify-center">
            <li
              className={`text-gray-600 py-2 cursor-pointer ${
                activity ? "font-semibold" : ""
              }`}
              onClick={() => handleActivity("activity")}
            >
              Activity
            </li>
            <li
              className={`text-gray-600 py-2 cursor-pointer ${
                tracks ? "font-semibold" : ""
              }`}
              onClick={() => handleActivity("tracks")}
            >
              Tracks
            </li>
            <li
              className={`text-gray-600 py-2 cursor-pointer ${
                post ? "font-semibold" : ""
              }`}
              onClick={() => handleActivity("post")}
            >
              Posts
            </li>
            <li
              className={`text-gray-600 py-2 cursor-pointer ${
                video ? "font-semibold" : ""
              }`}
              onClick={() => handleActivity("video")}
            >
              Videos
            </li>
          </ul>

          <div className="mt-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                <Image
                  src={dummyImg}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <p className="bg-gray-100 h-10 w-full mx-2 flex items-center px-3 rounded-lg">
                What's cooking?
              </p>
            </div>

            {activity && <UserActivity />}
            {post && <UserPost />}
            {tracks && <UserTrack />}
            {video && <UserVideo />}

            <div className="mt-10 text-center">
              <p className="text-gray-600">
                Upload your music so that musicians and artists can connect with
                you
              </p>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded mt-4 hover:bg-blue-700"
              >
                Get Started
              </button>
            </div>
          </div>
          {/* Content  */}
        </div>
        <div className="mt-4 w-1/3">
          {/* TODO: Add social media icons */}
          <p>Find me on</p>
        </div>
      </div>
    </div>
  );
};

export default page;
