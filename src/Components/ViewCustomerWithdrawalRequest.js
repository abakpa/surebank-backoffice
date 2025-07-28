import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import { 
  fetchCustomerWithdrawalRequestRequest,
  updateCustomerWithdrawalRequestRequest 
} from '../redux/slices/customerSlice';
import Select2 from "./Select2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const ViewCustomerWithdrawalRequest = () => {
    const dispatch = useDispatch();
    const { branches } = useSelector((state) => state.branch);
    const { loading, customers, error } = useSelector((state) => state.customer);
    const [branchId, setBranchId] = useState('all');
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [showError, setShowError] = useState(false);
    const [copiedId, setCopiedId] = useState(null);

    useEffect(() => {
        dispatch(fetchBranchRequest());
        dispatch(fetchCustomerWithdrawalRequestRequest());
    }, [dispatch]);

    useEffect(() => {
        if (branchId === 'all') {
            setFilteredCustomers(customers);
        } else {
            const filtered = customers.filter(customer => 
                customer.branchId?._id === branchId
            );
            setFilteredCustomers(filtered);
        }
    }, [branchId, customers]);

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

    const branchOptions = [
        { label: "All Branches", value: "all" },
        ...branches
            .filter((branch) => branch.name !== "Head office")
            .map((branch) => ({ label: branch.name, value: branch._id }))
    ];
    return (
        <div className="container mx-auto p-4 md:p-6">
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

            <h1 className="text-2xl font-bold text-gray-800 mb-6">Customer Withdrawal Requests</h1>
            
            {/* Branch Filter */}
            <div className="mb-6">
                <Select2
                    label="Filter by Branch"
                    options={branchOptions}
                    value={branchId}
                    onChange={setBranchId}
                    className="block w-full md:w-64"
                />
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            ) : (
                <div className="bg-white shadow overflow-hidden rounded-lg">
                    {/* Mobile Cards View */}
                    <div className="md:hidden space-y-4 p-4">
                        {filteredCustomers.length > 0 ? (
                            filteredCustomers.map((customer) => {
                                let buttonText, buttonColor;
                                switch (customer?.status?.toLowerCase()) {
                                    case 'pending':
                                        buttonText = 'Process';
                                        buttonColor = 'bg-red-600 hover:bg-red-500';
                                        break;
                                    case 'processing':
                                        buttonText = 'Complete';
                                        buttonColor = 'bg-blue-600 hover:bg-blue-500';
                                        break;
                                    case 'completed':
                                        buttonText = 'Done';
                                        buttonColor = 'bg-green-600 hover:bg-green-500';
                                        break;
                                    default:
                                        buttonText = 'Process';
                                        buttonColor = 'bg-gray-600 hover:bg-gray-500';
                                }

                                return (
                                    <div key={customer?._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <h3 className="font-medium">{customer?.customerId?.firstName} {customer?.customerId?.lastName || ''}</h3>
                                                <span className={`px-2 text-xs leading-5 font-semibold rounded-full ${
                                                    customer?.status?.toLowerCase() === 'completed' ? 'bg-green-100 text-green-800' :
                                                    customer?.status?.toLowerCase() === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {customer?.status || 'N/A'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">Product: {customer?.productName || 'N/A'}</p>
                                            <p className="text-sm text-gray-600">Package: {customer?.package || 'N/A'}</p>
                                            <p className="text-sm text-gray-600">Package Number: {customer?.packageNumber || 'N/A'}</p>
                                            <p className="text-sm text-gray-600">Amount: ₦{customer?.amount?.toLocaleString() || 'N/A'}</p>
                                            <p className="text-sm text-gray-600">Method: {customer?.channelOfWithdrawal || 'N/A'}</p>
                                            <p className="text-sm text-gray-600">Branch: {customer?.branchId?.name || 'N/A'}</p>
                                            <p className="text-sm text-gray-600">Address: {customer?.shippingAddress || 'N/A'}</p>
                                            {customer?.bankName && (
                                                <div className="mt-2 pt-2 border-t">
                                                    <p className="text-sm text-gray-600">Bank: {customer?.bankName}</p>
                                                    <p className="text-sm text-gray-600">Account: {customer?.accountName}</p>
                                                    <p className="text-sm text-gray-600">
                                                        Number: {customer?.bankAccountNumber || 'N/A'}
                                                        {customer?.bankAccountNumber && (
                                                            <button 
                                                                onClick={() => copyToClipboard(customer.bankAccountNumber, customer._id)}
                                                                className="ml-2 text-gray-400 hover:text-blue-500"
                                                                title="Copy account number"
                                                            >
                                                                <FontAwesomeIcon icon={faCopy} size="xs" />
                                                                {copiedId === customer._id && (
                                                                    <span className="ml-1 text-xs text-green-600">Copied!</span>
                                                                )}
                                                            </button>
                                                        )}
                                                    </p>
                                                </div>
                                            )}
                                            <div className="flex justify-between items-center mt-2 pt-2 border-t">
                                                <div>
                                                    <span className="text-xs text-gray-500">Rep: {customer?.accountManagerId?.firstName || 'N/A'}</span>
                                                    <span className="block text-xs text-gray-500">Date: {new Date(customer?.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <button 
                                                    className={`${buttonColor} px-3 py-1 rounded text-white text-sm`}
                                                    onClick={handleStatusUpdate(customer?._id)}
                                                    disabled={customer?.status?.toLowerCase() === 'completed'}
                                                >
                                                    {buttonText}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                No requests found{branchId !== 'all' ? ' for this branch' : ''}
                            </div>
                        )}
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block">
                        <div className="overflow-x-auto" style={{ maxWidth: 'calc(100vw - 2rem)' }}>
                            <table className="w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package Number</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Details</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rep</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredCustomers.length > 0 ? (
                                        filteredCustomers.map((customer) => {
                                            let buttonText, buttonColor;
                                            switch (customer?.status?.toLowerCase()) {
                                                case 'pending':
                                                    buttonText = 'Process';
                                                    buttonColor = 'bg-red-600 hover:bg-red-500';
                                                    break;
                                                case 'processing':
                                                    buttonText = 'Complete';
                                                    buttonColor = 'bg-blue-600 hover:bg-blue-500';
                                                    break;
                                                case 'completed':
                                                    buttonText = 'Done';
                                                    buttonColor = 'bg-green-600 hover:bg-green-500';
                                                    break;
                                                default:
                                                    buttonText = 'Process';
                                                    buttonColor = 'bg-gray-600 hover:bg-gray-500';
                                            }

                                            return (
                                                <tr key={customer?._id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {customer?.customerId?.firstName} {customer?.customerId?.lastName || ''}
                                                                </div>
                                                                <div className="text-sm text-gray-500">{customer?.customerId?.phone || 'N/A'}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {customer?.productName || 'N/A'}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {customer?.package || 'N/A'}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {customer?.packageNumber || 'N/A'}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        ₦{customer?.amount?.toLocaleString() || 'N/A'}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {customer?.channelOfWithdrawal || 'N/A'}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {customer?.branchId?.name || 'N/A'}
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500">
                                                        {customer?.bankName ? (
                                                            <div>
                                                                <div>{customer.bankName}</div>
                                                                <div>{customer.accountName}</div>
                                                                <div className="flex items-center">
                                                                    {customer.bankAccountNumber}
                                                                    <button 
                                                                        onClick={() => copyToClipboard(customer.bankAccountNumber, customer._id)}
                                                                        className="ml-2 text-gray-400 hover:text-blue-500"
                                                                        title="Copy account number"
                                                                    >
                                                                        <FontAwesomeIcon icon={faCopy} size="xs" />
                                                                        {copiedId === customer._id && (
                                                                            <span className="ml-1 text-xs text-green-600">Copied!</span>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : 'N/A'}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {customer?.accountManagerId?.firstName || 'N/A'}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(customer?.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            customer?.status?.toLowerCase() === 'completed' ? 'bg-green-100 text-green-800' :
                                                            customer?.status?.toLowerCase() === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                        }`}>
                                                            {customer?.status || 'N/A'}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <button 
                                                            className={`${buttonColor} px-3 py-1 rounded text-white`}
                                                            onClick={handleStatusUpdate(customer?._id)}
                                                            disabled={customer?.status?.toLowerCase() === 'completed'}
                                                        >
                                                            {buttonText}
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="10" className="px-6 py-4 text-center text-sm text-gray-500">
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
        </div>
    );
};

export default ViewCustomerWithdrawalRequest;