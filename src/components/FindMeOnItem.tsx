import Image from "next/image";
import Link from "next/link";
import React from "react";

const FindMeOnItem = ({
  data,
  link,
}: {
  data: {
    url: string;
    label: string;
  };
  link: string;
}) => {
  const customLoader = ({ src }: { src: string }) => src;
  return (
    <Link
      href={link}
      className="w-full bg-gray-300 p-2 md:bg-gray-200  md:px-4 md:py-3  flex md:justify-start justify-center items-center md:gap-2 rounded-full md:rounded-md"
    >
      <Image
        loader={customLoader}
        src={data.url}
        alt={data.label}
        className="w-auto h-6 md:h-10 "
        width={20}
        height={10}
      />
      <span className="md:flex hidden">{data.label}</span>
    </Link>
  );
};

export default FindMeOnItem;
