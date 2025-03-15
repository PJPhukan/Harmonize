"use client";
import React, { useEffect, useState } from "react";
import SGUser from "./SGUser";
import axios from "axios";
import { pages, socialLinks } from "@/data";
import Link from "next/link";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const SuggestedUser = () => {
  type SuggestedUser = {
    name: string;
    avatar: string;
    genres: string[];
    bio: string;
    _id: any;
  };
  const [suggestedUserDetails, setSuggestedUserDetails] = useState<
    SuggestedUser[]
  >([]);
  const [isRefresh, setisRefresh] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    getSuggestedUser();
  }, []);

  const getSuggestedUser = async () => {
    try {
      const response = await axios.get("/api/suggested-user");
      if (response.data.success) {
        setSuggestedUserDetails(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      setErrorMsg("Internal server error");
    }
  };

  const RefreshSuggested = async () => {
    setisRefresh(!isRefresh);
  };

  return (
    // TODO: Check on responsive time
    <div className="flex space-y-4 py-4 flex-col h-screen sticky top-0 right-0">
      <div className="px-7 py-5 flex-1 flex justify-between flex-col w-full pt-0">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 text-nowrap">
              Suggested Artists
            </h3>
            <Button
              className="bg-transparent hover:bg-transparent text-sm text-blue-500  px-3 py-1 border-2 rounded-sm"
              onClick={RefreshSuggested}
            >
              {isRefresh ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                "Refresh"
              )}
            </Button>
          </div>
          <div className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto scrollbar-hide px-2">
            {suggestedUserDetails &&
              suggestedUserDetails.map((user, index) => (
                <SGUser user={user} key={index} />
              ))}
            {suggestedUserDetails.length == 0 && (
              <div className="text-center mt-6 uppercase">No user found for you !</div>
            )}
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-6 text-xs text-gray-700">
          <p className="text-center flex gap-1 justify-center flex-wrap">
            {pages.map((page) => (
              <Link key={page.href} href={page.href}>
                {page.label}
              </Link>
            ))}
          </p>
          <div className="mt-2 flex flex-wrap justify-center space-x-2">
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:underline"
                target="_blank"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="mt-2 text-center">© 2024 Resonate Technologies</p>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default SuggestedUser;
