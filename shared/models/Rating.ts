import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({});

const Review =
  new mongoose.models.Review || mongoose.model("Rating", reviewSchema);

export default Review;
