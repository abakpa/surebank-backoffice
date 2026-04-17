import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionRequest } from "../redux/slices/transactionSlice";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import Tablehead from "./Table/StaffTransactionTableHead";
import Tablebody from "./Table/StaffTransactionTableBody";
// import { Link } from "react-router-dom";
import TableLoadingNotice from "./TableLoadingNotice";

const Transaction = () => {
  const dispatch = useDispatch();
  const { loading, transaction, error } = useSelector((state) => state.transaction);
  const { branches } = useSelector((state) => state.branch);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    dispatch(fetchBranchRequest());
    dispatch(fetchTransactionRequest());
  }, [dispatch]);

  // Ensure customers is always an array
  const transactionList = useMemo(() => (Array.isArray(transaction) ? transaction : []), [transaction]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredtransactionListList = useMemo(() => transactionList.filter((transactionListList) =>
    (transactionListList?.customerId?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (transactionListList?.branchId?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  ), [searchTerm, transactionList]);

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="flex flex-col p-4 bg-gray-100 min-h-screen w-full mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Transaction Statement</h2>
      
      {/* Search and Create Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by branch or name..."
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
          <Tablehead customers={filteredtransactionListList} branches={branches}/>
          <Tablebody customers={filteredtransactionListList} branches={branches} />
        </table>
      </div>
      {loading && <TableLoadingNotice message="Loading transaction statement..." />}
    </div>
  );
};

export default Transaction;
