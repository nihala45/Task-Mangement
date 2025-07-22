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
    <>
      <div className="min-h-screen flex">
    
        <div className="hidden lg:flex w-1/3 bg-purple-700 items-center justify-center">
          <h2 className="text-4xl font-bold text-white px-8 text-center">
            Welcome Back, Lendify
          </h2>
        </div>

     
        <div className="flex-1 lg:w-2/3 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-16">
          <div className="max-w-md w-full space-y-8">
     
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-purple-700"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m0 0c-2.828 0-5.5-1.343-5.5-3V9c0-1.657 2.672-3 5.5-3s5.5 1.343 5.5 3v6c0 1.657-2.672 3-5.5 3z"
                />
              </svg>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-800">
                <span className="text-purple-700">Lendify</span>
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter your credentials to continue.
              </p>
            </div>

            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-4">
       
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-700 focus:border-purple-700 sm:text-sm"
                    placeholder="abcd@example.com"
                  />
                </div>


                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-700 focus:border-purple-700 sm:text-sm"
                    placeholder="Enter your user password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700 transition-colors duration-300"
                >
                  {loading ? "Logging in..." : "User Login"}
                </button>
              </div>

              <div className="text-center text-sm text-gray-600 mt-4">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="text-purple-700 hover:underline"
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
