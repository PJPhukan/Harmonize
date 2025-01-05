import Image from "next/image";
import React from "react";
import dummyImg from "@/assets/architecture.jpg";
const page = () => {
  return (
    // <!-- Main Content -->
    <div className="flex-1 p-4 md:p-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* <!-- Profile Header --> */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-pink-300 rounded-full">
              <Image src={dummyImg} alt="" className="h-16 w-16"></Image>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Krishi Sarma</h1>
              <div className="mt-2 flex flex-wrap space-x-2">
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                  Music Producer
                </span>
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                  Songwriter
                </span>
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                  Topliner
                </span>
              </div>
              <p className="text-gray-600 mt-2 text-sm">
                An innovative songwriter and producer, Krishi Sarma blends
                modern pop with classical influences.
              </p>
            </div>
          </div>
          <button className="mt-4 md:mt-0 text-gray-600 bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">
            Edit Profile
          </button>
        </div>

        {/* <!-- Stats --> */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 border-t pt-4 space-y-4 md:space-y-0">
          <div className="text-center">
            <p className="text-xl font-bold">0</p>
            <p className="text-gray-600">Connections</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">0</p>
            <p className="text-gray-600">Tracks</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">0</p>
            <p className="text-gray-600">Plays</p>
          </div>
        </div>

        {/* <!-- Tabs --> */}
        <div className="mt-6">
          <ul className="flex space-x-6 border-b">
            <li className="text-gray-800 border-b-2 border-gray-800 py-2">
              Activity
            </li>
            <li className="text-gray-600 py-2">Tracks</li>
            <li className="text-gray-600 py-2">Posts</li>
            <li className="text-gray-600 py-2">Videos</li>
          </ul>
        </div>

        {/* <!-- Activity Section --> */}
        <div className="mt-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <input
              type="text"
              placeholder="What's cooking?"
              className="ml-4 flex-1 bg-gray-100 px-4 py-2 rounded focus:outline-none"
            />
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600">
              Upload your music so that musicians and artists can connect with
              you
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded mt-4 hover:bg-blue-700">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
