import React,{useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux'
import {fetchCustomerRequest} from '../redux/slices/customerSlice'

const Viewcustomer = () => {

        const dispatch = useDispatch()
        const {loading,customers,error} = useSelector((state)=>state.customer)
    
        useEffect(()=>{
            dispatch(fetchCustomerRequest())
        },[dispatch])
        if (loading) {
            return (
              <div className="min-h-screen flex items-center justify-center bg-gray-100">
                  <svg
                      className="animate-spin h-10 w-10 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-label="Loading"
                  >
                      <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="opacity-25"
                      />
                      <path
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          className="opacity-75"
                      />
                  </svg>
                  <p className="text-blue-500 ml-4">Loading vehicles...</p>
              </div>
          );
      }
      if(error)return <p>Error: {error}</p>
  return (
    <div className="p-6 bg-white rounded shadow-md max-w-4xl mx-auto mb-6">
      <h2 className="text-xl font-bold mb-4">Customer List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Address</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Branch</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 p-2">{customer.name}</td>
              <td className="border border-gray-300 p-2">{customer.address}</td>
              <td className="border border-gray-300 p-2">{customer.phone}</td>
              <td className="border border-gray-300 p-2">{customer.email}</td>
              <td className="border border-gray-300 p-2">{customer.branch}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Viewcustomer;
