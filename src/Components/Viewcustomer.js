import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerRequest } from "../redux/slices/customerSlice";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import Tablehead from "./Table/CustomerTablehead";
import Tablebody from "./Table/CustomerTablebody";
import { Link } from "react-router-dom";
import PaginationControls from "./PaginationControls";

const PAGE_SIZE = 25;

const Viewcustomer = () => {
  const dispatch = useDispatch();
  const { loading, customerList, customerPagination, error } = useSelector((state) => state.customer);
  const { branches } = useSelector((state) => state.branch);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    dispatch(fetchBranchRequest());
  }, [dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(searchInput.trim());
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    dispatch(fetchCustomerRequest({ page: currentPage, limit: PAGE_SIZE, search: searchTerm }));
  }, [currentPage, dispatch, searchTerm]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="flex flex-col p-4 bg-gray-100 min-h-screen w-full mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Customer List</h2>
      
      {/* Search and Create Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search customers by name, phone, or branch..."
          value={searchInput}
          onChange={handleSearch}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md"
        />
        
        <Link to="/viewcustomerusingapp" className="text-xs">
          <button className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Customers Analytics
          </button>
        </Link>
        <Link to="/viewcustomerwithdrawalrequest" className="text-xs">
          <button className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Withdrawal Request
          </button>
        </Link>
        <Link to="/createcustomer" className="text-xs">
          <button className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Create Customer
          </button>
        </Link>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse border border-gray-300">
          <Tablehead />
          <Tablebody customers={customerList} branches={branches} />
        </table>
      </div>
      {loading && (
        <p className="mt-3 text-sm text-blue-600 dark:text-sky-400">Loading customers...</p>
      )}
      <PaginationControls
        page={customerPagination.page}
        totalPages={customerPagination.totalPages}
        total={customerPagination.total}
        onPageChange={setCurrentPage}
        disabled={loading}
      />
    </div>
  );
};

export default Viewcustomer;
