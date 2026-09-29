import React from "react";
import { createPortal } from "react-dom";

const formatAmount = (value) => Number(value || 0).toLocaleString("en-US");

const formatDate = (value) => {
  if (!value) return "N/A";
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return "N/A";
  return parsedDate.toLocaleDateString();
};

const NonPayingCustomersModal = ({ isOpen, onClose, title, customers = [], loading = false }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/50 px-3 py-4 sm:px-4">
      <div className="max-h-[86vh] w-full max-w-7xl overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-base font-semibold text-gray-900 sm:text-lg">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        <div className="max-h-[70vh] overflow-auto p-4">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Customer</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Phone</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Type</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Source</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Account/Order</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Last Payment</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Days</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Outstanding</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Branch</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Staff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={10} className="px-3 py-8 text-center text-gray-500">
                    Loading customers...
                  </td>
                </tr>
              ) : customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={`${customer.source}-${customer.id}`} className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-gray-800">{customer.customerName || "N/A"}</td>
                    <td className="px-3 py-2 text-gray-700">{customer.phone || "N/A"}</td>
                    <td className="px-3 py-2 font-medium text-gray-900">{customer.type || "N/A"}</td>
                    <td className="px-3 py-2 text-gray-700">{customer.source || "N/A"}</td>
                    <td className="px-3 py-2 text-gray-700">{customer.accountNumber || "N/A"}</td>
                    <td className="px-3 py-2 text-gray-700">{formatDate(customer.lastPaymentDate)}</td>
                    <td className="px-3 py-2 text-gray-700">{customer.daysSinceLastPayment || 0}</td>
                    <td className="px-3 py-2 font-medium text-gray-900">{formatAmount(customer.outstandingBalance)}</td>
                    <td className="px-3 py-2 text-gray-700">{customer.branchName || "N/A"}</td>
                    <td className="px-3 py-2 text-gray-700">{customer.staffName || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="px-3 py-8 text-center text-gray-500">
                    No non-paying customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default NonPayingCustomersModal;
