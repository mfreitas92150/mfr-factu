import * as mongoose from "mongoose";

const invoice = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  validatedAt: {
    type: Date,
    required: false,
  },
  clientId: {
    type: String
  },
  products: {
      type: Array
  }
});

export default mongoose.model("Invoice", invoice);
  