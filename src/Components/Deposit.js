import React, {useState} from "react";
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { createDepositRequest } from '../redux/slices/depositSlice'


const Deposit = () => {
        const dispatch = useDispatch()
        const navigate = useNavigate()
  const [DSAccountNumber, setDSAccountNumber] = useState("");
  const [amountPerDay, setAmountPerDay] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!DSAccountNumber || !amountPerDay) {
      setError("Both fields are required.");
      return;
    }

    if (isNaN(amountPerDay) || parseFloat(amountPerDay) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    // onSubmit({ accountNumber, amount: parseFloat(amount) });
        const details = { DSAccountNumber, amountPerDay: parseFloat(amountPerDay) }
        const data ={details,navigate}
        dispatch(createDepositRequest(data))
    setDSAccountNumber("");
    setAmountPerDay("");
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Deposit</h2>
      {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="DSAccountNumber" className="block text-sm font-medium text-gray-700">
            Account Number
          </label>
          <input
            id="DSAccountNumber"
            type="text"
            value={DSAccountNumber}
            onChange={(e) => setDSAccountNumber(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Enter account number"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amountPerDay" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            id="amountPerDay"
            type="number"
            step="0.01"
            value={amountPerDay}
            onChange={(e) => setAmountPerDay(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Enter amount"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Deposit
        </button>
      </form>
    </div>
  );
};

export default Deposit;
