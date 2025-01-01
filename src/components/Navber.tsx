import Link from "next/link";
import React from "react";

const Navber = () => {
  return (
    <header className="flex items-center justify-between px-6 lg:px-28 py-6 bg-black text-white sticky top-0 left-0">
      <h1 className="text-xl font-bold text-white">Harmonize</h1>
      <div className="flex gap-2">
        <Link href="/login">
          <button className="text-white px-5 lg:px-8 py-1 rounded-full font-medium border border-white">Log in</button>
        </Link>
        <Link href="/sign-up">
          <button className="bg-white text-black px-5 lg:px-8 py-1 rounded-full font-medium">
            Sign Up
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Navber;
