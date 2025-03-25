import type React from "react";
import Navigation from "@/shared/components/nav";

const ReviewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation />
      <div className="flex w-full">
        <div className="w-10 lg:w-[60px] flex-shrink-0 left-0 max-sm:hidden text-gray-950/[.07] dark:text-white/10 border-x border-x-current bg-fixed bg-[size:10px_10px] bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)]"></div>
        {children}
        <div className="w-10 lg:w-[60px] flex-shrink-0 right-0 max-sm:hidden text-gray-950/[.07] dark:text-white/10 border-x border-x-current bg-fixed bg-[size:10px_10px] bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)]"></div>
      </div>
    </>
  );
};

export default ReviewLayout;
