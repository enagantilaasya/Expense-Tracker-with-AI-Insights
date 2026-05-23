import exp from "express";
import { TransactionModel }from "../models/TransactionModel.js";
import { verifyToken }from "../middlewares/verifyToken.js";
export const IncomeAndExpenseApp =exp.Router();
// ADD TRANSACTION
IncomeAndExpenseApp.post("/input",verifyToken,async (req, res) => {
    try {
      const transactionObj =req.body;
      transactionObj.user =req.user.id;
      const transactionDoc =new TransactionModel(transactionObj);
      await transactionDoc.save();
      res.status(201).json({
        message:
          "Transaction Added Successfully",
        payload:
          transactionDoc,
      });
    }
    catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);
// GET ALL TRANSACTIONS
IncomeAndExpenseApp.get("/all-transactions",verifyToken,async (req, res) => {
    try {
      const transactions = await TransactionModel.find({
          user: req.user.id
        });
      res.status(200).json({
        message: "Transactions",
        payload: transactions,
      });
    }
    catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);
// DELETE TRANSACTION
IncomeAndExpenseApp.delete( "/delete/:id",verifyToken,async (req, res) => {
    try {
      await TransactionModel.findByIdAndDelete( req.params.id);
      res.status(200).json({
        message:"Transaction Deleted",
      });
    }
    catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);