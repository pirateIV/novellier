import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import UserBadges from "./UserBadges";

const UserDetails = ({ user }: any) => {
  return (
    <div className="flex flex-col justify-center md:flex-row items-center md:item-start md:justify-start gap-6">
      <Avatar className="size-24 border-4 border-zinc-900">
        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
        <AvatarFallback>
          <div className="avatar-fallback size-full"></div>
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 text-center md:text-left">
        <h1 className="text-3xl font-semibold">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-neutral-400">@{user.username}</p>
        <UserBadges user={user} />
      </div>
    </div>
  );
};

export default UserDetails;
