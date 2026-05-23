import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  fetchTransactions,
} from "../stores/transactionStore";

// TOOLTIP
const CustomTooltip = ({
  active,
  payload,
  label,
}) => {

  if (
    active &&
    payload?.length
  ) {

    return (

      <div className="bg-black/80 backdrop-blur-xl border border-red-500/20 rounded-2xl px-5 py-4 shadow-[0_0_40px_rgba(255,40,0,0.18)]">

        <p className="text-white font-bold capitalize mb-3 text-lg">

          {label}

        </p>

        {payload.map((p) => (

          <p
            key={p.name}
            style={{
              color: p.fill,
            }}
            className="text-sm font-semibold mb-1"
          >

            {p.name} :

            ₹{
              Number(
                p.value
              ).toFixed(2)
            }

          </p>

        ))}

      </div>

    );

  }

  return null;

};

function GraphAnalytics() {

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

      let categoryMap = {};

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

          if (
            !categoryMap[category]
          ) {

            categoryMap[category] = {

              category,
              income: 0,
              expenses: 0,

            };

          }

          if (
            item.type ===
            "income"
          ) {

            categoryMap[
              category
            ].income += amount;

          }

          else {

            categoryMap[
              category
            ].expenses += amount;

          }

        });

      });

      setData(

        Object.values(
          categoryMap
        )

      );

    }

    catch (err) {

      console.log(
        "GraphAnalytics error:",
        err
      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-red-500/20 rounded-[36px] p-8 shadow-[0_0_80px_rgba(255,40,0,0.25)]">

      {/* GLOW EFFECTS */}
      <div className="absolute w-80 h-80 bg-red-500/20 rounded-full blur-3xl -top-20 -left-20"></div>

      <div className="absolute w-80 h-80 bg-orange-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

      <div className="relative z-10">

        {/* HEADER */}
        <div className="mb-8">

          <div className="inline-block px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full text-sm font-semibold mb-5">

            Smart Finance Dashboard

          </div>

          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">

            Income vs Expenses

          </h2>

          <p className="text-gray-400 mt-3 text-lg">

            Intelligent category-wise financial analytics

          </p>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="flex items-center justify-center h-80">

            <div className="text-center">

              <div className="w-16 h-16 border-4 border-red-500/20 border-t-red-400 rounded-full animate-spin mx-auto mb-5"></div>

              <p className="text-gray-400 text-lg">

                Loading analytics...

              </p>

            </div>

          </div>

        ) : data.length === 0 ? (

          <div className="flex items-center justify-center h-80 text-gray-400 text-lg">

            No transaction data found

          </div>

        ) : (

          <div className="bg-black/40 border border-red-500/10 rounded-[32px] p-6">

            <ResponsiveContainer
              width="100%"
              height={420}
            >

              <BarChart
                data={data}

                margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="#3f3f46"
                />

                <XAxis
                  dataKey="category"

                  tick={{
                    fill: "#d1d5db",
                    fontSize: 13,
                    fontWeight: 600,
                  }}

                  tickLine={false}

                  axisLine={{
                    stroke: "#3f3f46",
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

                        `${(v / 1000)
                          .toFixed(0)}k`

                        :

                        v
                    }`

                  }
                />

                <Tooltip
                  content={
                    <CustomTooltip />
                  }
                />

                <Legend
                  formatter={(val) => (

                    <span className="text-gray-300 text-sm font-semibold capitalize">

                      {val}

                    </span>

                  )}
                />

                <Bar
                  dataKey="income"

                  fill="#10b981"

                  radius={[12, 12, 0, 0]}

                  name="Income"
                />

                <Bar
                  dataKey="expenses"

                  fill="#ef4444"

                  radius={[12, 12, 0, 0]}

                  name="Expenses"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        )}

      </div>

    </div>

  );

}

export default GraphAnalytics;