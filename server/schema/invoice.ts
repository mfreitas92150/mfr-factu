import * as mongoose from "mongoose";

const invoice = mongoose.Schema({
  invoiceId: {
    type: String,
    unique: true,
    required: true,
  },
  userId:{
    type: String,
    required: true,
  },
  name: {
    type: String,
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
  },
  clientId: {
    type: String
  },
  products: {
      type: Array
  }
});

export default mongoose.model("Invoice", invoice);
  