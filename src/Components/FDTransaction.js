import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFDRequest } from "../redux/slices/fdSlice";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import Tablehead from "./Table/FDTableHead";
import Tablebody from "./Table/FDTableBody";

const FDTransaction = () => {
  const dispatch = useDispatch();
  const { loading, fdreport, error } = useSelector((state) => state.fd);
  const { branches } = useSelector((state) => state.branch);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    dispatch(fetchBranchRequest());
    dispatch(fetchFDRequest());
  }, [dispatch]);


  // Ensure customers is always an array
  const fdList = Array.isArray(fdreport) ? fdreport : [];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredfdList = fdList.filter((fdList) =>
    (fdList?.createdBy?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (fdList?.createdBy?.branchId?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
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
        <p className="text-blue-500 ml-4">Loading FD Statement...</p>
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="flex flex-col p-4 bg-gray-100 min-h-screen w-full mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">FD Statement</h2>
      
      {/* Search and Create Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by branch or name..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md"
        />
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse border border-gray-300">
          <Tablehead />
          <Tablebody customers={filteredfdList} branches={branches} />
        </table>
      </div>
    </div>
  );
};

export default FDTransaction;
