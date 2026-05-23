import { useAuth } from "../stores/authStore";

import {
  User,
  Mail,
  Phone,
} from "lucide-react";

function Profile() {

  const user =
    useAuth(
      (state) =>
        state.currentUser
    );

  return (

    <div className="space-y-10">

      {/* HEADER */}
      <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-red-500/20 rounded-[36px] p-8 shadow-[0_0_80px_rgba(255,40,0,0.25)]">

        {/* GLOW EFFECTS */}
        <div className="absolute w-80 h-80 bg-red-500/20 rounded-full blur-3xl -top-20 -left-20"></div>

        <div className="absolute w-80 h-80 bg-orange-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

        <div className="relative z-10">

          <div className="inline-block px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full text-sm font-semibold mb-5">

            Smart Finance Dashboard

          </div>

          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">

            Profile Dashboard

          </h1>

          <p className="text-gray-400 mt-3 text-lg">

            Manage and view your SmartSpend profile information

          </p>

        </div>

      </div>

      {/* PROFILE CARD */}
      <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-red-500/20 rounded-[36px] shadow-[0_0_80px_rgba(255,40,0,0.18)]">

        {/* GLOWS */}
        <div className="absolute w-80 h-80 bg-red-500/20 rounded-full blur-3xl -top-20 -left-20"></div>

        <div className="absolute w-80 h-80 bg-orange-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

        {/* TOP PROFILE */}
        <div className="relative z-10 flex flex-col items-center justify-center py-14 px-6 border-b border-red-500/10">

          {/* AVATAR */}
          <div className="w-36 h-36 rounded-full bg-black/50 border border-red-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(255,60,20,0.35)]">

            <User
              size={72}
              className="text-red-300"
            />

          </div>

          {/* NAME */}
          <h2 className="text-5xl font-extrabold text-white capitalize mt-6">

            {user?.username || "Unknown User"}

          </h2>

          <p className="text-red-300 mt-3 text-lg">

            SmartSpend Premium User

          </p>

        </div>

        {/* DETAILS */}
        <div className="relative z-10 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* EMAIL */}
          <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 hover:translate-y-[-2px] transition-all duration-300 shadow-[0_0_40px_rgba(0,220,255,0.12)]">

            <div className="flex items-start gap-4">

              {/* ICON */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">

                <Mail
                  size={30}
                  className="text-white"
                />

              </div>

              {/* TEXT */}
              <div className="flex-1">

                <p className="text-cyan-300 uppercase tracking-widest text-xs mb-2">

                  Email Address

                </p>

                <h3 className="text-2xl font-bold text-white break-all">

                  {user?.email || "Not Available"}

                </h3>

              </div>

            </div>

          </div>

          {/* PHONE */}
          <div className="bg-black/40 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-6 hover:translate-y-[-2px] transition-all duration-300 shadow-[0_0_40px_rgba(0,255,150,0.12)]">

            <div className="flex items-start gap-4">

              {/* ICON */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">

                <Phone
                  size={30}
                  className="text-white"
                />

              </div>

              {/* TEXT */}
              <div className="flex-1">

                <p className="text-emerald-300 uppercase tracking-widest text-xs mb-2">

                  Phone Number

                </p>

                <h3 className="text-2xl font-bold text-white">

                  {user?.phoneno || "Not Available"}

                </h3>

              </div>

            </div>

          </div>

          {/* USERNAME */}
          <div className="lg:col-span-2 bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 hover:translate-y-[-2px] transition-all duration-300 shadow-[0_0_40px_rgba(168,85,247,0.12)]">

            <div className="flex items-start gap-4">

              {/* ICON */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">

                <User
                  size={30}
                  className="text-white"
                />

              </div>

              {/* TEXT */}
              <div className="flex-1">

                <p className="text-purple-300 uppercase tracking-widest text-xs mb-2">

                  Username

                </p>

                <h3 className="text-4xl font-extrabold text-white capitalize">

                  {user?.username || "Unknown"}

                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;