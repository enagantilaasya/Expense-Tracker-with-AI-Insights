import { useEffect, useState }
from "react";

import {
  fetchTransactions,
  deleteTransaction,
} from "../stores/transactionStore";

export default function TransactionTable() {

  const [data, setData] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  useEffect(() => {

    getData();

  }, []);

  const getData = async () => {

    try {

      setLoading(true);

      const transactions =
        await fetchTransactions();

      let all = [];

      transactions.forEach((t) => {

        t.transactions?.forEach((item) => {

          all.push({

            id: t._id,

            category:
              item.category,

            amount:
              item.amount,

            type:
              item.type === "income"
                ? "Income"
                : "Expense",

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

      setData(
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

  // DELETE
  const handleDelete =
    async (id) => {

      await deleteTransaction(id);

      getData();

    };

  // FILTER
  const filtered =
    data.filter((t) => {

      const type =

        filter === "all" ||

        t.type.toLowerCase()
        === filter;

      const text =

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
        type &&
        text
      );

    });

  return (

    <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-red-500/20 rounded-[36px] shadow-[0_0_80px_rgba(255,40,0,0.25)]">

      {/* GLOW EFFECTS */}
      <div className="absolute w-96 h-96 bg-red-500/20 rounded-full blur-3xl -top-32 -left-20"></div>

      <div className="absolute w-80 h-80 bg-orange-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

      <div className="relative z-10">

        {/* HEADER */}
        <div className="p-8 border-b border-red-500/10">

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">

            <div>

              <div className="inline-block px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full text-sm font-semibold mb-4">

                Finance History

              </div>

              <h1 className="text-5xl font-extrabold leading-tight">

                <span className="bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">

                  Transactions

                </span>

              </h1>

              <p className="text-gray-400 mt-3 text-sm">

                Monitor your income and expenses intelligently

              </p>

            </div>

            {/* REFRESH */}
            <button
              onClick={getData}
              disabled={loading}
              className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,80,40,0.6)] text-white px-7 py-3 rounded-2xl font-bold shadow-[0_0_30px_rgba(255,80,40,0.45)] transition-all duration-300"
            >

              {
                loading
                ? "Loading..."
                : "Refresh"
              }

            </button>

          </div>

          {/* SEARCH + FILTER */}
          <div className="flex flex-col xl:flex-row gap-4 mt-8">

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

              className="flex-1 bg-black/70 border border-red-500/20 text-white placeholder:text-gray-500 rounded-2xl px-5 py-4 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/20 transition-all"
            />

            {/* FILTER */}
            <div className="flex bg-black/60 border border-red-500/20 rounded-2xl p-1.5">

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

                  className={`px-5 py-2 rounded-xl text-sm font-bold capitalize transition-all duration-300 ${
                    filter === f

                      ?

                      "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg"

                      :

                      "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >

                  {f}

                </button>

              ))}

            </div>

          </div>

        </div>

        {/* TABLE CONTENT */}
        {loading ? (

          <div className="text-center py-16 text-gray-400 text-lg">

            Loading Transactions...

          </div>

        ) : filtered.length === 0 ? (

          <div className="text-center py-16 text-gray-400 text-lg">

            No Transactions Found

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              {/* TABLE HEAD */}
              <thead>

                <tr className="border-b border-red-500/10 text-red-200 text-left">

                  <th className="p-6">
                    Category
                  </th>

                  <th className="p-6">
                    Type
                  </th>

                  <th className="p-6">
                    Amount
                  </th>

                  <th className="p-6">
                    Payment
                  </th>

                  <th className="p-6">
                    Description
                  </th>

                  <th className="p-6">
                    Date
                  </th>

                  <th className="p-6">
                    Action
                  </th>

                </tr>

              </thead>

              {/* BODY */}
              <tbody className="divide-y divide-white/5">

                {filtered.map((t, i) => (

                  <tr
                    key={i}

                    className="hover:bg-gradient-to-r hover:from-red-500/5 hover:to-orange-500/5 transition-all duration-300"
                  >

                    {/* CATEGORY */}
                    <td className="p-6 text-white font-medium capitalize">

                      {t.category}

                    </td>

                    {/* TYPE */}
                    <td className="p-6">

                      <span
                        className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                          t.type === "Income"

                            ?

                            "bg-green-500/20 text-green-400 border-green-500/20"

                            :

                            "bg-red-500/20 text-red-400 border-red-500/20"
                        }`}
                      >

                        {t.type}

                      </span>

                    </td>

                    {/* AMOUNT */}
                    <td
                      className={`p-6 font-extrabold text-lg ${
                        t.type === "Income"

                          ?

                          "text-green-400"

                          :

                          "text-red-400"
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
                    <td className="p-6 text-gray-300 capitalize">

                      {t.payment}

                    </td>

                    {/* DESCRIPTION */}
                    <td className="p-6 text-gray-400 max-w-[220px] truncate">

                      {t.description}

                    </td>

                    {/* DATE */}
                    <td className="p-6 text-gray-400">

                      {
                        new Date(t.date)

                        .toLocaleDateString(
                          "en-IN"
                        )
                      }

                    </td>

                    {/* DELETE */}
                    <td className="p-6">

                      <button
                        onClick={() =>
                          handleDelete(
                            t.id
                          )
                        }

                        className="bg-gradient-to-r from-red-500 to-orange-500 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,80,20,0.55)] text-white px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300"
                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );

}