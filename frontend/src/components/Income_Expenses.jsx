import { useEffect, useState }
from "react";

import {
  fetchTransactions
}
from "../stores/transactionStore";

function Income_Expenses() {

  const [income, setIncome] =
    useState([]);

  const [expenses, setExpenses] =
    useState([]);

  const [totalIncome, setTotalIncome] =
    useState(0);

  const [totalExpenses, setTotalExpenses] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      setLoading(true);

      const transactions =
        await fetchTransactions();

      let incomeMap = {};
      let expenseMap = {};

      let sumIncome = 0;
      let sumExpenses = 0;

      // NEW SCHEMA
      transactions.forEach((t) => {

        t.transactions?.forEach((item) => {

          const category =

            item.category
            ?.toLowerCase()

            ||

            "other";

          const amount =
            Number(
              item.amount
            ) || 0;

          // INCOME
          if (
            item.type ===
            "income"
          ) {

            incomeMap[category] =

              (incomeMap[category] || 0)

              +

              amount;

            sumIncome += amount;

          }

          // EXPENSE
          else {

            expenseMap[category] =

              (expenseMap[category] || 0)

              +

              amount;

            sumExpenses += amount;

          }

        });

      });

      setIncome(

        Object.entries(
          incomeMap
        )

        .map(([cat, amt]) => ({
          cat,
          amt,
        }))

        .sort(
          (a, b) =>
            b.amt - a.amt
        )

      );

      setExpenses(

        Object.entries(
          expenseMap
        )

        .map(([cat, amt]) => ({
          cat,
          amt,
        }))

        .sort(
          (a, b) =>
            b.amt - a.amt
        )

      );

      setTotalIncome(sumIncome);

      setTotalExpenses(sumExpenses);

    }

    catch (err) {

      console.log(
        "Income_Expenses error:",
        err
      );

    }

    finally {

      setLoading(false);

    }

  };

  // ROW
  const CategoryRow = ({
    cat,
    amt,
    total,
    gradient,
  }) => (

    <div className="space-y-2">

      <div className="flex justify-between items-center">

        <span className="text-gray-300 capitalize font-medium">

          {cat}

        </span>

        <span className="text-white font-bold">

          ₹{
            Number(
              amt
            ).toFixed(2)
          }

        </span>

      </div>

      {/* BAR */}
      <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden border border-white/5">

        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-700`}
          style={{

            width:

              total > 0

                ?

                `${(amt / total) * 100}%`

                :

                "0%",

          }}
        />

      </div>

    </div>

  );

  return (

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

      {/* INCOME */}
      <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-emerald-500/20 rounded-[36px] p-8 shadow-[0_0_70px_rgba(16,185,129,0.18)]">

        {/* GLOW */}
        <div className="absolute w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl -top-20 -left-20"></div>

        <div className="absolute w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

        <div className="relative z-10">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">

            <div>

              <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold mb-4">

                Earnings Overview

              </div>

              <h2 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-500 bg-clip-text text-transparent">

                Income

              </h2>

            </div>

            <div className="text-right">

              <p className="text-gray-400 text-sm mb-1">

                Total Income

              </p>

              <p className="text-3xl font-bold text-emerald-400">

                ₹{
                  totalIncome.toFixed(2)
                }

              </p>

            </div>

          </div>

          {/* CONTENT */}
          {loading ? (

            <div className="text-gray-400 text-center py-10 text-lg">

              Loading...

            </div>

          ) : income.length === 0 ? (

            <div className="text-gray-500 text-center py-10 text-lg">

              No income data

            </div>

          ) : (

            <div className="space-y-5">

              {income.map(
                ({ cat, amt }) => (

                  <CategoryRow
                    key={cat}

                    cat={cat}

                    amt={amt}

                    total={totalIncome}

                    gradient="from-emerald-500 via-cyan-400 to-emerald-400"
                  />

                )
              )}

            </div>

          )}

        </div>

      </div>

      {/* EXPENSES */}
      <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-red-500/20 rounded-[36px] p-8 shadow-[0_0_70px_rgba(239,68,68,0.18)]">

        {/* GLOW */}
        <div className="absolute w-72 h-72 bg-red-500/20 rounded-full blur-3xl -top-20 -left-20"></div>

        <div className="absolute w-72 h-72 bg-orange-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

        <div className="relative z-10">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">

            <div>

              <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full text-xs font-semibold mb-4">

                Spending Overview

              </div>

              <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">

                Expenses

              </h2>

            </div>

            <div className="text-right">

              <p className="text-gray-400 text-sm mb-1">

                Total Expenses

              </p>

              <p className="text-3xl font-bold text-red-400">

                ₹{
                  totalExpenses.toFixed(2)
                }

              </p>

            </div>

          </div>

          {/* CONTENT */}
          {loading ? (

            <div className="text-gray-400 text-center py-10 text-lg">

              Loading...

            </div>

          ) : expenses.length === 0 ? (

            <div className="text-gray-500 text-center py-10 text-lg">

              No expense data

            </div>

          ) : (

            <div className="space-y-5">

              {expenses.map(
                ({ cat, amt }) => (

                  <CategoryRow
                    key={cat}

                    cat={cat}

                    amt={amt}

                    total={totalExpenses}

                    gradient="from-red-500 via-orange-400 to-red-400"
                  />

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default Income_Expenses;