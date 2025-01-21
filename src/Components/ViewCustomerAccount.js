import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCustomerAccountRequest } from "../redux/slices/createAccountSlice";

const ViewCustomerAccount = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim and validate account number
    const trimmedAccountNumber = accountNumber.trim();

    if (!trimmedAccountNumber) {
      setError("Account number is required.");
      return;
    }

    if (!/^\d+$/.test(trimmedAccountNumber)) {
      setError("Account number must contain only numbers.");
      return;
    }

    // Clear error and dispatch the action
    setError("");
    const data = { accountNumber: trimmedAccountNumber, navigate };
    dispatch(fetchCustomerAccountRequest(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-6">View Customer Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="accountNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter Account Number
            </label>
            <input
              id="accountNumber"
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="e.g., 123456789"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700 focus:outline-none"
          >
            Proceed to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViewCustomerAccount;
