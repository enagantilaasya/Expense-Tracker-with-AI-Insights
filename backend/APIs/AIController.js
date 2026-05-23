import { TransactionModel }from "../models/TransactionModel.js";
export const getAIInsights = async (req, res) => {
  try 
  {
    const userId = req.user.id;
    const transactions = await TransactionModel.find({ user: userId });
    let totalIncome = 0;
    let totalExpense = 0;
    let reports = {
      food: 0,
      shopping: 0,
      travel: 0,
      bills: 0,
      other: 0,
    };
    // TRANSACTIONS
    transactions.forEach((t) => {
      t.transactions.forEach((item) => {
        const amount =Number(item.amount) || 0;
        const category =item.category?.toLowerCase();
        // INCOME
        if (item.type === "income") {

          totalIncome += amount;

        }
        // EXPENSE
        else 
        {
          totalExpense += amount;
          if (reports[category]!== undefined) 
          {
            reports[category] += amount;
          }
          else 
          {
            reports.other += amount;
          }
        }
      });
    });
    // SAVINGS
    const savings = totalIncome - totalExpense;
    // ALERT
    let alert = "";
    if (totalExpense > totalIncome) {
      alert = "Warning: Expenses exceeded income";
    }
    else if (totalExpense > totalIncome * 0.8) 
    {
      alert ="Warning: High spending detected";
    }
    else if (totalExpense === 0) {
      alert ="No expenses added yet";
    }
    else 
    {
      alert ="Your spending is under control";

    }
    res.status(200).json({
      totalIncome,
      totalExpense,
      savings,
      alert,
      reports,
      totalTransactions:
        transactions.length,
    });
  }
  catch (err) {
  
    console.log(err);
    res.status(500).json({

      message:"AI Insights Failed",

      error:err.message,
    });
  }
};