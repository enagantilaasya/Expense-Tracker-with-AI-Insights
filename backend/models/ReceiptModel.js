import { Schema, model, Types }
from "mongoose";

const receiptSchema =
new Schema({

  user: {
    type: Types.ObjectId,
    ref: "user",
    required: true,
  },

  merchant: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  image: {
    type: String,
    default: "",
  },

  date: {
    type: Date,
    default: Date.now,
  },

},
{
  timestamps: true,
  versionKey: false,
});

export const ReceiptModel =
model(
  "receipts",
  receiptSchema
);