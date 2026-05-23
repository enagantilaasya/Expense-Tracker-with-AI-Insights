import { Outlet } from "react-router";

import Sidebar from "./Sidebar";

function DashboardLayout() {

  return (

    <div className="relative min-h-screen bg-black overflow-hidden flex text-white">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl -top-40 -left-40"></div>

      <div className="absolute w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl bottom-0 right-0"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_40%)]"></div>

      {/* SIDEBAR */}
      <div className="relative z-10">

        <Sidebar />

      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex-1 overflow-y-auto">

        <div className="p-6 lg:p-10">

          {/* GLASS WRAPPER */}
          <div className="min-h-[calc(100vh-80px)] bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[36px] shadow-[0_0_60px_rgba(0,0,0,0.35)] p-6 lg:p-8">

            <Outlet />

          </div>

        </div>

      </div>

    </div>

  );

}

export default DashboardLayout;