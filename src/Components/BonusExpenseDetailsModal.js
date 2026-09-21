import React from "react";
import { createPortal } from "react-dom";

const formatAmount = (value) => Number(value || 0).toLocaleString("en-US");
const formatDate = (value) => {
  if (!value) return "N/A";
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return "N/A";
  return parsedDate.toLocaleString();
};

const BonusExpenseDetailsModal = ({
  isOpen,
  onClose,
  title,
  rows = [],
  loading = false,
  showDepositColumns = false,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/50 px-3 py-4 sm:px-4">
      <div className="max-h-[86vh] w-full max-w-6xl overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
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
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Bonus</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Amount</th>
                {showDepositColumns && (
                  <>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Deposit</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Rate</th>
                  </>
                )}
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Credited</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Branch</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Staff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={showDepositColumns ? 9 : 7} className="px-3 py-8 text-center text-gray-500">
                    Loading bonus details...
                  </td>
                </tr>
              ) : rows.length > 0 ? (
                rows.map((row) => (
                  <tr key={row._id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-gray-800">{row.customerName || "N/A"}</td>
                    <td className="px-3 py-2 text-gray-700">{row.phone || "N/A"}</td>
                    <td className="px-3 py-2 text-gray-700">{row.bonusType || "N/A"}</td>
                    <td className="px-3 py-2 font-medium text-gray-900">{formatAmount(row.amount)}</td>
                    {showDepositColumns && (
                      <>
                        <td className="px-3 py-2 text-gray-700">{row.depositAmount !== undefined && row.depositAmount !== null ? formatAmount(row.depositAmount) : "N/A"}</td>
                        <td className="px-3 py-2 text-gray-700">{row.percentage !== undefined && row.percentage !== null ? `${Number(row.percentage).toLocaleString("en-US")}%` : "N/A"}</td>
                      </>
                    )}
                    <td className="px-3 py-2 text-gray-700">{formatDate(row.date)}</td>
                    <td className="px-3 py-2 text-gray-700">{row.branchName || "N/A"}</td>
                    <td className="px-3 py-2 text-gray-700">{row.staffName || "Ecommerce"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={showDepositColumns ? 9 : 7} className="px-3 py-8 text-center text-gray-500">
                    No bonus records found.
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

export default BonusExpenseDetailsModal;
