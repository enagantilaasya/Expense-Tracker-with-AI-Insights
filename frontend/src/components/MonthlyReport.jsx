import { useEffect, useState }
from "react";

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

function MonthlyReport() {

  const [report, setReport] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedYear, setSelectedYear] =
    useState(
      new Date()
      .getFullYear()
    );

  const [years, setYears] =
    useState([]);

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      setLoading(true);

      const transactions =
        await fetchTransactions();

      let monthMap = {};
      let yearSet = new Set();

      transactions.forEach((t) => {

        const date = new Date(
          t.date ||
          t.createdAt
        );

        const year =
          date.getFullYear();

        const month =
          date.getMonth();

        const key =
          `${year}-${month}`;

        yearSet.add(year);

        if (!monthMap[key]) {

          monthMap[key] = {

            year,
            month,

            income: 0,

            expenses: 0,

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

        .sort((a, b) =>

          a.year !== b.year

            ?

            b.year - a.year

            :

            b.month - a.month

        );

      setReport(sorted);

      const allYears =

        [...yearSet]

        .sort(
          (a, b) => b - a
        );

      setYears(allYears);

      if (allYears.length > 0) {

        setSelectedYear(
          allYears[0]
        );

      }

    }

    catch (err) {

      console.log(
        "MonthlyReport error:",
        err
      );

    }

    finally {

      setLoading(false);

    }

  };

  const filtered =

    report.filter(
      (r) =>
        r.year ===
        selectedYear
    );

  const totalIncome =

    filtered.reduce(
      (s, r) =>
        s + r.income,
      0
    );

  const totalExpenses =

    filtered.reduce(
      (s, r) =>
        s + r.expenses,
      0
    );

  const totalSavings =

    totalIncome -
    totalExpenses;

  return (

    <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-red-500/20 rounded-[36px] shadow-[0_0_80px_rgba(255,40,0,0.25)] mt-10">

      {/* GLOW EFFECTS */}
      <div className="absolute w-80 h-80 bg-red-500/20 rounded-full blur-3xl -top-20 -left-20"></div>

      <div className="absolute w-80 h-80 bg-orange-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

      <div className="relative z-10 p-8">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">

          <div>

            <div className="inline-block px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full text-sm font-semibold mb-4">

              Financial Summary

            </div>

            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">

              Monthly Report

            </h2>

            <p className="text-gray-400 mt-3">

              Detailed yearly income & expense analysis

            </p>

          </div>

          {years.length > 0 && (

            <select
              value={selectedYear}

              onChange={(e) =>

                setSelectedYear(
                  Number(
                    e.target.value
                  )
                )

              }

              className="bg-black/70 border border-red-500/20 text-white rounded-2xl px-5 py-3 outline-none focus:border-red-400"
            >

              {years.map((y) => (

                <option
                  key={y}
                  value={y}
                >

                  {y}

                </option>

              ))}

            </select>

          )}

        </div>

        {/* TOTALS */}
        {!loading &&
          filtered.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

            {/* INCOME */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

              <p className="text-gray-400 text-sm mb-2">

                Total Income

              </p>

              <h3 className="text-3xl font-bold text-green-400">

                ₹{
                  totalIncome
                  .toFixed(2)
                }

              </h3>

            </div>

            {/* EXPENSE */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

              <p className="text-gray-400 text-sm mb-2">

                Total Expenses

              </p>

              <h3 className="text-3xl font-bold text-red-400">

                ₹{
                  totalExpenses
                  .toFixed(2)
                }

              </h3>

            </div>

            {/* SAVINGS */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

              <p className="text-gray-400 text-sm mb-2">

                Net Savings

              </p>

              <h3
                className={`text-3xl font-bold ${
                  totalSavings >= 0

                    ?

                    "text-orange-300"

                    :

                    "text-red-400"
                }`}
              >

                ₹{
                  totalSavings
                  .toFixed(2)
                }

              </h3>

            </div>

          </div>

        )}

        {/* TABLE */}
        {loading ? (

          <div className="text-center text-gray-400 py-16 text-lg">

            Loading...

          </div>

        ) : filtered.length === 0 ? (

          <div className="text-center text-gray-400 py-16 text-lg">

            No data for {
              selectedYear
            }

          </div>

        ) : (

          <div className="overflow-x-auto rounded-[28px] border border-red-500/10 bg-black/40">

            <table className="w-full text-sm">

              <thead>

                <tr className="border-b border-red-500/10 text-red-200">

                  <th className="text-left py-5 px-6">

                    Month

                  </th>

                  <th className="text-right py-5 px-6">

                    Income

                  </th>

                  <th className="text-right py-5 px-6">

                    Expenses

                  </th>

                  <th className="text-right py-5 px-6">

                    Savings

                  </th>

                  <th className="text-right py-5 px-6">

                    Rate

                  </th>

                </tr>

              </thead>

              <tbody>

                {filtered.map((row) => {

                  const savings =

                    row.income -
                    row.expenses;

                  const rate =

                    row.income > 0

                      ?

                      (
                        (savings /
                          row.income)

                        * 100
                      ).toFixed(1)

                      :

                      0;

                  return (

                    <tr
                      key={
                        `${row.year}-${row.month}`
                      }

                      className="border-b border-white/5 hover:bg-red-500/5 transition-all duration-300"
                    >

                      {/* MONTH */}
                      <td className="py-5 px-6 text-white font-semibold">

                        {
                          MONTHS[
                            row.month
                          ]
                        }

                      </td>

                      {/* INCOME */}
                      <td className="py-5 px-6 text-right text-green-400 font-bold">

                        ₹{
                          row.income
                          .toFixed(2)
                        }

                      </td>

                      {/* EXPENSE */}
                      <td className="py-5 px-6 text-right text-red-400 font-bold">

                        ₹{
                          row.expenses
                          .toFixed(2)
                        }

                      </td>

                      {/* SAVINGS */}
                      <td
                        className={`py-5 px-6 text-right font-extrabold ${
                          savings >= 0

                            ?

                            "text-orange-300"

                            :

                            "text-red-500"
                        }`}
                      >

                        {savings >= 0
                          ? "+"
                          : ""}

                        ₹{
                          savings
                          .toFixed(2)
                        }

                      </td>

                      {/* RATE */}
                      <td className="py-5 px-6 text-right">

                        <span
                          className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                            Number(rate) >= 20

                              ?

                              "bg-green-500/20 text-green-400 border border-green-500/20"

                              :

                              Number(rate) >= 0

                              ?

                              "bg-yellow-500/20 text-yellow-300 border border-yellow-500/20"

                              :

                              "bg-red-500/20 text-red-400 border border-red-500/20"
                          }`}
                        >

                          {rate}%

                        </span>

                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );

}

export default MonthlyReport;