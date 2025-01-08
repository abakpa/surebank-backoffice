import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { logoutRequest } from '../redux/slices/loginSlice'


const Topbar = ({  onLogin, onLogout, toggleSidebar }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout =()=>{
    dispatch(logoutRequest({navigate}))
    }
  const isLoggedIn = useSelector((state) => state.login.token);
const token = isLoggedIn || localStorage.getItem("authToken");
  return (
    <div className="fixed top-0 left-0 w-full bg-gray-900 text-white p-6 shadow-lg z-50">
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
        <Link to="/content">        
        <h1 className="lg:text-xl text-sm font-bold">Sure Bank</h1>
        </Link>
        {/* Buttons */}
        <div className="flex items-center space-x-4">
          {token ? (
            <button
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to='/login'>
            <button
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-500"
              onClick={onLogin}
            >
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
