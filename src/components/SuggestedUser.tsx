import React from "react";
import SGUser from "./SGUser";

const SuggestedUser = () => {
  return (
    <div className="h-screen sticky top-0 right-0">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Suggested artists
          </h3>
          <button className="text-sm text-blue-500">Refresh</button>
        </div>
        <div className="flex flex-col gap-2 h-[70vh] overflow-y-auto scrollbar-hide">
          <SGUser />
          <SGUser />
          <SGUser />
          <SGUser />
          <SGUser />
          <SGUser />
          <SGUser />
          <SGUser />
          <SGUser />
          {/* <SGUser /> */}
          {/* <SGUser /> */}
          {/* <SGUser /> */}
        </div>
      </div>
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
