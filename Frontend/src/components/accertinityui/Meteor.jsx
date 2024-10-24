import { cn } from "../../utils/cn.js";
import React from "react";

export const Meteors = ({ number = 20, className }) => {
  const meteors = new Array(number).fill(true);

  return (
    <>
      {meteors.map((_, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            top: 0,
            left: `${Math.floor(Math.random() * 800) - 400}px`, // Random x position
            animationDelay: `${Math.random() * 0.6 + 0.2}s`, // Random delay
            animationDuration: `${Math.floor(Math.random() * 8) + 2}s`, // Random duration
          }}
        ></span>
      ))}
    </>
  );
};
