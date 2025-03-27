import React from "react";
import Image from "next/image";

const StarRating = ({ rating }: { rating: string | number }) => {
  return (
    <div className="hue-rotate-[194deg] w-[74px] *:brightness-125">
      <Image
        src="/stars.webp"
        height="12"
        className="absolute insedt-0"
        width="74"
        alt="stars empty"
        aria-hidden="true"
      />
      <Image
        src="/stars-filled.webp"
        height="12"
        width="74"
        alt="star overlay filled"
        aria-hidden="true"
        style={{
          clipPath: `inset(0px ${Math.abs(
            100 - (Number(rating) / 5) * 100
          )}% 0px 0px)`,
        }}
      />
    </div>
  );
};

export default StarRating;
