import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranchCustomerRequest } from "../redux/slices/customerSlice";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import Tablehead from "./Table/CustomerTablehead";
import Tablebody from "./Table/CustomerTablebody";
import { Link } from "react-router-dom";
import TableLoadingNotice from "./TableLoadingNotice";

const Viewcustomer = () => {
  const dispatch = useDispatch();
  const loggedInStaffRole = localStorage.getItem("staffRole");
  const { loading, branchcustomers, error } = useSelector((state) => state.customer);
  const { branches } = useSelector((state) => state.branch);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchBranchRequest());
    dispatch(fetchBranchCustomerRequest());
  }, [dispatch]);

  // Ensure customers is always an array
  const customerList = useMemo(() => (Array.isArray(branchcustomers) ? branchcustomers : []), [branchcustomers]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCustomers = useMemo(() => customerList.filter((customer) => {
    const customerName = `${customer?.firstName} ${customer.lastName}`?.toLowerCase() || "";
    const customerPhone = customer?.phone?.toLowerCase() || "";
    
    // Find branch name from branchId
    const branch = branches.find((b) => b._id === customer.branchId);
    const branchName = branch?.name?.toLowerCase() || "";

    return (
      customerName.includes(searchTerm) || 
      customerPhone.includes(searchTerm) || 
      branchName.includes(searchTerm) // Search by branch name
    );
  }), [branches, customerList, searchTerm]);

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="flex flex-col p-4 bg-gray-100 min-h-screen w-full mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Customer List</h2>
      
      {/* Search and Create Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search customers by name, phone, or branch..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md"
        />
          {loggedInStaffRole === 'Manager'&&(
                <Link to="/viewbranchcustomerusingapp" className="text-xs">
                  <button className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Customers Analytics
                  </button>
                </Link>
          )}
          {loggedInStaffRole=== 'Manager'&&(
                   <Link to="/viewbranchcustomerwithdrawalrequest" className="text-xs">
                          <button className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Withdrawal Request
                          </button>
                        </Link>
          )}
          {loggedInStaffRole=== 'Manager'&&(
        <Link to="/createcustomer" className="text-xs">
          <button className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Create Customer
          </button>
        </Link>
          )}
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse border border-gray-300">
          <Tablehead />
          <Tablebody customers={filteredCustomers} branches={branches} />
        </table>
      </div>
      {loading && <TableLoadingNotice message="Loading customers..." />}
    </div>
  );
};

export default Viewcustomer;
