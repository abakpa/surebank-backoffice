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

  const branchCount = branches.filter((branch) => branch.name !== "Head office").length;

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="min-h-screen w-full bg-slate-50 px-3 py-4 md:px-6 md:py-6">
      <div className="mx-auto max-w-7xl space-y-4">
        <section className="overflow-hidden rounded-2xl bg-slate-950 text-white shadow-lg">
          <div className="relative p-4 md:p-6">
            <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-orange-500/25 md:h-40 md:w-40" />
            <div className="relative grid gap-4 lg:grid-cols-[1fr,auto] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase text-orange-300">Admin customers</p>
                <h1 className="mt-1 text-2xl font-black tracking-normal md:text-3xl">Customer Directory</h1>
                <p className="mt-1 max-w-2xl text-sm font-semibold text-slate-200">
                  Search, review, create, and manage customer account records across every branch.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs md:min-w-[420px] md:text-sm">
                <div className="rounded-2xl bg-orange-500 px-3 py-2 shadow-sm">
                  <p className="text-orange-50">Total</p>
                  <p className="mt-1 text-xl font-black text-white">{Number(customerPagination.total || customerList.length || 0).toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-sky-500 px-3 py-2 shadow-sm">
                  <p className="text-sky-50">Branches</p>
                  <p className="mt-1 text-xl font-black text-white">{branchCount.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-emerald-500 px-3 py-2 shadow-sm">
                  <p className="text-emerald-50">Page</p>
                  <p className="mt-1 text-xl font-black text-white">{Number(customerPagination.page || currentPage).toLocaleString()}</p>
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
                value={searchInput}
                onChange={handleSearch}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:flex">
              <Link to="/viewcustomerusingapp" className="text-xs">
                <button className="w-full rounded-xl bg-sky-600 px-4 py-3 font-black text-white shadow-sm hover:bg-sky-700 lg:w-auto">
                  Customers Analytics
                </button>
              </Link>
              <Link to="/viewcustomerwithdrawalrequest" className="text-xs">
                <button className="w-full rounded-xl bg-purple-700 px-4 py-3 font-black text-white shadow-sm hover:bg-purple-800 lg:w-auto">
                  Withdrawal Request
                </button>
              </Link>
              <Link to="/createcustomer" className="text-xs">
                <button className="w-full rounded-xl bg-orange-600 px-4 py-3 font-black text-white shadow-sm hover:bg-orange-700 lg:w-auto">
                  Create Customer
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-gradient-to-r from-orange-50 via-sky-50 to-emerald-50 px-4 py-3">
            <h2 className="text-sm font-black uppercase text-slate-800">Customers</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">
              <Tablehead />
              <Tablebody customers={customerList} branches={branches} />
            </table>
          </div>
        </section>
        {loading && (
          <p className="rounded-xl bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700">Loading customers...</p>
        )}
        <PaginationControls
          page={customerPagination.page}
          totalPages={customerPagination.totalPages}
          total={customerPagination.total}
          onPageChange={setCurrentPage}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default Viewcustomer;
