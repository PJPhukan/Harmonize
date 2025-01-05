import React from "react";
import ShowAudioTrack from "./ShowAudioTrack";
import ShowPost from "./ShowPost";
import ShowVideo from "./ShowVideo";
const UserActivity = () => {
  return (
    <div className="mt-6">
      <ShowAudioTrack />
      <ShowPost />
      <ShowVideo />
      <ShowPost />
    </div>
  );
};

export default UserActivity;
