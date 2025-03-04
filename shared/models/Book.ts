import mongoose, { mongo } from "mongoose";

type IBook = {
  title: string;
  genre: string;
  author: mongoose.Schema.Types.ObjectId;
  ratings: mongoose.Schema.Types.ObjectId[];
  reviews: mongoose.Schema.Types.ObjectId[];
};

const bookSchema = new mongoose.Schema<IBook>(
  {
    title: {
      type: String,
      default: "",
      unique: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    genre: {
      type: String,
      required: true,
    },
    ratings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default Book;
