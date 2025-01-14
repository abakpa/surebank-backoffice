import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerRequest } from "../redux/slices/customerSlice";
import Tablehead from "./Table/CustomerTablehead";
import Tablebody from "./Table/CustomerTablebody";

const Viewcustomer = () => {
  const dispatch = useDispatch();
  const { loading, customers, error } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(fetchCustomerRequest());
  }, [dispatch]);

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
        <p className="text-blue-500 ml-4">Loading customers...</p>
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="flex flex-col p-6 bg-gray-100">
      <h2 className=" text-xl font-bold mb-4 text-center">Customer List</h2>
        <table className="w-full min-w-[700px] border-collapse border border-gray-300">
          <Tablehead />
          <Tablebody customers={customers} />
        </table>
    </div>
  );
};

export default Viewcustomer;
