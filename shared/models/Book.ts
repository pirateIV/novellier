import mongoose, { mongo } from "mongoose";

type IBook = {
  title: string;
  bookId: string;
  // genre: string;
  rated: boolean;
  user: mongoose.Schema.Types.ObjectId;
  author: string;
  authorId: string;
  ratings: mongoose.Schema.Types.ObjectId[];
  reviews: mongoose.Schema.Types.ObjectId[];
};

const bookSchema = new mongoose.Schema<IBook>(
  {
    bookId: { type: String, default: "", unique: true },
    title: { type: String, default: "", unique: true },
    // author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    authorId: { type: String, required: true },
    rated: { type: Boolean, default: false },
    author: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true, versionKey: false }
);

bookSchema.set("toJSON", {
  transform: (_: any, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
  },
});
export default mongoose.models.Book || mongoose.model("Book", bookSchema);
