"use client";

import * as React from "react";
import { TrendingUp, Book, Star } from "lucide-react";
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

export function ReviewStats({ reviews }: { reviews: ReviewStats[] }) {
  // return <></>
  // Prepare pie chart data
  const pieData = reviews.map((review) => ({
    genre: review.genre,
    count: review.user_times_rated,
    fill: `hsl(var(--chart-${reviews.indexOf(review) + 1}))`,
  }));

  // Prepare bar chart data
  const barData = reviews.map((review) => ({
    genre: review.genre,
    userAverage: review.user_average,
    totalAverage: review.total_average,
  }));

  const pieChartConfig = {
    count: {
      label: "Reviews",
    },
    ...reviews.reduce((acc, review, index) => {
      acc[review.genre.toLowerCase()] = {
        label: review.genre,
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return acc;
    }, {} as Record<string, { label: string; color: string }>),
  } satisfies ChartConfig;

  const totalUserReviews = React.useMemo(() => {
    return reviews.reduce((acc, curr) => acc + curr.user_times_rated, 0);
  }, []);

  const averageDifference = React.useMemo(() => {
    const diffs = reviews.map(
      (review) => review.user_average - review.total_average
    );
    return diffs.reduce((a, b) => a + b, 0) / diffs.length;
  }, []);

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
          <div className="flex items-center gap-2 font-medium leading-none">
            Most reviewed: Fiction ({pieData[0].count} reviews)
          </div>
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
            Based on {totalUserReviews} ratings across {reviews.length} genres
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
