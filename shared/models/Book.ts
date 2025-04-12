import mongoose from "mongoose";

type IBook = {
  title: string;
  bookId: string;
  cover: string;
  author: string;
  authorId: string;
  averageRating: number;
  user: mongoose.Schema.Types.ObjectId;
  reviews: mongoose.Schema.Types.ObjectId[];
};

const bookSchema = new mongoose.Schema<IBook>(
  {
    author: { type: String, required: true },
    authorId: { type: String },
    bookId: { type: String, default: "", unique: true },
    cover: { type: String, default: "" },
    title: { type: String, default: "", unique: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true, versionKey: false }
);

bookSchema.set("toJSON", {
  transform: (_: any, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    // returnedObj.rated = returnedObj.reviews.length > 0;
    returnedObj.totalReviews = returnedObj.reviews
      ? returnedObj.reviews.length
      : "";
    delete returnedObj._id;
  },
});
export default mongoose.models.Book || mongoose.model("Book", bookSchema);
