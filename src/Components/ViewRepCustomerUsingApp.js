import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchRepCustomerLoginCountRequest, fetchRepCustomerNewCustomersRequest } from '../redux/slices/customerSlice';
import CustomerAnalyticsNewCustomersModal from "./CustomerAnalyticsNewCustomersModal";

const formatCurrency = (value) => `₦${Number(value || 0).toLocaleString("en-US")}`;
const formatDate = (value) => {
    if (!value) return "Never";
    return new Date(value).toLocaleString();
};
const getCustomerName = (customer) => (
    [customer?.customerId?.firstName, customer?.customerId?.lastName].filter(Boolean).join(" ") || "Unknown Customer"
);
const getRepName = (customer) => (
    [customer?.accountManager?.firstName, customer?.accountManager?.lastName].filter(Boolean).join(" ") || "Ecommerce"
);
const getPerformance = (customer) => customer?.performance || {};
const pickTop = (items, field) => (
    [...items].sort((a, b) => Number(getPerformance(b)[field] || 0) - Number(getPerformance(a)[field] || 0))[0] || null
);

const ViewRepCustomerUsingApp = () => {
    const dispatch = useDispatch();
    const { loading, customers, newCustomers: newCustomerRows, error } = useSelector((state) => state.customer);
    const [search, setSearch] = useState('');
    const [showNewCustomersModal, setShowNewCustomersModal] = useState(false);
    const customerList = useMemo(() => (Array.isArray(customers) ? customers : []), [customers]);

    useEffect(() => {
        dispatch(fetchRepCustomerLoginCountRequest());
        dispatch(fetchRepCustomerNewCustomersRequest());
    }, [dispatch]);

    const filteredCustomers = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();
        return customerList.filter((customer) => {
            const searchText = [
                getCustomerName(customer),
                customer?.customerId?.phone,
                customer?.branchId?.name,
                getRepName(customer),
            ].filter(Boolean).join(" ").toLowerCase();

            return !normalizedSearch || searchText.includes(normalizedSearch);
        });
    }, [customerList, search]);

    const summary = useMemo(() => {
        const totalCustomers = filteredCustomers.length;
        const totalLogins = filteredCustomers.reduce((sum, customer) => sum + Number(customer?.count || 0), 0);
        const totalDS = filteredCustomers.reduce((sum, customer) => sum + Number(getPerformance(customer).dsTotal || 0), 0);
        const totalSB = filteredCustomers.reduce((sum, customer) => sum + Number(getPerformance(customer).sbPurchaseTotal || 0), 0);

        return {
            totalCustomers,
            totalLogins,
            totalDS,
            totalSB,
            bestLoginCustomer: [...filteredCustomers].sort((a, b) => Number(b?.count || 0) - Number(a?.count || 0))[0] || null,
            bestDSCustomer: pickTop(filteredCustomers, "dsTotal"),
            bestSBCustomer: pickTop(filteredCustomers, "sbPurchaseTotal"),
        };
    }, [filteredCustomers]);

    const newCustomers = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();
        return (Array.isArray(newCustomerRows) ? newCustomerRows : []).filter((customer) => {
            const searchText = [
                getCustomerName(customer),
                customer?.customerId?.phone,
                customer?.branchId?.name,
                getRepName(customer),
            ].filter(Boolean).join(" ").toLowerCase();

            return !normalizedSearch || searchText.includes(normalizedSearch);
        });
    }, [newCustomerRows, search]);

    if (error) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 p-3 sm:p-5">
            <div className="mx-auto max-w-7xl space-y-4">
                <section className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-sm">
                    <div className="relative p-4 sm:p-6">
                        <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-emerald-500/20 sm:h-40 sm:w-40" />
                        <div className="relative">
                            <p className="text-xs font-black uppercase text-emerald-300">Rep Customer App Usage</p>
                            <h1 className="mt-1 text-2xl font-black sm:text-3xl">Customer Performance Dashboard</h1>
                            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-200">
                                Track ecommerce customer logins, DS contribution performance, and SB product purchase performance for customers tied to you.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
                    <div className="rounded-2xl bg-orange-500 p-3 text-white shadow-sm sm:p-4">
                        <p className="text-[10px] font-black uppercase text-orange-50 sm:text-xs">Customers Using App</p>
                        <p className="mt-1 text-xl font-black sm:text-2xl">{summary.totalCustomers.toLocaleString()}</p>
                    </div>
                    <div className="rounded-2xl bg-purple-700 p-3 text-white shadow-sm sm:p-4">
                        <p className="text-[10px] font-black uppercase text-purple-100 sm:text-xs">Total Logins</p>
                        <p className="mt-1 text-xl font-black sm:text-2xl">{summary.totalLogins.toLocaleString()}</p>
                    </div>
                    <div className="rounded-2xl bg-emerald-600 p-3 text-white shadow-sm sm:p-4">
                        <p className="text-[10px] font-black uppercase text-emerald-50 sm:text-xs">DS Performance</p>
                        <p className="mt-1 text-lg font-black sm:text-2xl">{formatCurrency(summary.totalDS)}</p>
                    </div>
                    <div className="rounded-2xl bg-sky-600 p-3 text-white shadow-sm sm:p-4">
                        <p className="text-[10px] font-black uppercase text-sky-50 sm:text-xs">Product Purchase</p>
                        <p className="mt-1 text-lg font-black sm:text-2xl">{formatCurrency(summary.totalSB)}</p>
                    </div>
                </section>

                <section className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                    <div className="rounded-2xl border border-orange-100 bg-white p-3 shadow-sm sm:p-4">
                        <p className="text-[10px] font-black uppercase text-orange-600 sm:text-xs">Most Active Login</p>
                        <p className="mt-1 truncate text-sm font-black text-slate-950 sm:text-lg">{getCustomerName(summary.bestLoginCustomer)}</p>
                        <p className="text-xs font-bold text-slate-500 sm:text-sm">{Number(summary.bestLoginCustomer?.count || 0).toLocaleString()} login(s)</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-100 bg-white p-3 shadow-sm sm:p-4">
                        <p className="text-[10px] font-black uppercase text-emerald-600 sm:text-xs">Best DS Customer</p>
                        <p className="mt-1 truncate text-sm font-black text-slate-950 sm:text-lg">{getCustomerName(summary.bestDSCustomer)}</p>
                        <p className="text-xs font-bold text-emerald-700 sm:text-sm">{formatCurrency(getPerformance(summary.bestDSCustomer).dsTotal)}</p>
                    </div>
                    <div className="rounded-2xl border border-sky-100 bg-white p-3 shadow-sm sm:p-4">
                        <p className="text-[10px] font-black uppercase text-sky-600 sm:text-xs">Best Product Customer</p>
                        <p className="mt-1 truncate text-sm font-black text-slate-950 sm:text-lg">{getCustomerName(summary.bestSBCustomer)}</p>
                        <p className="text-xs font-bold text-sky-700 sm:text-sm">{formatCurrency(getPerformance(summary.bestSBCustomer).sbPurchaseTotal)}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowNewCustomersModal(true)}
                        className="rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-600 to-orange-500 p-3 text-left text-white shadow-sm transition hover:shadow-md sm:p-4"
                    >
                        <p className="text-[10px] font-black uppercase text-pink-50 sm:text-xs">New Customers</p>
                        <p className="mt-1 text-2xl font-black leading-none sm:text-3xl">{newCustomers.length.toLocaleString()}</p>
                        <p className="mt-1 text-xs font-bold text-pink-50 sm:text-sm">Opened in 30 days</p>
                    </button>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
                    <label className="mb-1.5 block text-xs font-black uppercase text-slate-600">Search customer</label>
                    <input
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search by name, phone, branch, or rep"
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                </section>

                {loading ? (
                    <div className="flex h-64 items-center justify-center rounded-3xl bg-white shadow-sm">
                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-500" />
                    </div>
                ) : (
                    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="min-w-[980px] divide-y divide-slate-200 text-sm">
                                <thead className="bg-slate-50">
                                    <tr className="text-left text-xs font-black uppercase text-slate-500">
                                        <th className="px-4 py-3">Customer</th>
                                        <th className="px-4 py-3">Branch</th>
                                        <th className="px-4 py-3">Rep</th>
                                        <th className="px-4 py-3">Last Login</th>
                                        <th className="px-4 py-3">Logins</th>
                                        <th className="px-4 py-3">DS Total</th>
                                        <th className="px-4 py-3">Product Purchase</th>
                                        <th className="px-4 py-3">Combined</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {filteredCustomers.length > 0 ? (
                                        filteredCustomers.map((customer) => {
                                            const performance = getPerformance(customer);
                                            return (
                                                <tr key={customer?._id} className="hover:bg-emerald-50/40">
                                                    <td className="px-4 py-4">
                                                        <p className="font-black text-slate-950">{getCustomerName(customer)}</p>
                                                        <p className="text-xs font-semibold text-slate-500">{customer?.customerId?.phone || 'N/A'}</p>
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-700">{customer?.branchId?.name || 'N/A'}</td>
                                                    <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-700">{getRepName(customer)}</td>
                                                    <td className="whitespace-nowrap px-4 py-4 text-xs font-semibold text-slate-500">{formatDate(customer?.lastLogin)}</td>
                                                    <td className="whitespace-nowrap px-4 py-4">
                                                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-black text-purple-700">
                                                            {Number(customer?.count || 0).toLocaleString()}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 font-black text-emerald-700">{formatCurrency(performance.dsTotal)}</td>
                                                    <td className="whitespace-nowrap px-4 py-4 font-black text-sky-700">{formatCurrency(performance.sbPurchaseTotal)}</td>
                                                    <td className="whitespace-nowrap px-4 py-4 font-black text-orange-600">{formatCurrency(performance.combinedTotal)}</td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="px-4 py-10 text-center text-sm font-semibold text-slate-500">
                                                No customers found for the selected filter.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}
            </div>
            {showNewCustomersModal && (
                <CustomerAnalyticsNewCustomersModal
                    customers={newCustomers}
                    onClose={() => setShowNewCustomersModal(false)}
                    showBranch={false}
                    showRep={false}
                />
            )}
        </div>
    );
};

export default ViewRepCustomerUsingApp;
