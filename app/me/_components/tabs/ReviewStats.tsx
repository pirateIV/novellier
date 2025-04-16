"use client"

import * as React from "react"
import { TrendingUp, Book, Star } from "lucide-react"
import { Bar, BarChart, Label, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Transform your review data into chart-friendly formats
const reviewData = {
  "data": {
    "reviews": [
      {
        "_id": "67fdc2dd30b314056f822a1c",
        "genre": "Fiction",
        "total_times_rated": 68,
        "__v": 0,
        "genreId": "67fdc2dd30b314056f822a1c",
        "user_times_rated": 9,
        "user_average": 40.9,
        "total_average": 37.2
      },
      {
        "_id": "67fdc2dd30b314056f822a1a",
        "genre": "History",
        "total_times_rated": 49,
        "__v": 0,
        "genreId": "67fdc2dd30b314056f822a1a",
        "user_times_rated": 6,
        "user_average": 27.3,
        "total_average": 26.8
      },
      {
        "_id": "67fdc2f430b314056f822a91",
        "genre": "Classics",
        "total_times_rated": 25,
        "__v": 0,
        "genreId": "67fdc2f430b314056f822a91",
        "user_times_rated": 3,
        "user_average": 13.6,
        "total_average": 13.7
      },
      {
        "_id": "67fdc2e030b314056f822a2a",
        "genre": "Travel",
        "total_times_rated": 9,
        "__v": 0,
        "genreId": "67fdc2e030b314056f822a2a",
        "user_times_rated": 2,
        "user_average": 9.1,
        "total_average": 4.9
      },
      {
        "_id": "67fdc2e530b314056f822a45",
        "genre": "Fantasy",
        "total_times_rated": 7,
        "__v": 0,
        "genreId": "67fdc2e530b314056f822a45",
        "user_times_rated": 2,
        "user_average": 9.1,
        "total_average": 3.8
      }
    ]
  }
}

// Prepare pie chart data
const pieData = reviewData.data.reviews.map((review) => ({
  genre: review.genre,
  count: review.user_times_rated,
  fill: `hsl(var(--chart-${reviewData.data.reviews.indexOf(review) + 1}))`
}))

// Prepare bar chart data
const barData = reviewData.data.reviews.map((review) => ({
  genre: review.genre,
  userAverage: review.user_average,
  totalAverage: review.total_average
}))

const pieChartConfig = {
  count: {
    label: "Reviews",
  },
  ...reviewData.data.reviews.reduce((acc, review, index) => {
    acc[review.genre.toLowerCase()] = {
      label: review.genre,
      color: `hsl(var(--chart-${index + 1}))`
    }
    return acc
  }, {} as Record<string, { label: string; color: string }>)
} satisfies ChartConfig

const barChartConfig = {
  userAverage: {
    label: "Your Average",
    color: "hsl(var(--primary))"
  },
  totalAverage: {
    label: "Community Average",
    color: "hsl(var(--muted-foreground))"
  }
} satisfies ChartConfig

export function ReviewStats() {
  const totalUserReviews = React.useMemo(() => {
    return reviewData.data.reviews.reduce((acc, curr) => acc + curr.user_times_rated, 0)
  }, [])

  const averageDifference = React.useMemo(() => {
    const diffs = reviewData.data.reviews.map(review => 
      review.user_average - review.total_average
    )
    return (diffs.reduce((a, b) => a + b, 0) / diffs.length)
  }, [])
  

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Pie Chart Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            Your Reviews by Genre
          </CardTitle>
          <CardDescription>Distribution of your reviews across different genres</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={pieChartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />
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
                            Reviews
                          </tspan>
                        </text>
                      )
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Rating Comparison
          </CardTitle>
          <CardDescription>Your ratings vs community averages</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={barChartConfig}
            className="mx-auto h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical">
                <ChartTooltip
                  content={<ChartTooltipContent />}
                />
                <XAxis type="number" domain={[0, 50]} />
                <YAxis dataKey="genre" type="category" width={80} />
                <Bar dataKey="userAverage" radius={[0, 4, 4, 0]} />
                <Bar dataKey="totalAverage" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className={`flex items-center gap-2 font-medium leading-none ${averageDifference > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {averageDifference > 0 ? 'Higher' : 'Lower'} than average by {Math.abs(averageDifference).toFixed(1)} points
            {averageDifference > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingUp className="h-4 w-4 rotate-180" />
            )}
          </div>
          <div className="leading-none text-muted-foreground">
            Based on {totalUserReviews} reviews across {reviewData.data.reviews.length} genres
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}