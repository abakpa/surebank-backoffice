import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchInterestRequest,
  createInterestRequest,
  updateInterestRequest
} from '../redux/slices/fdSlice';
import { useNavigate } from 'react-router-dom';

const InterestRate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, interestRate } = useSelector(state => state.fd);

  const [incomeInterestRate, setIncomeInterestRate] = useState('');
  const [expenseInterestRate, setExpenseInterestRate] = useState('');
  const [chargeInterestRate, setChargeInterestRate] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [message, setMessage] = useState('');

  // 1. Fetch on mount
  useEffect(() => {
    dispatch(fetchInterestRequest());
  }, [dispatch]);

  // 2. Watch Redux update
  useEffect(() => {
    // console.log('🔍 interestRate from Redux:', interestRate);
  
    if (Array.isArray(interestRate) && interestRate.length > 0) {
      const rate = interestRate[0]; // ✅ get the first object
      setIncomeInterestRate(String(rate.incomeInterestRate ?? ''));
      setExpenseInterestRate(String(rate.expenseInterestRate ?? ''));
      setChargeInterestRate(String(rate.chargeInterestRate ?? ''));
      setIsEditMode(true);
    }
  }, [interestRate]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    const details = {
      incomeInterestRate,
      expenseInterestRate,
      chargeInterestRate
    };

    const data = { details, navigate };

    if (isEditMode) {
      dispatch(updateInterestRequest(data));
      setMessage('Interest rates updated successfully.');
    } else {
      dispatch(createInterestRequest(data));
      setMessage('Interest rates created successfully.');
      setIsEditMode(true);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-40 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {isEditMode ? 'Update Interest Rates' : 'Set Interest Rates'}
      </h2>

      {message && <p className="text-green-600 text-center mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Interest Income Rate (%)</label>
          <input
            type="number"
            name="incomeInterestRate"
            value={incomeInterestRate}
            onChange={(e) => setIncomeInterestRate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Interest Expense Rate (%)</label>
          <input
            type="number"
            name="expenseInterestRate"
            value={expenseInterestRate}
            onChange={(e) => setExpenseInterestRate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Interest Charge Rate (%)</label>
          <input
            type="number"
            name="expenseInterestRate"
            value={chargeInterestRate}
            onChange={(e) => setChargeInterestRate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isEditMode ? 'Update Interest' : 'Create Interest'}
        </button>
      </form>
    </div>
  );
};

export default InterestRate;
