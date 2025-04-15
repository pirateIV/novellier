import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  genre: { type: String, required: true },
  total_times_rated: { type: Number, default: 0 },
});

export default mongoose.models.Genre || mongoose.model("Genre", genreSchema)