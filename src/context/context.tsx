"use client";

import { AppContext } from "@/types/AppContextType";
import { createContext } from "react";

const defaultContext: AppContext = {
  isLoggedIn: false, // Default value
  name: "", // Default value
  setIsLoggedIn: () => {}, // No-op default function
};
const context = createContext<AppContext>(defaultContext);

export default context;
