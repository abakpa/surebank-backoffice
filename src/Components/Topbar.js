import React from "react";

const Topbar = ({ isLoggedIn, onLogin, onLogout, toggleSidebar }) => {
  return (
    <div className="h-16 bg-gray-900 text-white flex items-center justify-between px-6">
      {/* Sidebar Toggle Button (small screens) */}
      {isLoggedIn && (
        <button
          className="lg:hidden text-white bg-gray-700 p-2 rounded"
          onClick={toggleSidebar}
        >
          ☰
        </button>
      )}

      {/* System Name */}
      <h1 className="text-xl font-bold">System Name</h1>

      {/* Buttons */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <button
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-500"
            onClick={onLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-500"
            onClick={onLogin}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
