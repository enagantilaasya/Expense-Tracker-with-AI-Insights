import { TransactionModel }from "../models/TransactionModel.js";
export const getPredictions =async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await TransactionModel.find({user: userId});
    let totalExpense = 0;
    let categories = {};
    // CURRENT MONTH
    const currentMonth =new Date().getMonth();
    const currentYear =new Date().getFullYear();

    let currentMonthExpense = 0;
    // TRANSACTIONS
    transactions.forEach((t) => {
      const date =new Date(t.date);
      t.transactions.forEach((item) => {

        // ONLY EXPENSE
        if (item.type === "expense")
       {
          const amount = Number(item.amount) || 0;
          const category =item.category?.toLowerCase();
          totalExpense += amount;
          // CATEGORY REPORT
          categories[category] =(categories[category] || 0)+ amount;
          // CURRENT MONTH
          if (date.getMonth() === currentMonth && date.getFullYear() === currentYear)
         {
            currentMonthExpense += amount;
          }
        }
      });
    });
    // PREDICTIONS
    const averageExpense =currentMonthExpense;
    const predictedNextMonth = averageExpense * 1.1;
    const expectedSavings =50000 - predictedNextMonth;
    // TOP CATEGORY
    let topCategory = "";
    let topAmount = 0;
    Object.entries(categories).forEach(([cat, amt]) => {
      if (amt > topAmount) {
        topAmount = amt;
        topCategory = cat;
      }
    });
    res.status(200).json({
      averageExpense:
        averageExpense.toFixed(2),
      predictedNextMonth:
        predictedNextMonth.toFixed(2),
      expectedSavings:
        expectedSavings.toFixed(2),
      topCategory,
      topCategoryAmount:
        topAmount.toFixed(2),
      categories,
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      message:
        "Prediction failed",
      error:
        err.message,
    });
  }
};