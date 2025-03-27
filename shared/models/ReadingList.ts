import mongoose from "mongoose";

const readingListSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  bookId: { type: String, required: true },
  read: { type: Boolean, default: false },
});

readingListSchema.set("toJSON", {
  transform(_: any, returnedObj) {
    returnedObj.id = returnedObj._id.toString;
    delete returnedObj._id;
  },
});

export default mongoose.models.ReadingList ||
  mongoose.model("ReadingList", readingListSchema);
