import React from "react";
import { BookMarked, BookOpen, Star, TrendingUp } from "lucide-react";
import StatsCard from "./StatsCard";
import { User } from "@/shared/types";
import Image from "next/image";
import StarRating from "@/shared/components/StarRating";

const Stats = ({ user }: { user: User }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
      {/* Total Books Read Card */}
      <StatsCard
        title="Total Books Read"
        value={0}
        icon={
          <div className="rounded-full bg-primary/10 p-2">
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
        }
      >
        <div className="text-4xl font-bold font-sans">0</div>
        <div className="mt-2 flex items-center text-xs text-muted-foreground">
          <TrendingUp className="mr-1 h-3 w-3 dark:text-green-500 text-green-600" />
          <span className="font-medium text-green-600 dark:text-green-500">
            +{user.books.length} books
          </span>
          <span className="ml-1 text-gray-600 dark:text-inherit">
            in the last 30 days
          </span>
        </div>
      </StatsCard>

      {/* Reviews Written Card */}
      <StatsCard
        title="Total Reviews"
        value={user.totalReviews}
        icon={
          <div className="rounded-full bg-amber-500/10 p-2">
            <Star className="h-4 w-4 text-amber-600 dark:text-amber-500" />
          </div>
        }
      >
        <div className="text-4xl font-bold font-sans">{user.totalReviews}</div>
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <div className="relative w-fit flex -space-x-0.5">
            <StarRating rating={user.averageRating} />
          </div>
          <span className="text-gray-600 dark:text-inherit">
            Average rating:{" "}
            <span className="text-white"> {user.averageRating}/5</span>
          </span>
        </div>
      </StatsCard>

      {/* Favorite Genre Card */}
      <StatsCard
        title="Favorite Genre"
        value="NA"
        icon={
          <div className="rounded-full bg-indigo-500/10 p-2">
            <BookMarked className="h-4 w-4 text-indigo-600 dark:text-indigo-500" />
          </div>
        }
      >
        <div className="text-4xl font-bold font-sans">
          <span className="text-muted-foreground/70">NA</span>
        </div>
        <div className="mt-2 flex items-center text-xs text-muted-foreground">
          <div className="mr-2 h-2 w-2 rounded-full bg-indigo-500"></div>
          <span className="text-gray-600 dark:text-inherit">
            Based on your reading history
          </span>
        </div>
      </StatsCard>
    </div>
  );
};

export default Stats;
