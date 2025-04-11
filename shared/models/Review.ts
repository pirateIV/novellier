import mongoose from "mongoose";

type IReview = {
  content: string;
  bookId: string;
  rating: number;
  reviewer: mongoose.Schema.Types.ObjectId;
  book: mongoose.Schema.Types.ObjectId;
  // bookTitle: string;
  // bookAuthor: string;
  user: mongoose.Schema.Types.ObjectId;
  helpful: mongoose.Schema.Types.ObjectId;
  helpfulCount: number;
};

const reviewSchema = new mongoose.Schema<IReview>(
  {
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    bookId: { type: String, required: true },
    helpful: {
      type: Map,
      of: Boolean,
      default: new Map(),
    },
    helpfulCount: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

reviewSchema.set("toJSON", {
  transform: (_: any, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
  },
});

// reviewSchema.index({ helpful: 1 }, { unique: true, sparse: true });

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
