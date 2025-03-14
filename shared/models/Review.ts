import mongoose from "mongoose";

type IReview = {
  content: string;
  rating: number;
  bookId: string;
  book: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
};

const reviewSchema = new mongoose.Schema<IReview>(
  {
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    bookId: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
