import React, { useEffect, useMemo, useState } from "react";
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
import TableLoadingNotice from "./TableLoadingNotice";


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
  const customerList = useMemo(() => (Array.isArray(customers) ? customers : []), [customers]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCustomers = useMemo(() => customerList.filter((customer) => {
    const customerName = `${customer?.firstName || ""} ${customer?.lastName || ""}`.toLowerCase();
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
  const staffList = Array.isArray(role === "Manager" ? branchstaffs : staffs)
    ? (role === "Manager" ? branchstaffs : staffs)
    : [];
  const activeStaffName = staffId
    ? staffList.find((staff) => String(staff._id) === String(staffId))
    : null;
  const repName = activeStaffName ? `${activeStaffName.firstName} ${activeStaffName.lastName}` : "Rep";

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="min-h-screen w-full bg-slate-50 px-3 py-4 md:px-6 md:py-6">
      <div className="mx-auto max-w-7xl space-y-4">
        <section className="overflow-hidden rounded-2xl bg-slate-950 text-white shadow-lg">
          <div className="relative p-4 md:p-6">
            <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-sky-500/25 md:h-40 md:w-40" />
            <div className="relative grid gap-4 lg:grid-cols-[1fr,auto] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase text-sky-300">Rep customers</p>
                <h1 className="mt-1 text-2xl font-black tracking-normal md:text-3xl">Customer Portfolio</h1>
                <p className="mt-1 max-w-2xl text-sm font-semibold text-slate-200">
                  Review customers tied to {repName}, open accounts, and manage request follow-up.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs md:min-w-[420px] md:text-sm">
                <div className="rounded-2xl bg-sky-500 px-3 py-2 shadow-sm">
                  <p className="text-sky-50">Customers</p>
                  <p className="mt-1 text-xl font-black text-white">{customerList.length.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-orange-500 px-3 py-2 shadow-sm">
                  <p className="text-orange-50">Showing</p>
                  <p className="mt-1 text-xl font-black text-white">{filteredCustomers.length.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-purple-700 px-3 py-2 shadow-sm">
                  <p className="text-purple-100">Role</p>
                  <p className="mt-1 text-xl font-black text-white">Rep</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:p-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr),auto] lg:items-center">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <i className="fas fa-search text-sm"></i>
              </span>
              <input
                type="text"
                placeholder="Search customers by name, phone, or branch..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
              />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:flex">
              <Link to="/createcustomer" className="text-xs">
                <button className="w-full rounded-xl bg-orange-600 px-4 py-3 font-black text-white shadow-sm hover:bg-orange-700 xl:w-auto">
                  Create Customer
                </button>
              </Link>
              {canTransfer && (
                <button
                  className="w-full rounded-xl bg-red-600 px-4 py-3 text-xs font-black text-white shadow-sm hover:bg-red-700 xl:w-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTransferClick(customers);
                  }}
                >
                  Transfer All Customers
                </button>
              )}
              <Link to="/viewrepcustomerwithdrawalrequest" className="text-xs">
                <button className="w-full rounded-xl bg-purple-700 px-4 py-3 font-black text-white shadow-sm hover:bg-purple-800 xl:w-auto">
                  Customers Request
                </button>
              </Link>
              {role === 'Agent' && (
                <Link to="/viewrepcustomerusingapp" className="text-xs">
                  <button className="w-full rounded-xl bg-sky-600 px-4 py-3 font-black text-white shadow-sm hover:bg-sky-700 xl:w-auto">
                    Customers Analytics
                  </button>
                </Link>
              )}
              {role === 'Agent' && (
                <Link to="/branchcustomers" className="text-xs">
                  <button className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-black text-white shadow-sm hover:bg-emerald-700 xl:w-auto">
                    View Branch Customers
                  </button>
                </Link>
              )}
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-gradient-to-r from-sky-50 via-orange-50 to-purple-50 px-4 py-3">
            <h2 className="text-sm font-black uppercase text-slate-800">Rep Customers</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">
              <Tablehead />
              <Tablebody customers={filteredCustomers} branches={branches} oldStaff={staffId} staffList={staffList} />
            </table>
          </div>
        </section>
        {loading && <TableLoadingNotice message="Loading customers..." />}
         {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-3">
                <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
                  <p className="text-xs font-black uppercase text-red-600">Bulk transfer</p>
                  <h2 className="mb-2 text-lg font-black text-slate-950">Transfer Customers</h2>
                  <p className="mb-3 text-sm font-semibold text-slate-600">Select the new staff to receive these customers.</p>
          
                         <Select2
                    label="Account Manager"
                     options={staffList.map((staff) => ({ label: `${staff.firstName} ${staff.lastName}`, value: staff._id }))}
                    value={newStaff}
                     onChange={(selectedId) => setNewStaff(selectedId)}
                      />
                  <div className="mt-5 flex justify-end gap-2">
                    <button
                      className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-black text-slate-700 hover:bg-slate-200"
                      onClick={() => {
                        setShowModal(false);
                        setNewStaff("");
                        setSelectedCustomer(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="rounded-xl bg-red-600 px-4 py-2 text-sm font-black text-white hover:bg-red-700"
                      onClick={handleTransfer}
                    >
                      Confirm Transfer
                    </button>
                  </div>
                </div>
              </div>
            )}
      </div>
    </div>
    
  );
};

export default Viewcustomer;
