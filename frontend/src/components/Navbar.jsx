import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm w-full">
      <div className="flex justify-between items-center px-4 sm:px-8 h-16">
        <Link to="/" className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-purple-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m0 0c-2.828 0-5.5-1.343-5.5-3V9c0-1.657 2.672-3 5.5-3s5.5 1.343 5.5 3v6c0 1.657-2.672 3-5.5 3z"
            />
          </svg>
          <span className="text-2xl font-bold text-purple-700 tracking-wide">
            Lendify
          </span>
        </Link>

        <div className="flex gap-4 items-center">
        
          <Link
            to="/user/book-list/"
            className="px-4 py-2 border border-purple-700 text-purple-700 rounded hover:bg-purple-700 hover:text-white transition duration-300"
          >
            Book List
          </Link>

          {user ? (
            <>
              <Link
                to="/user/borrow-book-detail/"
                className="px-4 py-2 border border-purple-700 text-purple-700 rounded hover:bg-purple-700 hover:text-white transition duration-300"
              >
                Borrow Details
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="inline-block px-5 py-2 border border-purple-700 text-purple-700 rounded-md hover:bg-purple-700 hover:text-white transition-colors duration-300 font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
