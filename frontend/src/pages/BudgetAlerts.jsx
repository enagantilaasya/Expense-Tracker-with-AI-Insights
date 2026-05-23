import { useEffect, useState }
from "react";

import {
  fetchTransactions
}
from "../stores/transactionStore";

import BudgetProgress
from "../components/BudgetProgress";

const DEFAULT_LIMITS = {

  food: 10000,
  shopping: 15000,
  rent: 20000,
  car: 5000,
  electricity: 3000,
  water: 1000,
  internet: 2000,
  other: 5000,

};

const MONTHS = [

  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",

];

function BudgetAlerts() {

  const [spent, setSpent] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [monthLabel, setMonthLabel] =
    useState("");

  const [limits] = useState(() => {

    try {

      const saved =
        localStorage.getItem(
          "budgetLimits"
        );

      return saved
        ? JSON.parse(saved)
        : DEFAULT_LIMITS;

    }

    catch {

      return DEFAULT_LIMITS;

    }

  });

  useEffect(() => {

    loadData();

    const now =
      new Date();

    setMonthLabel(

      `${MONTHS[now.getMonth()]} ${now.getFullYear()}`

    );

  }, []);

  const loadData = async () => {

    try {

      setLoading(true);

      const transactions =
        await fetchTransactions();

      const now =
        new Date();

      const spentMap = {};

      transactions.forEach((t) => {

        const date =
          new Date(
            t.date || t.createdAt
          );

        if (

          date.getMonth()
          === now.getMonth()

          &&

          date.getFullYear()
          === now.getFullYear()

        ) {

          t.transactions?.forEach((item) => {

            if (
              item.type ===
              "expense"
            ) {

              const cat =

                item.category
                ?.toLowerCase()

                ||

                "other";

              spentMap[cat] =

                (spentMap[cat] || 0)

                +

                Number(
                  item.amount || 0
                );

            }

          });

        }

      });

      setSpent(spentMap);

    }

    catch (err) {

      console.log(
        "BudgetAlerts error:",
        err
      );

    }

    finally {

      setLoading(false);

    }

  };

  const allCategories = [

    ...new Set([

      ...Object.keys(limits),

      ...Object.keys(spent),

    ]),

  ];

  const overBudget =
    allCategories.filter(

      (cat) =>

        (spent[cat] || 0)

        >

        (limits[cat] || 0)

        &&

        limits[cat] > 0

    );

  const nearBudget =
    allCategories.filter((cat) => {

      const pct =

        limits[cat] > 0

          ?

          (
            (
              spent[cat] || 0
            )

            /

            limits[cat]
          ) * 100

          : 0;

      return pct >= 80 && pct < 100;

    });

  const onTrack =
    allCategories.filter((cat) => {

      const pct =

        limits[cat] > 0

          ?

          (
            (
              spent[cat] || 0
            )

            /

            limits[cat]
          ) * 100

          : 0;

      return pct < 80;

    });

  const totalBudget =
    Object.values(limits)
    .reduce(
      (s, v) => s + v,
      0
    );

  const totalSpent =
    Object.values(spent)
    .reduce(
      (s, v) => s + v,
      0
    );

  const totalRemaining =
    totalBudget - totalSpent;

  const AlertCard = ({
    cat,
    type,
  }) => {

    const spentAmt =
      spent[cat] || 0;

    const limit =
      limits[cat] || 0;

    const pct =

      limit > 0

        ?

        (
          (
            spentAmt / limit
          ) * 100
        ).toFixed(1)

        : 0;

    const over =
      spentAmt - limit;

    const styles = {

      over: {

        border:
          "border-red-500/20",

        glow:
          "shadow-[0_0_40px_rgba(255,50,50,0.12)]",

        badge:
          "bg-red-500/20 text-red-400 border border-red-500/20",

        text:
          "text-red-400",

        gradient:
          "from-red-500 to-red-400",

        label:
          "Over Budget",

      },

      near: {

        border:
          "border-yellow-500/20",

        glow:
          "shadow-[0_0_40px_rgba(255,180,0,0.12)]",

        badge:
          "bg-yellow-500/20 text-yellow-300 border border-yellow-500/20",

        text:
          "text-yellow-300",

        gradient:
          "from-yellow-500 to-orange-400",

        label:
          "Near Limit",

      },

      ok: {

        border:
          "border-emerald-500/20",

        glow:
          "shadow-[0_0_40px_rgba(0,255,150,0.12)]",

        badge:
          "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20",

        text:
          "text-emerald-400",

        gradient:
          "from-emerald-500 to-cyan-500",

        label:
          "On Track",

      },

    };

    const s =
      styles[type];

    return (

      <div
        className={`bg-black/40 backdrop-blur-xl border ${s.border} ${s.glow} rounded-3xl p-6 hover:translate-y-[-2px] transition-all duration-300`}
      >

        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">

          <div className="flex items-center gap-3 flex-wrap">

            <h3 className="text-white text-xl font-bold capitalize">

              {cat}

            </h3>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${s.badge}`}
            >

              {s.label}

            </span>

          </div>

          <div className="text-right">

            <p
              className={`text-2xl font-extrabold ${s.text}`}
            >

              {pct}%

            </p>

            <p className="text-gray-500 text-sm">

              Budget Used

            </p>

          </div>

        </div>

        <div className="mb-4">

          <div className="w-full h-4 bg-black/60 rounded-full overflow-hidden border border-white/5">

            <div
              className={`h-full rounded-full bg-gradient-to-r ${s.gradient} transition-all duration-500`}
              style={{
                width:
                  `${Math.min(
                    Number(pct),
                    100
                  )}%`,
              }}
            />

          </div>

        </div>

        <div className="flex items-center justify-between flex-wrap gap-3">

          <div>

            <p className="text-gray-400 text-sm">

              Spent

            </p>

            <p className="text-white text-xl font-bold">

              ₹{
                spentAmt.toFixed(2)
              }

            </p>

          </div>

          <div className="text-right">

            <p className="text-gray-400 text-sm">

              Limit

            </p>

            <p className="text-white text-xl font-bold">

              ₹{
                limit.toFixed(2)
              }

            </p>

          </div>

        </div>

        {type === "over" && (

          <div className="mt-4 text-red-400 text-sm font-semibold">

            ₹{
              over.toFixed(2)
            } over budget

          </div>

        )}

        {type === "near" && (

          <div className="mt-4 text-yellow-300 text-sm font-semibold">

            ₹{
              (
                limit - spentAmt
              ).toFixed(2)
            } remaining before limit

          </div>

        )}

      </div>

    );

  };

  return (

    <div className="space-y-10">

      {/* HEADER */}
      <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-red-500/20 rounded-[36px] p-8 shadow-[0_0_80px_rgba(255,40,0,0.25)]">

        {/* GLOWS */}
        <div className="absolute w-80 h-80 bg-red-500/20 rounded-full blur-3xl -top-20 -left-20"></div>

        <div className="absolute w-80 h-80 bg-orange-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

        <div className="relative z-10">

          <div className="inline-block px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full text-sm font-semibold mb-5">

            Smart Finance Dashboard

          </div>

          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">

            Budget Alerts

          </h1>

          <p className="text-gray-400 mt-3 text-lg">

            {monthLabel} — Intelligent monthly spending analysis

          </p>

        </div>

      </div>

      {/* SUMMARY */}
      {!loading && (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-black/50 border border-red-500/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(255,50,50,0.12)]">

            <p className="text-gray-400 mb-2">

              Total Budget

            </p>

            <h2 className="text-4xl font-extrabold text-white">

              ₹{
                totalBudget.toFixed(0)
              }

            </h2>

          </div>

          <div className="bg-black/50 border border-red-500/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(255,50,50,0.12)]">

            <p className="text-gray-400 mb-2">

              Total Spent

            </p>

            <h2 className="text-4xl font-extrabold text-red-400">

              ₹{
                totalSpent.toFixed(0)
              }

            </h2>

          </div>

          <div className="bg-black/50 border border-red-500/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(255,50,50,0.12)]">

            <p className="text-gray-400 mb-2">

              Remaining

            </p>

            <h2
              className={`text-4xl font-extrabold ${
                totalRemaining >= 0
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >

              ₹{
                totalRemaining.toFixed(0)
              }

            </h2>

          </div>

          <div className="bg-black/50 border border-red-500/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(255,50,50,0.12)]">

            <p className="text-gray-400 mb-2">

              Over Budget

            </p>

            <h2 className="text-4xl font-extrabold text-red-400">

              {overBudget.length}

            </h2>

          </div>

        </div>

      )}

      {/* LOADING */}
      {loading ? (

        <div className="text-center text-gray-400 py-20 text-lg">

          Loading budget analytics...

        </div>

      ) : (

        <div className="space-y-10">

          {/* OVER */}
          {overBudget.length > 0 && (

            <div>

              <h2 className="text-3xl font-extrabold text-red-400 mb-6">

                🚨 Over Budget

              </h2>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {overBudget.map((cat) => (

                  <AlertCard
                    key={cat}
                    cat={cat}
                    type="over"
                  />

                ))}

              </div>

            </div>

          )}

          {/* NEAR */}
          {nearBudget.length > 0 && (

            <div>

              <h2 className="text-3xl font-extrabold text-yellow-300 mb-6">

                ⚠️ Near Limit

              </h2>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {nearBudget.map((cat) => (

                  <AlertCard
                    key={cat}
                    cat={cat}
                    type="near"
                  />

                ))}

              </div>

            </div>

          )}

          {/* SAFE */}
          {onTrack.length > 0 && (

            <div>

              <h2 className="text-3xl font-extrabold text-emerald-400 mb-6">

                ✅ On Track

              </h2>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {onTrack.map((cat) => (

                  <AlertCard
                    key={cat}
                    cat={cat}
                    type="ok"
                  />

                ))}

              </div>

            </div>

          )}

        </div>

      )}

      {/* PROGRESS */}
      <BudgetProgress />

    </div>

  );

}

export default BudgetAlerts;