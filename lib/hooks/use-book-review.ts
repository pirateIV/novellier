"use client";

import { useCallback, useState } from "react";
import useSWR from "swr";
import { getBookReviews } from "@/app/actions";
import { useReviews } from "@/context/ReviewContext";

type SortBy = "newest" | "oldest" | "highest" | "lowest";

interface UseBooksReviewsProps {
  bookId: string;
  initialLimit?: number;
  initialPage?: number;
  initialSortBy?: SortBy;
}

export function useBookReviews({
  bookId,
  initialLimit = 3,
  initialPage = 1,
  initialSortBy = "newest",
}: UseBooksReviewsProps) {
  const { setReviews } = useReviews();
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
    sortBy: initialSortBy,
  });
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  // Use SWR for data fetching with better caching and revalidation
  const {
    data,
    error,
    isLoading: isSWRLoading,
    isValidating,
    mutate,
  } = useSWR(
    [`/api/books/${bookId}/reviews`, pagination],
    async () => {
      setIsLocalLoading(true);
      try {
        const data = await getBookReviews(
          bookId,
          pagination.limit,
          pagination.page,
          pagination.sortBy
        );
        setReviews(data); // Update the context with the new data
        return data;
      } finally {
        setIsLocalLoading(false);
      }
    },
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  );

  const handlePaginationChange = useCallback(
    (newPagination: { page?: number; limit?: number; sortBy?: SortBy }) => {
      setPagination((prev) => ({ ...prev, ...newPagination }));
    },
    []
  );

  // Combine SWR loading state with our local loading state
  const isLoading = isSWRLoading || isLocalLoading;

  return {
    bookReviews: data,
    isLoading,
    isValidating,
    error,
    pagination,
    handlePaginationChange,
    mutate,
  };
}
