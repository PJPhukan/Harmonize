import Image from "next/image";
import React from "react";
import dummyImg from "@/assets/architecture.jpg";
import ShowAudioTrack from "./ShowAudioTrack";
import ShowVideo from "./ShowVideo";

const UserVideo = ({
  videoData,
  isUser,
  name,
  avatar,
}: {
  videoData: any | null;
  isUser: boolean;
  name: string;
  avatar: string;
}) => {
  if (!videoData || videoData?.videoTrack?.length <= 0) {
    // console.log("Activity data :", activityData.allActivities);
    return;
  }
  return (
    <div className="mt-6">
      {/* <ShowVideo /> */}
      {videoData.videoTrack ? (
        videoData.videoTrack.map((activity: any, index: number) => {
          return (
            <ShowVideo
              key={index}
              video={activity}
              name={name}
              isUser={isUser}
              avatar={avatar}
            />
          );
        })
      ) : (
        <div className="mt-6">
          <p className="text-gray-500 text-sm mt-5 text-center">
            No video available
          </p>
        </div>
      )}
      {/* <ShowVideo /> */}
    </div>
  );
};

export default UserVideo;
