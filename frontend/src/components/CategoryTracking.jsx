import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {fetchTransactions} from "../stores/transactionStore";
const COLORS = [
  "#ff4d4d",
  "#ff7a18",
  "#ffb347",
  "#00c6ff",
  "#7f5af0",
  "#00ffb3",
  "#ff3cac",
  "#00e0ff",
  "#84cc16",
  "#f97316",
];

// TOOLTIP
const CustomTooltip = ({
  active,
  payload,
}) => {

  if (
    active &&
    payload?.length
  ) {

    return (

      <div className="bg-black/90 backdrop-blur-xl border border-red-500/20 rounded-2xl px-4 py-3 shadow-2xl">

        <p className="text-white font-bold capitalize mb-1">

          {payload[0].name}

        </p>

        <p className="text-orange-300 text-lg font-extrabold">

          ₹{
            Number(
              payload[0].value
            ).toFixed(2)
          }

        </p>

      </div>

    );

  }

  return null;

};

function CategoryTracking() {

  const [incomeData, setIncomeData] =
    useState([]);

  const [expenseData, setExpenseData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState("expenses");

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

      transactions.forEach((t) => {

        t.transactions?.forEach((item) => {

          const category =
            item.category
            ?.toLowerCase()
            || "other";

          const amount =
            parseFloat(
              item.amount || 0
            );

          if (
            item.type ===
            "income"
          ) {

            incomeMap[category] =

              (incomeMap[category] || 0)

              +

              amount;

          }

          else {

            expenseMap[category] =

              (expenseMap[category] || 0)

              +

              amount;

          }

        });

      });

      setIncomeData(

        Object.entries(
          incomeMap
        ).map(

          ([name, value]) => ({

            name,
            value,

          })

        )

      );

      setExpenseData(

        Object.entries(
          expenseMap
        ).map(

          ([name, value]) => ({

            name,
            value,

          })

        )

      );

    }

    catch (err) {

      console.log(
        "CategoryTracking error:",
        err
      );

    }

    finally {

      setLoading(false);

    }

  };

  const data =

    activeTab === "expenses"

    ?

    expenseData

    :

    incomeData;

  const total = data.reduce(
    (s, d) => s + d.value,
    0
  );

  return (

    <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-red-500/20 rounded-[36px] shadow-[0_0_80px_rgba(255,40,0,0.25)]">

      {/* GLOW EFFECTS */}
      <div className="absolute w-96 h-96 bg-red-500/20 rounded-full blur-3xl -top-24 -left-24"></div>

      <div className="absolute w-96 h-96 bg-orange-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

      <div className="relative z-10 p-8">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

          <div>

            <div className="inline-block px-5 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-300 text-sm font-semibold mb-4">

              Category Insights

            </div>

            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">

              Category Tracking

            </h2>

            <p className="text-gray-400 mt-2">

              Visual breakdown of your financial activity

            </p>

          </div>

          {/* TABS */}
          <div className="flex bg-black/50 border border-red-500/20 rounded-2xl p-1.5">

            {["expenses", "income"]
            .map((tab) => (

              <button
                key={tab}

                onClick={() =>
                  setActiveTab(tab)
                }

                className={`px-6 py-3 rounded-xl text-sm font-bold capitalize transition-all duration-300 ${
                  activeTab === tab
                    ? tab === "expenses"
                      ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-[0_0_20px_rgba(255,90,0,0.4)]"
                      : "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(0,255,180,0.4)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >

                {tab}

              </button>

            ))}

          </div>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="flex items-center justify-center h-72 text-gray-400 text-lg">

            Loading Analytics...

          </div>

        ) : data.length === 0 ? (

          <div className="flex items-center justify-center h-72 text-gray-400 text-lg">

            No {activeTab} data found

          </div>

        ) : (

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-center">

            {/* CHART */}
            <div className="relative">

              <ResponsiveContainer
                width="100%"
                height={380}
              >

                <PieChart>

                  <Pie
                    data={data}

                    cx="50%"
                    cy="50%"

                    innerRadius={90}
                    outerRadius={140}

                    paddingAngle={4}

                    dataKey="value"
                  >

                    {data.map((_, index) => (

                      <Cell
                        key={index}

                        fill={
                          COLORS[
                            index %
                            COLORS.length
                          ]
                        }
                      />

                    ))}

                  </Pie>

                  <Tooltip
                    content={
                      <CustomTooltip />
                    }
                  />

                  <Legend
                    formatter={(value) => (

                      <span className="text-gray-300 capitalize text-sm">

                        {value}

                      </span>

                    )}
                  />

                </PieChart>

              </ResponsiveContainer>

              {/* CENTER INFO */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

                <p className="text-gray-400 text-sm uppercase tracking-widest">

                  Total

                </p>

                <h1 className="text-4xl font-extrabold text-white mt-1">

                  ₹{
                    total.toFixed(0)
                  }

                </h1>

              </div>

            </div>

            {/* CATEGORY LIST */}
            <div className="space-y-4">

              {data.map(
                (item, index) => {

                  const pct =

                    (
                      item.value
                      / total
                    ) * 100;

                  return (

                    <div
                      key={item.name}

                      className="bg-black/40 border border-red-500/10 hover:border-red-500/30 rounded-2xl p-5 transition-all duration-300 hover:translate-x-1"
                    >

                      <div className="flex items-center justify-between mb-3">

                        <div className="flex items-center gap-3">

                          <div
                            className="w-4 h-4 rounded-full shadow-lg"

                            style={{
                              background:
                                COLORS[
                                  index %
                                  COLORS.length
                                ],
                            }}
                          />

                          <span className="text-white font-semibold capitalize text-lg">

                            {item.name}

                          </span>

                        </div>

                        <span className="text-orange-300 font-bold text-lg">

                          ₹{
                            Number(
                              item.value
                            ).toFixed(2)
                          }

                        </span>

                      </div>

                      {/* PROGRESS */}
                      <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden">

                        <div
                          className="h-full rounded-full transition-all duration-500"

                          style={{
                            width: `${pct}%`,
                            background:
                              COLORS[
                                index %
                                COLORS.length
                              ],
                          }}
                        />

                      </div>

                      <div className="flex justify-between mt-2 text-sm">

                        <span className="text-gray-400">

                          Contribution

                        </span>

                        <span className="text-white font-semibold">

                          {pct.toFixed(1)}%

                        </span>

                      </div>

                    </div>

                  );

                }

              )}

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default CategoryTracking;