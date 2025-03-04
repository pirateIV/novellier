import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({});

const Review =
  new mongoose.models.Review() || mongoose.model("Review", reviewSchema);

export default Review;
