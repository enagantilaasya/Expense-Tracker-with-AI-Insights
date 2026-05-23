import { Schema, model, Types }
from "mongoose";

const transactionSchema =new Schema({
  user: {
    type: Types.ObjectId,
    ref: "user",
    required: true,
  },
  transactions: [
    {
      type: {
        type: String,
        enum: [
          "income",
          "expense",
        ],
        required: true,
      },
      category: {
        type: String,
        required: true,
        lowercase: true,
      },
      amount: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  description: {
    type: String,
    default: "",
  },
  paymentMethod: {
    type: String,
    enum: [
      "cash",
      "upi",
      "card",
      "bank",
      "Receipt"
    ],
    default: "cash",
  },
  date: {
    type: Date,
    default: Date.now,
  },
},
{
  timestamps: true,
  versionKey: false,
  strict: "throw",
});
export const TransactionModel =model( "transactions", transactionSchema);