import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import { 
  fetchCustomerWithdrawalRequestRequest,
  updateCustomerWithdrawalRequestRequest 
} from '../redux/slices/customerSlice';
import Select2 from "./Select2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const getStatusMeta = (status = '') => {
    const normalizedStatus = String(status).toLowerCase();

    if (normalizedStatus === 'completed') {
        return {
            label: 'Completed',
            badgeClass: 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200',
            buttonText: 'Done',
            buttonClass: 'bg-emerald-600 text-white cursor-not-allowed opacity-80',
        };
    }

    if (normalizedStatus === 'processing') {
        return {
            label: 'Processing',
            badgeClass: 'bg-amber-100 text-amber-800 ring-1 ring-amber-200',
            buttonText: 'Complete',
            buttonClass: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
        };
    }

    return {
        label: status || 'Pending',
        badgeClass: 'bg-orange-100 text-orange-800 ring-1 ring-orange-200',
        buttonText: 'Process',
        buttonClass: 'bg-orange-600 text-white hover:bg-orange-700 shadow-sm',
    };
};

const getCustomerName = (customer) => `${customer?.customerId?.firstName || ''} ${customer?.customerId?.lastName || ''}`.trim() || 'N/A';

const getInitials = (customer) => {
    const firstName = customer?.customerId?.firstName || '';
    const lastName = customer?.customerId?.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'SB';
};

