import Image from "next/image";
import React from "react";
import dummyImg from "@/assets/architecture.jpg";
import ShowAudioTrack from "./ShowAudioTrack";

const UserTrack = () => {
  return (
    <div className="mt-6">
      

      <ShowAudioTrack />
      <ShowAudioTrack />
      <ShowAudioTrack />
      <ShowAudioTrack />
    </div>
  );
};

export default UserTrack;
