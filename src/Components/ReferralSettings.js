import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { url } from "../redux/sagas/url";

const formatCurrency = (amount) => `₦${Number(amount || 0).toLocaleString()}`;
const getCustomerName = (customer) => (
  [customer?.firstName, customer?.lastName].filter(Boolean).join(" ").trim() || "Unknown customer"
);

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

const ReferralSettings = () => {
  const role = localStorage.getItem("staffRole");
  const isAdmin = role === "Admin";
  const [summary, setSummary] = useState(null);
  const [percentage, setPercentage] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [loginBonusEnabled, setLoginBonusEnabled] = useState(false);
  const [loginBonusAmount, setLoginBonusAmount] = useState("");
  const [transactionBonusEnabled, setTransactionBonusEnabled] = useState(false);
  const [transactionBonusPercentage, setTransactionBonusPercentage] = useState("");
  const [rootCustomers, setRootCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [repairOrderNumber, setRepairOrderNumber] = useState("");
  const [ledgerPage, setLedgerPage] = useState(1);
  const [ledgerLimit, setLedgerLimit] = useState(25);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selectedRootIds = useMemo(
    () => new Set(rootCustomers.map((customer) => String(customer._id))),
    [rootCustomers]
  );

  const loadSummary = async (page = ledgerPage, limit = ledgerLimit) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${url}/api/referrals/admin`, {
        ...getAuthConfig(),
        params: { page, limit },
      });
      setSummary(response.data);
      setPercentage(String(response.data?.settings?.incentivePercentage || 0));
      setEnabled(Boolean(response.data?.settings?.enabled));
      setLoginBonusEnabled(Boolean(response.data?.settings?.loginBonusEnabled));
      setLoginBonusAmount(String(response.data?.settings?.loginBonusAmount || 0));
      setTransactionBonusEnabled(Boolean(response.data?.settings?.transactionBonusEnabled));
      setTransactionBonusPercentage(String(response.data?.settings?.transactionBonusPercentage || 0));
      setRootCustomers(response.data?.settings?.rootCustomers || []);
      setLedgerPage(Number(response.data?.totals?.page || page));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load referral settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSummary(ledgerPage, ledgerLimit);
  }, [ledgerPage, ledgerLimit]);

  const searchCustomers = async () => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }

    setError("");
    try {
      const response = await axios.get(`${url}/api/referrals/admin/customers`, {
        ...getAuthConfig(),
        params: { search },
      });
      setSearchResults(response.data?.customers || []);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to search customers");
    }
  };

  const addRootCustomer = (customer) => {
    if (selectedRootIds.has(String(customer._id))) return;
    setRootCustomers((current) => [...current, { ...customer, position: current.length + 1 }]);
  };

  const removeRootCustomer = (customerId) => {
    setRootCustomers((current) => current.filter((customer) => String(customer._id) !== String(customerId)));
  };

  const moveRootCustomer = (index, direction) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= rootCustomers.length) return;
    const next = [...rootCustomers];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    setRootCustomers(next.map((customer, itemIndex) => ({ ...customer, position: itemIndex + 1 })));
  };

  const saveSettings = async () => {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const response = await axios.put(
        `${url}/api/referrals/admin/settings`,
        {
          enabled,
          incentivePercentage: Number(percentage || 0),
          loginBonusEnabled,
          loginBonusAmount: Number(loginBonusAmount || 0),
          transactionBonusEnabled,
          transactionBonusPercentage: Number(transactionBonusPercentage || 0),
          rootCustomerIds: rootCustomers.map((customer) => customer._id),
        },
        getAuthConfig()
      );
      setSummary(response.data);
      setRootCustomers(response.data?.settings?.rootCustomers || []);
      setMessage(response.data?.message || "Referral settings updated");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to save referral settings");
    } finally {
      setSaving(false);
    }
  };

  const creditPaidOrder = async () => {
    if (!repairOrderNumber.trim()) {
      setError("Enter the paid order number to process");
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");
    try {
      const response = await axios.post(
        `${url}/api/referrals/admin/credit-paid-order`,
        { orderNumber: repairOrderNumber.trim() },
        getAuthConfig()
      );
      setMessage(response.data?.message || "Referral incentive processed");
      setRepairOrderNumber("");
      await loadSummary(ledgerPage, ledgerLimit);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to process paid order");
    } finally {
      setSaving(false);
    }
  };

  const ledgers = summary?.ledgers || [];
  const totalPages = Number(summary?.totals?.totalPages || 1);
  const totalLedgers = Number(summary?.totals?.totalLedgers || 0);
  const pageStart = totalLedgers === 0 ? 0 : ((ledgerPage - 1) * ledgerLimit) + 1;
  const pageEnd = Math.min(ledgerPage * ledgerLimit, totalLedgers);

  const changeLedgerLimit = (event) => {
    setLedgerLimit(Number(event.target.value));
    setLedgerPage(1);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-5">
        <h1 className="text-2xl font-black text-slate-950 dark:text-white">Referral Incentives</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
          Configure referral sharing and view credited incentive records.
        </p>
      </div>

      {message && <div className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">{message}</div>}
      {error && <div className="mb-4 rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</div>}

      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-950 dark:text-white">Settings</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                Incentives are shared equally across the ordered root chain and customer referral chain.
              </p>
            </div>
            {!isAdmin && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                View only
              </span>
            )}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Incentive Percentage</span>
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={percentage}
                disabled={!isAdmin}
                onChange={(event) => setPercentage(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-500 disabled:bg-slate-100"
              />
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <input
                type="checkbox"
                checked={enabled}
                disabled={!isAdmin}
                onChange={(event) => setEnabled(event.target.checked)}
                className="h-5 w-5"
              />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Referral incentives enabled</span>
            </label>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">First Login Bonus Amount</span>
              <input
                type="number"
                min="0"
                step="100"
                value={loginBonusAmount}
                disabled={!isAdmin}
                onChange={(event) => setLoginBonusAmount(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-500 disabled:bg-slate-100"
              />
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <input
                type="checkbox"
                checked={loginBonusEnabled}
                disabled={!isAdmin}
                onChange={(event) => setLoginBonusEnabled(event.target.checked)}
                className="h-5 w-5"
              />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">First login bonus enabled</span>
            </label>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Transaction Bonus Percentage</span>
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={transactionBonusPercentage}
                disabled={!isAdmin}
                onChange={(event) => setTransactionBonusPercentage(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-500 disabled:bg-slate-100"
              />
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <input
                type="checkbox"
                checked={transactionBonusEnabled}
                disabled={!isAdmin}
                onChange={(event) => setTransactionBonusEnabled(event.target.checked)}
                className="h-5 w-5"
              />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Transaction bonus enabled</span>
            </label>
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-black uppercase text-slate-500">Root Customers</h3>
            <div className="mt-3 space-y-2">
              {rootCustomers.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
                  No root customer has been configured.
                </div>
              ) : rootCustomers.map((customer, index) => (
                <div key={customer._id} className="flex flex-col gap-3 rounded-xl border border-slate-100 p-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-bold text-slate-950 dark:text-white">{index + 1}. {getCustomerName(customer)}</p>
                    <p className="text-sm text-slate-500">{customer.phone}</p>
                  </div>
                  {isAdmin && (
                    <div className="flex gap-2">
                      <button type="button" onClick={() => moveRootCustomer(index, -1)} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold">Up</button>
                      <button type="button" onClick={() => moveRootCustomer(index, 1)} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold">Down</button>
                      <button type="button" onClick={() => removeRootCustomer(customer._id)} className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700">Remove</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {isAdmin && (
            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search customer by name, phone, or email"
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-500"
                />
                <button type="button" onClick={searchCustomers} className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">
                  Search
                </button>
              </div>
              {searchResults.length > 0 && (
                <div className="mt-3 grid gap-2">
                  {searchResults.map((customer) => (
                    <button
                      key={customer._id}
                      type="button"
                      onClick={() => addRootCustomer(customer)}
                      disabled={selectedRootIds.has(String(customer._id))}
                      className="rounded-xl bg-white p-3 text-left text-sm shadow-sm disabled:opacity-50"
                    >
                      <span className="font-bold text-slate-950">{getCustomerName(customer)}</span>
                      <span className="ml-2 text-slate-500">{customer.phone}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {isAdmin && (
            <button
              type="button"
              onClick={saveSettings}
              disabled={saving}
              className="mt-5 w-full rounded-xl bg-orange-500 px-5 py-3 text-sm font-black text-white hover:bg-orange-600 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Referral Settings"}
            </button>
          )}
        </section>

        <section className="grid gap-4">
          <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
            <p className="text-sm font-bold text-slate-500">Total Credited</p>
            <p className="mt-1 text-3xl font-black text-emerald-700">{formatCurrency(summary?.totals?.totalCredited)}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
            <p className="text-sm font-bold text-slate-500">Ledger Records</p>
            <p className="mt-1 text-3xl font-black text-slate-950 dark:text-white">
              {loading ? "..." : Number(summary?.totals?.totalLedgers || 0).toLocaleString()}
            </p>
          </div>
          {isAdmin && (
            <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
              <h2 className="text-base font-black text-slate-950 dark:text-white">Process Paid Order</h2>
              <p className="mt-1 text-sm text-slate-500">
                Use this for a fully paid order that missed referral crediting.
              </p>
              <input
                type="text"
                value={repairOrderNumber}
                onChange={(event) => setRepairOrderNumber(event.target.value)}
                placeholder="Order number"
                className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-500"
              />
              <button
                type="button"
                onClick={creditPaidOrder}
                disabled={saving}
                className="mt-3 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-black text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                Process Referral Incentive
              </button>
            </div>
          )}
        </section>
      </div>

      <section className="mt-5 rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-950 dark:text-white">Credited Incentives</h2>
            <p className="mt-1 text-sm text-slate-500">
              Showing {pageStart.toLocaleString()}-{pageEnd.toLocaleString()} of {totalLedgers.toLocaleString()} records
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">
            Rows
            <select
              value={ledgerLimit}
              onChange={changeLedgerLimit}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500 dark:bg-slate-950"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </label>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b text-xs uppercase text-slate-500">
                <th className="px-3 py-3">Beneficiary</th>
                <th className="px-3 py-3">Buyer</th>
                <th className="px-3 py-3">Order</th>
                <th className="px-3 py-3">Pool</th>
                <th className="px-3 py-3">Share</th>
                <th className="px-3 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {ledgers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-3 py-8 text-center text-slate-500">No referral incentive has been credited yet.</td>
                </tr>
              ) : ledgers.map((ledger) => (
                <tr key={ledger._id} className="border-b border-slate-100">
                  <td className="px-3 py-3">
                    <p className="font-bold text-slate-900 dark:text-white">{getCustomerName(ledger.beneficiary)}</p>
                    <p className="text-xs text-slate-500">{ledger.beneficiary?.phone}</p>
                  </td>
                  <td className="px-3 py-3">
                    <p className="font-bold text-slate-900 dark:text-white">{getCustomerName(ledger.buyer)}</p>
                    <p className="text-xs text-slate-500">{ledger.buyer?.phone}</p>
                  </td>
                  <td className="px-3 py-3 font-semibold">{ledger.sourceOrderNumber}</td>
                  <td className="px-3 py-3">{formatCurrency(ledger.incentivePool)}</td>
                  <td className="px-3 py-3 font-black text-emerald-700">{formatCurrency(ledger.amount)}</td>
                  <td className="px-3 py-3">{ledger.creditedAt ? new Date(ledger.creditedAt).toLocaleDateString() : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalLedgers > 0 && (
          <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate-500">
              Page {ledgerPage.toLocaleString()} of {totalPages.toLocaleString()}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLedgerPage(1)}
                disabled={loading || ledgerPage <= 1}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-200"
              >
                First
              </button>
              <button
                type="button"
                onClick={() => setLedgerPage((current) => Math.max(current - 1, 1))}
                disabled={loading || ledgerPage <= 1}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-200"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setLedgerPage((current) => Math.min(current + 1, totalPages))}
                disabled={loading || ledgerPage >= totalPages}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-200"
              >
                Next
              </button>
              <button
                type="button"
                onClick={() => setLedgerPage(totalPages)}
                disabled={loading || ledgerPage >= totalPages}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-200"
              >
                Last
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ReferralSettings;
