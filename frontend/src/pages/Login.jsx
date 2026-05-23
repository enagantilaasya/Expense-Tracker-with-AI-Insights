import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../stores/authStore";
import { useEffect } from "react";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    login,
    loading,
    error,
    isAuthenticated,
  } = useAuth((state) => state);

  // LOGIN FUNCTION
  const onUserLogin = (userCredObj) => {

    login(userCredObj);

  };


  // NAVIGATION AFTER LOGIN
  useEffect(() => {

    if (
      isAuthenticated === true
    ) {

      navigate("/dashboard");

    }

  }, [
    isAuthenticated,
    navigate,
  ]);

  // LOADING
  if (loading) {

    return (

      <div className="bg-gradient-to-br from-black via-zinc-950 to-red-950 min-h-screen flex items-center justify-center">

        <p className="text-red-300 text-xl animate-pulse">

          Loading...

        </p>

      </div>

    );

  }

  return (

    <div className="bg-gradient-to-br from-black via-zinc-950 to-red-950 flex items-center justify-center px-6 py-16 overflow-hidden relative">

      {/* RED GLOW */}
      <div className="absolute w-[450px] h-[450px] bg-red-500 rounded-full blur-[140px] opacity-20"></div>

      {/* ORANGE GLOW */}
      <div className="absolute w-[280px] h-[280px] bg-orange-400 rounded-full blur-[120px] opacity-20 top-10 right-10"></div>

      {/* LOGIN CARD */}
      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[36px] shadow-[0_0_60px_rgba(255,70,30,0.22)] p-9">

        {/* BADGE */}
        <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full text-xs font-semibold mb-6">

          Secure AI Finance Login

        </div>

        {/* HEADING */}
        <div className="mb-8">

          <h1 className="text-5xl font-extrabold leading-tight text-white">

            Welcome

            <span className="bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">

              {" "}Back

            </span>

          </h1>

          <p className="text-gray-400 mt-4 leading-relaxed">

            Login to access your smart dashboard,
            AI insights, transactions, and financial analytics.

          </p>

        </div>

        {/* ERROR */}
        {error && (

          <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-sm rounded-2xl px-4 py-3 mb-5">

            {error}

          </div>

        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onUserLogin)}
        >

          {/* USERNAME */}
          <div className="mb-5">

            <label className="text-red-200 text-sm mb-2 block">

              Username or Email

            </label>

            <input
              type="text"
              placeholder="Enter username or email"
              className="w-full bg-black/30 border border-white/10 text-white placeholder:text-gray-500 rounded-2xl px-5 py-4 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/20 transition-all"

              {...register(
                "identifier",
                {
                  required:
                    "Username or Email is required",

                  validate: (
                    value
                  ) =>

                    value.trim().length > 0

                      ||

                    "Field cannot be empty",
                }
              )}
            />

            {errors.identifier && (

              <p className="text-red-400 text-sm mt-2">

                {
                  errors.identifier
                    .message
                }

              </p>

            )}

          </div>

          {/* PASSWORD */}
          <div className="mb-5">

            <label className="text-red-200 text-sm mb-2 block">

              Password

            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-black/30 border border-white/10 text-white placeholder:text-gray-500 rounded-2xl px-5 py-4 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/20 transition-all"

              {...register(
                "password",
                {
                  required:
                    "Password is required",

                  validate: (
                    value
                  ) =>

                    value.trim().length > 0

                      ||

                    "Password cannot be empty",
                }
              )}
            />

            {errors.password && (

              <p className="text-red-400 text-sm mt-2">

                {
                  errors.password
                    .message
                }

              </p>

            )}

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-red-500 hover:scale-[1.02] text-white py-4 rounded-2xl mt-2 font-bold shadow-[0_0_30px_rgba(255,80,40,0.35)] transition-all duration-300"
          >

            Sign In

          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-6">

            <div className="flex-1 h-[1px] bg-white/10"></div>

            <p className="text-gray-500 text-sm">

              OR

            </p>

            <div className="flex-1 h-[1px] bg-white/10"></div>

          </div>


        </form>

        {/* REGISTER LINK */}
        <p className="text-gray-400 text-center mt-7">

          Don't have an account?{" "}

          <NavLink
            to="/register"
            className="text-red-300 hover:text-orange-300 transition"
          >

            Create one

          </NavLink>

        </p>

      </div>

    </div>

  );

}

export default Login;