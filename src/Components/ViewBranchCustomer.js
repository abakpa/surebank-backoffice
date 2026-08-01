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
  const branchName = branches.find((branch) => branch._id === localStorage.getItem("staffBranch"))?.name || "Your branch";

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="min-h-screen w-full bg-slate-50 px-3 py-4 md:px-6 md:py-6">
      <div className="mx-auto max-w-7xl space-y-4">
        <section className="overflow-hidden rounded-2xl bg-slate-950 text-white shadow-lg">
          <div className="relative p-4 md:p-6">
            <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-emerald-500/25 md:h-40 md:w-40" />
            <div className="relative grid gap-4 lg:grid-cols-[1fr,auto] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase text-emerald-300">Secretary customers</p>
                <h1 className="mt-1 text-2xl font-black tracking-normal md:text-3xl">Branch Customer Directory</h1>
                <p className="mt-1 max-w-2xl text-sm font-semibold text-slate-200">
                  {branchName} customers, withdrawal requests, and branch customer activity in one place.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs md:min-w-[420px] md:text-sm">
                <div className="rounded-2xl bg-emerald-500 px-3 py-2 shadow-sm">
                  <p className="text-emerald-50">Branch Total</p>
                  <p className="mt-1 text-xl font-black text-white">{customerList.length.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-sky-500 px-3 py-2 shadow-sm">
                  <p className="text-sky-50">Showing</p>
                  <p className="mt-1 text-xl font-black text-white">{filteredCustomers.length.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-orange-500 px-3 py-2 shadow-sm">
                  <p className="text-orange-50">Branch</p>
                  <p className="mt-1 truncate text-lg font-black text-white">{branchName}</p>
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:flex">
              {["Manager"].includes(loggedInStaffRole)&&(
                <Link to="/viewbranchcustomerusingapp" className="text-xs">
                  <button className="w-full rounded-xl bg-sky-600 px-4 py-3 font-black text-white shadow-sm hover:bg-sky-700 lg:w-auto">
                    Customers Analytics
                  </button>
                </Link>
              )}
              {["Manager"].includes(loggedInStaffRole)&&(
                <Link to="/viewbranchcustomerwithdrawalrequest" className="text-xs">
                  <button className="w-full rounded-xl bg-purple-700 px-4 py-3 font-black text-white shadow-sm hover:bg-purple-800 lg:w-auto">
                    Withdrawal Request
                  </button>
                </Link>
              )}
              {["Manager"].includes(loggedInStaffRole)&&(
                <Link to="/createcustomer" className="text-xs">
                  <button className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-black text-white shadow-sm hover:bg-emerald-700 lg:w-auto">
                    Create Customer
                  </button>
                </Link>
              )}
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-sky-50 to-purple-50 px-4 py-3">
            <h2 className="text-sm font-black uppercase text-slate-800">Branch Customers</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">
              <Tablehead />
              <Tablebody customers={filteredCustomers} branches={branches} />
            </table>
          </div>
        </section>
        {loading && <TableLoadingNotice message="Loading customers..." />}
      </div>
    </div>
  );
};

export default Viewcustomer;
