import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { url } from "../redux/sagas/url";
import TableLoadingNotice from "./TableLoadingNotice";

const formatCurrency = (value) => `₦${Number(value || 0).toLocaleString("en-US")}`;

const formatDate = (value) => {
  if (!value) return "N/A";

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return "N/A";

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getName = (person) => {
  if (!person || typeof person !== "object") return "N/A";
  return `${person.firstName || ""} ${person.lastName || ""}`.trim() || "N/A";
};

const ClosedLegacySBAccounts = () => {
  const staffRole = localStorage.getItem("staffRole");
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [transactionsError, setTransactionsError] = useState("");

  useEffect(() => {
    const fetchClosedLegacyAccounts = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${url}/api/sbaccount/reports/closed-legacy`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAccounts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("authToken");
          window.location.href = "/login";
          return;
        }
        setError(error.response?.data?.message || "Failed to load closed legacy SB accounts.");
      } finally {
        setLoading(false);
      }
    };

    if (staffRole === "Admin") {
      fetchClosedLegacyAccounts();
    }
  }, [staffRole]);

  const filteredAccounts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    if (!normalizedSearch) return accounts;

    return accounts.filter((account) => {
      const customerName = getName(account.customerId).toLowerCase();
      const customerPhone = String(account.customerId?.phone || "").toLowerCase();
      const branchName = String(account.branchId?.name || account.customerId?.branchId?.name || "").toLowerCase();
      const accountNumber = String(account.SBAccountNumber || "").toLowerCase();
      const productName = String(account.productName || "").toLowerCase();

      return [customerName, customerPhone, branchName, accountNumber, productName].some((value) => (
        value.includes(normalizedSearch)
      ));
    });
  }, [accounts, searchTerm]);

  const openTransactionModal = async (account) => {
    setSelectedAccount(account);
    setTransactions([]);
    setTransactionsError("");
    setTransactionsLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${url}/api/customertransaction/${account._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
        return;
      }
      setTransactionsError(error.response?.data?.message || "Failed to load transaction history.");
    } finally {
      setTransactionsLoading(false);
    }
  };

  const closeTransactionModal = () => {
    setSelectedAccount(null);
    setTransactions([]);
    setTransactionsError("");
    setTransactionsLoading(false);
  };

  if (staffRole !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 px-3 py-4 md:px-6 md:py-6">
      <div className="mx-auto max-w-7xl space-y-4">
        <section className="overflow-hidden rounded-2xl bg-slate-950 text-white shadow-lg">
          <div className="relative p-4 md:p-6">
            <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-orange-500/25 md:h-40 md:w-40" />
            <div className="relative grid gap-4 lg:grid-cols-[1fr,auto] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase text-orange-300">Admin audit</p>
                <h1 className="mt-1 text-2xl font-black tracking-normal md:text-3xl">Closed Legacy SB Accounts</h1>
                <p className="mt-1 max-w-2xl text-sm font-semibold text-slate-200">
                  Review old SB packages that are closed and no longer shown on customer dashboards.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs md:min-w-[320px] md:text-sm">
                <div className="rounded-2xl bg-orange-500 px-3 py-2 shadow-sm">
                  <p className="text-orange-50">Closed Accounts</p>
                  <p className="mt-1 text-xl font-black text-white">{accounts.length.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-sky-600 px-3 py-2 shadow-sm">
                  <p className="text-sky-50">Showing</p>
                  <p className="mt-1 text-xl font-black text-white">{filteredAccounts.length.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:p-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr),auto] lg:items-center">
            <input
              type="text"
              placeholder="Search by customer, phone, branch, SB account, or product..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
            />
            <Link to="/customers" className="text-xs">
              <button className="w-full rounded-xl bg-slate-900 px-4 py-3 font-black text-white shadow-sm hover:bg-slate-800 lg:w-auto">
                View Customers
              </button>
            </Link>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-gradient-to-r from-orange-50 via-sky-50 to-purple-50 px-4 py-3 dark:border-slate-700 dark:from-slate-900 dark:via-slate-800 dark:to-orange-950">
            <h2 className="text-sm font-black uppercase text-slate-800 dark:text-white">Closed Legacy Records</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1080px] border-collapse">
              <thead className="bg-slate-900 text-xs font-black uppercase tracking-wide text-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">SB Account</th>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">Selling Price</th>
                  <th className="px-4 py-3 text-left">Balance</th>
                  <th className="px-4 py-3 text-left">Branch</th>
                  <th className="px-4 py-3 text-left">Created By</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Created</th>
                  <th className="px-4 py-3 text-left">Updated</th>
                  <th className="px-4 py-3 text-right">Transactions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-sm">
                {filteredAccounts.length > 0 ? (
                  filteredAccounts.map((account) => (
                    <tr key={account._id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-900">{getName(account.customerId)}</td>
                      <td className="px-4 py-3 text-slate-700">{account.customerId?.phone || "N/A"}</td>
                      <td className="px-4 py-3 font-black text-sky-700">{account.SBAccountNumber || "N/A"}</td>
                      <td className="min-w-[220px] px-4 py-3 text-slate-700">{account.productName || "N/A"}</td>
                      <td className="px-4 py-3 font-semibold text-slate-900">{formatCurrency(account.sellingPrice)}</td>
                      <td className="px-4 py-3 font-semibold text-red-600">{formatCurrency(account.balance)}</td>
                      <td className="px-4 py-3 text-slate-700">{account.branchId?.name || "N/A"}</td>
                      <td className="px-4 py-3 text-slate-700">{getName(account.createdBy)}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-black capitalize text-red-700">
                          {account.status || "closed"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-700">{formatDate(account.createdAt)}</td>
                      <td className="px-4 py-3 text-slate-700">{formatDate(account.updatedAt)}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => openTransactionModal(account)}
                          className="rounded-full bg-sky-600 px-3 py-1.5 text-xs font-black text-white shadow-sm hover:bg-sky-700"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="px-4 py-10 text-center text-sm font-semibold text-slate-500">
                      {loading ? "Loading closed legacy SB accounts..." : "No closed legacy SB accounts found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {loading && <TableLoadingNotice message="Loading closed legacy SB accounts..." />}
        {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>}
      </div>

      {selectedAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3">
          <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-slate-950 px-4 py-4 text-white dark:border-slate-700">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase text-orange-300">Closed legacy SB transactions</p>
                <h2 className="mt-1 truncate text-lg font-black">
                  {selectedAccount.SBAccountNumber || "N/A"}
                </h2>
                <p className="mt-1 truncate text-xs font-semibold text-slate-200">
                  {getName(selectedAccount.customerId)} | {selectedAccount.productName || "N/A"}
                </p>
              </div>
              <button
                type="button"
                onClick={closeTransactionModal}
                className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-xs font-black text-white hover:bg-white/20"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 md:p-4">
              {transactionsLoading ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-12 text-center text-sm font-semibold text-slate-500 dark:bg-slate-900">
                  <div className="mx-auto mb-3 h-9 w-9 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />
                  <p>Loading transaction history...</p>
                </div>
              ) : transactionsError ? (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                  {transactionsError}
                </p>
              ) : transactions.length > 0 ? (
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full min-w-[860px] border-collapse">
                    <thead className="bg-slate-900 text-xs font-black uppercase tracking-wide text-slate-100">
                      <tr>
                        <th className="px-4 py-3 text-left">Date</th>
                        <th className="px-4 py-3 text-left">Narration</th>
                        <th className="px-4 py-3 text-left">Type</th>
                        <th className="px-4 py-3 text-left">Amount</th>
                        <th className="px-4 py-3 text-left">Balance</th>
                        <th className="px-4 py-3 text-left">Created By</th>
                        <th className="px-4 py-3 text-left">Reference</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-sm dark:bg-slate-900">
                      {transactions.map((transaction) => {
                        const isDebit = ["Debit", "Charge"].includes(transaction.direction);

                        return (
                          <tr key={transaction._id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                            <td className="whitespace-nowrap px-4 py-3 text-slate-700 dark:text-slate-200">
                              {transaction.date || formatDate(transaction.createdAt)}
                            </td>
                            <td className="min-w-[240px] px-4 py-3 font-semibold text-slate-900 dark:text-white">
                              {transaction.narration || "N/A"}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`rounded-full px-3 py-1 text-xs font-black ${
                                isDebit
                                  ? "bg-red-100 text-red-700"
                                  : "bg-emerald-100 text-emerald-700"
                              }`}>
                                {transaction.direction || "N/A"}
                              </span>
                            </td>
                            <td className={`whitespace-nowrap px-4 py-3 font-black ${
                              isDebit ? "text-red-600" : "text-emerald-600"
                            }`}>
                              {isDebit ? "-" : "+"}{formatCurrency(transaction.amount)}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-900 dark:text-white">
                              {formatCurrency(transaction.balance)}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 text-slate-700 dark:text-slate-200">
                              {transaction.createdByName || transaction.createdBy || "N/A"}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500 dark:text-slate-300">
                              {transaction.transactionRef || "N/A"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                  No transactions found for this closed legacy SB account.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClosedLegacySBAccounts;
