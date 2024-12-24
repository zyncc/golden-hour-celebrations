"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

const Marquee = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isClosed, setIsClosed] = useState<string | null>("true");

  useEffect(() => {
    setIsClosed(localStorage.getItem("marqueeClosed"));
  }, []);

  if (isClosed) {
    return <></>;
  }
  return (
    <div
      ref={ref}
      className={
        "fixed z-[100] flex bottom-0 left-0 right-0 w-full p-0.5 items-center text-black font-medium bg-yellow-500 text-center"
      }
    >
      <h1 className={"flex-grow"}>Website under Progress</h1>
      <IoClose
        size={20}
        className="mr-2"
        onClick={() => {
          if (ref.current) {
            ref.current.style.display = "none";
          }
          localStorage.setItem("marqueeClosed", "true");
        }}
      />
    </div>
  );
};

export default Marquee;
