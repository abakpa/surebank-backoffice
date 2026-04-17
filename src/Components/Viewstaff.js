import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaffRequest, disableAllStaffRequest, activateAllStaffRequest } from "../redux/slices/staffSlice";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import Tablehead from "./Table/StaffTableHead";
import Tablebody from "./Table/StaffTableBody";
import { Link } from "react-router-dom";
import TableLoadingNotice from "./TableLoadingNotice";

const Viewstaff = () => {
  const dispatch = useDispatch();
  const { loading, staffs, error } = useSelector((state) => state.staff);
  const { branches } = useSelector((state) => state.branch);
  const [searchTerm, setSearchTerm] = useState("");
  // Ensure staffs is always an array before using .some()
  const staffList = useMemo(() => (Array.isArray(staffs) ? staffs : []), [staffs]);
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
  const filteredStaff = useMemo(() => staffList.filter((staff) =>
    (staff?.name?.toLowerCase() || "").includes((searchTerm || "").toLowerCase())
  ), [searchTerm, staffList]);

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
      {loading && <TableLoadingNotice message="Loading staff..." />}
    </div>
  );
};

export default Viewstaff;
