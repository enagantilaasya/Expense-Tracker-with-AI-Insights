import { useEffect, useState } from "react";
import { fetchTransactions } from "../stores/transactionStore";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function PredictionCard() {

  const [predictions, setPredictions] =
    useState(null);

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

      const monthMap = {};

      // NEW SCHEMA
      transactions.forEach((t) => {

        const date =
          new Date(t.date);

        const key =
          `${date.getFullYear()}-${date.getMonth()}`;

        if (!monthMap[key]) {

          monthMap[key] = {

            income: 0,
            expenses: 0,
            categories: {},

          };

        }

        t.transactions?.forEach((item) => {

          const amount =
            Number(item.amount) || 0;

          // INCOME
          if (
            item.type === "income"
          ) {

            monthMap[key]
            .income += amount;

          }

          // EXPENSE
          else {

            monthMap[key]
            .expenses += amount;

            const cat =
              item.category
              ?.toLowerCase()
              || "other";

            monthMap[key]
            .categories[cat] =

              (
                monthMap[key]
                .categories[cat] || 0
              )

              +

              amount;

          }

        });

      });

      const months =
        Object.values(monthMap);

      if (months.length === 0) {

        setLoading(false);

        return;

      }

      // AVERAGES
      const avgIncome =

        months.reduce(
          (s, m) =>
            s + m.income,
          0
        ) / months.length;

      const avgExpenses =

        months.reduce(
          (s, m) =>
            s + m.expenses,
          0
        ) / months.length;

      const avgSavings =

        avgIncome -
        avgExpenses;

      // CATEGORY AVERAGES
      const catMap = {};

      months.forEach((m) => {

        Object.entries(
          m.categories
        ).forEach(([cat, amt]) => {

          catMap[cat] =

            (catMap[cat] || 0)

            +

            amt;

        });

      });

      const catPredictions =

        Object.entries(catMap)

        .map(
          ([cat, total]) => ({

            cat,

            predicted:
              Math.round(
                total /
                months.length
              ),

          })
        )

        .sort(
          (a, b) =>

            b.predicted -
            a.predicted
        )

        .slice(0, 5);

      const nextMonth =
        new Date();

      nextMonth.setMonth(
        nextMonth.getMonth() + 1
      );

      setPredictions({

        month:
          `${
            MONTHS[
              nextMonth.getMonth()
            ]
          } ${
            nextMonth.getFullYear()
          }`,

        income:
          Math.round(avgIncome),

        expenses:
          Math.round(avgExpenses),

        savings:
          Math.round(avgSavings),

        categories:
          catPredictions,

        basedOn:
          months.length,

      });

    }

    catch (err) {

      console.log(
        "PredictionCard error:",
        err
      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-purple-500/20 rounded-[36px] shadow-[0_0_80px_rgba(168,85,247,0.25)]">

      {/* GLOW EFFECTS */}
      <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -top-20 -left-20"></div>

      <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl bottom-0 right-0"></div>

      <div className="relative z-10 p-8">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

          <div>

            <div className="inline-block px-5 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-semibold mb-4">

              AI Forecast Engine

            </div>

            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">

              Next Month Prediction

            </h2>

            {predictions && (

              <p className="text-gray-400 mt-2">

                Based on{" "}

                <span className="text-white font-semibold">

                  {predictions.basedOn}

                </span>

                {" "}month
                {predictions.basedOn > 1
                  ? "s"
                  : ""} of financial data

              </p>

            )}

          </div>

          {/* ICON */}
          <div className="w-20 h-20 rounded-[28px] bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(168,85,247,0.45)]">

            🔮

          </div>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="flex items-center justify-center h-72 text-gray-400 text-lg">

            Analyzing your spending patterns...

          </div>

        ) : !predictions ? (

          <div className="flex items-center justify-center h-72 text-gray-400 text-lg">

            Add transactions to unlock AI predictions

          </div>

        ) : (

          <>

            {/* MONTH CARD */}
            <div className="bg-gradient-to-r from-purple-500/20 via-fuchsia-500/10 to-cyan-500/20 border border-purple-500/20 rounded-3xl p-6 mb-8 text-center">

              <p className="text-gray-400 uppercase tracking-widest text-sm mb-2">

                Predicted Month

              </p>

              <h1 className="text-4xl font-extrabold text-white">

                {predictions.month}

              </h1>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

              {/* INCOME */}
              <div className="bg-black/40 border border-emerald-500/10 rounded-3xl p-6">

                <p className="text-gray-400 text-sm mb-2">

                  Predicted Income

                </p>

                <h2 className="text-3xl font-extrabold text-emerald-400">

                  ₹{
                    predictions.income
                    .toLocaleString()
                  }

                </h2>

              </div>

              {/* EXPENSES */}
              <div className="bg-black/40 border border-red-500/10 rounded-3xl p-6">

                <p className="text-gray-400 text-sm mb-2">

                  Predicted Expenses

                </p>

                <h2 className="text-3xl font-extrabold text-red-400">

                  ₹{
                    predictions.expenses
                    .toLocaleString()
                  }

                </h2>

              </div>

              {/* SAVINGS */}
              <div className="bg-black/40 border border-cyan-500/10 rounded-3xl p-6">

                <p className="text-gray-400 text-sm mb-2">

                  Predicted Savings

                </p>

                <h2
                  className={`text-3xl font-extrabold ${
                    predictions.savings >= 0
                      ? "text-cyan-400"
                      : "text-red-400"
                  }`}
                >

                  ₹{
                    predictions.savings
                    .toLocaleString()
                  }

                </h2>

              </div>

            </div>

            {/* CATEGORY PREDICTIONS */}
            <div>

              <div className="flex items-center justify-between mb-5">

                <h3 className="text-xl font-bold text-white">

                  Top Predicted Expenses

                </h3>

                <span className="text-purple-300 text-sm">

                  AI Generated

                </span>

              </div>

              <div className="space-y-4">

                {predictions.categories.map(
                  ({
                    cat,
                    predicted
                  }, index) => {

                    const max =
                      predictions.categories[0]
                      ?.predicted || 1;

                    const width =

                      (
                        predicted / max
                      ) * 100;

                    return (

                      <div
                        key={cat}

                        className="bg-black/40 border border-white/5 hover:border-purple-500/20 rounded-3xl p-5 transition-all duration-300"
                      >

                        <div className="flex items-center justify-between mb-3">

                          <div className="flex items-center gap-3">

                            <div className={`w-4 h-4 rounded-full ${
                              index % 2 === 0
                                ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                                : "bg-gradient-to-r from-red-500 to-orange-500"
                            }`} />

                            <span className="text-white capitalize font-semibold text-lg">

                              {cat}

                            </span>

                          </div>

                          <span className="text-red-400 font-bold text-lg">

                            ~₹{
                              predicted
                              .toLocaleString()
                            }

                          </span>

                        </div>

                        {/* BAR */}
                        <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden">

                          <div
                            className={`h-full rounded-full ${
                              index % 2 === 0
                                ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                                : "bg-gradient-to-r from-red-500 to-orange-500"
                            }`}

                            style={{
                              width:
                                `${width}%`,
                            }}
                          />

                        </div>

                      </div>

                    );

                  }
                )}

              </div>

            </div>

            {/* WARNING */}
            {predictions.savings < 0 && (

              <div className="mt-8 bg-red-500/10 border border-red-500/20 rounded-3xl p-5">

                <p className="text-red-400 font-semibold text-lg">

                  ⚠️ Warning: Predicted expenses exceed income

                </p>

                <p className="text-gray-300 mt-1">

                  You may overspend by{" "}

                  <span className="text-white font-bold">

                    ₹{
                      Math.abs(
                        predictions.savings
                      ).toLocaleString()
                    }

                  </span>

                </p>

              </div>

            )}

          </>

        )}

      </div>

    </div>

  );

}

export default PredictionCard;