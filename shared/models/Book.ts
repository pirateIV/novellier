import mongoose, { mongo } from "mongoose";

type IBook = {
  title: string;
  bookId: string;
  // genre: string;
  rated: boolean;
  user: mongoose.Schema.Types.ObjectId;
  author: mongoose.Schema.Types.ObjectId;
  ratings: mongoose.Schema.Types.ObjectId[];
  reviews: mongoose.Schema.Types.ObjectId[];
};

const bookSchema = new mongoose.Schema<IBook>(
  {
    bookId: { type: String, default: "", unique: true },
    title: { type: String, default: "", unique: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    rated: { type: Boolean, default: false },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true, versionKey: false }
);

// const bookSchema = new mongoose.Schema<IBook>(
//   {
//     title: { type: String, default: "", unique: true },
//     genre: { type: String, required: true },
//     author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
//     reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
//   },
//   { timestamps: true, versionKey: false }
// );

export default mongoose.models.Book || mongoose.model("Book", bookSchema);
