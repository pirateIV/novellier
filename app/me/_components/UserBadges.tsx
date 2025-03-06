import React from "react";
import { BookOpen, Star } from "lucide-react";
import { formatDate } from "@/shared/utils";
import { Badge as BadgeComponent } from "@/components/ui/badge";

const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <BadgeComponent variant="outline" className="font-sans text-gray-300">
      {children}
    </BadgeComponent>
  );
};

const UserBadges = ({ user }: any) => {
  return (
    <div className="flex items-center gap-2 mt-4">
      <Badge>
        <BookOpen className="size-3 mr-1" />0 Books Read
      </Badge>
      <Badge>
        <Star className="size-3 mr-1 text-orange-400" />0 Reviews
      </Badge>
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className="mx-1.5">&middot;</span>
        <span className="text-xs text-neutral-500">
          Member since{" "}
          <span className="text-neutral-200 font-medium">
            {formatDate(user.createdAt)}
          </span>
        </span>
      </div>
    </div>
  );
};

export default UserBadges;
