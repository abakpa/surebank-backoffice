import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepCustomerRequest } from "../redux/slices/customerSlice";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import { fetchBranchStaffRequest } from "../redux/slices/staffSlice";
import { transferAllCustomerRequest } from "../redux/slices/customerSlice";
import Tablehead from "./Table/CustomerRepTableHead";
import Tablebody from "./Table/CustomerRepTableBody";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Select2 from "../Components/Select2";


const Viewcustomer = () => {
  const dispatch = useDispatch();
    const role = localStorage.getItem('staffRole');
    const [showModal, setShowModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [newStaff, setNewStaff] = useState("");
  const { loading, customers, error } = useSelector((state) => state.customer);
  const { branches } = useSelector((state) => state.branch);

  const {  branchstaffs,staffs} = useSelector((state) => state.staff);
  const [searchTerm, setSearchTerm] = useState("");
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const staffId = query.get("staffId"); 
  useEffect(() => {
    dispatch(fetchBranchRequest());
    dispatch(fetchBranchStaffRequest());
    dispatch(fetchRepCustomerRequest(staffId));

  }, [dispatch,staffId]);

  // Ensure customers is always an array
  const customerList = Array.isArray(customers) ? customers : [];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCustomers = customerList.filter((customer) => {
    const customerName = customer?.name?.toLowerCase() || "";
    const customerPhone = customer?.phone?.toLowerCase() || "";
    
    // Find branch name from branchId
    const branch = branches.find((b) => b._id === customer.branchId);
    const branchName = branch?.name?.toLowerCase() || "";

    return (
      customerName.includes(searchTerm) || 
      customerPhone.includes(searchTerm) || 
      branchName.includes(searchTerm) // Search by branch name
    );
  });
  const handleTransferClick = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };
  const handleTransfer = () => {
    if (selectedCustomer && newStaff) {
        const oldStaff = staffId
        const details = {oldStaff,newStaff}
        console.log("transfer details",details)
           dispatch(transferAllCustomerRequest(details));
      // onTransfer({ oldStaff: selectedCustomer.createdBy, newStaff });
      setShowModal(false);
      setNewStaff("");
      setSelectedCustomer(null);
    }
  };
  const canTransfer = role === "Manager" || role === "Admin";

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
        <p className="text-blue-500 ml-4">Loading customers...</p>
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  const staffList = role === "Manager" ? branchstaffs : staffs;

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
        <Link to="/createcustomer" className="text-xs">
          <button className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Create Customer
          </button>
        </Link>
        {canTransfer && (
        <button
                  className="w-full md:w-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTransferClick(customers);
                  }}
                >
                  Transfer All Customers
                </button>
        )}
            <Link to="/viewrepcustomerwithdrawalrequest" className="text-xs">
                                  <button className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                    Withdrawal Request
                                  </button>
                                </Link>
              <Link to="/viewrepcustomerusingapp" className="text-xs">
                          <button className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Customers Analytics
                          </button>
                        </Link>
        <Link to="/branchcustomers" className="text-xs">
      <button className="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
        View Branch Customers
      </button>
    </Link>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse border border-gray-300">
          <Tablehead />
          <Tablebody customers={filteredCustomers} branches={branches} oldStaff={staffId} staffList={staffList} />
        </table>
      </div>
         {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                  <h2 className="text-lg font-bold mb-4">Transfer Customer</h2>
                  <p className="mb-2">Select a new staff for: <strong>{selectedCustomer?.name}</strong></p>
          
                         <Select2
                    label="Account Manager"
                     options={staffList.map((staff) => ({ label: `${staff.firstName} ${staff.lastName}`, value: staff._id }))}
                    value={newStaff}
                     onChange={(selectedId) => setNewStaff(selectedId)}
                      />
                  <div className="flex justify-end space-x-2">
                    <button
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      onClick={() => {
                        setShowModal(false);
                        setNewStaff("");
                        setSelectedCustomer(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={handleTransfer}
                    >
                      Confirm Transfer
                    </button>
                  </div>
                </div>
              </div>
            )}
    </div>
    
  );
};

export default Viewcustomer;
