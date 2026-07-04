import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaTimes } from "react-icons/fa";
import { url } from "../redux/sagas/url";

const formatCurrency = (amount) => `₦${Number(amount || 0).toLocaleString()}`;

const formatDate = (value) => {
  if (!value) return "N/A";
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

const DeliveryDetailsModal = ({ title, items, isOpen, onClose, onOpenAccount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-lg bg-white shadow-xl dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
            <p className="text-sm text-gray-500 dark:text-slate-300">{items.length.toLocaleString()} product item(s)</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        <div className="max-h-[72vh] overflow-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-slate-700">
            <thead className="sticky top-0 bg-gray-50 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">SB Account</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Source</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Branch</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Qty</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Status</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Added</th>
                <th className="px-4 py-3 text-right text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {items.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-4 py-10 text-center text-gray-500 dark:text-slate-300">
                    No product item found.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-800">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900 dark:text-white">{item.customerName}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">{item.customerPhone || "N/A"}</p>
                    </td>
                    <td className="min-w-[220px] px-4 py-3 font-semibold text-gray-900 dark:text-white">{item.productName}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-slate-300">{item.SBAccountNumber}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-slate-300">{item.source || "Backoffice"}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-slate-300">{item.branchName}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-slate-300">{Number(item.quantity || 0).toLocaleString()}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">{formatCurrency(item.amount)}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-700 dark:bg-slate-700 dark:text-slate-100">
                        {item.fulfillmentStatus || "pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-slate-300">
                      <p>{formatDate(item.addedAt)}</p>
                      {item.fulfilledAt && <p className="text-xs text-emerald-600">Delivered: {formatDate(item.fulfilledAt)}</p>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => onOpenAccount(item)}
                        className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
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
      </div>
    </div>
  );
};

const BackofficeProductDeliveryCards = ({ staffId = "" }) => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({
    pending: { count: 0, items: [] },
    delivered: { count: 0, items: [] },
  });
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState("");

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${url}/api/sbaccount/reports/backoffice-product-delivery`,
        {
          ...getAuthConfig(),
          params: staffId ? { staffId } : undefined,
        }
      );
      setSummary({
        pending: response.data?.pending || { count: 0, items: [] },
        delivered: response.data?.delivered || { count: 0, items: [] },
      });
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate, staffId]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  const modalData = useMemo(() => {
    if (activeType === "delivered") {
      return {
        title: "Delivered Backoffice Products",
        items: summary.delivered.items || [],
      };
    }

    return {
      title: "Backoffice Products Not Delivered",
      items: summary.pending.items || [],
    };
  }, [activeType, summary]);

  const openAccount = (item) => {
    if (item?.actionUrl) {
      navigate(item.actionUrl);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setActiveType("pending")}
        className="relative rounded-lg bg-amber-100 p-4 text-left shadow-md transition hover:bg-amber-200"
      >
        <FaEye className="absolute right-3 top-3 text-amber-800" />
        <h3 className="pr-8 text-sm font-semibold text-amber-800">Backoffice Products Not Delivered</h3>
        <p className="mt-3 text-2xl font-bold text-amber-900">
          {loading ? "..." : Number(summary.pending.count || 0).toLocaleString()}
        </p>
        <p className="mt-2 text-xs font-semibold text-amber-700">View product details</p>
      </button>

      <button
        type="button"
        onClick={() => setActiveType("delivered")}
        className="relative rounded-lg bg-teal-100 p-4 text-left shadow-md transition hover:bg-teal-200"
      >
        <FaEye className="absolute right-3 top-3 text-teal-800" />
        <h3 className="pr-8 text-sm font-semibold text-teal-800">Backoffice Products Delivered</h3>
        <p className="mt-3 text-2xl font-bold text-teal-900">
          {loading ? "..." : Number(summary.delivered.count || 0).toLocaleString()}
        </p>
        <p className="mt-2 text-xs font-semibold text-teal-700">View product details</p>
      </button>

      <DeliveryDetailsModal
        isOpen={Boolean(activeType)}
        title={modalData.title}
        items={modalData.items}
        onClose={() => setActiveType("")}
        onOpenAccount={openAccount}
      />
    </>
  );
};

export default BackofficeProductDeliveryCards;
