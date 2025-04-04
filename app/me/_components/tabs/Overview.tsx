import React from "react";
import Stats from "../Stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Activity, Book, BookOpen, Eye, Star } from "lucide-react";
import { User } from "@/shared/types";

interface OverviewTabProps {
  user: User;
}

const OverviewTab = ({ user }: OverviewTabProps) => {
  return (
    <div className="pb-7 space-y-6">
      <Stats user={user} />

      {/* Recent Activity Section */}
      <div className="relative p-2 border rounded-[20px] bg-neutral-200/5 dark:bg-neutral-950 border-white/5">
        <Card className="bg-white dark:bg-neutral-900 border-none rounded-[16px] overflow-hidden">
          <CardHeader className="p-6 border-b border-white/10">
            <h1 className="text-2xl tracking-tight font-bold dark:text-white">
              Recent Activity
            </h1>
            <p className="text-sm text-neutral-700 dark:text-gray-400 mt-1">
              Your latest reading activities, reviews, and progress
            </p>
          </CardHeader>
          <CardContent className="p-6">
            {/* Empty State */}
            {!user?.recentActivity?.length ? (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <BookOpen
                  className="size-32 text-neutral-700 dark:text-neutral-500"
                  aria-hidden="true"
                />
                <div className="w-full max-w-[200px] h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full mt-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                    style={{ width: "32%" }}
                  />
                </div>
                <span className="text-neutral-500 dark:text-gray-400 text-sm font-medium mt-4">
                  No recent activity. Start reading to see your progress!
                </span>
              </div>
            ) : (
              /* Activity List */
              <div className="mt-6 space-y-4">
                {user.recentActivity.slice(0, 2).map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800"
                  >
                    <div className="flex items-center gap-3">
                      {activity.type === "reading" ? (
                        <Book className="size-5 text-gray-400" />
                      ) : (
                        <Star className="size-5 text-yellow-400" />
                      )}
                      <span className="text-sm text-neutral-900 dark:text-neutral-300">
                        {activity.description}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-500">
                      {activity.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <Button
              className="text-sm w-full mt-6 flex items-center justify-center gap-2"
              variant="outline"
              aria-label="View all activity"
            >
              <Eye className="size-4" />
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;