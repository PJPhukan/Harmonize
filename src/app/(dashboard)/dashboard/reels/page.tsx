"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { Download, Heart, Share2 } from "lucide-react";
import { Types } from "mongoose";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";

interface Video {
  _id: Types.ObjectId;
  type: string;
  url: string;
  description: string;
  name: string;
  owner: Types.ObjectId;
  ownerDetails: {
    _id: Types.ObjectId;
    name: string;
    email: string;
    avatar: string;
    bio: string;
  };
  isConnected: boolean;
}

const Page = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const GetReels = async () => {
    try {
      setVideos([]);
      setisLoading(true);
      const response = await axios.get("/api/get-reels");

      console.log("REELS RESPONSE :", response);
      setVideos(response.data.data);
    } catch (error) {
      console.log("Error while fetching reels", error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    GetReels();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 } // Video should be at least 60% visible to play
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [videos]);

  const handleShare = async (videoUrl: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this video!",
          url: videoUrl,
        });
        toast.success("Video shared successfully!");
      } catch (error) {
        console.error("Error sharing video:", error);
        toast.error("Sharing failed!");
      }
    } else {
      // Fallback: Copy link to clipboard
      navigator.clipboard.writeText(videoUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleDownload = async (
    videoUrl: string,
    videoName: string = "video.mp4"
  ) => {
    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = videoName; // Set filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Download started!");
    } catch (error) {
      console.error("Error downloading video:", error);
      toast.error("Download failed!");
    }
  };
  return (
    <div className="bg-black text-white m-0 min-h-screen py-3 flex justify-center items-center ">
      <div className="flex flex-col gap-3 justify-center items-center">
        {videos.map((video, index) => (
          <div
            key={video._id.toString()}
            className="h-screen w-auto relative rounded-lg overflow-hidden"
          >
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              muted
              loop
              src={video.url}
              className="w-full h-screen  rounded-md"
            />
            <div className="flex absolute right-1 flex-col bottom-[50px] gap-5 text-black justify-center items-center">
              <span className="flex items-center flex-col cursor-pointer">
                <Heart className="" />
                12.1k
              </span>
              <span
                className="cursor-pointer"
                onClick={() => handleShare(video.url)}
              >
                <Share2 />
              </span>
              <span
                className="cursor-pointer"
                onClick={() => handleDownload(video.url, video.name)}
              >
                <Download />
              </span>
            </div>
            <div className=" absolute bottom-7 left-3 text-black">
              <div className="flex justify-start gap-2 items-center">
                <Link
                  href={`/dashboard/profile/${video.ownerDetails._id}`}
                  className="flex items-center gap-2"
                >
                  <Avatar className="h-[30px] w-[30px]">
                    <AvatarImage
                      src={video.ownerDetails?.avatar}
                      alt={video.ownerDetails?.name}
                    />
                    <AvatarFallback>
                      {video.ownerDetails?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{video.ownerDetails?.name}</span>
                </Link>
                <span className=" font-semibold text-black flex items-center bg-transparent cursor-pointer">
                  {video.isConnected ? (
                    <span className="border-2 px-3 py-1 rounded-sm">
                      Disconnect
                    </span>
                  ) : (
                    <span className="border-2 px-3 py-1 rounded-sm ">
                      Connect
                    </span>
                  )}
                </span>
              </div>
              <span className="ellipsis">{video.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
