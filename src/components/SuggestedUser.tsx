"use client";
import React, { useEffect, useState } from "react";
import SGUser from "./SGUser";
import axios from "axios";

const SuggestedUser = () => {
  type SuggestedUser = {
    name: string;
    avatar: string;
    genres: string[];
    bio: string;
    _id:any
    
  };
  const [suggestedUserDetails, setSuggestedUserDetails] = useState<
    SuggestedUser[]
  >([]);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    getSuggestedUser();
  }, []);

  const getSuggestedUser = async () => {

    try {
      const response = await axios.get("/api/suggested-user");
      console.log("Suggested user Response", response);
      if (response.data.success) {
        setSuggestedUserDetails(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Error occured while fetching user follow content", error);
      setErrorMsg("Internal server error");
    }
  };
  return (
    <div className="h-screen sticky top-0 right-0 flex flex-col justify-between ">
      {/* Suggested Artists Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 text-nowrap">
            Suggested Artists
          </h3>
          <button className="text-sm text-blue-500">Refresh</button>
        </div>
        <div className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto scrollbar-hide px-2">
          {suggestedUserDetails &&
            suggestedUserDetails.map((user, index) => (
              <SGUser user={user} key={index} />
            ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-6 text-xs text-gray-500">
        <p className="text-center">
          About · Help · Blog · Careers · Press · Terms of Use · Privacy Policy
          · Contact Us
        </p>
        <div className="mt-2 flex flex-wrap justify-center space-x-2">
          <a href="#" className="hover:underline">
            Discord
          </a>
          <a href="#" className="hover:underline">
            Facebook
          </a>
          <a href="#" className="hover:underline">
            Instagram
          </a>
          <a href="#" className="hover:underline">
            Reddit
          </a>
          <a href="#" className="hover:underline">
            TikTok
          </a>
          <a href="#" className="hover:underline">
            Twitter
          </a>
          <a href="#" className="hover:underline">
            YouTube
          </a>
        </div>
        <p className="mt-2 text-center">© 2024 Resonate Technologies</p>
      </div>
    </div>
  );
};

export default SuggestedUser;
