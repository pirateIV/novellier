import React from "react";
import { redirect } from "next/navigation";
import { Edit3 } from "lucide-react";
import { getUserData } from "@/shared/auth";
import { Button } from "@/components/ui/button";
import UserDetails from "./UserDetails";

const ProfileSummary = async () => {
  const user = await getUserData();

  if (user.error) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="bg-gradient-to-r bg-white dark:bg-[#0f0f0f] pt-8 pb-16 flex items-start justify-between">
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
  );
};

export default ProfileSummary;
