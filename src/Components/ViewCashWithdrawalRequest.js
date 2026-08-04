import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { url } from '../redux/sagas/url';

const getStatusMeta = (status = '') => {
  const normalizedStatus = String(status).toLowerCase();

  if (normalizedStatus === 'completed') {
    return {
      label: 'Completed',
      badgeClass: 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200',
    };
  }

  if (normalizedStatus === 'processing') {
    return {
      label: 'Processing',
      badgeClass: 'bg-amber-100 text-amber-800 ring-1 ring-amber-200',
    };
  }

  return {
    label: status || 'Pending',
    badgeClass: 'bg-orange-100 text-orange-800 ring-1 ring-orange-200',
  };
};

const getCustomerName = (request) => `${request?.customerId?.firstName || ''} ${request?.customerId?.lastName || ''}`.trim() || 'N/A';

const getInitials = (request) => {
  const firstName = request?.customerId?.firstName || '';
  const lastName = request?.customerId?.lastName || '';
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'SB';
};

const requestMatchesSearch = (request, searchTerm) => {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  if (!normalizedSearch) return true;

  return [
    getCustomerName(request),
    request?.customerId?.phone,
    request?.packageNumber,
    request?.package,
    request?.branchId?.name,
    request?.accountManagerId?.firstName,
    request?.accountManagerId?.lastName,
  ].filter(Boolean).join(' ').toLowerCase().includes(normalizedSearch);
};

const getEndpointForRole = (role) => {
  if (role === 'Manager') {
    const branchId = localStorage.getItem('staffBranch');
    return `${url}/api/customerwithdrawalrequest/branchcustomer/${branchId}?payoutMethod=cash`;
  }

  if (['Agent', 'Rep', 'OnlineRep'].includes(role)) {
    return `${url}/api/customerwithdrawalrequest/repcustomer?payoutMethod=cash`;
  }

  return `${url}/api/customerwithdrawalrequest?payoutMethod=cash`;
};

