import React from "react";

const formatAmount = (value) => Number(value || 0).toLocaleString("en-US");
const formatDate = (value) => {
  if (!value) return "N/A";
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return "N/A";
  return parsedDate.toLocaleString();
};

const EcommerceDepositDetailsModal = ({
  isOpen,
  onClose,
  title,
  transactions = [],
  showBranch = false,
  showStaff = false,
  showPackage = false,
  showAccountNumber = false,
  showDSAccountNumber = false,
  showAccountType = false,
  showBalance = false,
  emptyMessage = "No transactions found.",
}) => {
  if (!isOpen) return null;

  const extraColumnCount = [
    showPackage,
    showAccountNumber,
    showDSAccountNumber,
    showAccountType,
    showBalance,
    showBranch,
    showStaff,
  ].filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="max-h-[85vh] w-full max-w-6xl overflow-hidden rounded-xl bg-white shadow-2xl">
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
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Narration</th>
                {showPackage && (
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Package</th>
                )}
                {showAccountNumber && (
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Account No.</th>
                )}
                {showDSAccountNumber && (
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">DS Account</th>
                )}
                {showAccountType && (
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Account Type</th>
                )}
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Amount</th>
                {showBalance && (
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Balance</th>
                )}
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Date</th>
                {showBranch && (
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Branch</th>
                )}
                {showStaff && (
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Staff</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction._id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-gray-800">{transaction.customerName || "N/A"}</td>
                    <td className="px-3 py-2 text-gray-700">{transaction.narration || "N/A"}</td>
                    {showPackage && (
                      <td className="px-3 py-2 text-gray-700">{transaction.packageName || transaction.package || "N/A"}</td>
                    )}
                    {showAccountNumber && (
                      <td className="px-3 py-2 text-gray-700">{transaction.accountNumber || "N/A"}</td>
                    )}
                    {showDSAccountNumber && (
                      <td className="px-3 py-2 text-gray-700">{transaction.dsAccountNumber || "N/A"}</td>
                    )}
                    {showAccountType && (
                      <td className="px-3 py-2 text-gray-700">{transaction.accountType || "N/A"}</td>
                    )}
                    <td className="px-3 py-2 font-medium text-gray-900">
                      {formatAmount(transaction.amount)}
                    </td>
                    {showBalance && (
                      <td className="px-3 py-2 font-medium text-gray-900">
                        {formatAmount(transaction.balance)}
                      </td>
                    )}
                    <td className="px-3 py-2 text-gray-700">{formatDate(transaction.date)}</td>
                    {showBranch && (
                      <td className="px-3 py-2 text-gray-700">{transaction.branchName || "N/A"}</td>
                    )}
                    {showStaff && (
                      <td className="px-3 py-2 text-gray-700">{transaction.staffName || "Ecommerce"}</td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4 + extraColumnCount}
                    className="px-3 py-8 text-center text-gray-500"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EcommerceDepositDetailsModal;
