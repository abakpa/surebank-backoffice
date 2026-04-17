import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFDIncomeRequest } from "../redux/slices/FDincomeSllice";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import Tablehead from "./Table/FDincomeTableHead";
import Tablebody from "./Table/FDincomeTableBody";
// import { Link } from "react-router-dom";
import TableLoadingNotice from "./TableLoadingNotice";

const FDincome = () => {
  const dispatch = useDispatch();
  const { loading, fdincome, error } = useSelector((state) => state.fdincomereport);
  const { branches } = useSelector((state) => state.branch);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchBranchRequest());
    dispatch(fetchFDIncomeRequest());
  }, [dispatch]);


  // Ensure customers is always an array
  const fdincomeList = useMemo(() => (Array.isArray(fdincome) ? fdincome : []), [fdincome]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredsbincomeList = useMemo(() => fdincomeList.filter((fdincomeItem) =>
    (fdincomeItem?.customerId?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (fdincomeItem?.customerId?.branchId?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  ), [fdincomeList, searchTerm]);

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="flex flex-col p-4 bg-gray-100 min-h-screen w-full mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">FD Income Statement</h2>
      
      {/* Search and Create Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by branch or name..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md"
        />
        {/* <Link to="/createcustomer" className="text-xs">
          <button className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Create Customer
          </button>
        </Link> */}
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse border border-gray-300">
          <Tablehead />
          <Tablebody customers={filteredsbincomeList} branches={branches} />
        </table>
      </div>
      {loading && <TableLoadingNotice message="Loading FD income..." />}
    </div>
  );
};

export default FDincome;
