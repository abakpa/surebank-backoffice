const formatCurrency = (value) => `₦${Number(value || 0).toLocaleString("en-US")}`;

const formatDate = (value) => {
    if (!value) return "N/A";
    return new Date(value).toLocaleDateString();
};

const getCustomerName = (customer) => (
    [customer?.customerId?.firstName, customer?.customerId?.lastName].filter(Boolean).join(" ") || "Unknown Customer"
);

const getRepName = (customer) => (
    [customer?.accountManager?.firstName, customer?.accountManager?.lastName].filter(Boolean).join(" ") || "Ecommerce"
);

const getPeriodPerformance = (customer) => customer?.performance?.last30Days || {};

const CustomerAnalyticsNewCustomersModal = ({ customers = [], onClose, showBranch = true, showRep = true }) => {
    const totalSaved = customers.reduce((sum, customer) => (
        sum + Number(getPeriodPerformance(customer).combinedTotal || 0)
    ), 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3">
            <div className="flex max-h-full w-full max-w-md flex-col overflow-hidden rounded-3xl bg-slate-50 shadow-2xl md:max-w-6xl">
                <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4">
                    <div className="min-w-0">
                        <p className="text-xs font-black uppercase text-orange-600">Last 30 days</p>
                        <h2 className="mt-0.5 text-lg font-black text-slate-950">New Customers</h2>
                        <p className="mt-1 text-xs font-bold text-slate-500">
                            {customers.length.toLocaleString()} customer{customers.length === 1 ? '' : 's'} - {formatCurrency(totalSaved)} saved or purchased in this period
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700"
                    >
                        Close
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-3">
                    <div className="space-y-3 md:hidden">
                        {customers.length > 0 ? (
                            customers.map((customer) => {
                                const period = getPeriodPerformance(customer);

                                return (
                                    <div key={customer?._id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                        <div className="bg-gradient-to-r from-orange-600 to-slate-900 p-3 text-white">
                                            <p className="truncate font-black">{getCustomerName(customer)}</p>
                                            <p className="text-xs font-semibold text-orange-50">{customer?.customerId?.phone || 'N/A'}</p>
                                        </div>
                                        <div className="grid gap-2 p-3 text-sm">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="rounded-xl bg-orange-50 p-2">
                                                    <p className="text-xs font-black text-orange-700">Opened</p>
                                                    <p className="font-bold text-slate-900">{formatDate(customer?.customerId?.createdAt)}</p>
                                                </div>
                                                <div className="rounded-xl bg-purple-50 p-2">
                                                    <p className="text-xs font-black text-purple-700">Logins</p>
                                                    <p className="font-bold text-slate-900">{Number(customer?.count || 0).toLocaleString()}</p>
                                                </div>
                                            </div>
                                            {showBranch && (
                                                <p className="text-slate-600"><span className="font-bold text-slate-950">Branch:</span> {customer?.branchId?.name || 'N/A'}</p>
                                            )}
                                            {showRep && (
                                                <p className="text-slate-600"><span className="font-bold text-slate-950">Rep:</span> {getRepName(customer)}</p>
                                            )}
                                            <div className="grid grid-cols-3 gap-2 text-xs">
                                                <div className="rounded-xl bg-emerald-50 p-2">
                                                    <p className="font-black text-emerald-700">DS</p>
                                                    <p className="font-black text-emerald-900">{formatCurrency(period.dsTotal)}</p>
                                                </div>
                                                <div className="rounded-xl bg-sky-50 p-2">
                                                    <p className="font-black text-sky-700">Product</p>
                                                    <p className="font-black text-sky-900">{formatCurrency(period.sbPurchaseTotal)}</p>
                                                </div>
                                                <div className="rounded-xl bg-slate-100 p-2">
                                                    <p className="font-black text-slate-700">Total</p>
                                                    <p className="font-black text-slate-950">{formatCurrency(period.combinedTotal)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-10 text-center text-sm font-semibold text-slate-500">
                                No new customers found in the last 30 days.
                            </div>
                        )}
                    </div>

                    <div className="hidden overflow-x-auto md:block">
                        <table className="min-w-[760px] divide-y divide-slate-200 text-sm">
                            <thead className="bg-slate-900">
                                <tr className="text-left text-xs font-black uppercase text-slate-200">
                                    <th className="px-4 py-3">Customer</th>
                                    {showBranch && <th className="px-4 py-3">Branch</th>}
                                    {showRep && <th className="px-4 py-3">Rep</th>}
                                    <th className="px-4 py-3">Opened</th>
                                    <th className="px-4 py-3">Logins</th>
                                    <th className="px-4 py-3">30-Day DS</th>
                                    <th className="px-4 py-3">30-Day Product</th>
                                    <th className="px-4 py-3">30-Day Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {customers.length > 0 ? (
                                    customers.map((customer) => {
                                        const period = getPeriodPerformance(customer);

                                        return (
                                            <tr key={customer?._id} className="hover:bg-orange-50/40">
                                                <td className="px-4 py-4">
                                                    <p className="font-black text-slate-950">{getCustomerName(customer)}</p>
                                                    <p className="text-xs font-semibold text-slate-500">{customer?.customerId?.phone || 'N/A'}</p>
                                                </td>
                                                {showBranch && <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-700">{customer?.branchId?.name || 'N/A'}</td>}
                                                {showRep && <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-700">{getRepName(customer)}</td>}
                                                <td className="whitespace-nowrap px-4 py-4 text-xs font-semibold text-slate-500">{formatDate(customer?.customerId?.createdAt)}</td>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-black text-purple-700">
                                                        {Number(customer?.count || 0).toLocaleString()}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 font-black text-emerald-700">{formatCurrency(period.dsTotal)}</td>
                                                <td className="whitespace-nowrap px-4 py-4 font-black text-sky-700">{formatCurrency(period.sbPurchaseTotal)}</td>
                                                <td className="whitespace-nowrap px-4 py-4 font-black text-orange-600">{formatCurrency(period.combinedTotal)}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={6 + (showBranch ? 1 : 0) + (showRep ? 1 : 0)} className="px-4 py-10 text-center text-sm font-semibold text-slate-500">
                                            No new customers found in the last 30 days.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerAnalyticsNewCustomersModal;
