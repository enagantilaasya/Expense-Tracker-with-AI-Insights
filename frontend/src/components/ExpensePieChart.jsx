import { useEffect, useState }
from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  fetchTransactions
}
from "../stores/transactionStore";

const COLORS = [

  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#84cc16",
  "#06b6d4",
  "#8b5cf6",
  "#ec4899",

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

      <div className="bg-black/90 border border-red-500/20 rounded-2xl px-4 py-3 shadow-xl">

        <p className="text-white font-bold capitalize mb-1">

          {payload[0].name}

        </p>

        <p className="text-red-400 text-lg font-extrabold">

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

function ExpensePieChart() {

  const [data, setData] =
    useState([]);

  const [total, setTotal] =
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

      let map = {};
      let sum = 0;

      transactions.forEach((t) => {

        t.transactions?.forEach((item) => {

          if (
            item.type ===
            "expense"
          ) {

            const category =
              item.category
              ?.toLowerCase()
              || "other";

            const amount =
              parseFloat(
                item.amount || 0
              );

            map[category] =

              (map[category] || 0)

              +

              amount;

            sum += amount;

          }

        });

      });

      setData(

        Object.entries(map).map(

          ([name, value]) => ({

            name,
            value,

          })

        )

      );

      setTotal(sum);

    }

    catch (err) {

      console.log(
        "ExpensePieChart error:",
        err
      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-red-500/20 rounded-[36px] shadow-[0_0_80px_rgba(255,40,0,0.25)]">

      {/* GLOW EFFECTS */}
      <div className="absolute w-80 h-80 bg-red-500/20 rounded-full blur-3xl -top-20 -left-20"></div>

      <div className="absolute w-80 h-80 bg-orange-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

      <div className="relative z-10 p-8">

        {/* HEADER */}
        <div className="mb-8">

          <div className="inline-block px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full text-sm font-semibold mb-4">
            Spending Analytics
          </div>

          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">

            Expense Breakdown

          </h2>

          {total > 0 && (

            <p className="text-gray-400 mt-3 text-lg">

              Total Expenses:

              <span className="text-red-400 font-extrabold text-2xl ml-2">

                ₹{
                  total.toFixed(2)
                }

              </span>

            </p>

          )}

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="flex items-center justify-center h-64 text-gray-400 text-lg">

            Loading...

          </div>

        ) : data.length === 0 ? (

          <div className="flex items-center justify-center h-64 text-gray-400 text-lg">

            No expense data found

          </div>

        ) : (

          <>

            {/* CHART */}
            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <PieChart>

                <Pie
                  data={data}

                  cx="50%"
                  cy="50%"

                  innerRadius={75}
                  outerRadius={120}

                  paddingAngle={5}

                  dataKey="value"
                >

                  {data.map((_, i) => (

                    <Cell
                      key={i}

                      fill={
                        COLORS[
                          i %
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

              </PieChart>

            </ResponsiveContainer>

            {/* CATEGORY LIST */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

              {data.map((item, i) => (

                <div
                  key={item.name}

                  className="flex items-center gap-3 bg-black/40 border border-white/5 rounded-2xl px-4 py-4 hover:bg-red-500/5 transition-all duration-300"
                >

                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0 shadow-lg"

                    style={{
                      background:
                        COLORS[
                          i %
                          COLORS.length
                        ],
                    }}
                  />

                  <div className="flex-1">

                    <p className="text-white font-semibold capitalize">

                      {item.name}

                    </p>

                    <p className="text-gray-500 text-sm">

                      Spending Category

                    </p>

                  </div>

                  <span className="text-red-400 text-lg font-extrabold">

                    ₹{
                      Number(
                        item.value
                      ).toFixed(2)
                    }

                  </span>

                </div>

              ))}

            </div>

          </>

        )}

      </div>

    </div>

  );

}

export default ExpensePieChart;