const ViewCashWithdrawalRequest = () => {
  const role = localStorage.getItem('staffRole');
  const canCompleteCashRequest = ['Admin', 'Manager'].includes(role);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [processingId, setProcessingId] = useState('');
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(getEndpointForRole(role), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(Array.isArray(response.data) ? response.data : []);
    } catch (fetchError) {
      if (fetchError.response?.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        return;
      }
      setError(fetchError.response?.data?.message || 'Failed to load cash withdrawal requests.');
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, [role]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const filteredRequests = useMemo(() => (
    requests.filter((request) => requestMatchesSearch(request, searchTerm))
  ), [requests, searchTerm]);

  const activeRequests = useMemo(() => (
    filteredRequests.filter((request) => String(request?.status || '').toLowerCase() !== 'completed')
  ), [filteredRequests]);

  const completedRequests = useMemo(() => (
    filteredRequests.filter((request) => String(request?.status || '').toLowerCase() === 'completed')
  ), [filteredRequests]);

  const totalAmount = useMemo(() => (
    activeRequests.reduce((sum, request) => sum + Number(request?.amount || 0), 0)
  ), [activeRequests]);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCompleteRequest = async (requestId) => {
    setProcessingId(requestId);
    setError('');
    setSuccessMessage('');

    try {
      const token = localStorage.getItem('authToken');
      await axios.put(`${url}/api/customerwithdrawalrequest/${requestId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage('Cash withdrawal completed and customer balance debited.');
      setTimeout(() => setSuccessMessage(''), 5000);
      await fetchRequests();
    } catch (completeError) {
      if (completeError.response?.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        return;
      }
      setError(completeError.response?.data?.message || 'Failed to complete cash withdrawal request.');
    } finally {
      setProcessingId('');
    }
  };

  const renderAction = (request) => {
    const status = String(request?.status || '').toLowerCase();
    if (!canCompleteCashRequest) {
      return <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">View only</span>;
    }

    if (status === 'completed') {
      return <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">Completed</span>;
    }

    return (
      <button
        type="button"
        onClick={() => handleCompleteRequest(request?._id)}
        disabled={processingId === request?._id}
        className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-black text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {processingId === request?._id ? 'Completing...' : 'Complete Debit'}
      </button>
    );
  };

  const renderRequestCard = (request, completed = false) => {
    const statusMeta = getStatusMeta(request?.status);

    return (
      <div key={request?._id} className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${completed ? 'border-emerald-100' : 'border-slate-200'}`}>
        <div className={`bg-gradient-to-r p-3 text-white ${completed ? 'from-emerald-700 to-slate-900' : 'from-emerald-700 to-orange-600'}`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-sm font-black">
                {getInitials(request)}
              </div>
              <div className="min-w-0">
                <h3 className="truncate font-black">{getCustomerName(request)}</h3>
                <p className="truncate text-xs text-emerald-50">{request?.customerId?.phone || 'N/A'}</p>
              </div>
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
              <p className="font-black text-emerald-900">₦{Number(request?.amount || 0).toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-purple-50 p-2">
              <p className="text-xs font-bold text-purple-700">Package No.</p>
              <p className="truncate font-black text-purple-900">{request?.packageNumber || 'N/A'}</p>
            </div>
          </div>
          <p className="text-slate-600"><span className="font-bold text-slate-900">Package:</span> {request?.package || 'N/A'}</p>
          <p className="text-slate-600"><span className="font-bold text-slate-900">Branch:</span> {request?.branchId?.name || 'N/A'}</p>
          <p className="text-slate-600"><span className="font-bold text-slate-900">Rep:</span> {request?.accountManagerId?.firstName || 'N/A'}</p>
          {request?.bankName && (
            <p className="flex items-center text-slate-600">
              <span className="font-bold text-slate-900">Bank:</span>
              <span className="ml-1">{request.bankName} {request.bankAccountNumber || ''}</span>
              {request.bankAccountNumber && (
                <button onClick={() => copyToClipboard(request.bankAccountNumber, request._id)} className="ml-2 rounded-full bg-slate-50 px-2 py-1 text-sky-600 shadow-sm" title="Copy account number">
                  <FontAwesomeIcon icon={faCopy} size="xs" />
                  {copiedId === request._id && <span className="ml-1 text-xs text-emerald-600">Copied</span>}
                </button>
              )}
            </p>
          )}
          <div className="flex items-center justify-between border-t border-slate-100 pt-2">
            <span className="text-xs font-semibold text-slate-500">Date: {new Date(request?.createdAt).toLocaleDateString()}</span>
            {!completed && renderAction(request)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 px-3 py-4 md:px-6 md:py-6">
        <div className="mx-auto max-w-7xl space-y-4">
          <section className="overflow-hidden rounded-2xl bg-slate-950 text-white shadow-lg">
            <div className="relative p-4 md:p-6">
              <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-emerald-500/25 md:h-36 md:w-36" />
              <div className="relative grid gap-4 lg:grid-cols-[1fr,auto] lg:items-end">
                <div>
                  <p className="text-xs font-black uppercase text-emerald-300">Cash payout</p>
                  <h1 className="mt-1 text-2xl font-black tracking-normal md:text-3xl">Cash Withdrawal Requests</h1>
                  <p className="mt-1 max-w-2xl text-sm text-slate-200">
                    Complete branch cash payouts and debit the customer balance only after cash has been paid.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs md:min-w-[420px] md:grid-cols-3 md:text-sm">
                  <div className="rounded-2xl bg-orange-500 px-3 py-2 shadow-sm">
                    <p className="text-orange-50">Active</p>
                    <p className="mt-1 text-xl font-black text-white">{activeRequests.length.toLocaleString()}</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-600 px-3 py-2 shadow-sm">
                    <p className="text-emerald-50">Completed</p>
                    <p className="mt-1 text-xl font-black text-white">{completedRequests.length.toLocaleString()}</p>
                  </div>
                  <div className="col-span-2 rounded-2xl bg-purple-700 px-3 py-2 shadow-sm md:col-span-1">
                    <p className="text-purple-50">Amount</p>
                    <p className="mt-1 whitespace-normal break-words text-lg font-black leading-tight text-white sm:text-xl">₦{totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {(error || successMessage) && (
            <div className={`rounded-2xl px-4 py-3 text-sm font-bold ${error ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
              {error || successMessage}
            </div>
          )}

          <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:p-4">
            <div className="grid gap-3 md:grid-cols-[minmax(260px,1fr),minmax(190px,230px),minmax(240px,280px)] md:items-end">
              <div>
                <label htmlFor="cash-withdrawal-search" className="mb-1.5 block text-sm font-bold text-slate-700">
                  Search
                </label>
                <input
                  id="cash-withdrawal-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Customer name, phone, or package number"
                  className="block w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>
              <div className="rounded-xl bg-emerald-50 px-3 py-2.5 text-sm font-bold text-emerald-800 ring-1 ring-emerald-100">
                {activeRequests.length.toLocaleString()} active cash request{activeRequests.length === 1 ? '' : 's'}
              </div>
              <button
                type="button"
                onClick={() => setShowHistoryModal(true)}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-600 via-sky-600 to-purple-700 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-slate-900/10"
              >
                Cash Request History ({completedRequests.length.toLocaleString()})
              </button>
            </div>
          </section>

          {loading ? (
            <div className="flex h-64 items-center justify-center rounded-2xl bg-white shadow-sm">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-500"></div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
              <div className="space-y-3 p-3 md:hidden">
                {activeRequests.length > 0 ? activeRequests.map((request) => renderRequestCard(request)) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-slate-500">
                    No active cash withdrawal requests found
                  </div>
                )}
              </div>

              <div className="hidden md:block">
                <div className="overflow-x-auto" style={{ maxWidth: 'calc(100vw - 2rem)' }}>
                  <table className="w-full divide-y divide-slate-200">
                    <thead className="bg-slate-900">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-200">Customer</th>
                        <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-200">Package</th>
                        <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-200">Package Number</th>
                        <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-200">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-200">Branch</th>
                        <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-200">Rep</th>
                        <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-200">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-200">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-200">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {activeRequests.length > 0 ? activeRequests.map((request) => {
                        const statusMeta = getStatusMeta(request?.status);
                        return (
                          <tr key={request?._id} className="transition hover:bg-emerald-50/60">
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-xs font-black text-emerald-700">{getInitials(request)}</div>
                                <div>
                                  <div className="text-sm font-black text-slate-900">{getCustomerName(request)}</div>
                                  <div className="text-xs font-semibold text-slate-500">{request?.customerId?.phone || 'N/A'}</div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-600">{request?.package || 'N/A'}</td>
                            <td className="whitespace-nowrap px-4 py-4"><span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-black text-purple-700">{request?.packageNumber || 'N/A'}</span></td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm font-black text-emerald-700">₦{Number(request?.amount || 0).toLocaleString()}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-600">{request?.branchId?.name || 'N/A'}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-600">{request?.accountManagerId?.firstName || 'N/A'}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-600">{new Date(request?.createdAt).toLocaleDateString()}</td>
                            <td className="whitespace-nowrap px-4 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-black ${statusMeta.badgeClass}`}>{statusMeta.label}</span></td>
                            <td className="whitespace-nowrap px-4 py-4">{renderAction(request)}</td>
                          </tr>
                        );
                      }) : (
                        <tr>
                          <td colSpan="9" className="px-6 py-10 text-center text-sm font-semibold text-slate-500">No active cash withdrawal requests found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3">
          <div className="flex max-h-full w-full max-w-md flex-col overflow-hidden rounded-3xl bg-slate-50 shadow-2xl md:max-w-3xl">
            <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase text-emerald-700">Completed Cash Requests</p>
                <h2 className="mt-0.5 text-lg font-black text-slate-950">Cash Request History</h2>
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
              {completedRequests.length > 0 ? completedRequests.map((request) => renderRequestCard(request, true)) : (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-10 text-center text-sm font-semibold text-slate-500">
                  No completed cash request history found.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewCashWithdrawalRequest;
