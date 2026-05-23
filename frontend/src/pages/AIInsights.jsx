import { useEffect, useState } from "react";
import axios from "axios";

function AIInsights() {
  const [insights, setInsights] =
    useState({
      totalIncome: 0,
      totalExpense: 0,
      savings: 0,
      alert: "",
      totalTransactions: 0,
      reports: {},
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    getInsights();
  }, []);

  const getInsights = async () => {
    try {
      const response =
        await axios.get(
          "http://localhost:1971/ai/ai-insights",
          {
            withCredentials: true,
          }
        );

      setInsights(
        response.data
      );
    }

    catch (err) {
      console.log(
        "AI Insights Error:",
        err
      );
    }

    finally {
      setLoading(false);
    }
  };

  const savingsRatio =
    insights.totalIncome > 0
      ? (
          (
            insights.savings /
            insights.totalIncome
          ) * 100
        ).toFixed(1)
      : 0;

  const expenseRatio =
    insights.totalIncome > 0
      ? (
          (
            insights.totalExpense /
            insights.totalIncome
          ) * 100
        ).toFixed(1)
      : 0;

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">

          <div className="w-20 h-20 border-4 border-red-500/20 border-t-red-400 rounded-full animate-spin mx-auto mb-6"></div>

          <h2 className="text-4xl font-bold text-white">
            AI analyzing finances...
          </h2>

          <p className="text-gray-400 mt-3 text-lg">
            Generating smart financial intelligence
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-red-500/20 rounded-[36px] p-8 shadow-[0_0_80px_rgba(255,40,0,0.25)]">

        {/* GLOW */}
        <div className="absolute w-80 h-80 bg-red-500/20 rounded-full blur-3xl -top-20 -left-20"></div>

        <div className="absolute w-80 h-80 bg-orange-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

        <div className="relative z-10">

          <div className="inline-block px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full text-sm font-semibold mb-5">

            Smart Finance Dashboard

          </div>

          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">

            AI Financial Insights

          </h1>

          <p className="text-gray-400 mt-3 text-lg">

            AI-powered analytics, reports & intelligent recommendations

          </p>

        </div>

      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* INCOME */}
        <div className="bg-black/50 border border-emerald-500/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(0,255,150,0.12)]">

          <div className="flex items-center justify-between mb-5">

            <div>

              <p className="text-gray-400 mb-2">
                Total Income
              </p>

              <h2 className="text-4xl font-extrabold text-emerald-400">

                ₹{
                  Number(
                    insights.totalIncome
                  ).toFixed(0)
                }

              </h2>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-3xl">

              💰

            </div>

          </div>

        </div>

        {/* EXPENSE */}
        <div className="bg-black/50 border border-red-500/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(255,50,50,0.12)]">

          <div className="flex items-center justify-between mb-5">

            <div>

              <p className="text-gray-400 mb-2">
                Total Expenses
              </p>

              <h2 className="text-4xl font-extrabold text-red-400">

                ₹{
                  Number(
                    insights.totalExpense
                  ).toFixed(0)
                }

              </h2>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-3xl">

              💸

            </div>

          </div>

        </div>

        {/* SAVINGS */}
        <div className="bg-black/50 border border-cyan-500/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(0,220,255,0.12)]">

          <div className="flex items-center justify-between mb-5">

            <div>

              <p className="text-gray-400 mb-2">
                Net Savings
              </p>

              <h2
                className={`text-4xl font-extrabold ${
                  insights.savings >= 0
                    ? "text-cyan-400"
                    : "text-red-400"
                }`}
              >

                ₹{
                  Number(
                    insights.savings
                  ).toFixed(0)
                }

              </h2>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-3xl">

              📈

            </div>

          </div>

        </div>

        {/* TRANSACTIONS */}
        <div className="bg-black/50 border border-purple-500/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.12)]">

          <div className="flex items-center justify-between mb-5">

            <div>

              <p className="text-gray-400 mb-2">
                Transactions
              </p>

              <h2 className="text-4xl font-extrabold text-purple-400">

                {
                  insights.totalTransactions
                }

              </h2>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl">

              📊

            </div>

          </div>

        </div>

      </div>

      {/* ALERT */}
      <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-yellow-500/20 rounded-[36px] p-8 shadow-[0_0_80px_rgba(255,180,0,0.15)]">

        <div className="absolute w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl -top-20 right-0"></div>

        <div className="relative z-10 flex items-start gap-5">

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(255,180,0,0.25)]">

            ⚠️

          </div>

          <div>

            <p className="text-yellow-300 uppercase tracking-widest text-sm font-semibold mb-2">

              Smart Alert

            </p>

            <h2 className="text-3xl font-bold text-white leading-relaxed">

              {
                insights.alert ||
                "No alerts generated yet."
              }

            </h2>

          </div>

        </div>

      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* FINANCIAL HEALTH */}
        <div className="bg-black/50 border border-cyan-500/20 rounded-[36px] p-8 shadow-[0_0_40px_rgba(0,220,255,0.12)]">

          <div className="flex items-center gap-4 mb-8">

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-3xl">

              🧠

            </div>

            <div>

              <p className="text-cyan-300 uppercase tracking-widest text-xs">

                AI Analysis

              </p>

              <h3 className="text-3xl font-bold text-white">

                Financial Health

              </h3>

            </div>

          </div>

          <div className="space-y-6">

            {/* SAVINGS */}
            <div className="bg-black/40 border border-cyan-500/10 rounded-3xl p-6">

              <div className="flex justify-between items-center mb-4">

                <div>

                  <p className="text-gray-400 mb-2">
                    Savings Ratio
                  </p>

                  <h2 className="text-4xl font-extrabold text-cyan-400">

                    {savingsRatio}%

                  </h2>

                </div>

              </div>

              <div className="w-full h-4 bg-black/60 rounded-full overflow-hidden border border-white/5">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                  style={{
                    width:
                      `${Math.min(
                        Number(
                          savingsRatio
                        ),
                        100
                      )}%`,
                  }}
                />

              </div>

            </div>

            {/* EXPENSE */}
            <div className="bg-black/40 border border-red-500/10 rounded-3xl p-6">

              <div className="flex justify-between items-center mb-4">

                <div>

                  <p className="text-gray-400 mb-2">
                    Expense Ratio
                  </p>

                  <h2 className="text-4xl font-extrabold text-red-400">

                    {expenseRatio}%

                  </h2>

                </div>

              </div>

              <div className="w-full h-4 bg-black/60 rounded-full overflow-hidden border border-white/5">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-400 transition-all duration-500"
                  style={{
                    width:
                      `${Math.min(
                        Number(
                          expenseRatio
                        ),
                        100
                      )}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>

        {/* RECOMMENDATIONS */}
        <div className="bg-black/50 border border-purple-500/20 rounded-[36px] p-8 shadow-[0_0_40px_rgba(168,85,247,0.12)]">

          <div className="flex items-center gap-4 mb-8">

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl">

              🚀

            </div>

            <div>

              <p className="text-pink-300 uppercase tracking-widest text-xs">

                Recommendations

              </p>

              <h3 className="text-3xl font-bold text-white">

                Smart Suggestions

              </h3>

            </div>

          </div>

          <div className="space-y-5">

            <div className="bg-black/40 border border-cyan-500/20 rounded-3xl p-6 hover:translate-y-[-2px] transition-all duration-300">

              <p className="text-cyan-300 font-semibold text-lg">

                💡 Track recurring subscriptions monthly

              </p>

            </div>

            <div className="bg-black/40 border border-purple-500/20 rounded-3xl p-6 hover:translate-y-[-2px] transition-all duration-300">

              <p className="text-purple-300 font-semibold text-lg">

                📈 Reduce impulse spending to improve savings

              </p>

            </div>

            <div className="bg-black/40 border border-emerald-500/20 rounded-3xl p-6 hover:translate-y-[-2px] transition-all duration-300">

              <p className="text-emerald-300 font-semibold text-lg">

                🎯 Create monthly category-wise budget goals

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIInsights;