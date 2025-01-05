import Image from "next/image";
import React from "react";
import dummyImg from "@/assets/architecture.jpg";
import ShowAudioTrack from "./ShowAudioTrack";
import ShowPost from "./ShowPost";

const UserPost = () => {
  return (
    <div className="mt-6">
      <ShowPost/>
      {/* <ShowAudioTrack />
      
      <ShowAudioTrack /> */}
      {/* <ShowAudioTrack /> */}
    </div>
  );
};

export default UserPost;
