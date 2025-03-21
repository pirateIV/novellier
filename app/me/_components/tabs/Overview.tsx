import React from "react";
import Stats from "../Stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Activity, Book, BookOpen, Eye, Star } from "lucide-react";
import { User } from "@/shared/types";

const OverviewTab = ({ user }: { user: User }) => {
  return (
    <>
      <Stats user={user} />
      <div className="relative p-2 border rounded-[20px] bg-neutral-200/30 dark:bg-neutral-950 border-white/5 mt-4">
        <Card className="bg-white dark:bg-[#0f0f0f] border-none rounded-[16px] overflow-hidden">
          <CardHeader className="p-6 border-b border-white/10">
            <h1 className="text-2xl font-semibold dark:text-white">
              Recent Activity
            </h1>
            <p className="text-sm text-neutral-700  dark:text-gray-400 mt-1">
              Your latest reading activities, reviews, and progress
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="py-8 flex flex-col items-center justify-center">
              <div className="relative flex items-center justify-center">
                <BookOpen className="size-32 text-neutral-700" />
              </div>
              <div className="w-full max-w-[200px] h-2 bg-neutral-800 rounded-full mt-4 overflow-hidden">
                <div
                  className="h-full bg-gray-200"
                  style={{ width: "32%" }}
                ></div>
              </div>
              <span className="text-neutral-500 text-sm dark:text-gray-400 font-medium mt-4">
                No recent activity. Start reading to see your progress!
              </span>
            </div>
            {/* <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <Book className="size-5 text-gray-400" />
                  <span className="text-sm text-neutral-300">
                    "The Great Gatsby"
                  </span>
                </div>
                <span className="text-xs text-neutral-500">2 days ago</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <Star className="size-5 text-yellow-400" />
                  <span className="text-sm text-neutral-300">
                    Rated 4 stars
                  </span>
                </div>
                <span className="text-xs text-neutral-500">5 days ago</span>
              </div>
            </div> */}
            <Button className="text-sm w-full mt-6" variant="outline">
              <Eye className="size-4" />
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="relative p-2 border rounded-[20px] bg-neutral-200/10 dark:bg-neutral-950 border-white/5 mt-6">
        <Card className="bg-[#0f0f0f] border-none rounded-[16px] overflow-hidden">
          <CardHeader className="p-6 border-b border-white/10">
            <h1 className="text-2xl font-semibold text-white">Reading Goals</h1>
            <p className="text-sm text-gray-400 mt-1">
              Track your progress toward your reading goals
            </p>
          </CardHeader>
          <CardContent className="p-6"></CardContent>
        </Card>
      </div>
    </>
  );
};

export default OverviewTab;
