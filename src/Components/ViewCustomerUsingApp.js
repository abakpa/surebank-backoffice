import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { CircleHelp } from "lucide-react";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import { fetchCustomerLoginCountRequest, fetchCustomerNewCustomersRequest } from '../redux/slices/customerSlice';
import Select2 from "./Select2";
import CustomerAnalyticsNewCustomersModal from "./CustomerAnalyticsNewCustomersModal";

const formatCurrency = (value) => `₦${Number(value || 0).toLocaleString("en-US")}`;
const formatDate = (value) => {
  if (!value) return "Never";
  return new Date(value).toLocaleString();
};
const getCustomerName = (customer) => (
  [customer?.customerId?.firstName, customer?.customerId?.lastName].filter(Boolean).join(" ") || "Unknown Customer"
);
const getRepName = (customer) => (
  [customer?.accountManager?.firstName, customer?.accountManager?.lastName].filter(Boolean).join(" ") || "Ecommerce"
);
const getBranchId = (customer) => customer?.branchId?._id || customer?.branchId;
const getPerformance = (customer) => customer?.performance || {};
const pickTop = (items, field) => (
  [...items].sort((a, b) => Number(getPerformance(b)[field] || 0) - Number(getPerformance(a)[field] || 0))[0] || null
);
const metricHelp = {
  appCustomers: "Counts only customers who have logged into the ecommerce app. Transaction-only customers do not increase this login count.",
  totalLogins: "Adds up all recorded ecommerce app login counts for the filtered customers.",
  dsPerformance: "Net DS transaction performance for the filtered customers: DS credit transactions minus DS debit and charge transactions.",
  productPurchase: "Sum of fully paid product items and fully paid product orders/packages. A product item counts when its payment status is paid or its paid amount covers its item subtotal.",
  mostActiveLogin: "The customer with the highest ecommerce app login count.",
  bestDSCustomer: "The customer with the highest current DS balance, summed across their DS packages.",
  bestProductCustomer: "The customer with the highest current SB/product balance, summed across their SB packages.",
  newCustomers: "Customers whose accounts were opened within the last 30 days.",
};

const InfoButton = ({ id, activeInfo, setActiveInfo, text, tone = "light", align = "right" }) => {
  const isOpen = activeInfo === id;
  const iconClass = tone === "dark"
    ? "text-white/80 hover:bg-white/15 hover:text-white"
    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white";
  const popoverAlignment = align === "left"
    ? "left-0"
    : "right-0";

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setActiveInfo(isOpen ? null : id);
        }}
        className={`rounded-full p-1 transition ${iconClass}`}
        aria-label="Show card information"
      >
        <CircleHelp className="h-4 w-4" />
      </button>
      {isOpen && (
        <span className={`absolute ${popoverAlignment} top-full z-30 mt-2 w-[min(16rem,calc(100vw-2rem))] rounded-lg border border-slate-200 bg-white p-3 text-left text-xs font-semibold leading-5 text-slate-700 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200`}>
          {text}
        </span>
      )}
    </span>
  );
};

