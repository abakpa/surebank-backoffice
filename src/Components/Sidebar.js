import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";



const Sidebar = ({ isOpen, toggleSidebar }) => {
  const isLoggedIn = useSelector((state) => state.login.staff?.role);
  const loggedInStaffRole = isLoggedIn || localStorage.getItem("staffRole");
  const handleMenuClick = (menu) => {
    console.log(`Navigating to: ${menu}`);
    // Perform navigation or other actions here
    toggleSidebar(); // Close the sidebar after clicking a menu item on small screens
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 mt-4 transform ${
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
        <Link to="/viewcustomeraccount">
        <li
          className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={toggleSidebar}
        >
          View Customer Account
        </li>
        </Link>
        <Link to="/customeraccountdashboard">
        <li
          className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={toggleSidebar}
        >
          Customer Dashboard
        </li>
        </Link>
        <Link to="/createaccount">
        <li
          className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={toggleSidebar}
        >
          Create Account
        </li>
        </Link>
        <Link to="/deposit">
        <li
          className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={toggleSidebar}
        >
          Deposit
        </li>
        </Link>
        <Link to="/branches">
        <li
          className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={toggleSidebar}
        >
          Branches
        </li>
        </Link>
        <Link to="/createbranch">
        <li
          className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={toggleSidebar}
        >
          Create Branch
        </li>
        </Link>
        <Link to="/staff">
        <li
          className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={toggleSidebar}
        >
          View Staff
        </li>
        </Link>
        {loggedInStaffRole !== "Agent" &&(
        <Link to="/createstaff">
        <li
          className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={toggleSidebar}
        >
          Create Staff
        </li>
        </Link>
        )}
        <Link to="/customers">
        <li
          className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={toggleSidebar}
        >
          View Customer
        </li>
        </Link>
        <Link to="/createcustomer">
        <li
          className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={toggleSidebar}
        >
          Create Customer
        </li>
        </Link>

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
