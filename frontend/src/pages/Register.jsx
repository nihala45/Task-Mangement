import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Full name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const signupSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    setGlobalError("");

    try {
      const response = await api.post(`/user/register`, {
        username,
        email,
        password,
      });

      const data = response.data;

      if (!response.status.toString().startsWith("2")) {
        const newErrors = {};
        if (data.email) newErrors.email = data.email;
        if (data.msg) setGlobalError(data.msg);
        else if (data.error) setGlobalError(data.error);
        else setGlobalError("Registration failed.");
        setErrors(newErrors);
        return;
      }

      setSuccessMessage(data.msg || "Registered successfully!");
      const userId = data?.id || data?.user_id;
      setTimeout(() => {
        navigate(userId ? `/otp/${userId}` : "/otp");
      }, 2000);
    } catch (err) {
      console.log(err);
      setGlobalError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-purple-300 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white/30 backdrop-blur-md rounded-xl shadow-xl flex flex-col md:flex-row overflow-hidden border border-purple-200">
        {/* Left Side Info */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-600 to-purple-800 text-white p-10 flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">Hello, Friend!</h2>
          <p className="text-lg leading-relaxed">
            Join Lendify today and manage your tasks with ease. Productivity starts here.
          </p>
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-white bg-opacity-80">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-2">
            Create an Account
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Let's start organizing your life
          </p>

          {globalError && (
            <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-3 rounded mb-4 relative">
              <span>{globalError}</span>
              <button
                className="absolute top-2 right-2 text-red-600"
                onClick={() => setGlobalError("")}
              >
                ✕
              </button>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 text-green-700 border border-green-300 px-4 py-3 rounded mb-4">
              {successMessage}
            </div>
          )}

          <form onSubmit={signupSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-purple-600`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-purple-600`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-purple-600`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-purple-600`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-700 hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
