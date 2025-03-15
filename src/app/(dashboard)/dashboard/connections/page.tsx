"use client";
import React, { useEffect, useState } from "react";

import SuggestedUser from "@/components/SuggestedUser";
import { User } from "@/types/user.types";
import axios from "axios";
import ConnectedUser from "@/components/ConnectedUser";

const page = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    getConnectedUsersDetails();
  }, []);

  

  //get user details
  const getConnectedUsersDetails = async () => {
    try {
      const response = await axios.get("/api/get-connected-user-details");
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Error occured while fetching user details", error); //TODO: Remove
      setErrorMsg("Internal server error");
    }
  };

  
  return (
    <div className="flex ">
      <section className="w-full md:w-[62.5%] py-4">
        <h3 className="text-xl font-semibold text-gray-800 text-nowrap border-b-2 mx-3 ">
          Your Connections
        </h3>
        <div className="py-3 mt-4 relative flex gap-1 flex-col">
          {users?.map((user) => (
            <ConnectedUser key={user._id.toString()} user={user} />
          ))}
          {!users && <div className="text-center text-lg md:text-xl">You have not connect with anyone</div>}
        </div>
      </section>
      <div className="w-full hidden md:block md:w-[24rem] bg-white border-t lg:border-t-0 lg:border-l border-gray-200 h-screen sticky top-0 right-0">
        <SuggestedUser />
      </div>
    </div>
  );
};

export default page;
