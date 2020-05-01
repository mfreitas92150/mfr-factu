import * as mongoose from "mongoose";

const user = mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  }
});

export default mongoose.model("User", user);
  