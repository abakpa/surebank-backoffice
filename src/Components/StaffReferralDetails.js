import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMVReferralDetailsRequest,fetchMVReferralCountRequest
} from "../redux/slices/managerviewrepdashboardSlice";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import Tablehead from "./Table/StaffReferralTableHead";
import Tablebody from "./Table/StaffReferralTableBody";
import { useLocation } from "react-router-dom";

const StaffReferralDetails = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const staffId = query.get("staffId");

  const { loading, referralstaff,referralCount, error } = useSelector(
    (state) => state.mvrepdashboard
  );
  const { branches } = useSelector((state) => state.branch);

  const staffList = useMemo(
    () => (Array.isArray(referralstaff) ? referralstaff : []),
    [referralstaff]
  );

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredStaffList, setFilteredStaffList] = useState(staffList);

  const handleFilter = () => {
    const referralCount = {referralId:staffId,startDate,endDate}
    dispatch(fetchMVReferralCountRequest(referralCount));
  };

  useEffect(() => {
    dispatch(fetchBranchRequest());
    dispatch(fetchMVReferralDetailsRequest(staffId));
  }, [dispatch, staffId]);

  useEffect(() => {
    setFilteredStaffList(staffList);
  }, [staffList]);

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
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            className="opacity-25"
          />
          <path
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            className="opacity-75"
          />
        </svg>
        <p className="text-blue-500 ml-4 text-sm sm:text-base">Loading staff...</p>
      </div>
    );
  }

  if (error)
    return <p className="text-red-500 text-center mt-10 text-sm sm:text-base">Error: {error}</p>;

  return (
    <div className="flex flex-col p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">
        Referred Staff List
      </h2>

      {/* ✅ Date Range + Filter + Count */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        {/* Date and Filter Section */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:items-end">
          {/* Start Date */}
          <div className="flex flex-col w-full sm:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-2 w-full sm:w-44 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col w-full sm:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-2 w-full sm:w-44 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={handleFilter}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-md transition w-full sm:w-auto"
          >
            Filter
          </button>
        </div>

        {/* Total Count */}
        <div className="bg-white px-4 py-2 rounded shadow text-gray-700 text-sm sm:text-base font-semibold text-center sm:text-left">
          Total Staff:{" "}
          <span className="text-blue-600">{filteredStaffList.length}</span>
        </div>
      </div>

      {/* ✅ Table Section */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full min-w-[700px] text-sm sm:text-base border-collapse border border-gray-300">
          <Tablehead />
          <Tablebody staffs={filteredStaffList} branches={branches} count={referralCount} />
        </table>
      </div>
    </div>
  );
};

export default StaffReferralDetails;
