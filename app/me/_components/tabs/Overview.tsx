"use client";

import React, { Suspense, useEffect, useState } from "react";
import Stats from "../Stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Activity, Book, BookOpen, Eye, Star, AlertTriangle } from "lucide-react";
import { User } from "@/shared/types";
import { ReviewStats } from "./ReviewStats";
import { apiClient } from "@/lib/axios";
import { getCookieValue } from "@/lib/user";

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

const OverviewTab = ({ user }: OverviewTabProps) => {
  const [overviewStats, setOverviewStats] = useState<ReviewStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOverviewStats = async () => {
      try {
        setIsLoading(true);
        const userId = getCookieValue("user_id");
        
        if (!userId) {
          setError("User ID not found");
          setIsLoading(false);
          return;
        }

        const { data } = await apiClient.get<{ reviews: ReviewStats[] }>(
          "/genres/create?user=" + userId
        );
        
        setOverviewStats(data?.reviews || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch overview stats:", err);
        setError("Failed to load review statistics");
      } finally {
        setIsLoading(false);
      }
    };
    
    getOverviewStats();
  }, []);

  return (
    <div className="pb-7 space-y-6">
      <Stats user={user} />

      {/* Recent Activity Section */}
      <div className="relative p-2 bg-neutral-200/5 dark:bg-neutral-950 border-white/5">
        <h1 className="text-2xl tracking-tight font-bold dark:text-white">
          Recent Activity
        </h1>
        <p className="text-sm pb-6 text-neutral-700 dark:text-gray-400 mt-1">
          Your latest reading activities, reviews, and progress
        </p>
        
        {error ? (
          <Card className="bg-neutral-900 p-6">
            <div className="flex flex-col items-center justify-center text-center p-8">
              <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-lg font-medium mb-2">Unable to load review data</h3>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          </Card>
        ) : (
          <ReviewStats reviews={isLoading ? undefined : overviewStats} />
        )}
      </div>
    </div>
  );
};

export default OverviewTab;