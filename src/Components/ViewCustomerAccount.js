import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewCustomerAccount = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Ensure account number is not empty and is numeric
    if (!accountNumber.trim()) {
      setError("Account number is required.");
      return;
    }

    if (!/^\d+$/.test(accountNumber)) {
      setError("Account number must contain only numbers.");
      return;
    }

    setError(""); // Clear errors if valid

    // Navigate to the dashboard, passing the account number
    navigate(`/dashboard/${accountNumber}`);
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
              placeholder="123456789"
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
