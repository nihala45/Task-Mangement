import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { Link } from "react-router-dom";

const Registration = () => {
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
      console.log(data, "Registration response");

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
    <div className="min-h-screen flex">
    
      <div className="hidden lg:flex w-1/3 bg-purple-700 items-center justify-center">
        <h2 className="text-4xl font-bold text-white px-8 text-center">
          Welcome to Lendify
        </h2>
      </div>

      <div className="flex-1 lg:w-2/3 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-16">
        <div className="max-w-xl w-full space-y-8">
         
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800">
              Create Your <span className="text-purple-700">Lendify</span> Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Register to start Manage your Tasks
            </p>
          </div>

          {globalError && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded relative">
              <span>{globalError}</span>
              <button
                type="button"
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => setGlobalError("")}
              >
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M14.348 5.652a.5.5 0 00-.707 0L10 9.293 6.36 5.652a.5.5 0 10-.707.707L9.293 10l-3.64 3.64a.5.5 0 10.707.707L10 10.707l3.64 3.64a.5.5 0 00.707-.707L10.707 10l3.64-3.64a.5.5 0 000-.708z" />
                </svg>
              </button>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 text-green-700 px-4 py-3 rounded">
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={signupSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-purple-700 focus:border-purple-700 sm:text-sm`}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-purple-700 focus:border-purple-700 sm:text-sm`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

            

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-purple-700 focus:border-purple-700 sm:text-sm`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-purple-700 focus:border-purple-700 sm:text-sm`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700 transition-colors duration-300"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
            <div className="text-center text-sm text-gray-600 mt-4">
                already have an account?{" "}
                <Link
                  to="/login"
                  className="text-purple-700 hover:underline"
                >
                  Login
                </Link>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