const ViewCustomerUsingApp = () => {
  const dispatch = useDispatch();
  const { branches } = useSelector((state) => state.branch);
  const { loading, customers, newCustomers: newCustomerRows, error } = useSelector((state) => state.customer);
  const [branchId, setBranchId] = useState('all');
  const [search, setSearch] = useState('');
  const [showNewCustomersModal, setShowNewCustomersModal] = useState(false);
  const [activeInfo, setActiveInfo] = useState(null);

  useEffect(() => {
    dispatch(fetchBranchRequest());
    dispatch(fetchCustomerLoginCountRequest());
    dispatch(fetchCustomerNewCustomersRequest());
  }, [dispatch]);

  useEffect(() => {
    const closeInfo = () => setActiveInfo(null);
    document.addEventListener("click", closeInfo);
    return () => document.removeEventListener("click", closeInfo);
  }, []);

  const branchOptions = [
    { label: "All Branches", value: "all" },
    ...branches
      .filter((branch) => branch.name !== "Head office")
      .map((branch) => ({ label: branch.name, value: branch._id }))
  ];

  const filteredCustomers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return (customers || []).filter((customer) => {
      const branchMatch = branchId === 'all' || getBranchId(customer) === branchId;
      const searchText = [
        getCustomerName(customer),
        customer?.customerId?.phone,
        customer?.branchId?.name,
        getRepName(customer),
      ].filter(Boolean).join(" ").toLowerCase();

      return branchMatch && (!normalizedSearch || searchText.includes(normalizedSearch));
    });
  }, [branchId, customers, search]);

  const summary = useMemo(() => {
    const loginCustomers = filteredCustomers.filter((customer) => Number(customer?.count || 0) > 0);
    const totalCustomers = loginCustomers.length;
    const totalLogins = loginCustomers.reduce((sum, customer) => sum + Number(customer?.count || 0), 0);
    const totalDS = filteredCustomers.reduce((sum, customer) => sum + Number(getPerformance(customer).dsTotal || 0), 0);
    const totalSB = filteredCustomers.reduce((sum, customer) => sum + Number(getPerformance(customer).sbPurchaseTotal || 0), 0);

    return {
      totalCustomers,
      totalLogins,
      totalDS,
      totalSB,
      bestLoginCustomer: [...loginCustomers].sort((a, b) => Number(b?.count || 0) - Number(a?.count || 0))[0] || null,
      bestDSCustomer: pickTop(filteredCustomers, "dsBalanceTotal"),
      bestSBCustomer: pickTop(filteredCustomers, "sbBalanceTotal"),
    };
  }, [filteredCustomers]);

  const newCustomers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return (Array.isArray(newCustomerRows) ? newCustomerRows : []).filter((customer) => {
      const branchMatch = branchId === 'all' || getBranchId(customer) === branchId;
      const searchText = [
        getCustomerName(customer),
        customer?.customerId?.phone,
        customer?.branchId?.name,
        getRepName(customer),
      ].filter(Boolean).join(" ").toLowerCase();

      return branchMatch && (!normalizedSearch || searchText.includes(normalizedSearch));
    });
  }, [branchId, newCustomerRows, search]);

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-3 sm:p-5">
      <div className="mx-auto max-w-7xl space-y-4">
        <section className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-sm">
          <div className="relative p-4 sm:p-6">
            <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-orange-500/20 sm:h-40 sm:w-40" />
            <div className="relative">
              <p className="text-xs font-black uppercase text-orange-300">Customer App Usage</p>
              <h1 className="mt-1 text-2xl font-black sm:text-3xl">Customer Performance Dashboard</h1>
              <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-200">
                Track ecommerce customer logins, DS contribution performance, and SB product purchase performance across the system.
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
          <div className="rounded-2xl bg-orange-500 p-3 text-white shadow-sm sm:p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[10px] font-black uppercase text-orange-50 sm:text-xs">Customers Using App</p>
              <InfoButton id="appCustomers" activeInfo={activeInfo} setActiveInfo={setActiveInfo} text={metricHelp.appCustomers} tone="dark" align="left" />
            </div>
            <p className="mt-1 text-xl font-black sm:text-2xl">{summary.totalCustomers.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl bg-purple-700 p-3 text-white shadow-sm sm:p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[10px] font-black uppercase text-purple-100 sm:text-xs">Total Logins</p>
              <InfoButton id="totalLogins" activeInfo={activeInfo} setActiveInfo={setActiveInfo} text={metricHelp.totalLogins} tone="dark" />
            </div>
            <p className="mt-1 text-xl font-black sm:text-2xl">{summary.totalLogins.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl bg-emerald-600 p-3 text-white shadow-sm sm:p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[10px] font-black uppercase text-emerald-50 sm:text-xs">DS Performance</p>
              <InfoButton id="dsPerformance" activeInfo={activeInfo} setActiveInfo={setActiveInfo} text={metricHelp.dsPerformance} tone="dark" align="left" />
            </div>
            <p className="mt-1 text-lg font-black sm:text-2xl">{formatCurrency(summary.totalDS)}</p>
          </div>
          <div className="rounded-2xl bg-sky-600 p-3 text-white shadow-sm sm:p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[10px] font-black uppercase text-sky-50 sm:text-xs">Product Purchase</p>
              <InfoButton id="productPurchase" activeInfo={activeInfo} setActiveInfo={setActiveInfo} text={metricHelp.productPurchase} tone="dark" />
            </div>
            <p className="mt-1 text-lg font-black sm:text-2xl">{formatCurrency(summary.totalSB)}</p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          <div className="rounded-2xl border border-orange-100 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[10px] font-black uppercase text-orange-600 dark:text-orange-300 sm:text-xs">Most Active Login</p>
              <InfoButton id="mostActiveLogin" activeInfo={activeInfo} setActiveInfo={setActiveInfo} text={metricHelp.mostActiveLogin} align="left" />
            </div>
            <p className="mt-1 truncate text-sm font-black text-slate-950 dark:text-white sm:text-lg">{getCustomerName(summary.bestLoginCustomer)}</p>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-300 sm:text-sm">{Number(summary.bestLoginCustomer?.count || 0).toLocaleString()} login(s)</p>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-300 sm:text-xs">Best DS Customer</p>
              <InfoButton id="bestDSCustomer" activeInfo={activeInfo} setActiveInfo={setActiveInfo} text={metricHelp.bestDSCustomer} />
            </div>
            <p className="mt-1 truncate text-sm font-black text-slate-950 dark:text-white sm:text-lg">{getCustomerName(summary.bestDSCustomer)}</p>
            <p className="text-xs font-bold text-emerald-700 sm:text-sm">{formatCurrency(getPerformance(summary.bestDSCustomer).dsBalanceTotal)}</p>
          </div>
          <div className="rounded-2xl border border-sky-100 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[10px] font-black uppercase text-sky-600 dark:text-sky-300 sm:text-xs">Best Product Customer</p>
              <InfoButton id="bestProductCustomer" activeInfo={activeInfo} setActiveInfo={setActiveInfo} text={metricHelp.bestProductCustomer} align="left" />
            </div>
            <p className="mt-1 truncate text-sm font-black text-slate-950 dark:text-white sm:text-lg">{getCustomerName(summary.bestSBCustomer)}</p>
            <p className="text-xs font-bold text-sky-700 sm:text-sm">{formatCurrency(getPerformance(summary.bestSBCustomer).sbBalanceTotal)}</p>
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={() => setShowNewCustomersModal(true)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setShowNewCustomersModal(true);
              }
            }}
            className="rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-600 to-orange-500 p-3 text-left text-white shadow-sm transition hover:shadow-md sm:p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-[10px] font-black uppercase text-pink-50 sm:text-xs">New Customers</p>
              <InfoButton id="newCustomers" activeInfo={activeInfo} setActiveInfo={setActiveInfo} text={metricHelp.newCustomers} tone="dark" />
            </div>
            <p className="mt-1 text-2xl font-black leading-none sm:text-3xl">{newCustomers.length.toLocaleString()}</p>
            <p className="mt-1 text-xs font-bold text-pink-50 sm:text-sm">Opened in 30 days</p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="grid gap-3 md:grid-cols-[260px_1fr] md:items-end">
            <Select2
              label="Filter by Branch"
              options={branchOptions}
              value={branchId}
              onChange={setBranchId}
              className="block w-full"
            />
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase text-slate-600">Search customer</label>
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, phone, branch, or rep"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>
          </div>
        </section>

        {loading ? (
          <div className="flex h-64 items-center justify-center rounded-3xl bg-white shadow-sm">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />
          </div>
        ) : (
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-[980px] divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs font-black uppercase text-slate-500">
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Branch</th>
                    <th className="px-4 py-3">Rep</th>
                    <th className="px-4 py-3">Last Login</th>
                    <th className="px-4 py-3">Logins</th>
                    <th className="px-4 py-3">DS Total</th>
                    <th className="px-4 py-3">Product Purchase</th>
                    <th className="px-4 py-3">Combined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => {
                      const performance = getPerformance(customer);
                      return (
                        <tr key={customer?._id} className="hover:bg-orange-50/40">
                          <td className="px-4 py-4">
                            <p className="font-black text-slate-950">{getCustomerName(customer)}</p>
                            <p className="text-xs font-semibold text-slate-500">{customer?.customerId?.phone || 'N/A'}</p>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-700">{customer?.branchId?.name || 'N/A'}</td>
                          <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-700">{getRepName(customer)}</td>
                          <td className="whitespace-nowrap px-4 py-4 text-xs font-semibold text-slate-500">{formatDate(customer?.lastLogin)}</td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-black text-purple-700">
                              {Number(customer?.count || 0).toLocaleString()}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 font-black text-emerald-700">{formatCurrency(performance.dsTotal)}</td>
                          <td className="whitespace-nowrap px-4 py-4 font-black text-sky-700">{formatCurrency(performance.sbPurchaseTotal)}</td>
                          <td className="whitespace-nowrap px-4 py-4 font-black text-orange-600">{formatCurrency(performance.combinedTotal)}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-4 py-10 text-center text-sm font-semibold text-slate-500">
                        No customers found for the selected filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
      {showNewCustomersModal && (
        <CustomerAnalyticsNewCustomersModal
          customers={newCustomers}
          onClose={() => setShowNewCustomersModal(false)}
        />
      )}
    </div>
  );
};

export default ViewCustomerUsingApp;
