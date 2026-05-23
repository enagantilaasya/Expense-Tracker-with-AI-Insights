import { useState } from "react";
import { fetchTransactions } from "../stores/transactionStore";

function ReportExport() {

  const [loading, setLoading] =
    useState(false);

  const [exported, setExported] =
    useState("");

  // BUILD ROWS
  const buildRows = (
    transactions
  ) => {

    const rows = [];

    transactions.forEach((t) => {

      // NEW SCHEMA
      t.transactions?.forEach((item) => {

        rows.push({

          type:
            item.type === "income"
              ? "Income"
              : "Expense",

          category:
            item.category || "Other",

          amount:
            item.amount || 0,

          paymentMethod:
            t.paymentMethod || "N/A",

          description:
            t.description || "",

          date:
            t.date
              ? new Date(t.date)
                  .toLocaleDateString("en-IN")
              : "",

        });

      });

    });

    return rows;

  };

  // EXPORT CSV
  const exportCSV = async () => {

    setLoading(true);

    try {

      const transactions =
        await fetchTransactions();

      const rows =
        buildRows(transactions);

      if (rows.length === 0) {

        setExported(
          "No transactions to export."
        );

        return;

      }

      const headers = [

        "Type",
        "Category",
        "Amount (₹)",
        "Payment Method",
        "Description",
        "Date",

      ];

      const csvRows = [

        headers.join(","),

        ...rows.map((r) =>

          [

            r.type,

            r.category,

            r.amount,

            r.paymentMethod,

            `"${r.description}"`,

            r.date,

          ].join(",")

        ),

      ];

      const blob = new Blob(

        [csvRows.join("\n")],

        {
          type: "text/csv",
        }

      );

      const url =
        URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = url;

      a.download =

        `smartspend-report-${
          new Date()
            .toISOString()
            .split("T")[0]
        }.csv`;

      a.click();

      URL.revokeObjectURL(url);

      setExported("csv");

    }

    catch (err) {

      console.log(
        "CSV Export Error:",
        err
      );

    }

    finally {

      setLoading(false);

    }

  };

  // EXPORT JSON
  const exportJSON = async () => {

    setLoading(true);

    try {

      const transactions =
        await fetchTransactions();

      const rows =
        buildRows(transactions);

      if (rows.length === 0) {

        setExported(
          "No transactions to export."
        );

        return;

      }

      const blob = new Blob(

        [

          JSON.stringify(
            rows,
            null,
            2
          ),

        ],

        {
          type:
            "application/json",
        }

      );

      const url =
        URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = url;

      a.download =

        `smartspend-report-${
          new Date()
            .toISOString()
            .split("T")[0]
        }.json`;

      a.click();

      URL.revokeObjectURL(url);

      setExported("json");

    }

    catch (err) {

      console.log(
        "JSON Export Error:",
        err
      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-cyan-500/20 rounded-[36px] shadow-[0_0_80px_rgba(0,220,255,0.18)]">

      {/* GLOW */}
      <div className="absolute w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl -top-20 -left-20"></div>

      <div className="absolute w-80 h-80 bg-purple-500/10 rounded-full blur-3xl bottom-0 right-0"></div>

      <div className="relative z-10 p-8">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">

          <div>

            <div className="inline-block px-5 py-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 rounded-full text-sm font-semibold mb-4">

              Smart Reports

            </div>

            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">

              Export Reports

            </h2>

            <p className="text-gray-400 mt-3 text-sm">

              Download your financial data in multiple formats

            </p>

          </div>

          <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(0,220,255,0.35)]">

            📥

          </div>

        </div>

        {/* EXPORT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CSV */}
          <div className="bg-black/40 border border-cyan-500/10 rounded-[28px] p-7 hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(0,220,255,0.15)] transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-2xl mb-5">

              📊

            </div>

            <h3 className="text-2xl font-bold text-white mb-2">

              CSV Export

            </h3>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">

              Perfect for Excel, Google Sheets,
              analytics dashboards,
              and spreadsheet editing.

            </p>

            <button
              onClick={exportCSV}
              disabled={loading}

              className="w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 hover:scale-[1.02] text-white font-bold py-4 rounded-2xl shadow-[0_0_30px_rgba(0,255,180,0.25)] transition-all duration-300 disabled:opacity-50"
            >

              {
                loading
                  ? "Exporting..."
                  : "Download CSV"
              }

            </button>

          </div>

          {/* JSON */}
          <div className="bg-black/40 border border-purple-500/10 rounded-[28px] p-7 hover:border-purple-400/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.18)] transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl mb-5">

              📋

            </div>

            <h3 className="text-2xl font-bold text-white mb-2">

              JSON Export

            </h3>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">

              Ideal for developers,
              APIs,
              backups,
              and importing into apps.

            </p>

            <button
              onClick={exportJSON}
              disabled={loading}

              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:scale-[1.02] text-white font-bold py-4 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300 disabled:opacity-50"
            >

              {
                loading
                  ? "Exporting..."
                  : "Download JSON"
              }

            </button>

          </div>

        </div>

        {/* SUCCESS / ERROR */}
        {exported &&
          typeof exported === "string" &&
          exported !== "csv" &&
          exported !== "json" && (

          <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5 text-yellow-300 text-center font-medium">

            ⚠️ {exported}

          </div>

        )}

        {(exported === "csv" ||
          exported === "json") && (

          <div className="mt-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 text-emerald-400 text-center font-bold shadow-[0_0_30px_rgba(16,185,129,0.15)]">

            ✅ {exported.toUpperCase()} report downloaded successfully!

          </div>

        )}

      </div>

    </div>

  );

}

export default ReportExport;