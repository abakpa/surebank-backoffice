import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchBranchCustomerLoginCountRequest } from '../redux/slices/customerSlice';

const ViewBranchCustomerUsingApp = () => {
    const dispatch = useDispatch();
    const { loading, customers, error } = useSelector((state) => state.customer);
    useEffect(() => {
        dispatch(fetchBranchCustomerLoginCountRequest());
    }, [dispatch]);

    if (error) {
        return (
            <div className="p-4 text-red-500 bg-red-50 rounded-lg">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Customer Dashboard</h1>
            
    
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
                                        Last Login
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Login Count
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {customers.length > 0 ? (
                                    customers.map((customer) => (
                                        <tr key={customer?._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {customer?.customerId?.firstName} {customer?.customerId?.firstName} 
                                                        </div>
                                                    </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {customer?.customerId?.phone || 'N/A'}
                                            </td>
                                      
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {customer?.lastLogin ? new Date(customer.lastLogin).toLocaleString() : 'Never'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {customer?.count || 0}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                            No customers found for this branch
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

export default ViewBranchCustomerUsingApp;