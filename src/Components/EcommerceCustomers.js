import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchEcommerceCustomersRequest } from '../redux/slices/customerSlice';
import TableLoadingNotice from './TableLoadingNotice';

const EcommerceCustomers = () => {
    const dispatch = useDispatch();
    const { loading, ecommerceCustomers, error } = useSelector((state) => state.customer);
    const customerList = useMemo(
        () => (Array.isArray(ecommerceCustomers) ? ecommerceCustomers : []),
        [ecommerceCustomers]
    );

    useEffect(() => {
        dispatch(fetchEcommerceCustomersRequest());
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
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Ecommerce Customers</h1>
            <p className="text-sm text-gray-500 mb-4">
                Customers registered through the ecommerce platform
            </p>

            {/* Customer Table */}
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
                                    Address
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created At
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {customerList.length > 0 ? (
                                customerList.map((customer) => (
                                    <tr key={customer?._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {customer?.firstName} {customer?.lastName}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {customer?.phone || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {customer?.address || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {customer?.createdAt
                                                ? new Date(customer.createdAt).toLocaleDateString()
                                                : 'N/A'}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No ecommerce customers found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {loading && <TableLoadingNotice message="Loading ecommerce customers..." />}

            {/* Summary */}
            {customerList.length > 0 && (
                <div className="mt-4 text-sm text-gray-600">
                    Total: {customerList.length} customer(s)
                </div>
            )}
        </div>
    );
};

export default EcommerceCustomers;
