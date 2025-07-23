import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/user/login/", {
        email,
        password,
      });

      const data = res.data;
      login(data);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-purple-300 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white/30 backdrop-blur-md rounded-xl shadow-xl flex flex-col md:flex-row overflow-hidden border border-purple-200">
        
        {/* Left Side */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-700 to-purple-900 text-white p-10 flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-lg leading-relaxed">
            Log in to your Lendify account and take control of your productivity.
          </p>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-white bg-opacity-80">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-2">
            Login to Your Account
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Welcome back to <span className="font-semibold text-purple-700">Lendify</span>
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-purple-700 hover:underline font-semibold"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
