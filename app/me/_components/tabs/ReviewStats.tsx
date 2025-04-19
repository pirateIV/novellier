"use client";

import * as React from "react";
import { TrendingUp, Book, Star, Info } from "lucide-react";
import {
  Bar,
  BarChart,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import type { ReviewStats } from "./Overview";

const barChartConfig = {
  userAverage: {
    label: "Your Average",
    color: "hsl(var(--primary))",
  },
  totalAverage: {
    label: "Community Average",
    color: "hsl(var(--muted-foreground))",
  },
} satisfies ChartConfig;

export function ReviewStats({ reviews }: { reviews?: ReviewStats[] }) {
  const [isLoading, setIsLoading] = React.useState(!reviews || reviews.length === 0);

  React.useEffect(() => {
    // Set loading state to false when reviews data is available
    if (reviews && reviews.length > 0) {
      setIsLoading(false);
    }
  }, [reviews]);

  // Calculate memoized values at the top
  const totalUserReviews = React.useMemo(() => 
    reviews?.reduce((acc, curr) => acc + curr?.user_times_rated, 0) || 0,
    [reviews]
  );

  const averageDifference = React.useMemo(() => {
    if (!reviews || reviews.length === 0) return 0;
    const diffs = reviews?.map(
      (review) => review?.user_average - review?.total_average
    );
    return diffs.reduce((a, b) => a + b, 0) / diffs.length;
  }, [reviews]);

  const mostReviewedGenre = React.useMemo(() => {
    if (!reviews || reviews.length === 0) return null;
    return reviews.reduce((max, review) => 
      review.user_times_rated > max.user_times_rated ? review : max
    );
  }, [reviews]);

  // Prepare chart data
  const pieData = React.useMemo(() => 
    reviews?.map((review, index) => ({
      genre: review?.genre,
      count: review?.user_times_rated,
      fill: `hsl(var(--chart-${index + 1}))`,
    })) || [],
    [reviews]
  );

  const barData = React.useMemo(() => 
    reviews?.map((review) => ({
      genre: review?.genre,
      userAverage: review?.user_average,
      totalAverage: review?.total_average,
    })) || [],
    [reviews]
  );

  const pieChartConfig = React.useMemo(() => ({
    count: {
      label: "Reviews",
    },
    ...(reviews?.reduce((acc, review, index) => {
      acc[review?.genre.toLowerCase()] = {
        label: review?.genre,
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return acc;
    }, {} as Record<string, { label: string; color: string }>) || {}),
  }), [reviews]) satisfies ChartConfig;

  // For empty state or loading
  if (isLoading || !reviews || reviews.length === 0) {
    return <ReviewStatsSkeletons />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Pie Chart Card */}
      <Card className="bg-neutral-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            Your Ratings by Genre
          </CardTitle>
          <CardDescription>
            Distribution of your ratings across different genres
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={pieChartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Pie
                data={pieData}
                dataKey="count"
                nameKey="genre"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalUserReviews}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Ratings
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          {mostReviewedGenre ? (
            <div className="flex items-center gap-2 font-medium leading-none">
              Most reviewed: {mostReviewedGenre.genre} ({mostReviewedGenre.user_times_rated} reviews)
            </div>
          ) : (
            <div className="flex items-center gap-2 font-medium leading-none text-muted-foreground">
              No genre data available
            </div>
          )}
        </CardFooter>
      </Card>

      {/* Bar Chart Card */}
      <Card className="bg-neutral-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Rating Comparison
          </CardTitle>
          <CardDescription>Your ratings vs community averages</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={barChartConfig} className="mx-auto h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical">
                <ChartTooltip content={<ChartTooltipContent />} />
                <XAxis type="number" domain={[0, 50]} />
                <YAxis dataKey="genre" type="category" width={80} />
                <Bar
                  fill="hsl(28,40%,40%)"
                  dataKey="userAverage"
                  radius={[0, 4, 4, 0]}
                />
                <Bar
                  fill="hsl(35,43%,53%)"
                  dataKey="totalAverage"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          {reviews.length > 0 ? (
            <>
              <div
                className={`flex items-center gap-2 font-medium leading-none ${
                  averageDifference > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {averageDifference > 0 ? "Higher" : "Lower"} than average by{" "}
                {Math.abs(averageDifference).toFixed(1)} points
                {averageDifference > 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingUp className="h-4 w-4 rotate-180" />
                )}
              </div>
              <div className="leading-none text-muted-foreground">
                Based on {totalUserReviews} ratings across {reviews?.length} genres
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground">
              No rating data available
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

// Skeleton component for when data is loading
function ReviewStatsSkeletons() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Pie Chart Skeleton */}
      <Card className="bg-neutral-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            Your Ratings by Genre
          </CardTitle>
          <CardDescription>
            Distribution of your ratings across different genres
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="mx-auto aspect-square max-h-[250px] flex items-center justify-center">
            <div className="w-48 h-48 rounded-full relative">
              <Skeleton className="w-full h-full rounded-full opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <Skeleton className="w-16 h-8 mb-2" />
                <Skeleton className="w-20 h-4" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <Skeleton className="w-48 h-4" />
        </CardFooter>
      </Card>

      {/* Bar Chart Skeleton */}
      <Card className="bg-neutral-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Rating Comparison
          </CardTitle>
          <CardDescription>Your ratings vs community averages</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="mx-auto h-[250px] flex flex-col justify-center space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center w-full space-x-4">
                <Skeleton className="w-16 h-4" />
                <div className="flex-1">
                  <div className="flex space-x-2">
                    <Skeleton className="h-6 flex-1" />
                    <Skeleton className="h-6 flex-1 opacity-50" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <Skeleton className="w-48 h-4" />
          <Skeleton className="w-64 h-4" />
        </CardFooter>
      </Card>
    </div>
  );
}