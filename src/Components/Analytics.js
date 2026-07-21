import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { url } from "../redux/sagas/url";

const formatMoney = (value) => `₦${Number(value || 0).toLocaleString("en-US")}`;
const formatNumber = (value) => Number(value || 0).toLocaleString("en-US");
const formatRoleDisplay = (role) => {
  if (role === "Agent") return "Rep";
  if (role === "Manager") return "Secretary";
  if (role === "ProductManager" || role === "Product Manager") return "Product Secretary";
  if (role === "OnlineRep") return "Online Rep";
  return role;
};

const StatCard = ({ label, value, helper, tone = "indigo" }) => {
  const tones = {
    indigo: "border-indigo-100 bg-indigo-50 text-indigo-800",
    green: "border-emerald-100 bg-emerald-50 text-emerald-800",
    orange: "border-orange-100 bg-orange-50 text-orange-800",
    red: "border-red-100 bg-red-50 text-red-800",
    slate: "border-slate-200 bg-slate-50 text-slate-800",
  };

  return (
    <div className={`rounded-lg border p-4 ${tones[tone] || tones.indigo}`}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-75">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      {helper && <p className="mt-1 text-xs opacity-80">{helper}</p>}
    </div>
  );
};

const Breakdown = ({ title, data }) => {
  const entries = Object.entries(data || {}).sort((a, b) => b[1] - a[1]);
  return (
    <div className="rounded-lg border bg-white p-4">
      <h3 className="text-sm font-bold text-gray-900">{title}</h3>
      <div className="mt-3 space-y-2">
        {entries.length === 0 && <p className="text-sm text-gray-500">No data</p>}
        {entries.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 text-sm">
            <span className="capitalize text-gray-600">{formatRoleDisplay(label).replace("_", " ")}</span>
            <span className="font-semibold text-gray-900">{formatNumber(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DataTable = ({ title, columns, rows, emptyText = "No data" }) => (
  <div className="rounded-lg border bg-white p-4">
    <h3 className="mb-3 text-sm font-bold text-gray-900">{title}</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-3 py-2 text-left text-xs font-semibold uppercase text-gray-500">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-3 py-6 text-center text-gray-500">
                {emptyText}
              </td>
            </tr>
          )}
          {rows.map((row, index) => (
            <tr key={row.id || row.productId || row.branchId || row.staffId || index}>
              {columns.map((column) => (
                <td key={column.key} className="px-3 py-2 text-gray-700">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const staffRole = localStorage.getItem("staffRole");

  useEffect(() => {
    if (staffRole !== "Admin") return;

    const fetchAnalytics = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${url}/api/analytics?days=${days}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnalytics(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [days, staffRole]);

  const trendMax = useMemo(() => {
    const values = analytics?.recentDailyTrend?.map((item) => item.ecommerceValue) || [];
    return Math.max(...values, 1);
  }, [analytics]);

  if (staffRole !== "Admin") {
    return <div className="p-6 text-sm text-red-600">Analytics is only available to Admin users.</div>;
  }

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading analytics...</div>;
  }

  if (error) {
    return <div className="m-6 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>;
  }

  if (!analytics) {
    return <div className="p-6 text-sm text-gray-500">No analytics available.</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500">
            Business-wide decision dashboard. Generated {new Date(analytics.generatedAt).toLocaleString()}.
          </p>
        </div>
        <select
          value={days}
          onChange={(event) => setDays(Number(event.target.value))}
          className="w-full rounded border px-3 py-2 text-sm md:w-48"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Customers" value={formatNumber(analytics.overview.customers)} helper={`${formatNumber(analytics.overview.walletAccounts)} wallet accounts`} />
        <StatCard label="Wallet Available" value={formatMoney(analytics.finance.walletAvailable)} helper={`Ledger ${formatMoney(analytics.finance.walletLedger)}`} tone="green" />
        <StatCard label="Ecommerce Outstanding" value={formatMoney(analytics.ecommerce.outstandingValue)} helper={`${formatNumber(analytics.ecommerce.uncompletedOrders)} uncompleted orders`} tone="orange" />
        <StatCard label="Net Movement" value={formatMoney(analytics.finance.netMovement)} helper={`Period: ${analytics.period.days} days`} tone={analytics.finance.netMovement >= 0 ? "green" : "red"} />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <StatCard label="DS Contributions" value={formatMoney(analytics.finance.dsTotalContribution)} helper={`${formatNumber(analytics.accounts.ds.total)} DS accounts`} tone="slate" />
        <StatCard label="SB Collected" value={formatMoney(analytics.finance.sbCollectedValue)} helper={`${formatMoney(analytics.finance.sbOutstandingValue)} outstanding`} tone="indigo" />
        <StatCard label="FD Principal" value={formatMoney(analytics.finance.fdPrincipal)} helper={`Maturity value ${formatMoney(analytics.finance.fdMaturityValue)}`} tone="green" />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-4">
        <Breakdown title="Order Status" data={analytics.ecommerce.statusBreakdown} />
        <Breakdown title="Payment Status" data={analytics.ecommerce.paymentBreakdown} />
        <Breakdown title="Staff Roles" data={analytics.staffRoleBreakdown} />
        <Breakdown title="Product Status" data={{ active: analytics.overview.activeProducts, inactive: analytics.overview.inactiveProducts }} />
      </div>

      <div className="mb-6 rounded-lg border bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">Ecommerce Value Trend</h3>
          <span className="text-xs text-gray-500">{analytics.period.days} days</span>
        </div>
        <div className="flex h-40 items-end gap-1 overflow-x-auto">
          {analytics.recentDailyTrend.map((day) => (
            <div key={day.date} className="flex min-w-8 flex-1 flex-col items-center gap-1">
              <div
                title={`${day.date}: ${formatMoney(day.ecommerceValue)}`}
                className="w-full rounded-t bg-indigo-500"
                style={{ height: `${Math.max(4, (day.ecommerceValue / trendMax) * 140)}px` }}
              />
              <span className="text-[10px] text-gray-400">{day.date.slice(5)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <DataTable
          title="Products Customers Are Waiting For"
          rows={analytics.productDemand}
          columns={[
            { key: "productName", label: "Product" },
            { key: "activeOrderCount", label: "Orders", render: (row) => formatNumber(row.activeOrderCount) },
            { key: "activeCustomerCount", label: "Customers", render: (row) => formatNumber(row.activeCustomerCount) },
            { key: "totalQuantity", label: "Qty", render: (row) => formatNumber(row.totalQuantity) },
            { key: "outstanding", label: "Outstanding", render: (row) => formatMoney(row.outstanding) },
          ]}
        />
        <DataTable
          title="Top Selling Products"
          rows={analytics.topSellingProducts}
          columns={[
            { key: "productName", label: "Product" },
            { key: "quantity", label: "Qty", render: (row) => formatNumber(row.quantity) },
            { key: "value", label: "Value", render: (row) => formatMoney(row.value) },
          ]}
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <DataTable
          title="Branch Performance"
          rows={analytics.branchPerformance}
          columns={[
            { key: "branchName", label: "Branch" },
            { key: "customers", label: "Customers", render: (row) => formatNumber(row.customers) },
            { key: "walletAvailable", label: "Wallets", render: (row) => formatMoney(row.walletAvailable) },
            { key: "ecommerceValue", label: "Ecommerce", render: (row) => formatMoney(row.ecommerceValue) },
            { key: "expenditures", label: "Expenses", render: (row) => formatMoney(row.expenditures) },
          ]}
        />
        <DataTable
          title="Rep Performance"
          rows={analytics.repPerformance}
          columns={[
            { key: "staffName", label: "Rep" },
            { key: "branchName", label: "Branch" },
            { key: "customers", label: "Customers", render: (row) => formatNumber(row.customers) },
            { key: "ecommerceOrders", label: "Orders", render: (row) => formatNumber(row.ecommerceOrders) },
            { key: "ecommerceValue", label: "Value", render: (row) => formatMoney(row.ecommerceValue) },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Breakdown title="DS Account Status" data={analytics.accounts.ds.statusBreakdown} />
        <Breakdown title="SB Account Status" data={analytics.accounts.sb.statusBreakdown} />
        <Breakdown title="FD Account Status" data={analytics.accounts.fd.statusBreakdown} />
      </div>
    </div>
  );
};

export default Analytics;
