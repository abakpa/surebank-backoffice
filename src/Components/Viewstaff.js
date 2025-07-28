import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaffRequest, disableAllStaffRequest, activateAllStaffRequest } from "../redux/slices/staffSlice";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import Tablehead from "./Table/StaffTableHead";
import Tablebody from "./Table/StaffTableBody";
import { Link } from "react-router-dom";

const Viewstaff = () => {
  const dispatch = useDispatch();
  const { loading, staffs, error } = useSelector((state) => state.staff);
  const { branches } = useSelector((state) => state.branch);
  const [searchTerm, setSearchTerm] = useState("");
  // Ensure staffs is always an array before using .some()
  const staffList = Array.isArray(staffs) ? staffs : [];
  const isAnyStaffDisabled = staffList.some(staff => staff.tokenVersion === 1);

  useEffect(() => {
    dispatch(fetchBranchRequest());
    dispatch(fetchStaffRequest());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDisableStaffLogin = () => {
    dispatch(disableAllStaffRequest());
  };

  const handleActivateStaffLogin = () => {
    dispatch(activateAllStaffRequest());
  };

  // Filter staff safely
  const filteredStaff = staffList.filter((staff) =>
    (staff?.name?.toLowerCase() || "").includes((searchTerm || "").toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <svg
          className="animate-spin h-10 w-10 text-blue-500"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Loading"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
          <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" className="opacity-75" />
        </svg>
        <p className="text-blue-500 ml-4">Loading staff...</p>
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="flex flex-col p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4 mt-4 text-center">Staff List</h2>

      {/* Search & Create Staff */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search staff..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md"
        />
        
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={handleDisableStaffLogin} 
            className={`w-full px-2 py-1 rounded-md text-white text-sm ${
              isAnyStaffDisabled 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600'
            }`}
            disabled={isAnyStaffDisabled}
          >
            Disable All Logins
          </button>
          
          <button 
            onClick={handleActivateStaffLogin} 
            className={`w-full px-2 py-1 rounded-md text-white text-sm ${
              isAnyStaffDisabled 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!isAnyStaffDisabled}
          >
            Activate All Logins
          </button>
          
          <Link to="/createstaff" className="w-full md:w-auto">
            <button className="w-full px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600">
              Create Staff
            </button>
          </Link>
        </div>
      </div>

      {/* Staff Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse border border-gray-300">
          <Tablehead />
          <Tablebody staffs={filteredStaff} branches={branches} />
        </table>
      </div>
    </div>
  );
};

export default Viewstaff;