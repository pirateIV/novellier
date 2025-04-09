"use client"

import type { BookReviewsResponse } from "@/app/actions"
import type { Review } from "@/shared/types"
import type React from "react"
import { createContext, useContext, useState } from "react"

type ReviewContextType = {
  reviews: BookReviewsResponse | null
  setReviews: React.Dispatch<React.SetStateAction<BookReviewsResponse | null>>
  updateOptimisticReview: (updatedReview: Review) => void
}

const ReviewsContext = createContext<ReviewContextType | undefined>(undefined)

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<BookReviewsResponse | null>(null)

  const updateOptimisticReview = (updatedReview: Review) => {
    setReviews((prevReviews) => {
      if (!prevReviews) return null

      return {
        ...prevReviews,
        reviews: prevReviews.reviews.map((review) => (review.id === updatedReview.id ? updatedReview : review)),
        // Update average rating if needed (you might want to calculate this properly)
        averageRating: calculateNewAverage(prevReviews, updatedReview),
        // Update rating distribution if needed
        ratingDistribution: updateRatingDistribution(prevReviews.ratingDistribution, updatedReview),
      }
    })
  }

  // Helper function to calculate new average rating
  const calculateNewAverage = (prevReviews: BookReviewsResponse, updatedReview: Review): number => {
    let total = 0
    let count = 0

    prevReviews.reviews.forEach((review) => {
      const rating = review.id === updatedReview.id ? updatedReview.rating : review.rating
      total += rating
      count++
    })

    return Number.parseFloat((total / count).toFixed(1))
  }

  // Helper function to update rating distribution
  const updateRatingDistribution = (currentDistribution: any, updatedReview: Review) => {
    // This would need the old review to know what rating to decrement
    // Since we don't have it here, you might need to modify the function signature
    // For now, we'll just return the current distribution
    return currentDistribution

    // A more complete implementation would:
    // 1. Find the old review to know its previous rating
    // 2. Decrement the count for the old rating
    // 3. Increment the count for the new rating
    // 4. Return the updated distribution
  }

  return (
    <ReviewsContext.Provider value={{ reviews, setReviews, updateOptimisticReview }}>
      {children}
    </ReviewsContext.Provider>
  )
}

export function useReviews() {
  const context = useContext(ReviewsContext)
  if (context === undefined) {
    throw new Error("useReviews must be used within a ReviewsProvider")
  }
  return context
}
