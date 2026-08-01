import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranchOrderRequest } from "../redux/slices/orderSlice";
import Tablehead from "./Table/OrderTableHead";
import Tablebody from "./Table/OrderTableBody";
// import { Link } from "react-router-dom";
import TableLoadingNotice from "./TableLoadingNotice";

const BranchOrder = () => {
  const dispatch = useDispatch();
  const { loading, branchorder, error } = useSelector((state) => state.order);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    dispatch(fetchBranchOrderRequest());
  }, [dispatch]);

  const branchOrderItems = useMemo(() => {
    if (Array.isArray(branchorder.items)) {
      return branchorder.items;
    }

    const legacyOrders = Array.isArray(branchorder.orders) ? branchorder.orders : [];
    const legacySbAccounts = Array.isArray(branchorder.sbAccounts) ? branchorder.sbAccounts : [];
    const legacyEcommerceOrders = Array.isArray(branchorder.ecommerceOrders) ? branchorder.ecommerceOrders : [];

    return [...legacyEcommerceOrders, ...legacySbAccounts, ...legacyOrders];
  }, [branchorder]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const items = useMemo(() => branchOrderItems.filter((orderItem) => {
    const normalizedSearch = searchTerm.toLowerCase();
    const customerName = `${orderItem?.customerId?.firstName || ""} ${orderItem?.customerId?.lastName || ""}`.toLowerCase();
    const branchName = (orderItem?.branchId?.name?.toLowerCase() || "");
    const productName = (orderItem?.productName?.toLowerCase() || "");
    const status = (orderItem?.status?.toLowerCase() || "");

    return (
      customerName.includes(normalizedSearch) ||
      branchName.includes(normalizedSearch) ||
      productName.includes(normalizedSearch) ||
      status.includes(normalizedSearch)
    );
  }), [branchOrderItems, searchTerm]);

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="flex flex-col p-4 bg-gray-100 min-h-screen w-full mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Product Order</h2>
      
      {/* Search and Create Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by customer, branch, product, or status..."
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
          <Tablebody items={items} />
        </table>
      </div>
      {loading && <TableLoadingNotice message="Loading transaction statement..." />}
    </div>
  );
};

export default BranchOrder;
