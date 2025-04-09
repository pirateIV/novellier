import { Loader2 } from "lucide-react"

interface LoadingReviewsProps {
  message?: string
}

const LoadingReviews = ({ message = "Loading reviews..." }: LoadingReviewsProps) => {
  return (
    <div className="py-8 flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-amber-500" />
        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{message}</span>
      </div>
    </div>
  )
}

export default LoadingReviews
