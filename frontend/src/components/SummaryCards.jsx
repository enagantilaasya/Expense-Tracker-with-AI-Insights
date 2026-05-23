import { useEffect, useState }
from "react";

import {
  fetchTransactions,
} from "../stores/transactionStore";

function SummaryCards() {

  const [summary, setSummary] =
    useState({

      balance: 0,

      income: 0,

      expenses: 0,

    });

  useEffect(() => {

    calculateSummary();

  }, []);

  const calculateSummary =
    async () => {

      try {

        const transactions =
          await fetchTransactions();

        let income = 0;
        let expenses = 0;

        // ALL TRANSACTIONS
        transactions.forEach((t) => {

          t.transactions?.forEach((item) => {

            const amount =
              parseFloat(
                item.amount || 0
              );

            if (
              item.type === "income"
            ) {

              income += amount;

            }

            else {

              expenses += amount;

            }

          });

        });

        setSummary({

          income,

          expenses,

          balance:
            income - expenses,

        });

      }

      catch (err) {

        console.log(
          "Summary Error",
          err
        );

      }

    };

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* BALANCE */}
      <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-cyan-500/20 rounded-[32px] shadow-[0_0_60px_rgba(0,200,255,0.18)] p-7">

        {/* GLOW */}
        <div className="absolute w-52 h-52 bg-cyan-500/20 rounded-full blur-3xl -top-16 -left-10"></div>

        <div className="relative z-10">

          <div className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-300 text-xs font-semibold mb-5">
            Total Balance
          </div>

          <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">

            Current Balance

          </p>

          <h2
            className={`text-5xl font-extrabold ${
              summary.balance < 0
                ? "text-red-400"
                : "bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            }`}
          >

            ₹{
              summary.balance
              .toFixed(2)
            }

          </h2>

          {summary.balance < 0 && (

            <p className="text-red-400 mt-4 font-semibold">

              ⚠️ Insufficient Balance

            </p>

          )}

        </div>

      </div>

      {/* INCOME */}
      <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-emerald-500/20 rounded-[32px] shadow-[0_0_60px_rgba(0,255,180,0.18)] p-7">

        {/* GLOW */}
        <div className="absolute w-52 h-52 bg-emerald-500/20 rounded-full blur-3xl -top-16 -right-10"></div>

        <div className="relative z-10">

          <div className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-xs font-semibold mb-5">
            Income Overview
          </div>

          <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">

            Total Income

          </p>

          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-500 bg-clip-text text-transparent">

            ₹{
              summary.income
              .toFixed(2)
            }

          </h2>

        </div>

      </div>

      {/* EXPENSE */}
      <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-red-500/20 rounded-[32px] shadow-[0_0_60px_rgba(255,60,40,0.18)] p-7">

        {/* GLOW */}
        <div className="absolute w-52 h-52 bg-red-500/20 rounded-full blur-3xl -bottom-10 -left-10"></div>

        <div className="relative z-10">

          <div className="inline-block px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-300 text-xs font-semibold mb-5">
            Expense Tracker
          </div>

          <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">

            Total Expenses

          </p>

          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">

            ₹{
              summary.expenses
              .toFixed(2)
            }

          </h2>

        </div>

      </div>

    </div>

  );

}

export default SummaryCards;