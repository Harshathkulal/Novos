import React, { useEffect, useState } from "react";

const messages = [
  "loading...",
  "Checking authentication...",
  "Almost there...",
];

const Loading: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

      {/* Changing message */}
      <p className="text-lg font-medium transition-opacity duration-500 ease-in-out">
        {messages[index]}
      </p>
    </div>
  );
};

export default Loading;
