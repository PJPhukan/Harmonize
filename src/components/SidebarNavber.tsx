("");

import React, { useEffect, useState } from "react";

const SlidingMenu = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    };
    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, []);

  return (
    // <div className="min-h-screen bg-gray-800 text-white">
    //   {/* Sliding Menu */}
    //   <div className="fixed">
    //     <div className="relative bg-white w-12 hover:w-48 h-screen transition-all duration-500 overflow-hidden">
    //       <ul className="h-full">
    //         {/* Logo */}
    //         <li className="mb-12">
    //           <a href="#" className="flex items-center">
    //             <span className="icon flex justify-center items-center w-12 h-12 text-2xl text-gray-800">
    //               H
    //             </span>
    //             <span className="text hidden hover:block z-20 text-black text-lg">
    //               Home
    //             </span>
    //           </a>
    //         </li>
    //         {/* Menu Items */}
    //         {["About", "Settings", "Profile", "Blog", "Chat"].map((item, index) => (
    //           <li key={index} className="hover:bg-gray-200">
    //             <a href="#" className="flex items-center">
    //               <span className="icon flex justify-center items-center w-12 h-12 text-2xl text-gray-800">
    //                 {item[0]}
    //               </span>
    //               <span className="text hidden hover:block text-gray-800 text-lg">
    //                 {item}
    //               </span>
    //             </a>
    //           </li>
    //         ))}
    //         {/* Profile and Logout */}
    //         <div className="absolute bottom-0 w-full">
    //           <li className="hover:bg-gray-200">
    //             <a href="#" className="flex items-center">
    //               <span className="icon flex justify-center items-center w-12 h-12">
    //                 <img
    //                   src="/my_pic.png"
    //                   alt="Profile"
    //                   className="w-8 h-8 rounded-full"
    //                 />
    //               </span>
    //               <span className="text hidden hover:block text-gray-800 text-lg">
    //                 pjphukan
    //               </span>
    //             </a>
    //           </li>
    //           <li className="hover:bg-gray-200">
    //             <a href="#" className="flex items-center">
    //               <span className="icon flex justify-center items-center w-12 h-12 text-2xl text-gray-800">
    //                 L
    //               </span>
    //               <span className="text hidden hover:block text-gray-800 text-lg">
    //                 Logout
    //               </span>
    //             </a>
    //           </li>
    //         </div>
    //       </ul>
    //     </div>
    //   </div>

    //   {/* Clock */}
    //   <div className="flex flex-col items-center justify-center h-screen ml-14">
    //     <h1 className="text-3xl font-semibold">Current Time</h1>
    //     <div className="flex items-center mt-6">
    //       <div
    //         id="s1"
    //         className="s flex items-center justify-center h-12 w-12 rounded-lg shadow-md bg-gradient-to-r from-red-500 to-gray-700 text-xl italic"
    //       >
    //         {String(time.hours).padStart(2, "0")}
    //       </div>
    //       <span className="text-3xl mx-2">:</span>
    //       <div
    //         id="s2"
    //         className="s flex items-center justify-center h-12 w-12 rounded-lg shadow-md bg-gradient-to-r from-red-500 to-blue-700 text-xl italic"
    //       >
    //         {String(time.minutes).padStart(2, "0")}
    //       </div>
    //       <span className="text-3xl mx-2">:</span>
    //       <div
    //         id="s3"
    //         className="s flex items-center justify-center h-12 w-12 rounded-lg shadow-md bg-gradient-to-r from-yellow-400 to-blue-700 text-xl italic"
    //       >
    //         {String(time.seconds).padStart(2, "0")}
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="h-screen ">
      <div className="w-1/5  border-r border-gray-200 p-4 h-screen bg-white">
        <h1 className="text-xl font-bold text-purple-600 mb-6">Harmonize</h1>
        <nav>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 3.293l7 7V18a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4H9v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-7.707l7-7z" />
              </svg>
              <span>Home</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13 7H7v6h6V7z" />
                <path
                  fillRule="evenodd"
                  d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v10H5V5z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Explore</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3a1.5 1.5 0 00-3 0v.5H6a1 1 0 000 2h1.5v1H6a1 1 0 100 2h1.5v1H6a1 1 0 100 2h1.5v.5a1.5 1.5 0 003 0v-.5H12a1 1 0 100-2h-1.5v-1H12a1 1 0 100-2h-1.5v-1H12a1 1 0 100-2h-1.5V3z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Search</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 9a3 3 0 106 0 3 3 0 00-6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M2 8a6 6 0 1112 0 6 6 0 01-12 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Notifications</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 5a1 1 0 011-1h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5z" />
                <path d="M3.5 6.5a.5.5 0 00-.5.5v7a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-7a.5.5 0 00-.5-.5h-13z" />
              </svg>
              <span>Messages</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2a4 4 0 100 8 4 4 0 000-8zM5 10a5 5 0 1110 0v3.5a1.5 1.5 0 001 1.415V16a1 1 0 01-1 1H5a1 1 0 01-1-1v-1.085a1.5 1.5 0 001-1.415V10z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>You</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SlidingMenu;