const ViewCustomerWithdrawalRequest = () => {
    const dispatch = useDispatch();
    const { branches } = useSelector((state) => state.branch);
    const { loading, customers, error } = useSelector((state) => state.customer);
    const [branchId, setBranchId] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [showError, setShowError] = useState(false);
    const [copiedId, setCopiedId] = useState(null);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const requestList = useMemo(() => (Array.isArray(customers) ? customers : []), [customers]);
    const activeRequests = useMemo(() => (
        filteredCustomers.filter((customer) => String(customer?.status || '').toLowerCase() !== 'completed')
    ), [filteredCustomers]);
    const completedRequests = useMemo(() => (
        filteredCustomers.filter((customer) => String(customer?.status || '').toLowerCase() === 'completed')
    ), [filteredCustomers]);

    const visibleTotalAmount = useMemo(() => (
        activeRequests.reduce((sum, customer) => sum + Number(customer?.amount || 0), 0)
    ), [activeRequests]);

    const pendingCount = useMemo(() => (
        activeRequests.filter((customer) => String(customer?.status || '').toLowerCase() === 'pending').length
    ), [activeRequests]);

    const processingCount = useMemo(() => (
        activeRequests.filter((customer) => String(customer?.status || '').toLowerCase() === 'processing').length
    ), [activeRequests]);

    useEffect(() => {
        dispatch(fetchBranchRequest());
        dispatch(fetchCustomerWithdrawalRequestRequest());
    }, [dispatch]);

    useEffect(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase();
        const filtered = requestList.filter((customer) => {
            const matchesBranch = branchId === 'all' || customer.branchId?._id === branchId;
            const customerName = `${customer?.customerId?.firstName || ''} ${customer?.customerId?.lastName || ''}`.toLowerCase();
            const packageNumber = String(customer?.packageNumber || '').toLowerCase();
            const matchesSearch = !normalizedSearch
                || customerName.includes(normalizedSearch)
                || packageNumber.includes(normalizedSearch);

            return matchesBranch && matchesSearch;
        });

        setFilteredCustomers(filtered);
    }, [branchId, requestList, searchTerm]);

    useEffect(() => {
        if (error) {
            setShowError(true);
            const timer = setTimeout(() => setShowError(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleStatusUpdate = (_id) => (e) => {
        e.preventDefault();
        const details = { withdrawalRequestId: _id };
        const data = { details };
        dispatch(updateCustomerWithdrawalRequestRequest(data));
    };

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const renderCompletedRequestCard = (customer) => {
        const statusMeta = getStatusMeta(customer?.status);

        return (
            <div key={customer?._id} className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
                <div className="bg-gradient-to-r from-emerald-700 to-slate-900 p-3 text-white">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <h3 className="truncate font-black">{getCustomerName(customer)}</h3>
                            <p className="truncate text-xs text-emerald-50">{customer?.customerId?.phone || 'N/A'}</p>
                        </div>
                        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-black ${statusMeta.badgeClass}`}>
                            {statusMeta.label}
                        </span>
                    </div>
                </div>
                <div className="grid gap-2 p-3 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-xl bg-emerald-50 p-2">
                            <p className="text-xs font-bold text-emerald-700">Amount</p>
                            <p className="font-black text-emerald-900">₦{customer?.amount?.toLocaleString() || 'N/A'}</p>
                        </div>
                        <div className="rounded-xl bg-purple-50 p-2">
                            <p className="text-xs font-bold text-purple-700">Package No.</p>
                            <p className="truncate font-black text-purple-900">{customer?.packageNumber || 'N/A'}</p>
                        </div>
                    </div>
                    <p className="text-slate-600"><span className="font-bold text-slate-900">Package:</span> {customer?.package || 'N/A'}</p>
                    <p className="text-slate-600"><span className="font-bold text-slate-900">Method:</span> {customer?.channelOfWithdrawal || 'N/A'}</p>
                    <p className="text-slate-600"><span className="font-bold text-slate-900">Branch:</span> {customer?.branchId?.name || 'N/A'}</p>
                    <p className="text-xs font-semibold text-slate-500">Date: {new Date(customer?.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        );
    };

    const branchOptions = [
        { label: "All Branches", value: "all" },
        ...branches
            .filter((branch) => branch.name !== "Head office")
            .map((branch) => ({ label: branch.name, value: branch._id }))
    ];
    return (
        <>
        <div className="min-h-screen bg-slate-50 px-3 py-4 md:px-6 md:py-6">
            {showError && (
                <div className="fixed top-4 left-0 right-0 z-50 flex justify-center animate-slideDown">
                    <div className="w-full max-w-md p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Error</p>
                                <p>{error}</p>
                            </div>
                            <button
                                onClick={() => setShowError(false)}
                                className="ml-4 text-red-700 hover:text-red-900 text-xl font-bold"
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mx-auto max-w-7xl space-y-4">
                <section className="overflow-hidden rounded-2xl bg-slate-950 text-white shadow-lg">
                    <div className="relative p-4 md:p-6">
                        <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-orange-500/25 md:h-36 md:w-36" />
                        <div className="relative grid gap-4 lg:grid-cols-[1fr,auto] lg:items-end">
                            <div>
                                <p className="text-xs font-black uppercase text-orange-300">Admin requests</p>
                                <h1 className="mt-1 text-2xl font-black tracking-normal md:text-3xl">Customer Withdrawal Requests</h1>
                                <p className="mt-1 max-w-2xl text-sm text-slate-200">
                                    Review customer payout requests, filter by branch, and process completed external payments.
                                </p>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-xs md:min-w-[420px] md:text-sm">
                                <div className="rounded-2xl bg-orange-500 px-3 py-2 shadow-sm">
                                    <p className="text-orange-50">Pending</p>
                                    <p className="mt-1 text-xl font-black text-white">{pendingCount.toLocaleString()}</p>
                                </div>
                                <div className="rounded-2xl bg-blue-600 px-3 py-2 shadow-sm">
                                    <p className="text-blue-50">Processing</p>
                                    <p className="mt-1 text-xl font-black text-white">{processingCount.toLocaleString()}</p>
                                </div>
                                <div className="rounded-2xl bg-emerald-600 px-3 py-2 shadow-sm">
                                    <p className="text-emerald-50">Amount</p>
                                    <p className="mt-1 truncate text-xl font-black text-white">₦{visibleTotalAmount.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:p-4">
                    <div className="grid gap-3 md:grid-cols-[minmax(220px,280px),minmax(260px,420px),minmax(190px,230px),minmax(240px,280px)] md:items-end">
                        <div>
                            <div className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 transition focus-within:border-orange-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-100">
                                <Select2
                                    label="Filter by Branch"
                                    options={branchOptions}
                                    value={branchId}
                                    onChange={setBranchId}
                                    className="block w-full"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="withdrawal-request-search" className="mb-1.5 block text-sm font-bold text-slate-700">
                                Search
                            </label>
                            <input
                                id="withdrawal-request-search"
                                type="search"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Customer name or package number"
                                className="block w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                            />
                        </div>
                        <div className="rounded-xl bg-sky-50 px-3 py-2.5 text-sm font-bold text-sky-800 ring-1 ring-sky-100">
                            {activeRequests.length.toLocaleString()} active request{activeRequests.length === 1 ? '' : 's'} shown
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowHistoryModal(true)}
                            className="hidden w-full rounded-xl bg-gradient-to-r from-emerald-600 via-sky-600 to-purple-700 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-slate-900/10 md:block"
                        >
                            Request Transaction History ({completedRequests.length.toLocaleString()})
                        </button>
                    </div>
                </section>

                {loading ? (
                    <div className="flex h-64 items-center justify-center rounded-2xl bg-white shadow-sm">
                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500"></div>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                        {/* Mobile Cards View */}
                        <div className="space-y-3 p-3 md:hidden">
                            {activeRequests.length > 0 ? (
                                activeRequests.map((customer) => {
                                    const statusMeta = getStatusMeta(customer?.status);

                                    return (
                                        <div key={customer?._id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                            <div className="bg-gradient-to-r from-slate-900 to-blue-800 p-3 text-white">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex min-w-0 items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-sm font-black">
                                                            {getInitials(customer)}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <h3 className="truncate font-black">{getCustomerName(customer)}</h3>
                                                            <p className="truncate text-xs text-slate-200">{customer?.customerId?.phone || 'N/A'}</p>
                                                        </div>
                                                    </div>
                                                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-black ${statusMeta.badgeClass}`}>
                                                        {statusMeta.label}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="grid gap-2 p-3 text-sm">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="rounded-xl bg-orange-50 p-2">
                                                        <p className="text-xs font-bold text-orange-700">Amount</p>
                                                        <p className="font-black text-orange-900">₦{customer?.amount?.toLocaleString() || 'N/A'}</p>
                                                    </div>
                                                    <div className="rounded-xl bg-purple-50 p-2">
                                                        <p className="text-xs font-bold text-purple-700">Package No.</p>
                                                        <p className="truncate font-black text-purple-900">{customer?.packageNumber || 'N/A'}</p>
                                                    </div>
                                                </div>
                                                <p className="text-slate-600"><span className="font-bold text-slate-900">Package:</span> {customer?.package || 'N/A'}</p>
                                                <p className="text-slate-600"><span className="font-bold text-slate-900">Method:</span> {customer?.channelOfWithdrawal || 'N/A'}</p>
                                                <p className="text-slate-600"><span className="font-bold text-slate-900">Branch:</span> {customer?.branchId?.name || 'N/A'}</p>
                                                {customer?.bankName && (
                                                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-2">
                                                        <p className="font-bold text-slate-900">{customer?.bankName}</p>
                                                        <p className="text-slate-600">{customer?.accountName}</p>
                                                        <p className="flex items-center text-slate-600">
                                                            {customer?.bankAccountNumber || 'N/A'}
                                                            {customer?.bankAccountNumber && (
                                                                <button
                                                                    onClick={() => copyToClipboard(customer.bankAccountNumber, customer._id)}
                                                                    className="ml-2 rounded-full bg-white px-2 py-1 text-sky-600 shadow-sm"
                                                                    title="Copy account number"
                                                                >
                                                                    <FontAwesomeIcon icon={faCopy} size="xs" />
                                                                    {copiedId === customer._id && (
                                                                        <span className="ml-1 text-xs text-emerald-600">Copied</span>
                                                                    )}
                                                                </button>
                                                            )}
                                                        </p>
                                                    </div>
                                                )}
                                                <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                                                    <div>
                                                        <span className="text-xs font-semibold text-slate-500">Rep: {customer?.accountManagerId?.firstName || 'N/A'}</span>
                                                        <span className="block text-xs font-semibold text-slate-500">Date: {new Date(customer?.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                    <button
                                                        className={`rounded-full px-4 py-2 text-sm font-black transition ${statusMeta.buttonClass}`}
                                                        onClick={handleStatusUpdate(customer?._id)}
                                                        disabled={customer?.status?.toLowerCase() === 'completed'}
                                                    >
                                                        {statusMeta.buttonText}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-slate-500">
                                    No requests found{branchId !== 'all' ? ' for this branch' : ''}
                                </div>
                            )}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden md:block">
                            <div className="overflow-x-auto" style={{ maxWidth: 'calc(100vw - 2rem)' }}>
                                <table className="w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-900">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-200">Customer</th>
                                            <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-200">Package</th>
                                            <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-200">Package Number</th>
                                            <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-200">Amount</th>
                                            <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-200">Method</th>
                                            <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-200">Branch</th>
                                            <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-200">Bank Details</th>
                                            <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-200">Rep</th>
                                            <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-200">Date</th>
                                            <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-200">Status</th>
                                            <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-200">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {activeRequests.length > 0 ? (
                                            activeRequests.map((customer) => {
                                                const statusMeta = getStatusMeta(customer?.status);

                                                return (
                                                    <tr key={customer?._id} className="transition hover:bg-orange-50/60">
                                                        <td className="px-4 py-4 whitespace-nowrap">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-xs font-black text-blue-700">
                                                                    {getInitials(customer)}
                                                                </div>
                                                                <div>
                                                                    <div className="text-sm font-black text-slate-900">
                                                                        {getCustomerName(customer)}
                                                                    </div>
                                                                    <div className="text-xs font-semibold text-slate-500">{customer?.customerId?.phone || 'N/A'}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-slate-600">
                                                            {customer?.package || 'N/A'}
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap">
                                                            <span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-black text-purple-700">
                                                                {customer?.packageNumber || 'N/A'}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-black text-orange-700">
                                                            ₦{customer?.amount?.toLocaleString() || 'N/A'}
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-slate-600">
                                                            {customer?.channelOfWithdrawal || 'N/A'}
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-slate-600">
                                                            {customer?.branchId?.name || 'N/A'}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-slate-600">
                                                            {customer?.bankName ? (
                                                                <div className="rounded-xl bg-slate-50 p-2">
                                                                    <div className="font-bold text-slate-900">{customer.bankName}</div>
                                                                    <div>{customer.accountName}</div>
                                                                    <div className="flex items-center font-semibold">
                                                                        {customer.bankAccountNumber}
                                                                        <button
                                                                            onClick={() => copyToClipboard(customer.bankAccountNumber, customer._id)}
                                                                            className="ml-2 rounded-full bg-white px-2 py-1 text-sky-600 shadow-sm hover:bg-sky-50"
                                                                            title="Copy account number"
                                                                        >
                                                                            <FontAwesomeIcon icon={faCopy} size="xs" />
                                                                            {copiedId === customer._id && (
                                                                                <span className="ml-1 text-xs text-emerald-600">Copied</span>
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ) : 'N/A'}
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-slate-600">
                                                            {customer?.accountManagerId?.firstName || 'N/A'}
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-slate-600">
                                                            {new Date(customer?.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap">
                                                            <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-black ${statusMeta.badgeClass}`}>
                                                                {statusMeta.label}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                                                            <button
                                                                className={`rounded-full px-4 py-2 text-xs font-black transition ${statusMeta.buttonClass}`}
                                                                onClick={handleStatusUpdate(customer?._id)}
                                                                disabled={customer?.status?.toLowerCase() === 'completed'}
                                                            >
                                                                {statusMeta.buttonText}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="10" className="px-6 py-10 text-center text-sm font-semibold text-slate-500">
                                                    No requests found{branchId !== 'all' ? ' for this branch' : ''}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                <div className="md:hidden">
                    <button
                        type="button"
                        onClick={() => setShowHistoryModal(true)}
                        className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 via-sky-600 to-purple-700 px-4 py-3 text-sm font-black text-white shadow-lg shadow-slate-900/10"
                    >
                        Request Transaction History ({completedRequests.length.toLocaleString()})
                    </button>
                </div>
                </div>
        </div>
            {showHistoryModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3">
                    <div className="flex max-h-full w-full max-w-md flex-col overflow-hidden rounded-3xl bg-slate-50 shadow-2xl md:max-w-3xl">
                        <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4">
                            <div className="min-w-0">
                                <p className="text-xs font-black uppercase text-emerald-700">Completed Requests</p>
                                <h2 className="mt-0.5 text-lg font-black text-slate-950">Request Transaction History</h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowHistoryModal(false)}
                                className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700"
                            >
                                Close
                            </button>
                        </div>
                        <div className="flex-1 space-y-3 overflow-y-auto p-3">
                            {completedRequests.length > 0 ? (
                                completedRequests.map(renderCompletedRequestCard)
                            ) : (
                                <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-10 text-center text-sm font-semibold text-slate-500">
                                    No completed request history found.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewCustomerWithdrawalRequest;
