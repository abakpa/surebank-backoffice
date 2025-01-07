import React from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const handleMenuClick = (menu) => {
    console.log(`Navigating to: ${menu}`);
    // Perform navigation or other actions here
    toggleSidebar(); // Close the sidebar after clicking a menu item on small screens
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform lg:translate-x-0 lg:relative lg:block z-20`}
    >
      {/* Close Button */}
      <button
        className="lg:hidden absolute top-4 right-4 text-white bg-gray-700 rounded-full p-2"
        onClick={toggleSidebar}
      >
        ✕
      </button>
      <h2 className="text-xl font-bold mb-6">Sidebar</h2>
      <ul>
        <li
          className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={() => handleMenuClick("Dashboard")}
        >
          Dashboard
        </li>
        <li
          className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={() => handleMenuClick("Profile")}
        >
          Profile
        </li>
        <li
          className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={() => handleMenuClick("Settings")}
        >
          Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
