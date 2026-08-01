import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderRequest } from "../redux/slices/orderSlice";
import Tablehead from "./Table/OrderTableHead";
import Tablebody from "./Table/OrderTableBody";
import PaginationControls from "./PaginationControls";

const PAGE_SIZE = 25;

const Order = () => {
  const dispatch = useDispatch();
  const { loading, orderItems, orderPagination, error } = useSelector((state) => state.order);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(searchInput.trim());
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    dispatch(fetchOrderRequest({ page: currentPage, limit: PAGE_SIZE, search: searchTerm }));
  }, [currentPage, dispatch, searchTerm]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="flex flex-col p-4 bg-gray-100 min-h-screen w-full mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Product Order</h2>
      
      {/* Search and Create Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by customer, branch, product, or status..."
          value={searchInput}
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
          <Tablebody items={orderItems} />
        </table>
      </div>
      {loading && (
        <p className="mt-3 text-sm text-blue-600 dark:text-sky-400">Loading orders...</p>
      )}
      <PaginationControls
        page={orderPagination.page}
        totalPages={orderPagination.totalPages}
        total={orderPagination.total}
        onPageChange={setCurrentPage}
        disabled={loading}
      />
    </div>
  );
};

export default Order;
