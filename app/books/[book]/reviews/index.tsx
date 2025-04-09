"use client"

import { useMemo, useRef, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import StarRating from "@/shared/components/StarRating"
import { Filter, SortAsc } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import BookReviewCard from "./_components/book-review-card"
import Pagination from "./_components/pagination"
import type { BookReviewsResponse } from "@/app/actions"
import { getCookieValue } from "@/lib/user"
import BookReviewDialog, { type BookReviewDialogRef } from "./_components/book-review-dialog"
import LoadingReviews from "./_components/loading-reviews"

type SortBy = "newest" | "oldest" | "highest" | "lowest"
type RatingList = "1" | "2" | "3" | "4" | "5"

const BookReviewsList = ({
  bookReviews,
  onPaginationChange,
  currentPagination,
}: {
  bookReviews: BookReviewsResponse | null
  onPaginationChange: (newPagination: {
    page?: number
    limit?: number
    sortBy?: "newest" | "oldest" | "highest" | "lowest"
  }) => void
  currentPagination: {
    page: number
    limit: number
    sortBy: "newest" | "oldest" | "highest" | "lowest"
  }
}) => {
  const params = useParams() as { book: string }
  const bookID = params.book
  const reviewDialogRef = useRef<BookReviewDialogRef>(null)
  const [isChangingPage, setIsChangingPage] = useState(false)

  const { averageRating, book, ratingDistribution, reviews, totalReviews } = bookReviews || {
    averageRating: 0,
    book: { title: "", author: "", id: "" },
    ratingDistribution: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
    reviews: [],
    totalReviews: 0,
  }

  const handlePageChange = (page: number) => {
    setIsChangingPage(true)
    onPaginationChange({ page })
    document.getElementById("reviews-section")?.scrollIntoView({ behavior: "smooth" })
    // Reset loading state after a short delay to ensure smooth transition
    setTimeout(() => setIsChangingPage(false), 500)
  }

  const handlePageSizeChange = (size: number) => {
    setIsChangingPage(true)
    onPaginationChange({ limit: size, page: 1 })
    // Reset loading state after a short delay to ensure smooth transition
    setTimeout(() => setIsChangingPage(false), 500)
  }

  const handleSortChange = (sortBy: SortBy) => {
    setIsChangingPage(true)
    onPaginationChange({ sortBy, page: 1 })
    // Reset loading state after a short delay to ensure smooth transition
    setTimeout(() => setIsChangingPage(false), 500)
  }

  // Sort reviews based on the selected option
  const sortedReviews = useMemo(() => {
    if (!reviews || reviews.length === 0) return []

    const reviewsArr = [...reviews]

    switch (currentPagination.sortBy) {
      case "newest":
        return reviewsArr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      case "oldest":
        return reviewsArr.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      case "highest":
        return reviewsArr.sort((a, b) => b.rating - a.rating)
      case "lowest":
        return reviewsArr.sort((a, b) => a.rating - b.rating)
      default:
        return reviewsArr
    }
  }, [reviews, currentPagination.sortBy])

  // Calculate pagination
  const totalPages = Math.ceil(totalReviews / currentPagination.limit)

  const userID = getCookieValue("user_id")
  const yourReview = reviews?.find((review) => review.reviewer.id === userID)
  const hasUserReview = !!yourReview

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">{book.title}</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          by&nbsp;
          <span className="font-medium text-gray-200">{book.author}</span>
        </p>
      </div>

      <Card className="p-0 mb-8 bg-white border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
        <CardHeader className="p-4 border-b border-neutral-100 dark:border-neutral-800">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">Reader Reviews</h2>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-neutral-50">{averageRating}</span>
                <div>
                  <StarRating rating={averageRating} />
                  <span className="mt-1 text-sm text-neutral-400">{totalReviews} reviews</span>
                </div>
              </div>
              {!hasUserReview ? (
                <Button className="h-10 mt-4" onClick={() => reviewDialogRef.current?.openDialog({ mode: "edit" })}>
                  Write a Review
                </Button>
              ) : (
                <Button className="h-10 mt-4" onClick={() => reviewDialogRef.current?.openDialog({ mode: "edit" })}>
                  Edit your Review
                </Button>
              )}
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const key = star.toString()
                const count = ratingDistribution[key as RatingList]
                const percentage = totalReviews > 0 ? (Number(count) / totalReviews) * 100 : 0

                return (
                  <div key={star} className="flex items-center gap-2">
                    <div className="w-8 text-sm font-medium text-right text-neutral-700 dark:text-neutral-300">
                      {star} ★
                    </div>
                    <div className="w-full h-2 bg-neutral-800 rounded-full">
                      <div
                        className="h-full bg-amber-500 rounded-full border-t border-t-amber-400"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div>
                      <span className="text-sm text-neutral-500">{count}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <div id="reviews-section" className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-50">Reviews</h3>
          <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
            {totalReviews}
          </span>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="h-9 gap-1.5">
            <Filter className="size-4" />
            Filter
          </Button>

          <Select value={currentPagination.sortBy} onValueChange={(value) => handleSortChange(value as SortBy)}>
            <SelectTrigger className="h-9 w-[160px] gap-1.5 text-sm">
              <SortAsc className="size-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="highest">Highest Rating</SelectItem>
              <SelectItem value="lowest">Lowest Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="mb-6 dark:bg-neutral-800" />

      {isChangingPage ? (
        <LoadingReviews message="Updating reviews..." />
      ) : (
        <div className="space-y-4">
          {sortedReviews.length > 0 ? (
            sortedReviews.map((review) => <BookReviewCard key={review.id} review={review} />)
          ) : (
            <div className="text-center py-8 text-neutral-500">No reviews found. Be the first to leave a review!</div>
          )}
        </div>
      )}

      {totalReviews > 0 && (
        <Pagination
          currentPage={currentPagination.page}
          totalPages={totalPages}
          totalItems={totalReviews}
          pageSize={currentPagination.limit}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}

      <BookReviewDialog ref={reviewDialogRef} review={yourReview} />
    </div>
  )
}

export default BookReviewsList
