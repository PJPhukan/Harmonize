"use client";

import React, { useEffect } from "react";
import ShowAudioTrack from "./ShowAudioTrack";
import ShowPost from "./ShowPost";
import ShowVideo from "./ShowVideo";
const UserActivity = ({
  activityData,
  isUser,
  name,
  avatar,
}: {
  activityData: any | null;
  isUser: boolean;
  name: string;
  avatar: string;
}) => {
  if (!activityData || activityData?.allActivities?.length <= 0) {
    // console.log("Activity data :", activityData.allActivities);
    return;
  }

  return (
    <div className="mt-6">
      {activityData.allActivities &&
        activityData.allActivities.map((activity: any, index: number) => {
          // console.log("Activity :", activity);
          if (activity.type.includes("image")) {
            return (
              <ShowPost
                key={index}
                post={activity}
                name={name}
                isUser={isUser}
                avatar={avatar}
              />
            );
          } else if (activity.type.includes("audio")) {
            return (
              <ShowAudioTrack
                key={index}
                audio={activity}
                name={name}
                isUser={isUser}
                avatar={avatar}
              />
            );
          } else {
            return (
              <ShowVideo
                key={index}
                video={activity}
                name={name}
                isUser={isUser}
                avatar={avatar}
              />
            );
          }
        })}
      {/* <ShowAudioTrack /> */}
      {/* <ShowPost /> */}
      {/* // <ShowVideo /> */}
      {/* <ShowPost /> */}
    </div>
  );
};

export default UserActivity;
