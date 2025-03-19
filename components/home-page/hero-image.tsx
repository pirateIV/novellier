import React from "react";
import Image from "next/image";

const HeroImage = () => {
  return (
    <div className="w-full flex col-span-full justify-center justify-self-center self-center lg:col-span-5 lg:row-span-3">
      <div className="relative shadow-lg shadow-gray-400 rounded-xl overflow-hidden w-64 mx-auto *:rounded-xl md:w-80 lg:w-auto dark:shadow-gray-950">
        <Image
          src="/hero.jpg"
          width="960"
          height="1024"
          className="w-full"
          alt="book cover"
          priority
        />
        <div className="[background-image:linear-gradient(to_bottom,rgba(0,0,0,0.2)_80%,#0a0a0a)] border-t-2 border-t-white/40 inset-shadow absolute inset-0 z-10 dark:border-t-white/20"></div>
      </div>
    </div>
  );
};

export default HeroImage;
