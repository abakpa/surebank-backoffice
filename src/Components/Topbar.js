import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../redux/slices/loginSlice";
import logo from "../images/easytobuylogo2.jpg";

const Topbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.login.token);
  const token = isLoggedIn || localStorage.getItem("authToken");

  const handleLogout = () => {
    dispatch(logoutRequest({ navigate }));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-900 text-white p-3 shadow-lg z-50">
      <div className="flex items-center justify-between">
        {/* Sidebar Toggle Button (small screens) */}
        {token && (
          <button
            className="lg:hidden text-white bg-gray-700 p-2 rounded"
            onClick={toggleSidebar}
          >
            ☰
          </button>
        )}

        {/* System Name */}
        <Link to="/landingpage">
          <div className="h-10 w-10">
            <img src={logo} alt="Sure Bank" className="rounded-lg shadow-lg w-full" />
          </div>
        </Link>

        {/* Login/Logout Buttons (only on larger screens) */}
        <div className="hidden lg:flex items-center space-x-4">
          {token ? (
            <button
              className="bg-red-600 px-3 py-1.5 rounded hover:bg-red-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-green-600 px-3 py-1.5 rounded hover:bg-green-500">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
