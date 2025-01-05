import SuggestedUser from "@/components/SuggestedUser";
import React from "react";

const page = () => {
  return (
    <div className="flex">
      <section className="w-full md:w-4/6">home content</section>
      <div className="w-full lg:w-2/6 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 p-6 flex flex-col justify-between h-screen sticky top-0 right-0">
        <SuggestedUser />
      </div>
    </div>
  );
};

export default page;
