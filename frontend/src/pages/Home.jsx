import { NavLink } from "react-router";

function Home() {

  return (

    <main className="bg-gradient-to-br from-black via-zinc-950 to-red-950 px-8 pt-20 pb-20 overflow-hidden">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

        {/* LEFT SECTION */}
        <div>

          {/* BADGE */}
          <div className="inline-block px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full text-sm font-semibold mb-7 backdrop-blur-md shadow-lg">
            AI Powered Finance Tracking
          </div>

          {/* HEADING */}
          <h1 className="text-6xl lg:text-7xl font-extrabold leading-tight text-white">

            Take Control of

            <span className="bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">
              {" "}Your Money
            </span>

          </h1>

          {/* DESCRIPTION */}
          <p className="text-xl text-gray-400 mt-8 leading-relaxed max-w-2xl">

            Manage expenses, analyze spending patterns, track transactions,
            predict future costs using AI, and build smarter financial habits —
            all from one intelligent dashboard.

          </p>

          {/* BUTTON */}
          <div className="flex gap-5 mt-10">

            <NavLink
              to="/register"
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-9 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Get Started
            </NavLink>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-5 mt-16">

            <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-xl">

              <h2 className="text-4xl font-bold text-red-400">
                10K+
              </h2>

              <p className="text-gray-400 mt-2">
                Active Users
              </p>

            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-xl">

              <h2 className="text-4xl font-bold text-orange-300">
                ₹1M+
              </h2>

              <p className="text-gray-400 mt-2">
                Savings Tracked
              </p>

            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-xl">

              <h2 className="text-4xl font-bold text-yellow-300">
                AI
              </h2>

              <p className="text-gray-400 mt-2">
                Smart Insights
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="relative flex justify-center lg:justify-end">

          {/* GLOW EFFECTS */}
          <div className="absolute w-[400px] h-[400px] bg-red-500 rounded-full blur-3xl opacity-20"></div>

          <div className="absolute w-[250px] h-[250px] bg-orange-400 rounded-full blur-3xl opacity-20 top-20 right-10"></div>

          {/* CARD */}
          <div className="relative bg-white/5 backdrop-blur-2xl w-full max-w-lg rounded-[40px] shadow-2xl border border-white/10 p-8 mb-0">

            {/* BALANCE */}
            <div className="flex items-center justify-between mb-8">

              <div>

                <p className="text-gray-400 text-lg">
                  Total Balance
                </p>

                <h1 className="text-5xl font-bold mt-2 text-white">
                  ₹ 52,450
                </h1>

              </div>

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white text-3xl shadow-xl">
                ₹
              </div>

            </div>

            {/* INCOME */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-3xl p-6 shadow-xl mb-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-white/80 text-lg">
                    Income
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    ₹ 62,000
                  </h2>

                </div>

                <div className="text-5xl">
                  ↑
                </div>

              </div>

            </div>

            {/* EXPENSE */}
            <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-3xl p-6 shadow-xl mb-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-white/80 text-lg">
                    Expenses
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    ₹ 28,450
                  </h2>

                </div>

                <div className="text-5xl">
                  ↓
                </div>

              </div>

            </div>

            {/* AI */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-3xl p-6 shadow-xl">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-white/80 text-lg">
                    AI Prediction
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    ₹ 31,200
                  </h2>

                </div>

                <div className="text-5xl">
                  ✨
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Home;