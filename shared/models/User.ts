import mongoose from "mongoose";

type IUser = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  books: mongoose.Schema.Types.ObjectId[];
  booksRead: mongoose.Schema.Types.ObjectId[];
  wantToReadBooks: mongoose.Schema.Types.ObjectId[];
  reviews: mongoose.Schema.Types.ObjectId[];
  totalBooksRead: number;
  // totalReviews: number;
};

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, default: "", unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // totalReviews: { type: Number, default: 0 },
    booksRead: [{ type: String }],
    wantToReadBooks: [{ type: String }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  },
  { timestamps: true, versionKey: false }
);

interface CustomToObjectOptions extends mongoose.ToObjectOptions {
  excludeTotalReviews?: boolean;
}

userSchema.set("toJSON", {
  transform: (_, returnedObj, opts: CustomToObjectOptions) => {
    returnedObj.id = returnedObj._id.toString();
    returnedObj.fullName = `${returnedObj.firstName} ${returnedObj.lastName}`;

    if (!opts?.excludeTotalReviews) {
      returnedObj.totalReviews = returnedObj?.totalReviews?.length || null;
    }

    delete returnedObj._id;
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
