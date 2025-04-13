import React from "react";
import { BookOpen, Star } from "lucide-react";
import { formatDate } from "@/shared/utils";
import { Badge as BadgeComponent } from "@/components/ui/badge";

const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <BadgeComponent
      variant="outline"
      className="font-sans text-gray-800 dark:text-gray-300"
    >
      {children}
    </BadgeComponent>
  );
};

const UserBadges = ({ user }: any) => {
  return (
    <div className="sm:flex items-center gap-1 sm:gap-2 mt-4">
      <Badge>
        <BookOpen className="size-3 mr-1" />0 Books Read
      </Badge>
      <Badge>
        <Star className="size-3 mr-1 text-amber-600 dark:text-amber-500" />
        {user.totalReviews} Reviews
      </Badge>
      <div className="flex items-center mt-1 sm:mt-0 justify-center sm:justify-start gap-2 whitespace-nowrap">
        <span className="mx-0.5 hidden sm:block sm:mx-1.5 text-neutral-500">
          ·
        </span>
        <span className="text-xs text-zinc-500 dark:text-gray-400">
          Member since{" "}
          <span className="text-neutral-800 dark:text-gray-200 font-semibold">
            {formatDate(user.createdAt)}
          </span>
        </span>
      </div>
    </div>
  );
};

export default UserBadges;
