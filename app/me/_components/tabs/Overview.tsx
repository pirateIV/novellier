import React, { Suspense } from "react";
import Stats from "../Stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Activity, Book, BookOpen, Eye, Star } from "lucide-react";
import { User } from "@/shared/types";
import { ReviewStats } from "./ReviewStats";
import { apiClient } from "@/lib/axios";
import { cookies } from "next/headers";

interface OverviewTabProps {
  user: User;
}

export interface ReviewStats {
  _id: string;
  genre: string;
  genreId: string;
  user_times_rated: number;
  user_average: number;
  total_times_rated: number;
  total_average: number;
}

const OverviewTab = async ({ user }: OverviewTabProps) => {
  const userId = (await cookies()).get("user_id")?.value;
  const { data } = await apiClient.get<{ reviews: ReviewStats[] }>(
    "/genres/create?user=" + userId
  );
  return (
    <div className="pb-7 space-y-6">
      <Stats user={user} />

      {/* Recent Activity Section */}
      <div className="relative p-2 bg-neutral-200/5 dark:bg-neutral-950 border-white/5">
        {/* <Card className="bg-white dark:bg-neutral-900 border-none sm:rounded-[16px] overflow-hidden"> */}
        {/* <CardHeader className="p-6 border-b border-white/10"> */}
        <h1 className="text-2xl tracking-tight font-bold dark:text-white">
          Recent Activity
        </h1>
        <p className="text-sm pb-6 text-neutral-700 dark:text-gray-400 mt-1">
          Your latest reading activities, reviews, and progress
        </p>
        <Suspense>
          <ReviewStats reviews={data.reviews} />
        </Suspense>
      </div>
    </div>
  );
};

export default OverviewTab;
