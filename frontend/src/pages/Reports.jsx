import { useEffect, useState }
from "react";

import axios from "axios";

import MonthlyReport
from "../components/MonthlyReport";

export default function Reports() {

  const [transactions, setTransactions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:1971/transaction/all-transactions",
          {
            withCredentials: true,
          }
        );

      let all = [];

      res.data.payload.forEach((t) => {

        t.transactions.forEach((item) => {

          all.push({

            type:
              item.type === "income"
                ? "Income"
                : "Expense",

            category:
              item.category,

            amount:
              item.amount,

            payment:
              t.paymentMethod,

            description:
              t.description ||
              "No description",

            date:
              t.date,

          });

        });

      });

      setTransactions(
        all.reverse()
      );

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  };

  // FILTER
  const filtered =
    transactions.filter((t) => {

      const typeMatch =
        filter === "all" ||
        t.type.toLowerCase()
        === filter;

      const searchMatch =

        t.category
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

        t.payment
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

        t.description
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

      return (
        typeMatch &&
        searchMatch
      );

    });

  // TOTALS
  const totalExpense =
    filtered

    .filter((t) =>
      t.type === "Expense"
    )

    .reduce(
      (a, b) =>
        a + Number(b.amount),
      0
    );

  const totalIncome =
    filtered

    .filter((t) =>
      t.type === "Income"
    )

    .reduce(
      (a, b) =>
        a + Number(b.amount),
      0
    );

  return (

    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-10">

      {/* MAIN CONTAINER */}
      <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-red-500/20 rounded-[36px] p-8 md:p-10 shadow-[0_0_80px_rgba(255,40,0,0.25)]">

        {/* GLOWS */}
        <div className="absolute w-80 h-80 bg-red-500/20 rounded-full blur-3xl -top-24 -left-24"></div>

        <div className="absolute w-80 h-80 bg-orange-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

        <div className="relative z-10">

          {/* HEADER */}
          <div className="mb-10">

            <div className="inline-block px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full text-sm font-semibold mb-5">

              Smart Finance Dashboard

            </div>

            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">

              Financial Reports

            </h1>

            <p className="text-gray-300 mt-3 text-lg">

              Analyze all your income and expense transactions

            </p>

          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">

            {/* EXPENSE */}
            <div className="bg-black/70 border border-red-500/20 rounded-3xl p-6">

              <p className="text-red-300 text-sm uppercase tracking-widest mb-3">

                Total Expenses

              </p>

              <h2 className="text-4xl font-bold text-red-400">

                ₹{
                  totalExpense
                  .toFixed(2)
                }

              </h2>

            </div>

            {/* INCOME */}
            <div className="bg-black/70 border border-emerald-500/20 rounded-3xl p-6">

              <p className="text-emerald-300 text-sm uppercase tracking-widest mb-3">

                Total Income

              </p>

              <h2 className="text-4xl font-bold text-emerald-400">

                ₹{
                  totalIncome
                  .toFixed(2)
                }

              </h2>

            </div>

            {/* TRANSACTIONS */}
            <div className="bg-black/70 border border-orange-500/20 rounded-3xl p-6">

              <p className="text-orange-300 text-sm uppercase tracking-widest mb-3">

                Transactions

              </p>

              <h2 className="text-4xl font-bold text-orange-400">

                {filtered.length}

              </h2>

            </div>

          </div>

          {/* SEARCH + FILTER */}
          <div className="bg-black/70 border border-red-500/20 rounded-3xl p-5 mb-8 flex flex-col lg:flex-row gap-5 justify-between">

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full lg:w-96 bg-black/60 border border-red-500/20 text-white placeholder:text-gray-500 rounded-2xl px-5 py-4 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/20 transition-all"
            />

            {/* FILTERS */}
            <div className="flex gap-3">

              {[
                "all",
                "income",
                "expense",
              ].map((f) => (

                <button
                  key={f}
                  onClick={() =>
                    setFilter(f)
                  }
                  className={`px-6 py-3 rounded-2xl capitalize font-semibold transition-all ${
                    filter === f

                      ?

                      "bg-gradient-to-r from-red-500 via-orange-500 to-red-500 text-white shadow-[0_0_25px_rgba(255,60,20,0.45)]"

                      :

                      "bg-black/60 border border-red-500/20 text-gray-300 hover:border-red-400"
                  }`}
                >

                  {f}

                </button>

              ))}

            </div>

          </div>

          {/* TABLE */}
          <div className="bg-black/70 border border-red-500/20 rounded-3xl p-6 overflow-hidden">

            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent mb-8">

              Transaction History

            </h2>

            {loading ? (

              <div className="text-center py-12 text-gray-300 text-xl">

                Loading Transactions...

              </div>

            ) : filtered.length === 0 ? (

              <div className="text-center py-12 text-gray-500 text-xl">

                No Transactions Found

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full min-w-[900px]">

                  <thead>

                    <tr className="border-b border-red-500/20 text-left">

                      <th className="pb-5 text-red-200">
                        Type
                      </th>

                      <th className="pb-5 text-red-200">
                        Category
                      </th>

                      <th className="pb-5 text-red-200">
                        Amount
                      </th>

                      <th className="pb-5 text-red-200">
                        Payment
                      </th>

                      <th className="pb-5 text-red-200">
                        Description
                      </th>

                      <th className="pb-5 text-red-200">
                        Date
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filtered.map((t, i) => (

                      <tr
                        key={i}
                        className="border-b border-red-500/10 hover:bg-red-500/5 transition-all"
                      >

                        {/* TYPE */}
                        <td className="py-5">

                          <span
                            className={`px-4 py-1 rounded-full text-sm font-semibold ${
                              t.type === "Income"

                                ?

                                "bg-emerald-500/20 text-emerald-400"

                                :

                                "bg-red-500/20 text-red-400"
                            }`}
                          >

                            {t.type}

                          </span>

                        </td>

                        {/* CATEGORY */}
                        <td className="capitalize text-gray-200">

                          {t.category}

                        </td>

                        {/* AMOUNT */}
                        <td
                          className={`font-bold text-lg ${
                            t.type === "Income"
                              ? "text-emerald-400"
                              : "text-red-400"
                          }`}
                        >

                          ₹{
                            Number(
                              t.amount
                            )
                            .toFixed(2)
                          }

                        </td>

                        {/* PAYMENT */}
                        <td className="capitalize text-gray-300">

                          {t.payment}

                        </td>

                        {/* DESCRIPTION */}
                        <td className="text-gray-400">

                          {t.description}

                        </td>

                        {/* DATE */}
                        <td className="text-gray-400">

                          {
                            new Date(t.date)

                            .toLocaleDateString(
                              "en-IN"
                            )
                          }

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </div>

      {/* MONTHLY REPORT */}
      <div className="mt-10">

        <MonthlyReport />

      </div>

    </div>

  );

}