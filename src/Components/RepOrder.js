import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepOrderRequest } from "../redux/slices/orderSlice";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import Tablehead from "./Table/RepOrderTableHeader";
import Tablebody from "./Table/RepOrderTableBody";
// import { Link } from "react-router-dom";

const RepOrder = () => {
  const dispatch = useDispatch();
  const { loading, reporder, error } = useSelector((state) => state.order);
  const { branches } = useSelector((state) => state.branch);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    dispatch(fetchBranchRequest());
    dispatch(fetchRepOrderRequest());
  }, [dispatch]);

  // Ensure customers is always an array
  const orderList = Array.isArray(reporder) ? reporder : [];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredorderList = orderList.filter((orderList) =>
    (orderList?.status?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (orderList?.branchId?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );
  console.log("component transaction",filteredorderList)
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
        <p className="text-blue-500 ml-4">Loading Transaction Statement...</p>
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="flex flex-col p-4 bg-gray-100 min-h-screen w-full mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Product Order</h2>
      
      {/* Search and Create Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by branch or status..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md"
        />
        {/* <Link to="/expenditure" className="text-xs">
          <button className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Record Expenses
          </button>
        </Link> */}
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse border border-gray-300">
          <Tablehead />
          <Tablebody customers={filteredorderList} branches={branches} />
        </table>
      </div>
    </div>
  );
};

export default RepOrder;
