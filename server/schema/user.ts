import * as mongoose from "mongoose";
import * as _ from "lodash";

export class IUser extends mongoose.Document {
  userId: String;
  email: String;
  createdAt: Date;
}

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
  },
});

export default mongoose.model<IUser>("User", user);
