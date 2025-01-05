import React from "react";
import profile from "@/assets/architecture.jpg";
import Image from "next/image";
const SGUser = () => {
  return (
    <div className="flex items-center justify-between bg-gray-100 px-2 py-2 rounded-md">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image src={profile} alt="" className="w-full h-full"/>
        </div>
        <div>
          <span className="text-gray-700">PJPhukan</span>
          <p className="text-sm text-gray-500">786 Connections</p>
        </div>
      </div>
      <button
        type="button"
        className="px-2 py-1 text-sm text-white bg-pink-500 rounded-full"
      >
        + Connect
      </button>
    </div>
  );
};

export default SGUser;
