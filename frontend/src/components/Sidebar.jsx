import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../stores/authStore";

function Sidebar() {

  const logout = useAuth((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = async () => {

    await logout();

    navigate("/");

  };

  const links = [

    { name: "Dashboard", path: "/dashboard" },

    { name: "Transactions", path: "/dashboard/transactions" },

    { name: "Analytics", path: "/dashboard/analytics" },

    { name: "Budget Alerts", path: "/dashboard/budget-alerts" },

    { name: "AI Insights", path: "/dashboard/ai-insights" },

    { name: "Receipt Scanner", path: "/dashboard/receipt-scanner" },

    { name: "Predictions", path: "/dashboard/predictions" },

    { name: "Reports", path: "/dashboard/reports" },

    { name: "Profile", path: "/dashboard/profile" },

  ];

  return (

    <div className="relative w-72 min-h-screen overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-red-950 border-r border-white/10 backdrop-blur-2xl p-6 flex flex-col">

      {/* GLOW EFFECTS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-400/10 blur-3xl rounded-full"></div>

      {/* BRAND */}
      <div className="relative mb-12">

        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-red-500 via-orange-400 to-red-600 flex items-center justify-center text-white text-3xl font-black shadow-[0_0_40px_rgba(255,80,20,0.4)] mb-5">

          ₹

        </div>

        <h1 className="text-4xl font-extrabold leading-tight">

          <span className="bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">

            SmartSpend

          </span>

        </h1>

        <p className="text-gray-400 mt-2 text-sm tracking-wide">

          AI Powered Expense Tracking

        </p>

      </div>

      {/* NAV LINKS */}
      <div className="relative flex flex-col gap-4 flex-1">

        {links.map((link) => (

          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/dashboard"}

            className={({ isActive }) =>

              isActive

                ?

                "group relative overflow-hidden bg-gradient-to-r from-red-500 via-orange-500 to-red-600 text-white px-5 py-4 rounded-2xl font-semibold shadow-[0_0_30px_rgba(255,80,20,0.35)] scale-[1.02] transition-all duration-300"

                :

                "group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white px-5 py-4 rounded-2xl transition-all duration-300 backdrop-blur-xl hover:translate-x-1"

            }
          >

            {/* HOVER GLOW */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-red-500/10 to-orange-500/10 transition duration-300"></div>

            <span className="relative z-10">
              {link.name}
            </span>

          </NavLink>

        ))}

      </div>

      {/* USER CARD */}
      <div className="relative mt-8 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-5 shadow-xl">

        <div className="flex items-center gap-4">

         

        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}

          className="w-full mt-5 bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500 hover:to-orange-500 border border-red-500/20 hover:border-transparent text-red-300 hover:text-white py-3 rounded-2xl font-semibold transition-all duration-300"
        >

          Logout

        </button>

      </div>

    </div>

  );

}

export default Sidebar;