import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMVReferralDetailsRequest,
} from '../redux/slices/managerviewrepdashboardSlice'
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import Tablehead from "./Table/StaffTableHead";
import Tablebody from "./Table/StaffTableBody";
import { useLocation } from "react-router-dom";

const StaffReferralDetails = () => {
  const dispatch = useDispatch();
   const { search } = useLocation();
    const query = new URLSearchParams(search);
  const staffId = query.get("staffId"); 
  const { loading, referralstaff, error } = useSelector((state) => state.mvrepdashboard);
  const { branches } = useSelector((state) => state.branch);

  const staffList = Array.isArray(referralstaff) ? referralstaff : [];

  useEffect(() => {
    dispatch(fetchBranchRequest());
    dispatch(fetchMVReferralDetailsRequest(staffId));
  }, [dispatch,staffId]);



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

      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
     
        
        <div className="flex gap-2 w-full md:w-auto">
      
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse border border-gray-300">
          <Tablehead />
          <Tablebody staffs={staffList} branches={branches} />
        </table>
      </div>
    </div>
  );
};

export default StaffReferralDetails;