import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranchDSIncomeRequest } from "../redux/slices/dsincomeSlice";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import Tablehead from "./Table/SBIncomeTableHead";
import Tablebody from "./Table/SBIncomeTableBody";
import TableLoadingNotice from "./TableLoadingNotice";

const BranchDSIncome = () => {
  const dispatch = useDispatch();
  const { loading, branchdsincome, error } = useSelector((state) => state.dsincomereport);
  const { branches } = useSelector((state) => state.branch);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchBranchRequest());
    dispatch(fetchBranchDSIncomeRequest());
  }, [dispatch]);


  // Ensure customers is always an array
  const dsincomeList = useMemo(() => (Array.isArray(branchdsincome) ? branchdsincome : []), [branchdsincome]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filtereddsincomeList = useMemo(() => dsincomeList.filter((dsincomeItem) =>
    (dsincomeItem?.customerId?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (dsincomeItem?.customerId?.branchId?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  ), [dsincomeList, searchTerm]);

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="flex flex-col p-4 bg-gray-100 min-h-screen w-full mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">DS Income Statement</h2>
      
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
          <Tablebody customers={filtereddsincomeList} branches={branches} />
        </table>
      </div>
      {loading && <TableLoadingNotice message="Loading DS income..." />}
    </div>
  );
};

export default BranchDSIncome;
