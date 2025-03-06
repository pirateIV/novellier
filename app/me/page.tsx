import React from "react";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Edit3, LogOut, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/shared/utils";
import UserBadges from "./_components/UserBadges";
import UserDetails from "./_components/UserDetails";
import TabActions from "./_components/TabActions";
import Overview from "./@overview/page";

const Page = async ({ overview }: { overview: React.ReactNode }) => {
  const token = (await cookies()).get("token")?.value;

  // const response = await apiClient.get("/user-details", {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  const user = {
    _id: "67c80851b881d52efbb788d7",
    firstName: "Benjamin",
    lastName: "Abolade",
    username: "benabolade",
    email: "benabolade@gmail.com",
    password: "$2b$10$oZtAhavQKUDRLmUpMLym/.LK9qbpI2rSVIxnXUN/9HBFteyClwIim",

    books: [],
    createdAt: "2025-03-05T08:16:17.503+00:00",
    updatedAt: "2025-03-05T08:16:17.503+00:00",
  };
  return (
    <div className="relative">
      {/* Header with profile summary */}
      <div className="bg-gradient-to-r bg-[#101014] pt-8 pb-16 flex items-start justify-between">
        <div className="size-full mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-center md:justify-between">
          <UserDetails user={user} />

          <div className="flex flex-col sm:flex-row gap-2 justify-center md:justify-start md:mt-0  mt-6">
            <Button size="sm" className="text-[13px] py-4 !rounded-sm">
              <Edit3 className="size-[14px] mr-0.5" />
              Edit Profile
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-[13px] text-red-500 py-4 !rounded-sm hover:!bg-zinc-950 hover:!text-red-600"
            >
              Sign out
            </Button>
          </div>
        </div>
      </div>

      <div className="-mt-8 px-4 md:px-6">
        <TabActions />
      </div>
    </div>
  );
};

export default Page;
