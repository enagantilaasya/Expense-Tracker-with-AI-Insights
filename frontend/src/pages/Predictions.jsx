import { useEffect, useState } from "react";

import {
  TrendingUp,
  Wallet,
  PiggyBank,
  Tag,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

import { fetchTransactions } from "../stores/transactionStore";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function Predictions() {

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    generatePredictions();

  }, []);

  const generatePredictions =
    async () => {

      try {

        setLoading(true);

        const transactions =
          await fetchTransactions();

        const monthMap = {};

        transactions.forEach((t) => {

          const date =
            new Date(
              t.date ||
              t.createdAt
            );

          const key =
            `${date.getFullYear()}-${
              date.getMonth()
            }`;

          if (!monthMap[key]) {

            monthMap[key] = {

              income: 0,

              expenses: 0,

              categories: {},

            };

          }

          t.transactions?.forEach(
            (item) => {

              const amount =
                Number(
                  item.amount
                ) || 0;

              const category =
                item.category
                ?.toLowerCase()
                || "other";

              if (
                item.type ===
                "income"
              ) {

                monthMap[key]
                .income += amount;

              }

              else {

                monthMap[key]
                .expenses += amount;

                monthMap[key]
                .categories[
                  category
                ] =

                  (
                    monthMap[key]
                    .categories[
                      category
                    ] || 0
                  )

                  +

                  amount;

              }

            }
          );

        });

        const months =
          Object.values(
            monthMap
          );

        if (
          months.length === 0
        ) {

          setData(null);

          return;

        }

        const avgIncome =

          months.reduce(
            (s, m) =>
              s + m.income,
            0
          )

          /

          months.length;

        const avgExpenses =

          months.reduce(
            (s, m) =>
              s + m.expenses,
            0
          )

          /

          months.length;

        const expectedSavings =
          avgIncome -
          avgExpenses;

        const catMap = {};

        months.forEach((m) => {

          Object.entries(
            m.categories
          ).forEach(
            ([cat, amt]) => {

              catMap[cat] =

                (
                  catMap[cat]
                  || 0
                )

                +

                amt;

            }
          );

        });

        let topCategory =
          "none";

        let topCategoryAmount =
          0;

        Object.entries(catMap)
        .forEach(
          ([cat, amt]) => {

            if (
              amt >
              topCategoryAmount
            ) {

              topCategory =
                cat;

              topCategoryAmount =
                amt;

            }

          }
        );

        const nextMonth =
          new Date();

        nextMonth.setMonth(
          nextMonth.getMonth()
          + 1
        );

        setData({

          month:
            `${
              MONTHS[
                nextMonth
                .getMonth()
              ]
            } ${
              nextMonth
              .getFullYear()
            }`,

          averageExpense:
            avgExpenses,

          predictedNextMonth:
            avgExpenses,

          expectedSavings,

          topCategory,

          topCategoryAmount,

          categories:
            catMap,

          totalMonths:
            months.length,

        });

      }

      catch (err) {

        console.log(
          "Predictions error:",
          err
        );

      }

      finally {

        setLoading(false);

      }

    };

  // LOADING
  if (loading) {

    return (

      <div className="flex items-center justify-center min-h-[70vh]">

        <div className="text-center">

          <div className="w-20 h-20 border-4 border-red-500/20 border-t-red-400 rounded-full animate-spin mx-auto mb-6"></div>

          <h2 className="text-3xl font-bold text-white">

            Generating Predictions...

          </h2>

          <p className="text-gray-400 mt-3">

            AI is analyzing your financial trends

          </p>

        </div>

      </div>

    );

  }

  // EMPTY
  if (!data) {

    return (

      <div className="flex items-center justify-center min-h-[70vh]">

        <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-red-500/20 rounded-[36px] p-10 max-w-xl shadow-[0_0_80px_rgba(255,40,0,0.25)]">

          <div className="absolute w-72 h-72 bg-red-500/20 rounded-full blur-3xl -top-20 -left-16"></div>

          <div className="absolute w-72 h-72 bg-orange-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

          <div className="relative z-10 text-center">

            <div className="text-7xl mb-5">

              🔮

            </div>

            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent mb-4">

              No Prediction Data

            </h2>

            <p className="text-gray-400 text-lg">

              Add transactions to generate
              smart financial predictions.

            </p>

          </div>

        </div>

      </div>

    );

  }

  return (

    <div className="space-y-10">

      {/* HEADER */}
      <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-red-500/20 rounded-[36px] p-8 shadow-[0_0_80px_rgba(255,40,0,0.25)]">

        {/* GLOWS */}
        <div className="absolute w-80 h-80 bg-red-500/20 rounded-full blur-3xl -top-20 -left-20"></div>

        <div className="absolute w-80 h-80 bg-orange-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

        <div className="relative z-10 flex items-center justify-between flex-wrap gap-6">

          <div>

            <div className="inline-block px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full text-sm font-semibold mb-5">

              Smart Finance Dashboard

            </div>

            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">

              Expense Predictions

            </h1>

            <p className="text-gray-400 mt-3 text-lg">

              Forecasting your finances for{" "}

              <span className="text-red-300 font-semibold">

                {data.month}

              </span>

            </p>

          </div>

          <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-red-500 via-orange-500 to-red-500 flex items-center justify-center shadow-[0_0_45px_rgba(255,60,20,0.55)]">

            <Sparkles
              size={38}
              className="text-white"
            />

          </div>

        </div>

      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* AVG */}
        <div className="relative overflow-hidden bg-black/50 border border-red-500/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(255,50,50,0.12)]">

          <div className="absolute w-40 h-40 bg-red-500/10 rounded-full blur-3xl -top-16 -right-10"></div>

          <div className="relative z-10 flex justify-between items-start">

            <div>

              <p className="text-gray-400 text-sm">

                Average Expense

              </p>

              <h2 className="text-4xl font-extrabold text-white mt-4">

                ₹{
                  Number(
                    data.averageExpense
                  ).toFixed(0)
                }

              </h2>

              <p className="text-gray-500 mt-4 text-sm">

                Based on {
                  data.totalMonths
                } month
                {data.totalMonths > 1
                  ? "s"
                  : ""}

              </p>

            </div>

            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">

              <Wallet
                className="text-red-400"
                size={30}
              />

            </div>

          </div>

        </div>

        {/* PREDICTED */}
        <div className="relative overflow-hidden bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-3xl p-6 shadow-[0_0_50px_rgba(255,60,20,0.35)]">

          <div className="flex justify-between items-start">

            <div>

              <p className="text-white/80 text-sm">

                Predicted Expense

              </p>

              <h2 className="text-4xl font-extrabold text-white mt-4">

                ₹{
                  Number(
                    data.predictedNextMonth
                  ).toFixed(0)
                }

              </h2>

              <p className="text-white/70 mt-4 text-sm">

                Estimated next month

              </p>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <TrendingUp
                size={30}
                className="text-white"
              />

            </div>

          </div>

        </div>

        {/* SAVINGS */}
        <div className="relative overflow-hidden bg-black/50 border border-red-500/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(255,50,50,0.12)]">

          <div className="absolute w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -top-16 -right-10"></div>

          <div className="relative z-10 flex justify-between items-start">

            <div>

              <p className="text-gray-400 text-sm">

                Expected Savings

              </p>

              <h2
                className={`text-4xl font-extrabold mt-4 ${
                  data.expectedSavings >= 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >

                ₹{
                  Number(
                    data.expectedSavings
                  ).toFixed(0)
                }

              </h2>

              <p className="text-gray-500 mt-4 text-sm">

                Estimated savings

              </p>

            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl">

              <PiggyBank
                className="text-emerald-400"
                size={30}
              />

            </div>

          </div>

        </div>

        {/* TOP CATEGORY */}
        <div className="relative overflow-hidden bg-black/50 border border-red-500/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(255,50,50,0.12)]">

          <div className="absolute w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl -top-16 -right-10"></div>

          <div className="relative z-10 flex justify-between items-start">

            <div>

              <p className="text-gray-400 text-sm">

                Top Category

              </p>

              <h2 className="text-3xl font-extrabold text-orange-400 mt-4 capitalize">

                {data.topCategory}

              </h2>

              <p className="text-white font-semibold mt-4 text-lg">

                ₹{
                  Number(
                    data.topCategoryAmount
                  ).toFixed(0)
                }

              </p>

            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-2xl">

              <Tag
                size={30}
                className="text-orange-400"
              />

            </div>

          </div>

        </div>

      </div>

      {/* WARNING */}
      {data.expectedSavings < 0 && (

        <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-red-500/20 rounded-[36px] p-8 shadow-[0_0_60px_rgba(255,40,0,0.15)]">

          <div className="absolute w-72 h-72 bg-red-500/10 rounded-full blur-3xl -top-20 -right-10"></div>

          <div className="relative z-10 flex items-start gap-5">

            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">

              <AlertTriangle
                className="text-red-400"
                size={32}
              />

            </div>

            <div>

              <h3 className="text-3xl font-extrabold text-red-400 mb-3">

                Spending Warning

              </h3>

              <p className="text-gray-300 text-lg leading-relaxed">

                Your predicted expenses may exceed your income next month.
                Consider reducing unnecessary spending.

              </p>

            </div>

          </div>

        </div>

      )}

      {/* CATEGORY REPORT */}
      <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-red-500/20 rounded-[36px] p-8 shadow-[0_0_80px_rgba(255,40,0,0.18)]">

        <div className="absolute w-80 h-80 bg-orange-500/10 rounded-full blur-3xl -bottom-24 -right-20"></div>

        <div className="relative z-10">

          <div className="mb-8">

            <div className="inline-block px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full text-sm font-semibold mb-5">

              Smart Category Analysis

            </div>

            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">

              Category Reports

            </h2>

            <p className="text-gray-400 mt-3 text-lg">

              Expense trends categorized intelligently

            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {Object.entries(
              data.categories
            ).map(([cat, amt]) => (

              <div
                key={cat}

                className="bg-black/40 border border-white/5 hover:border-red-500/20 rounded-3xl p-6 transition-all duration-300 hover:translate-y-[-2px]"
              >

                <div className="flex items-center justify-between mb-5">

                  <h3 className="text-2xl font-bold capitalize text-white">

                    {cat}

                  </h3>

                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-2xl">

                    <Tag
                      size={24}
                      className="text-red-400"
                    />

                  </div>

                </div>

                <p className="text-5xl font-extrabold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">

                  ₹{
                    Number(amt)
                    .toFixed(0)
                  }

                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}

export default Predictions;