import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import { fetchCustomerLoginCountRequest } from '../redux/slices/customerSlice';
import Select2 from "./Select2";

const ViewCustomerUsingApp = () => {
    const dispatch = useDispatch();
    const { branches } = useSelector((state) => state.branch);
    const { loading, customers, error } = useSelector((state) => state.customer);
    const [branchId, setBranchId] = useState('all');
    const [filteredCustomers, setFilteredCustomers] = useState([]);

    useEffect(() => {
        dispatch(fetchBranchRequest());
        dispatch(fetchCustomerLoginCountRequest());
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

    const branchOptions = [
        { label: "All Branches", value: "all" },
        ...branches
            .filter((branch) => branch.name !== "Head office")
            .map((branch) => ({ label: branch.name, value: branch._id }))
    ];

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
                                        Branch
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
                                {filteredCustomers.length > 0 ? (
                                    filteredCustomers.map((customer) => (
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
                                                {customer?.branchId?.name || 'N/A'}
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

export default ViewCustomerUsingApp;