import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, versionKey: false }
);

const Review =
  new mongoose.models.Review() || mongoose.model("Review", reviewSchema);

export default Review;
