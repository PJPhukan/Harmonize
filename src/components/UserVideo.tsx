import Image from "next/image";
import React from "react";
import dummyImg from "@/assets/architecture.jpg";
import ShowAudioTrack from "./ShowAudioTrack";
import ShowVideo from "./ShowVideo";

const UserVideo = () => {
  return (
    <div className="mt-6">
      <ShowVideo />
      <ShowVideo />
    </div>
  );
};

export default UserVideo;
