import { useForm }
from "react-hook-form";

import {
  addTransaction,
  fetchTransactions,
} from "../stores/transactionStore";

function AddTransactionForm({
  getTransactions,
}) {

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  // SUBMIT
  const onSubmit =
    async (data) => {

      // OLD DATA
      const oldTransactions =
        await fetchTransactions();

      let totalIncome = 0;
      let totalExpense = 0;

      // TOTALS
      oldTransactions.forEach((t) => {

        t.transactions?.forEach((item) => {

          if (
            item.type === "income"
          ) {

            totalIncome +=
              parseFloat(
                item.amount || 0
              );

          }

          else {

            totalExpense +=
              parseFloat(
                item.amount || 0
              );

          }

        });

      });

      // CHECK EXPENSE
      if (
        data.type === "Expense"
      ) {

        const newExpense =
          totalExpense +
          parseFloat(
            data.amount || 0
          );

        // STOP SAVE
        if (
          newExpense >
          totalIncome
        ) {

          alert(
            "Expenses are exceeding income"
          );

          return;

        }

      }

      // SAVE USER VALUE EXACTLY
      const transactionObj = {

        transactions: [

          {

            type:
              data.type.toLowerCase(),

            category:
              data.category,

            amount:
              data.amount,

          },

        ],

        paymentMethod:
          data.paymentMethod,

        description:
          data.description,

        date:
          data.date,

      };

      // SAVE
      await addTransaction(
        transactionObj
      );

      // REFRESH
      getTransactions?.();

      // RESET
      reset();

    };

  return (

    <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-red-500/20 rounded-[36px] p-10 w-full max-w-4xl mx-auto shadow-[0_0_80px_rgba(255,40,0,0.25)]">

      {/* GLOW EFFECTS */}
      <div className="absolute w-72 h-72 bg-red-500/20 rounded-full blur-3xl -top-20 -left-16"></div>

      <div className="absolute w-72 h-72 bg-orange-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

      <div className="relative z-10">

        {/* TITLE */}
        <div className="mb-10">

          <div className="inline-block px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full text-sm font-semibold mb-5">
            Smart Finance Dashboard
          </div>

          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">

            Add Transaction

          </h1>

          <p className="text-gray-300 mt-3 text-lg">
            Track your income and expenses intelligently
          </p>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          {/* TYPE */}
          <div>

            <label className="block text-red-200 mb-2 text-sm">
              Transaction Type
            </label>

            <select
              className="w-full bg-black/70 border border-red-500/20 text-white rounded-2xl p-4 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/20 transition-all"
              {...register("type")}
            >

              <option value="" className="bg-black">
                Select Type
              </option>

              <option value="Income" className="bg-black">
                Income
              </option>

              <option value="Expense" className="bg-black">
                Expense
              </option>

            </select>

          </div>

          {/* CATEGORY */}
          <div>

            <label className="block text-red-200 mb-2 text-sm">
              Category
            </label>

            <select
              className="w-full bg-black/70 border border-red-500/20 text-white rounded-2xl p-4 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/20 transition-all"
              {...register("category")}
            >

              <option value="" className="bg-black">
                Select Category
              </option>

              <option value="food" className="bg-black">
                Food
              </option>

              <option value="shopping" className="bg-black">
                Shopping
              </option>

              <option value="rent" className="bg-black">
                Rent
              </option>

              <option value="salary" className="bg-black">
                Salary
              </option>

              <option value="business" className="bg-black">
                Business
              </option>

              <option value="electricity" className="bg-black">
                Electricity
              </option>

              <option value="water" className="bg-black">
                Water
              </option>

              <option value="internet" className="bg-black">
                Internet
              </option>

              <option value="other" className="bg-black">
                Other
              </option>

            </select>

          </div>

          {/* AMOUNT */}
          <div>

            <label className="block text-red-200 mb-2 text-sm">
              Amount
            </label>

            <input
              type="text"
              placeholder="Enter amount"
              className="w-full bg-black/70 border border-red-500/20 text-white placeholder:text-gray-500 rounded-2xl p-4 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/20 transition-all"
              {...register("amount")}
            />

          </div>

          {/* PAYMENT */}
          <div>

            <label className="block text-red-200 mb-2 text-sm">
              Payment Method
            </label>

            <select
              className="w-full bg-black/70 border border-red-500/20 text-white rounded-2xl p-4 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/20 transition-all"
              {...register("paymentMethod")}
            >

              <option value="cash" className="bg-black">
                Cash
              </option>

              <option value="upi" className="bg-black">
                UPI
              </option>

              <option value="card" className="bg-black">
                Card
              </option>

              <option value="bank" className="bg-black">
                Bank
              </option>

            </select>

          </div>

          {/* DESCRIPTION */}
          <div>

            <label className="block text-red-200 mb-2 text-sm">
              Description
            </label>

            <textarea
              rows="4"
              placeholder="Write transaction details..."
              className="w-full bg-black/70 border border-red-500/20 text-white placeholder:text-gray-500 rounded-2xl p-4 outline-none resize-none focus:border-red-400 focus:ring-2 focus:ring-red-500/20 transition-all"
              {...register("description")}
            />

          </div>

          {/* DATE */}
          <div>

            <label className="block text-red-200 mb-2 text-sm">
              Date
            </label>

            <input
              type="date"
              className="w-full bg-black/70 border border-red-500/20 text-white rounded-2xl p-4 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/20 transition-all"
              {...register("date")}
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-red-500 hover:scale-[1.02] text-white font-bold text-xl py-4 rounded-2xl shadow-[0_0_45px_rgba(255,60,20,0.55)] transition-all duration-300"
          >

            Add Transaction

          </button>

        </form>

      </div>

    </div>

  );

}

export default AddTransactionForm;