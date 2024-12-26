"use client";

import context from "./context";
import React, { ReactNode, useState } from "react";

const AppProvider = ({ children }: { children: ReactNode }) => {
  const name = "true";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <context.Provider value={{ name, isLoggedIn, setIsLoggedIn }}>
      {children}
    </context.Provider>
  );
};

export default AppProvider;
