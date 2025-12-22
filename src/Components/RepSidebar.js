import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutRequest } from "../redux/slices/loginSlice";
import { useNavigate } from "react-router-dom";

const ManagerSidebar = ({ isOpen, toggleSidebar, role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.login.token);
  const token = isLoggedIn || localStorage.getItem("authToken");
  const staffId = localStorage.getItem("staffId");
  // const loggedInStaffRole = useSelector((state) => state.login.staff?.role) || localStorage.getItem("staffRole");

  const handleLogout = () => {
    dispatch(logoutRequest({ navigate }));
  };

  const handleMenuClick = (menu) => {
    console.log(`Navigating to: ${menu}`);
    toggleSidebar(); // Close the sidebar after clicking a menu item on small screens
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 mt-12 transform ${
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
        <Link to={`/repdashboard?staffId=${staffId}`}>
        <li
          className="hover:bg-gray-700 p-2 rounded cursor-pointer text-xs"
          onClick={() => handleMenuClick("Dashboard")}
        >
          Dashboard
        </li>
        </Link>
        {/* <Link to="/branches" className="text-xs">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={toggleSidebar}>
            Branches
          </li>
        </Link> */}
    
        {/* <Link to="/branchstaff" className="text-xs">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={toggleSidebar}>
            Staff
          </li>
        </Link> */}
        {/* {loggedInStaffRole !== "Agent" && (
          <Link to="/createstaff" className="text-xs">
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={toggleSidebar}>
              Create Staff
            </li>
          </Link>
        )} */}
        <Link to="/repcustomers" className="text-xs">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={toggleSidebar}>
            Customers
          </li>
        </Link>
        <Link to="/repexpenditure" className="text-xs">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={toggleSidebar}>
          Expenditure
          </li>
        </Link>
        {role === 'Agent' && (
        <Link to="/transaction" className="text-xs">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={toggleSidebar}>
          Transaction
          </li>
        </Link>
        )}
        <Link to="/reporder" className="text-xs">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={toggleSidebar}>
          Order
          </li>
        </Link>

        {/* Login/Logout Buttons (only on small screens) */}
        <div className="block lg:hidden">
          {token ? (
            <li
              className="bg-red-600 hover:bg-red-500 text-center p-2 rounded cursor-pointer mt-4 text-xs"
              onClick={handleLogout}
            >
              Logout
            </li>
          ) : (
            <Link to="/login" className="text-xs">
              <li className="bg-green-600 hover:bg-green-500 text-center p-2 rounded cursor-pointer mt-4">
                Login
              </li>
            </Link>
          )}
        </div>
      </ul>
    </div>
  );
};

export default ManagerSidebar;
