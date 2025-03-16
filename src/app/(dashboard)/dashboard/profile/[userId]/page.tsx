"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { notFound, useParams, useRouter } from "next/navigation";

import { Music2, PlayIcon, UserRound } from "lucide-react";

import UserActivity from "@/components/UserActivity";
import UserPost from "@/components/UserPost";
import UserTrack from "@/components/UserTrack";
import UserVideo from "@/components/UserVideo";

import { User } from "@/types/user.types";
import { Post } from "@/types/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { socialMedia } from "@/data";
import FindMeOnItem from "@/components/FindMeOnItem";
const UserProfile = ({ isUser = false }: { isUser: boolean }) => {

  //If userId is not valid then redirect to the not found page 
  const params = useParams<{ userId: string }>();
  useEffect(() => {
    if (!params?.userId) {
      notFound();
    }
  }, [params]);

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

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    getUserDetails();
    getTotalConnections();
    getTotalTracks();
    getUserPosts();
  }, []);

  //get user details from the user

  const [user, setUser] = useState<User>();
  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/get-user");
      // console.log("Response", response);
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Error occured while fetching user details", error);
      setErrorMsg("Internal server error");
    }
  };

  //get total connections
  const [totalConnections, setTotalConnections] = useState<number>(0);
  const getTotalConnections = async () => {
    try {
      const response = await axios.get("/api/get-all-connections");
      // console.log("Connection Response", response);
      if (response.data.success) {
        setTotalConnections(response.data.data.totalConnections);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Error occured while fetching total connections", error);
      setErrorMsg("Internal server error");
    }
  };

  //get total tracks
  const [totalTracks, setTotalTracks] = useState<number>(0);
  const getTotalTracks = async () => {
    try {
      const response = await axios.get("/api/get-all-tracks");
      console.log("Tracks Response", response);
      if (response.data.success) {
        setTotalTracks(response.data.data.totalTracks);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Error occured while fetching total tracks", error);
      setErrorMsg("Internal server error");
    }
  };

  //fetch user all post
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const getUserPosts = async () => {
    try {
      const response = await axios.get("/api/me-post");
      console.log("Posts Response", response);
      if (response.data.success) {
        setUserPosts(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Error occured while fetching user posts", error);
      setErrorMsg("Internal server error");
    }
  };

  const mediaDetails = [
    {
      label: "Connections",
      icon: UserRound,
      total: totalConnections,
    },
    {
      label: "Audio Track",
      icon: Music2,
      total: totalTracks,
    },
    {
      label: "User Played",
      icon: PlayIcon,
      total: 980,
    },
  ];

  return (
    user && (
      <div className="flex-1 px-3 md:px-5 py-1 w-full md:w-[73vw] mt-20 md:mt-0 mb-[80px] overflow-x-hidden ">
        {/* profile  */}
        <div className="bg-gray-200 rounded-md mt-3 overflow-hidden min-h-[10rem] ">
          <div className="flex justify-between items-center gap-3 flex-col md:flex-row p-3 mt-[2rem] md:mt-[5rem]">
            <div className="flex flex-col  md:flex-row gap-3 items-center">
              <div className="flex flex-col gap-3 items-center">
                <Avatar className="w-20 h-20 md:w-40 md:h-40 ">
                  <AvatarImage src={user?.avatar} alt="Profile" />
                  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>

              {/* details  */}
              <div className="flex flex-col gap-1 items-center md:items-start">
                <p className="text-2xl font-bold">{user.name}</p>
                {/* skills */}
                <div className="w-full mt-2">
                  <div className="flex gap-1.5 items-center md:items-start">
                    {user.skill.length > 0 &&
                      user.skill.map((sk, i) => (
                        <span
                          key={sk}
                          className=" text-sm px-3 bg-white py-1 rounded-full "
                        >
                          {sk}
                        </span>
                      ))}
                  </div>
                </div>
                {/* gonre */}
                <div className="w-full mt-1">
                  <div className="flex gap-1.5 ">
                    {user.genres.length > 0 &&
                      user.genres.map((gn, i) => (
                        <span
                          key={i}
                          className="text-sm px-3 bg-white py-1 rounded-full "
                        >
                          {gn}
                        </span>
                      ))}
                  </div>
                </div>
                <p className="text-sm">{user.bio}</p>
              </div>
            </div>

            {/* connection  */}
            <div className="flex gap-2 md:gap-3 items-center mt-3 md:mt-0 md:mr-3  w-full md:w-1/2 justify-center md:justify-end">
              {mediaDetails.map((media) => (
                <div
                  key={media.label}
                  className="flex flex-col justify-center items-center font-extrabold w-1/3 md:w-1/4 bg-white rounded-md  h-20 md:h-28 relative shadow-md inset-2"
                >
                  <p className="text-3xl md:text-5xl number-font">
                    {media.total > 999
                      ? `${(media.total / 1000).toFixed(1)}K`
                      : media.total}
                  </p>
                  <p className="">{media.label}</p>
                  <span className="absolute w-full h-full opacity-10 flex justify-center items-center">
                    <media.icon className="w-full h-full" />
                  </span>
                </div>
              ))}
            </div>

            {/* user social media links  */}

            <div className="flex md:hidden aspect-auto gap-1">
              {user.spotify && (
                <FindMeOnItem
                  data={{
                    url: "/social/spotify.png",
                    label: "Spotify",
                  }}
                  link={user.spotify}
                />
              )}
              {user.website && (
                <FindMeOnItem
                  data={{
                    url: "/social/website.png",
                    label: "Website",
                  }}
                  link={user.website}
                />
              )}
              {user.youtube && (
                <FindMeOnItem
                  data={{
                    url: "/social/youtube.png",
                    label: "Youtube",
                  }}
                  link={user.youtube}
                />
              )}
              {user.otherLink.map((link) => {
                const matchedMedia = socialMedia.find((media) =>
                  link.includes(media.label.toLowerCase())
                );
                return matchedMedia ? (
                  <FindMeOnItem key={link} data={matchedMedia} link={link} />
                ) : null;
              })}
            </div>
          </div>
        </div>
        {/* navber */}
        <p className="h-1 border-b mt-4 w-full " />
        {userPosts && (
          <div className="flex">
            <div className="mt-2 md:w-2/3 ">
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
                {activity && (
                  <UserActivity
                    activityData={userPosts}
                    name={user.name}
                    isUser={isUser}
                    avatar={user.avatar}
                  />
                )}
                {post && (
                  <UserPost
                    postData={userPosts}
                    name={user.name}
                    isUser={isUser}
                    avatar={user.avatar}
                  />
                )}
                {tracks && (
                  <UserTrack
                    trackData={userPosts}
                    name={user.name}
                    isUser={isUser}
                    avatar={user.avatar}
                  />
                )}
                {video && (
                  <UserVideo
                    videoData={userPosts}
                    name={user.name}
                    isUser={isUser}
                    avatar={user.avatar}
                  />
                )}

                {!userPosts && (
                  <div className="text-center mt-4">No post uploaded yet .</div>
                )}
              </div>
              {/* Content  */}
            </div>
            <div className="mt-4 w-1/3 md:block hidden justify-center pl-3">
              {/* TODO: Add social media icons */}
              <p className=" pb-3 font-semibold text-xl">Let’s be social! 🤝</p>

              <div className="flex flex-col gap-1 items-center ">
                {user.spotify && (
                  <FindMeOnItem
                    data={{
                      url: "/social/spotify.png",
                      label: "Spotify",
                    }}
                    link={user.spotify}
                  />
                )}
                {user.website && (
                  <FindMeOnItem
                    data={{
                      url: "/social/website.png",
                      label: "Website",
                    }}
                    link={user.website}
                  />
                )}
                {user.youtube && (
                  <FindMeOnItem
                    data={{
                      url: "/social/youtube.png",
                      label: "Youtube",
                    }}
                    link={user.youtube}
                  />
                )}
                {user.otherLink.map((link) => {
                  const matchedMedia = socialMedia.find((media) =>
                    link.includes(media.label.toLowerCase())
                  );
                  return matchedMedia ? (
                    <FindMeOnItem key={link} data={matchedMedia} link={link} />
                  ) : null;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default UserProfile;
