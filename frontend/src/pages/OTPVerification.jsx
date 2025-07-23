import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

const OtpVerification = () => {
  const { id } = useParams();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post(`/user/verify_otp/${id}`, {
        email_otp: otp.trim(),
      });

      setSuccess(res.data.message || "OTP verified successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const errMsg =
        err.response?.data?.error ||
        err.response?.data?.msg ||
        "Something went wrong. Please try again.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-purple-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11c.828 0 1.5-.672 1.5-1.5S12.828 8 12 8s-1.5.672-1.5 1.5S11.172 11 12 11zM12 12v6"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Verify Your OTP
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              Enter OTP
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-700 focus:border-purple-700 sm:text-sm"
              placeholder="Enter OTP sent to your email"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700 transition-colors duration-300"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Didn't receive an OTP? Check your spam folder or register again.
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;
