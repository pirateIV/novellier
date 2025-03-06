import React from "react";
import { BookMarked, BookOpen, Star, TrendingUp } from "lucide-react";
import StatsCard from "./StatsCard";

const Stats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
      {/* Total Books Read Card */}
      <StatsCard
        title="Total Books Read"
        value="0"
        icon={
          <div className="rounded-full bg-primary/10 p-2">
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
        }
      >
        <div className="text-4xl font-bold">0</div>
        <div className="mt-2 flex items-center text-xs text-muted-foreground">
          <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
          <span className="font-medium text-green-500">+12 books</span>
          <span className="ml-1">in the last 30 days</span>
        </div>
      </StatsCard>

      {/* Reviews Written Card */}
      <StatsCard
        title="Total Reviews"
        value="0"
        icon={
          <div className="rounded-full bg-amber-500/10 p-2">
            <Star className="h-4 w-4 text-amber-500" />
          </div>
        }
      >
        <div className="text-4xl font-bold">18</div>
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <div className="flex">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <Star key={i} className="h-3 w-3" />
              ))}
          </div>
          <span>Average rating: <span className="text-white"> 4/5</span></span>
        </div>
      </StatsCard>

      {/* Favorite Genre Card */}
      <StatsCard
        title="Favorite Genre"
        value="NA"
        icon={
          <div className="rounded-full bg-indigo-500/10 p-2">
            <BookMarked className="h-4 w-4 text-indigo-500" />
          </div>
        }
      >
        <div className="text-2xl font-bold">
          <span className="text-muted-foreground">NA</span>
        </div>
        <div className="mt-2 flex items-center text-xs text-muted-foreground">
          <div className="mr-2 h-2 w-2 rounded-full bg-indigo-500"></div>
          <span>Based on your reading history</span>
        </div>
      </StatsCard>
    </div>
  );
};

export default Stats;
