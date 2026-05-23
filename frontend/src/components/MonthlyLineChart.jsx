import { useEffect, useState }
from "react";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

import {
  fetchTransactions
}
from "../stores/transactionStore";

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

function MonthlyLineChart() {

  const [data, setData] =
    useState([]);

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

      let monthMap = {};

      transactions.forEach((t) => {

        const date = new Date(
          t.date ||
          t.createdAt
        );

        const key =

          `${date.getFullYear()}-${
            date.getMonth()
          }`;

        const label =

          `${
            MONTHS[
              date.getMonth()
            ]
          } ${
            date.getFullYear()
          }`;

        if (!monthMap[key]) {

          monthMap[key] = {

            month: label,

            income: 0,

            expenses: 0,

            sortKey:

              date.getFullYear() * 12

              +

              date.getMonth(),

          };

        }

        t.transactions?.forEach((item) => {

          const amount =
            Number(
              item.amount
            ) || 0;

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

          }

        });

      });

      const sorted =

        Object.values(monthMap)

        .sort(
          (a, b) =>

            a.sortKey -
            b.sortKey
        );

      setData(sorted);

    }

    catch (err) {

      console.log(
        "MonthlyLineChart error:",
        err
      );

    }

    finally {

      setLoading(false);

    }

  };

  const totalIncome =

    data.reduce(
      (s, d) =>
        s + d.income,
      0
    );

  const totalExpenses =

    data.reduce(
      (s, d) =>
        s + d.expenses,
      0
    );

  const avgSavings =

    data.length > 0

      ?

      (totalIncome -
        totalExpenses)

      / data.length

      :

      0;

  return (

    <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-red-500/20 rounded-[36px] shadow-[0_0_80px_rgba(255,40,0,0.25)]">

      {/* GLOW EFFECTS */}
      <div className="absolute w-80 h-80 bg-red-500/20 rounded-full blur-3xl -top-20 -left-20"></div>

      <div className="absolute w-80 h-80 bg-orange-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

      <div className="relative z-10 p-8">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">

          <div>

            <div className="inline-block px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full text-sm font-semibold mb-4">

              Financial Trends

            </div>

            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">

              Monthly Overview

            </h2>

            <p className="text-gray-400 mt-3">

              Income & expense flow across months

            </p>

          </div>

          <button
            onClick={loadData}

            className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 hover:scale-105 text-white px-6 py-3 rounded-2xl font-bold shadow-[0_0_30px_rgba(255,80,40,0.45)] transition-all duration-300"
          >

            Refresh

          </button>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          {/* INCOME */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

            <p className="text-gray-400 text-sm">

              Avg Monthly Income

            </p>

            <h3 className="text-3xl font-bold text-green-400 mt-3">

              ₹{

                data.length > 0

                  ?

                  (
                    totalIncome /
                    data.length
                  ).toFixed(2)

                  :

                  "0.00"

              }

            </h3>

          </div>

          {/* EXPENSE */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

            <p className="text-gray-400 text-sm">

              Avg Monthly Spend

            </p>

            <h3 className="text-3xl font-bold text-red-400 mt-3">

              ₹{

                data.length > 0

                  ?

                  (
                    totalExpenses /
                    data.length
                  ).toFixed(2)

                  :

                  "0.00"

              }

            </h3>

          </div>

          {/* SAVINGS */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

            <p className="text-gray-400 text-sm">

              Avg Monthly Savings

            </p>

            <h3
              className={`text-3xl font-bold mt-3 ${
                avgSavings >= 0
                  ? "text-orange-300"
                  : "text-red-400"
              }`}
            >

              ₹{
                avgSavings.toFixed(2)
              }

            </h3>

          </div>

        </div>

        {/* CHART */}
        {loading ? (

          <div className="text-center py-20 text-gray-400 text-lg">

            Loading...

          </div>

        ) : data.length === 0 ? (

          <div className="text-center py-20 text-gray-400 text-lg">

            No transaction data found

          </div>

        ) : (

          <div className="bg-black/40 border border-red-500/10 rounded-[30px] p-6">

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <AreaChart
                data={data}

                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 0,
                }}
              >

                {/* GRADIENT */}
                <defs>

                  <linearGradient
                    id="incomeGrad"

                    x1="0"
                    y1="0"

                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="5%"

                      stopColor="#22c55e"

                      stopOpacity={0.45}
                    />

                    <stop
                      offset="95%"

                      stopColor="#22c55e"

                      stopOpacity={0}
                    />

                  </linearGradient>

                  <linearGradient
                    id="expenseGrad"

                    x1="0"
                    y1="0"

                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="5%"

                      stopColor="#ef4444"

                      stopOpacity={0.45}
                    />

                    <stop
                      offset="95%"

                      stopColor="#ef4444"

                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.08)"
                />

                <XAxis
                  dataKey="month"

                  tick={{
                    fill: "#d1d5db",
                    fontSize: 12,
                  }}

                  tickLine={false}

                  axisLine={{
                    stroke:
                      "rgba(255,255,255,0.1)",
                  }}
                />

                <YAxis
                  tick={{
                    fill: "#d1d5db",
                    fontSize: 12,
                  }}

                  tickLine={false}

                  axisLine={false}

                  tickFormatter={(v) =>

                    `₹${
                      v >= 1000

                        ?

                        (v / 1000)
                        .toFixed(0) + "k"

                        :

                        v
                    }`

                  }
                />

                <Tooltip
                  contentStyle={{

                    background:
                      "#09090b",

                    border:
                      "1px solid rgba(239,68,68,0.2)",

                    borderRadius:
                      "18px",

                    color: "#fff",

                    backdropFilter:
                      "blur(20px)",

                  }}

                  formatter={(value) => [

                    `₹${Number(value)
                      .toFixed(2)}`

                  ]}
                />

                <Legend
                  formatter={(value) => (

                    <span
                      style={{

                        color: "#d1d5db",

                        fontSize: "13px",

                        textTransform:
                          "capitalize",

                      }}
                    >

                      {value}

                    </span>

                  )}
                />

                {/* INCOME */}
                <Area
                  type="monotone"

                  dataKey="income"

                  stroke="#22c55e"

                  strokeWidth={3}

                  fill="url(#incomeGrad)"

                  name="Income"

                  dot={{
                    fill: "#22c55e",
                    r: 5,
                  }}
                />

                {/* EXPENSE */}
                <Area
                  type="monotone"

                  dataKey="expenses"

                  stroke="#ef4444"

                  strokeWidth={3}

                  fill="url(#expenseGrad)"

                  name="Expenses"

                  dot={{
                    fill: "#ef4444",
                    r: 5,
                  }}
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        )}

      </div>

    </div>

  );

}

export default MonthlyLineChart;