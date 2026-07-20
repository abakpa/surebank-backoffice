import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../redux/slices/loginSlice";
import logo from "../images/surebanklogo.png";

const Topbar = ({ toggleSidebar, theme, toggleTheme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.login.token);
  const token = isLoggedIn || localStorage.getItem("authToken");
  const rawRole = useSelector((state) => state.login.staff?.role) || localStorage.getItem("staffRole");
  const displayRole = rawRole === "Agent" ? "Rep" : rawRole === "OnlineRep" ? "Online Rep" : rawRole || "Staff";

  const handleLogout = () => {
    dispatch(logoutRequest({ navigate }));
  };

  return (
    <div className="app-topbar fixed top-0 left-0 z-50 w-full px-3 py-2 shadow-lg md:px-4">
      <div className="flex items-center justify-between">
        {/* Sidebar Toggle Button (small screens) */}
        {token && (
          <button
            className="theme-icon-button rounded-xl p-2 lg:hidden"
            onClick={toggleSidebar}
          >
            ☰
          </button>
        )}

        {/* System Name */}
        <Link to="/landingpage" className="flex items-center gap-2 rounded-2xl bg-white/10 px-2 py-1.5 text-white">
          <div className="h-9 w-9 shrink-0">
            <img src={logo} alt="Sure Bank" className="rounded-lg shadow-lg w-full" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-black leading-tight">SureBank</p>
            <p className="text-[10px] font-bold uppercase text-orange-100">Backoffice</p>
          </div>
        </Link>

        {/* Login/Logout Buttons (only on larger screens) */}
        <div className="hidden lg:flex items-center space-x-4">
          {token && (
            <span className="rounded-full bg-white/12 px-3 py-2 text-xs font-black text-white ring-1 ring-white/15">
              {displayRole}
            </span>
          )}
          <button
            className="theme-toggle-button"
            onClick={toggleTheme}
            type="button"
          >
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          {token ? (
            <button
              className="rounded-full bg-red-600 px-4 py-2 text-xs font-black text-white shadow-sm hover:bg-red-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="rounded-full bg-green-600 px-4 py-2 text-xs font-black text-white shadow-sm hover:bg-green-500">
                Login
              </button>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            className="theme-toggle-button text-xs"
            onClick={toggleTheme}
            type="button"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
