import * as mongoose from "mongoose";

export interface IProduct {
  name: string,
  quantity: number,
  cost: number,
  tax: Number
}

export interface IInvoice extends mongoose.Document {
  invoiceId: string,
  userId: string,
  name: string,  
  createdAt: Date,
  updatedAt: Date,
  validatedAt: Date,
  clientId: string,
  products: Array<IProduct>
}

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

export default mongoose.model<IInvoice>("Invoice", invoice);
  