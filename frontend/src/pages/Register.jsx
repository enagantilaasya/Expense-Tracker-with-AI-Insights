import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {

  const navigate = useNavigate();

  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:1971";

  // REGISTER USER
  const onUserRegister = async (userObj) => {

    try {

      setLoading(true);
      setApiError("");

      const res = await axios.post(
        `${BASE_URL}/auth/register`,
        userObj,
        {
          withCredentials: true,
        }
      );

      if (res.status === 201 || res.status === 200) {
        navigate("/login");
      }

    } catch (err) {

      console.log("Registration Error:", err);

      setApiError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="bg-gradient-to-br from-black via-zinc-950 to-red-950 flex items-center justify-center px-6 py-16 overflow-hidden relative">

      {/* RED GLOW */}
      <div className="absolute w-[450px] h-[450px] bg-red-500 rounded-full blur-[140px] opacity-20"></div>

      {/* ORANGE GLOW */}
      <div className="absolute w-[300px] h-[300px] bg-orange-400 rounded-full blur-[120px] opacity-20 top-10 right-10"></div>

      {/* CARD */}
      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[36px] shadow-[0_0_60px_rgba(255,70,30,0.22)] p-9">

        {/* TOP BADGE */}
        <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full text-xs font-semibold mb-6">
          Smart Finance Registration
        </div>

        {/* HEADING */}
        <div className="mb-8">

          <h1 className="text-5xl font-extrabold leading-tight text-white">

            Join

            <span className="bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">
              {" "}SmartFinance
            </span>

          </h1>

          <p className="text-gray-400 mt-4 leading-relaxed">
            Create your account and start tracking expenses,
            AI predictions, savings, and smarter financial habits.
          </p>

        </div>

        {/* ERROR */}
        {apiError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-sm rounded-2xl px-4 py-3 mb-5">
            {apiError}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onUserRegister)}
          className="space-y-5"
        >

          {/* USERNAME */}
          <div>

            <label className="block text-sm text-red-200 mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              className="w-full bg-black/30 border border-white/10 text-white placeholder:text-gray-500 rounded-2xl px-5 py-4 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/20 transition-all"
              {...register("username", {
                required: "Username is required",
              })}
            />

            {errors.username && (
              <p className="text-red-400 text-sm mt-2">
                {errors.username.message}
              </p>
            )}

          </div>

          {/* PHONE */}
          <div>

            <label className="block text-sm text-red-200 mb-2">
              Mobile Number
            </label>

            <input
              type="text"
              placeholder="Enter mobile number"
              className="w-full bg-black/30 border border-white/10 text-white placeholder:text-gray-500 rounded-2xl px-5 py-4 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/20 transition-all"
              {...register("phoneno", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
            />

            {errors.phoneno && (
              <p className="text-red-400 text-sm mt-2">
                {errors.phoneno.message}
              </p>
            )}

          </div>

          {/* EMAIL */}
          <div>

            <label className="block text-sm text-red-200 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              className="w-full bg-black/30 border border-white/10 text-white placeholder:text-gray-500 rounded-2xl px-5 py-4 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/20 transition-all"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-2">
                {errors.email.message}
              </p>
            )}

          </div>

          {/* PASSWORD */}
          <div>

            <label className="block text-sm text-red-200 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full bg-black/30 border border-white/10 text-white placeholder:text-gray-500 rounded-2xl px-5 py-4 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/20 transition-all"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            {errors.password && (
              <p className="text-red-400 text-sm mt-2">
                {errors.password.message}
              </p>
            )}

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-red-500 hover:scale-[1.02] text-white py-4 rounded-2xl font-bold shadow-[0_0_30px_rgba(255,80,40,0.35)] transition-all duration-300"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-gray-400 mt-7">

          Already have an account?{" "}

          <NavLink
            to="/login"
            className="text-red-300 hover:text-orange-300 transition"
          >
            Login
          </NavLink>

        </p>

      </div>

    </div>
  );
}

export default Register;