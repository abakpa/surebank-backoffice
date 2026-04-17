import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranchExpenditureRequest } from "../redux/slices/expenditureReportSlice";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import Tablehead from "./Table/ExpenditureTableHead";
import Tablebody from "./Table/ExpenditureTableBody";
import { Link } from "react-router-dom";
import TableLoadingNotice from "./TableLoadingNotice";

const BranchExpenditureReport = () => {
  const dispatch = useDispatch();
  const { loading, branchexpenditurereport, error } = useSelector((state) => state.expenditurereport);
  const { branches } = useSelector((state) => state.branch);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    dispatch(fetchBranchRequest());
    dispatch(fetchBranchExpenditureRequest());
  }, [dispatch]);


  // Ensure customers is always an array
  const expenditureList = useMemo(() => (Array.isArray(branchexpenditurereport) ? branchexpenditurereport : []), [branchexpenditurereport]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredexpenditureList = useMemo(() => expenditureList.filter((expenditureItem) =>
    (expenditureItem?.createdBy?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (expenditureItem?.createdBy?.branchId?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  ), [expenditureList, searchTerm]);

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="flex flex-col p-4 bg-gray-100 min-h-screen w-full mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Expenditure Statement</h2>
      
      {/* Search and Create Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by branch or name..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md"
        />
        <Link to="/branchexpenditure" className="text-xs">
          <button className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Record Expenses
          </button>
        </Link>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse border border-gray-300">
          <Tablehead />
          <Tablebody customers={filteredexpenditureList} branches={branches} />
        </table>
      </div>
      {loading && <TableLoadingNotice message="Loading expenditure statement..." />}
    </div>
  );
};

export default BranchExpenditureReport;
