import { useEffect, useState } from "react";
import {fetchTransactions} from "../stores/transactionStore";
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
function BudgetProgress() {
  const [spent, setSpent] = useState({});
  const [limits, setLimits] =
    useState(() => {
      try {
        const saved =  localStorage.getItem( "budgetLimits" );
        return saved
          ? JSON.parse(saved)
          : DEFAULT_LIMITS;
      }
      catch {
        return DEFAULT_LIMITS;
      }
    });
  const [loading, setLoading] =
    useState(true);
  const [editing, setEditing] =
    useState(false);
  const [draftLimits, setDraftLimits] =
    useState(limits);
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    try {
      setLoading(true);
      const transactions =
        await fetchTransactions();
      const now =
        new Date();
      let spentMap = {};
      transactions.forEach((t) => {
        const date =
          new Date(t.date);
        if ( date.getMonth() ===now.getMonth()&&date.getFullYear() ===  now.getFullYear() )
       {
          t.transactions?.forEach((item) => {
            if ( item.type === "expense" )
           {
              const cat = item.category ?.toLowerCase() || "other";
              spentMap[cat] = (spentMap[cat] || 0) + parseFloat( item.amount || 0 );
            }
          });
        }
      });
      setSpent(spentMap);
    }
    catch (err) {
      console.log(
        "BudgetProgress error:",
        err
      );
    }
    finally {
      setLoading(false);
    }
  };
  const saveLimits = () => {
    setLimits(draftLimits);
    localStorage.setItem(
      "budgetLimits",
      JSON.stringify(
        draftLimits
      )

    );

    setEditing(false);

  };

  const allCategories = [

    ...new Set([

      ...Object.keys(limits),

      ...Object.keys(spent),

    ]),

  ];

  const overBudgetCount = allCategories.filter((cat) =>(spent[cat] || 0) >(limits[cat] || 0) ).length;
  return (

    <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-red-500/20 rounded-[36px] p-8 shadow-[0_0_80px_rgba(255,40,0,0.25)]">

      {/* GLOW EFFECTS */}
      <div className="absolute w-80 h-80 bg-red-500/20 rounded-full blur-3xl -top-20 -left-20"></div>

      <div className="absolute w-80 h-80 bg-orange-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

      <div className="relative z-10">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">

          <div>

            <div className="inline-block px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full text-sm font-semibold mb-5">

              Smart Finance Dashboard

            </div>

            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">

              Budget Progress

            </h2>

            <p className="text-gray-400 mt-3 text-lg">

              Track monthly category spending limits intelligently

            </p>

            {overBudgetCount > 0 && (

              <p className="text-red-400 text-sm mt-4 font-semibold">

                ⚠️ {overBudgetCount} categor
                {overBudgetCount > 1
                  ? "ies"
                  : "y"} over budget

              </p>

            )}

          </div>

          <button
            onClick={() => {

              setDraftLimits(
                limits
              );

              setEditing(
                !editing
              );

            }}

            className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 hover:scale-105 text-white px-6 py-4 rounded-2xl font-bold shadow-[0_0_30px_rgba(255,80,40,0.45)] transition-all duration-300"
          >

            {editing
              ? "Cancel"
              : "Set Limits"}

          </button>

        </div>

        {/* EDIT SECTION */}
        {editing && (

          <div className="bg-black/50 border border-red-500/20 rounded-3xl p-6 mb-8">

            <p className="text-white text-2xl font-bold mb-6">

              Set Monthly Budget Limits (₹)

            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {Object.keys(
                draftLimits
              ).map((cat) => (

                <div key={cat}>

                  <label className="block text-red-200 mb-2 text-sm capitalize">

                    {cat}

                  </label>

                  <input
                    type="number"

                    value={draftLimits[cat]}

                    onChange={(e) =>

                      setDraftLimits(
                        (prev) => ({

                          ...prev,

                          [cat]:
                            Number(
                              e.target.value
                            ),

                        })
                      )

                    }

                    className="w-full bg-black/70 border border-red-500/20 text-white rounded-2xl p-4 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/20 transition-all"
                  />

                </div>

              ))}

            </div>

            <button
              onClick={saveLimits}

              className="mt-6 w-full bg-gradient-to-r from-red-500 via-orange-500 to-red-500 hover:scale-[1.02] text-white font-bold text-lg py-4 rounded-2xl shadow-[0_0_45px_rgba(255,60,20,0.55)] transition-all duration-300"
            >

              Save Limits

            </button>

          </div>

        )}

        {/* PROGRESS */}
        {loading ? (

          <div className="text-center text-gray-400 py-12 text-lg">

            Loading...

          </div>

        ) : (

          <div className="space-y-6">

            {allCategories.map((cat) => {

              const spentAmt =
                spent[cat] || 0;

              const limit =
                limits[cat] || 0;

              const percentage =

                limit > 0

                ?

                Math.min(

                  (spentAmt / limit)
                  * 100,

                  100

                )

                : 0;

              const isOver =
                spentAmt > limit
                && limit > 0;

              const isWarning =

                percentage >= 80
                && !isOver;

              return (

                <div
                  key={cat}

                  className="bg-black/40 border border-white/5 hover:border-red-500/20 rounded-3xl p-6 transition-all duration-300"
                >

                  <div className="flex items-center justify-between mb-4">

                    <div className="flex items-center gap-3 flex-wrap">

                      <p className="text-white font-bold capitalize text-xl">

                        {cat}

                      </p>

                      {isOver && (

                        <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1 rounded-full font-bold">

                          Over Budget

                        </span>

                      )}

                      {isWarning && (

                        <span className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 px-3 py-1 rounded-full font-bold">

                          Near Limit

                        </span>

                      )}

                    </div>

                    <div className="text-right">

                      <p
                        className={`text-2xl font-extrabold ${
                          isOver
                            ? "text-red-400"
                            : "text-white"
                        }`}
                      >

                        ₹{
                          spentAmt
                          .toFixed(2)
                        }

                      </p>

                      {limit > 0 && (

                        <p className="text-sm text-gray-500 mt-1">

                          / ₹{
                            limit
                            .toFixed(2)
                          }

                        </p>

                      )}

                    </div>

                  </div>

                  {/* BAR */}
                  <div className="w-full h-4 bg-black/60 rounded-full overflow-hidden border border-white/5">

                    <div
                      className={`h-full rounded-full bg-gradient-to-r transition-all duration-500 ${
                        isOver
                          ? "from-red-500 to-red-400"
                          : isWarning
                          ? "from-yellow-500 to-orange-400"
                          : "from-red-500 via-orange-500 to-red-400"
                      }`}

                      style={{
                        width:
                          limit > 0
                          ? `${percentage}%`
                          : "0%",
                      }}
                    />

                  </div>

                  <div className="flex justify-between mt-3 text-sm">

                    <span className="text-gray-400">

                      {
                        percentage
                        .toFixed(0)
                      }% used

                    </span>

                    {isOver && limit > 0 && (

                      <span className="text-red-400 font-semibold">

                        ₹{
                          (
                            spentAmt - limit
                          ).toFixed(2)
                        } over budget

                      </span>

                    )}

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>

  );

}

export default BudgetProgress;