import Image from "next/image";
import React from "react";
import dummyImg from "@/assets/architecture.jpg";
import ShowAudioTrack from "./ShowAudioTrack";

const UserTrack = ({
  trackData,
  isUser,
  name,
  avatar,
}: {
  trackData: any | null;
  isUser: boolean;
  name: string;
  avatar: string;
}) => {
  if (!trackData || trackData?.audioTrack?.length <= 0) {
    // console.log("Activity data :", activityData.allActivities);
    return;
  }

  console.log("TrackData :",trackData)

  return (
    <div className="mt-6">
      {trackData.audioTrack &&
        trackData.audioTrack.map((activity: any, index: number) => {
          return (
            <ShowAudioTrack
              key={index}
              audio={activity}
              name={name}
              isUser={isUser}
              avatar={avatar}
            />
          );
        })}
    </div>
  );
};

export default UserTrack;
