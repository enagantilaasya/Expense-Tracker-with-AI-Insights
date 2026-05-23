import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../stores/authStore";

function Header() {

  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (

    <nav className="bg-gradient-to-r from-zinc-900 via-red-950 to-black shadow-xl border-b border-red-900/30 px-6 py-4">

      <div className="flex justify-between items-center max-w-7xl mx-auto">

        {/* LOGO */}
        <NavLink
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent tracking-wide"
        >
          SmartFinance
        </NavLink>

        {/* NAV LINKS */}
        <ul className="flex gap-6 items-center text-[16px] font-medium">

          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-red-300 font-semibold"
                  : "text-gray-200 hover:text-red-300 transition duration-200"
              }
            >
              Home
            </NavLink>
          </li>

          {!isAuthenticated && (
            <>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-300 font-semibold"
                      : "text-gray-200 hover:text-red-300 transition duration-200"
                  }
                >
                  Register
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-300 font-semibold"
                      : "text-gray-200 hover:text-red-300 transition duration-200"
                  }
                >
                  Login
                </NavLink>
              </li>
            </>
          )}

          {isAuthenticated && (
            <>
              {/* PROFILE */}
              <li>
                <NavLink
                  to="/dashboard/profile"
                  className="bg-white/10 backdrop-blur-lg border border-white/10 px-4 py-2 rounded-full text-gray-100 hover:bg-white/20 transition shadow-lg"
                >
                  👋 {user?.username || "Profile"}
                </NavLink>
              </li>

              {/* LOGOUT */}
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-5 py-2 rounded-full shadow-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  Logout
                </button>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}

export default Header;