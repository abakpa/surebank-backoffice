import React, { useState } from "react";
import axios from "axios";
import { url } from "../redux/sagas/url";

const formatCurrency = (amount) => `₦${Number(amount || 0).toLocaleString()}`;

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

const PaystackReconciliation = () => {
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setResult(null);

    const trimmedReference = reference.trim();
    if (!trimmedReference) {
      setError("Enter a Paystack reference");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${url}/api/ecommerce/orders/paystack/reconcile`,
        { reference: trimmedReference },
        getAuthConfig()
      );
      setMessage(response.data?.message || "Payment reconciled successfully");
      setResult(response.data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to reconcile this payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-5">
        <h1 className="text-2xl font-black text-slate-950 dark:text-white">Paystack Reconciliation</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
          Verify a successful Paystack reference and process the matching wallet, DS package, order, or order-deposit record.
        </p>
      </div>

      {message && <div className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">{message}</div>}
      {error && <div className="mb-4 rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</div>}

      <section className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
        <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            type="text"
            value={reference}
            onChange={(event) => setReference(event.target.value)}
            placeholder="Paste Paystack reference"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-500 dark:bg-slate-950 dark:text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-black text-white hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? "Reconciling..." : "Reconcile"}
          </button>
        </form>
      </section>

      {result && (
        <section className="mt-5 rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
          <h2 className="text-lg font-black text-slate-950 dark:text-white">Result</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
              <p className="text-xs font-bold uppercase text-slate-500">Type</p>
              <p className="mt-1 font-black text-slate-950 dark:text-white">{result.type || "Unknown"}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
              <p className="text-xs font-bold uppercase text-slate-500">Reference</p>
              <p className="mt-1 break-words font-black text-slate-950 dark:text-white">{result.reference}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
              <p className="text-xs font-bold uppercase text-slate-500">Amount</p>
              <p className="mt-1 font-black text-emerald-700">{formatCurrency(result.amount)}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
              <p className="text-xs font-bold uppercase text-slate-500">Paid At</p>
              <p className="mt-1 font-black text-slate-950 dark:text-white">
                {result.paidAt ? new Date(result.paidAt).toLocaleString() : "Not available"}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PaystackReconciliation;
