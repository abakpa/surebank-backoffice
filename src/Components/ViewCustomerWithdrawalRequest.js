import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import { fetchCustomerWithdrawalRequestRequest,updateCustomerWithdrawalRequestRequest } from '../redux/slices/customerSlice';
import Select2 from "./Select2";
// import NotificationPopup from './Notification'


const ViewCustomerWithdrawalRequest = () => {
    const dispatch = useDispatch();
    const { branches } = useSelector((state) => state.branch);
    const { loading, customers, error } = useSelector((state) => state.customer);
    const [branchId, setBranchId] = useState('all');
    const [filteredCustomers, setFilteredCustomers] = useState([]);
      const [showError, setShowError] = useState(false);
    

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

      const handleCustomerWithdrawalRequestStatusUpdate= (_id) => (e) =>  {
        e.preventDefault();
        // setErrors("");
        const details = { withdrawalRequestId:_id };
        const data = {details}
        console.log('kkk',data)
        dispatch(updateCustomerWithdrawalRequestRequest(data));
      };

    const branchOptions = [
        { label: "All Branches", value: "all" },
        ...branches
            .filter((branch) => branch.name !== "Head office")
            .map((branch) => ({ label: branch.name, value: branch._id }))
    ];

 

    return (
        <div className="container mx-auto p-4">
{showError && (
  <div className="fixed top-0 left-0 right-0 z-50 animate-slideDown">
    <div className="mx-auto max-w-md p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-b shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex-grow">
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
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Customer Dashboard</h1>
            
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

            {/* Customer Table */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    {/* Scrollable container for mobile */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Package
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Branch
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Bank Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Account Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Bank Account Number
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rep
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                       Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredCustomers.length > 0 ? (
                            filteredCustomers.map((customer) => {
                                // Determine button text and color based on status
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
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {customer?.customerId?.firstName} {customer?.customerId?.lastName || ''} 
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {customer?.customerId?.phone || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {customer?.package || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {customer?.branchId?.name || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {customer?.bankName || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {customer?.accountName || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {customer?.bankAccountNumber || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {customer?.amount || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {customer?.accountManagerId?.firstName || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                customer?.status?.toLowerCase() === 'completed' ? 'bg-green-100 text-green-800' :
                                                customer?.status?.toLowerCase() === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {customer?.status || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button 
                                                className={`${buttonColor} px-3 py-1 rounded text-white`}
                                                onClick={handleCustomerWithdrawalRequestStatusUpdate(customer?._id)}
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
                                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                            No customers found{ branchId !== 'all' ? ' for this branch' : '' }
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewCustomerWithdrawalRequest;