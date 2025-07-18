import { cn } from "@/lib/utils";
import {
  CirclePlusIcon,
  ClapperboardIcon,
  CompassIcon,
  Home,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const routes = [
  {
    label: "Home",
    icon: Home,
    url: "/dashboard",
  },
  {
    label: "Explore",
    icon: CompassIcon,
    url: "/dashboard/explore",
  },
  {
    label: "Create",
    icon: CirclePlusIcon,
    url: "/dashboard/create",
    color: "text-orange-700",
    width: "h-10",
    height: "w-10",
  },
  {
    label: "Reels",
    icon: ClapperboardIcon,
    url: "/dashboard/reels",
  },

  {
    label: "Settings",
    icon: SettingsIcon,
    url: "/dashboard/settings",
  },
];
const MobileNavber = () => {
  return (
    <div className="flex bg-[#111827] w-full text-white h-[70px]">
      <div className=" flex-1">
        <div className="space-y-1 flex ">
          {routes.map((route) => {
            return (
              <Link
                href={route.url}
                key={route.url}
                className="text-sm group flex p-1 w-full justify-start font-medium  items-center"
              >
                <div className="flex items-center flex-1 flex-col justify-end  h-full">
                  <route.icon
                    className={cn(
                      "h-6 w-6  text-white",
                      route.color,
                      route.height,
                      route.width
                    )}
                  />
                  {route.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileNavber;
