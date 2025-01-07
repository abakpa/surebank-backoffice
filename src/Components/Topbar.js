import React from 'react';

const Topbar = ({ isLoggedIn, onLogin, onLogout, toggleSidebar }) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4 shadow-lg z-50">
      <div className="flex items-center justify-between">
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
        <h1 className="lg:text-xl text-sm font-bold">Sure Bank</h1>

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
    </div>
  );
};

export default Topbar;
