import Link from "next/link";
import React from "react";

const Header = ({
  title,
  link,
  user,
}: {
  title: string;
  link: string;
  user: string;
}) => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-sm">
        <span className="mr-3 text-gray-400">←</span>
        <span>Back to </span>{" "}
        <Link
          className="font-semibold text-blue-500 hover:underline"
          href={link}
        >
          {title}
        </Link>
      </p>

      <div className="flex items-center gap-2 ">
        {/* <div>
          <Link
            href={`${link}#reviews`}
            className="text-sm text-blue-500 font-medium hover:underline"
          >
            See all Reviews
          </Link>
        </div>
        <span className="dark:text-gray-400">&middot;</span> */}
        <div>
          <p className="text-sm text-right text-gray-400">
            Reviewed by <span className="font-medium text-sky-400">{user}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
