"use client";

import { motion } from "framer-motion";

const loaders = {
  spinner: (
    <div className="w-10 h-10 border-4 border-t-transparent border-gray-600 rounded-full animate-spin"></div>
  ),
  dots: (
    <div className="flex space-x-2">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-gray-600 rounded-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  ),
  bar: (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-6 bg-gray-600 rounded"
          animate={{ scaleY: [1, 1.5, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  ),
};

type LoaderProps = {
  type?: "spinner" | "dots" | "bar";
  size?: "sm" | "md" | "lg"; // ✅ Use specific union type
};

const Loader: React.FC<LoaderProps> = ({ type = "spinner", size = "md" }) => {
  const sizes: Record<"sm" | "md" | "lg", string> = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  return (
    <div className={`flex h-screen w-full justify-center items-center ${sizes[size]}`}>
      {loaders[type]}
    </div>
  );
};

export default Loader;
