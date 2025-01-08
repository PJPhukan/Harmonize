import Image from "next/image";
import React from "react";
import dummyImg from "@/assets/architecture.jpg";
import ShowAudioTrack from "./ShowAudioTrack";
import ShowPost from "./ShowPost";

const UserPost = ({
  postData,
  isUser,
  name,
  avatar,
}: {
  postData: any | null;
  isUser: boolean;
  name: string;
  avatar: string;
}) => {
  if (!postData || postData?.imageTrack?.length <= 0) {
    // console.log("Activity data :", activityData.allActivities);
    return;
  }

  console.log("TrackData :", postData);
  return (
    <div className="mt-6">

      {postData.imageTrack &&
        postData.imageTrack.map((activity: any, index: number) => {
          return (
            <ShowPost
              key={index}
              post={activity}
              name={name}
              isUser={isUser}
              avatar={avatar}
            />
          );
        })}
    </div>
  );
};

export default UserPost;
