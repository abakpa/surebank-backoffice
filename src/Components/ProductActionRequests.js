import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../redux/sagas/url";
import TableLoadingNotice from "./TableLoadingNotice";

const formatCurrency = (amount) => `₦${Number(amount || 0).toLocaleString()}`;

const formatDate = (value) => {
  if (!value) return "N/A";
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

const ProductActionRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${url}/api/ecommerce/orders/product-action-requests`,
        getAuthConfig()
      );
      setRequests(response.data?.items || []);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
        return;
      }
      setError(err.response?.data?.message || "Failed to load product action requests");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const filteredRequests = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return requests.filter((request) => {
      const matchesSource = !sourceFilter || request.source === sourceFilter;
      const matchesSearch = !query || [
        request.customerName,
        request.customerPhone,
        request.productName,
        request.orderNumber,
        request.SBAccountNumber,
      ].some((value) => String(value || "").toLowerCase().includes(query));

      return matchesSource && matchesSearch;
    });
  }, [requests, searchTerm, sourceFilter]);

  const handleOpen = (request) => {
    if (request.actionUrl) {
      navigate(request.actionUrl);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Product Action Requests</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-slate-300">
            Paid product items waiting for staff fulfilment action.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchRequests}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Refresh
        </button>
      </div>

      <div className="mb-5 grid gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:grid-cols-[1fr_220px]">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search customer, phone, product, order or SB account"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
        <select
          value={sourceFilter}
          onChange={(event) => setSourceFilter(event.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        >
          <option value="">All Sources</option>
          <option value="ecommerce">Ecommerce</option>
          <option value="backoffice">Backoffice</option>
        </select>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-indigo-50 p-4 text-indigo-900">
          <p className="text-xs font-semibold uppercase tracking-wide">Total Requests</p>
          <p className="mt-2 text-2xl font-bold">{requests.length.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-emerald-50 p-4 text-emerald-900">
          <p className="text-xs font-semibold uppercase tracking-wide">Ecommerce</p>
          <p className="mt-2 text-2xl font-bold">
            {requests.filter((request) => request.source === "ecommerce").length.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl bg-amber-50 p-4 text-amber-900">
          <p className="text-xs font-semibold uppercase tracking-wide">Backoffice</p>
          <p className="mt-2 text-2xl font-bold">
            {requests.filter((request) => request.source === "backoffice").length.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Product</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Source</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Reference</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Qty</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Paid</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Status</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Paid At</th>
              <th className="px-4 py-3 text-right text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm dark:divide-slate-700">
            {loading ? (
              <tr>
                <td colSpan="10">
                  <TableLoadingNotice message="Loading product action requests..." />
                </td>
              </tr>
            ) : filteredRequests.length === 0 ? (
              <tr>
                <td colSpan="10" className="px-4 py-10 text-center text-sm text-gray-500 dark:text-slate-300">
                  No paid product action requests found.
                </td>
              </tr>
            ) : (
              filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-slate-800">
                  <td className="px-4 py-4">
                    <p className="font-semibold text-gray-900 dark:text-white">{request.customerName}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">{request.customerPhone}</p>
                  </td>
                  <td className="min-w-[220px] px-4 py-4">
                    <p className="font-semibold text-gray-900 dark:text-white">{request.productName}</p>
                    {request.variationName && (
                      <p className="text-xs text-gray-500 dark:text-slate-400">{request.variationName}</p>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      request.source === "ecommerce"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {request.sourceLabel}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-700 dark:text-slate-200">
                    {request.orderNumber || request.SBAccountNumber}
                  </td>
                  <td className="px-4 py-4">{request.quantity}</td>
                  <td className="whitespace-nowrap px-4 py-4 font-semibold">{formatCurrency(request.amount)}</td>
                  <td className="whitespace-nowrap px-4 py-4 font-semibold text-emerald-700">{formatCurrency(request.paidAmount)}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold capitalize text-slate-700">
                      {request.fulfillmentStatus || "pending"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600 dark:text-slate-300">{formatDate(request.paidAt)}</td>
                  <td className="px-4 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleOpen(request)}
                      className="rounded-lg bg-gray-900 px-3 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Link to="/dashboard" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
};

export default ProductActionRequests;
