import mongoose from "mongoose";

type IUser = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  books: mongoose.Schema.Types.ObjectId[];
};

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      default: "",
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

userSchema.set("toJSON", {
  transform: (_, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
