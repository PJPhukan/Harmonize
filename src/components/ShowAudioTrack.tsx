"use client";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Image from "next/image";
import React from "react";
import dummyImg from "@/assets/architecture.jpg";
import { Button } from "./ui/button";
import { Pause, Play } from "lucide-react";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
const ShowAudioTrack = ({
  audio,
  isUser,
  name,
  avatar,
  isConnected = false,
}: {
  audio: any;
  isUser: boolean;
  name: string;
  avatar: string;
  isConnected?: boolean;
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [play, setplay] = useState(false);
  useEffect(() => {
    if (waveformRef.current) {
      const ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#34374B",
        progressColor: "#F90",
        url: audio.url,
        height: 50,
        barWidth: 2,
        barRadius: 2,
        barGap: 1,
        normalize: true,
      });

      ws.on("ready", () => {
        setDuration(ws.getDuration()); // Set the total duration when ready
        // console.log("Waveform ready");
      });

      ws.on("audioprocess", () => {
        setCurrentTime(ws.getCurrentTime()); // Update current play time
      });

      ws.on("finish", () => {
        // console.log("Playback finished");
        setCurrentTime(0); // Reset play time when playback finishes
      });

      setWavesurfer(ws);

      return () => {
        ws.destroy();
      };
    }
  }, []);

  const handlePause = () => {
    wavesurfer?.playPause();
    play ? setplay(false) : setplay(true);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  const customLoader = ({ src }: { src: string }) => src;
  return (
    <div className="w-full  rounded-md mt-3 overflow-hidden min-h-[5rem] p-1 border-b">
      <div className="flex justify-between items-center gap-3 flex-col md:flex-row  ">
        <div className="flex gap-3">
          <Image
            loader={customLoader}
            src={avatar ? avatar : dummyImg}
            alt="profile"
            width={40}
            height={40}
            className="rounded-full img"
          />
          <h2 className="font-semibold text-gray-700 flex items-center text-nowrap">
            {name}
          </h2>
        </div>
        {!isUser && (
          <Button className="bg-blue-500 rounded-full font-semibold text-white flex items-center ">
            {isConnected ? " Remove" : "+ Connect"}
          </Button>
        )}
      </div>
      <div className="flex gap-3 items-center  justify-start bg-gray-200 p-2 rounded-md mt-1">
        <div className="h-[6rem] w-[8rem] bg-red-500 flex justify-center items-center rounded-md">
          {play ? (
            <Pause
              width={50}
              onClick={handlePause}
              height={50}
              className="bg-red-900 text-white rounded-full p-2"
            />
          ) : (
            <Play
              width={50}
              onClick={handlePause}
              height={45}
              className="bg-red-900 text-white rounded-full p-2"
            />
          )}
        </div>
        <div className="flex flex-col gap-1 w-full mr-2">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">{audio.name}</span>
            <div>
              <span>{formatTime(currentTime)}</span> /
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-1 z-30">
              <p className="text-sm text-gray-500">{name}</p>
              <span className="bg-white py-1 px-2 rounded-2xl text-center text-sm">
                {audio.tag}
              </span>
              {/* <div className="flex gap-1 text-lg">
                <IoMdHeart />
                <IoMdHeartEmpty />
              </div> */}
            </div>

            <div
              ref={waveformRef}
              className="w-full h-full bg-transparent translate-y-[50%]"
            />
          </div>
        </div>
      </div>
      <p className="font-semibold text-gray-700 flex items-center text-nowrap mt-1 mb-2">
        {audio.description}
      </p>
    </div>
  );
};

export default ShowAudioTrack;
