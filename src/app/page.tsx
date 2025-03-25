"use client";

import { SquarePlay, SquarePlus, WandSparkles } from "lucide-react";
import Navber from "@/components/Navber";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Navber />

      <div className="bg-custom-pattern bg-cover bg-start min-h-screen text-white pt-15 md:pt-20 px-10 lg:px-28 flex justify-center flex-col items-center">
        <h2 className="text-5xl md:text-7xl font-bold text-center">
          Discover the music that Harmonizes yours.
        </h2>
        <h3 className="text-xl font-semibold text-center font-custom text-gray-500 w-3/4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum
          aperiam temporibus, officia soluta assumenda voluptatum ad natus.
          Exercitationem, maiores nemo, nulla quae architecto enim voluptates
          corrupti laudantium reprehenderit quidem adipisci!
        </h3>
        <Link href="/sign-up">
          <button
            type="button"
            className="bg-gray-300 text-black px-5 py-2 mt-10 rounded-full text-xl"
          >
            Get Started
          </button>
        </Link>
        <div className="flex justify-center items-center gap-8 mt-20">
          <div className="flex justify-center  items-center border  rounded flex-col px-5 py-3 w-[150px] h-[100px] gap-2 bg-gray-400 text-black  shadow-lg hover:translate-y-[-5px] transition-all duration-500 hover:scale-110 hover:shadow-xl">
            <SquarePlay />
            <p className="text-xl">Connect</p>
          </div>
          <div className="flex justify-center  items-center border rounded flex-col px-5 py-3 w-[150px] h-[100px] gap-2 bg-gray-400 text-black shadow-lg hover:translate-y-[-5px] transition-all duration-500 hover:scale-110">
            <WandSparkles />
            <p className="text-xl">Collaborate</p>
          </div>
          <div className="flex justify-center  items-center border rounded flex-col px-5 py-3 w-[150px] h-[100px] gap-2 bg-gray-400 text-black shadow-lg hover:translate-y-[-5px] transition-all duration-500 hover:scale-110">
            <SquarePlus />
            <p className="text-xl">Create</p>
          </div>
        </div>
      </div>
    </main>
  );
}
