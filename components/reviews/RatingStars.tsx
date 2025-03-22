import { Star, StarIcon } from "lucide-react";

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center mb-2">
      {[...Array(rating)].map((_, index) => (
        <Star key={index} className="size-3 text-amber-500 fill-amber-500" />
      ))}
      {[...Array(5 - rating)].map((_, index) => (
        <StarIcon key={index} className="size-3 text-gray-500" />
      ))}
      <span className="text-xs text-gray-400">({rating}/5)</span>
    </div>
  );
};

export default RatingStars;
