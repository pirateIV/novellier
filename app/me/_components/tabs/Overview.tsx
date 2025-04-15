import React from "react";
import Stats from "../Stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Activity, Book, BookOpen, Eye, Star } from "lucide-react";
import { User } from "@/shared/types";
import { Icons } from "@/components/icons";
import { ReviewStats } from "./ReviewStats";
import { apiClient } from "@/lib/axios";

interface OverviewTabProps {
  user: User;
}

const OverviewTab = async ({ user }: OverviewTabProps) => {
  const { data } = await apiClient.get("/genres/create");
  console.log(data)
  return (
    <div className="pb-7 space-y-6">
      <Stats user={user} />

      {/* Recent Activity Section */}
      <div className="relative p-2 border rounded-[20px] bg-neutral-200/5 dark:bg-neutral-950 border-white/5">
        <Card className="bg-white dark:bg-neutral-900 border-none sm:rounded-[16px] overflow-hidden">
          <CardHeader className="p-6 border-b border-white/10">
            <h1 className="text-2xl tracking-tight font-bold dark:text-white">
              Recent Activity
            </h1>
            <p className="text-sm text-neutral-700 dark:text-gray-400 mt-1">
              Your latest reading activities, reviews, and progress
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <ReviewStats />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
