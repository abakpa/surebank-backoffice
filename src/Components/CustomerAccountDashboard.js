import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountTransactionRequest, fetchCustomerAccountRequest } from "../redux/slices/createAccountSlice";
import { fetchCustomerSubAccountRequest } from "../redux/slices/subAccountSlice";
import { createDepositRequest } from '../redux/slices/depositSlice';
import { editCustomerAccountRequest } from '../redux/slices/createAccountSlice';
import {fetchStaffRequest} from '../redux/slices/staffSlice'
import { createCustomerAccountRequest } from '../redux/slices/createAccountSlice'


import { useParams } from "react-router-dom";
import Select from "./Select";
import Select2 from "./Select2";

const CustomerAccountDashboard = () => {
  const { customerId } = useParams();
  const dispatch = useDispatch();
  const { customerAccount } = useSelector((state) => state.customerAccount);
  const { subAccount } = useSelector((state) => state.subAccount);
    const { staffs } = useSelector((state) => state.staff);
  
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [getAmountPerDay, setGetAmountPerDay] = useState(null);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [amountPerDay, setAmountPerDay] = useState("");
  const [accountType, setAccountType] = useState("");
//   const [createAmount, setCreateAmount] = useState("");
    const [accountManagerId, setAccountManagerId] = useState("");
  
  const [error, setError] = useState("");

  useEffect(() => {
    const data = { customerId: customerId };
    dispatch(fetchCustomerSubAccountRequest(data));
  }, [dispatch,customerId]);
  
  useEffect(() => {
    const data = { customerId: customerId };
    dispatch(fetchCustomerAccountRequest(data));
  }, [dispatch, customerId]);


//   const accountId = localStorage.getItem("accountId");
  const customerName = localStorage.getItem("customerName");
  const accountNumber = localStorage.getItem("accountNumber");
  const ledgerBalance = localStorage.getItem("ledgerBalance");
  const availableBalance = localStorage.getItem("availableBalance");
//   const DSAccountNumber = localStorage.getItem("DSAccountNumber");
//   const balance = localStorage.getItem("balance");

  const accountTransaction = (accountTypeId) => {
    if (!accountTypeId) return;
    dispatch(fetchAccountTransactionRequest({ accountTypeId }));
    setSelectedAccount(accountTypeId);
  };
  
//   const accounts = [
//     subAccount?.DSAccountNumber && { type: "Daily Savings", number: subAccount.DSAccountNumber, balance: subAccount.totalContribution },
//   ].filter(Boolean);

  const transactionHistory = Array.isArray(customerAccount) ? customerAccount : [];

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!selectedAccount.DSAccountNumber || !amountPerDay) {
      setError("Both fields are required.");
      return;
    }

    if (isNaN(amountPerDay) || parseFloat(amountPerDay) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    const details = { DSAccountNumber: selectedAccount.DSAccountNumber,accountType:selectedAccount.accountType, amountPerDay: parseFloat(amountPerDay) };
    const data = {details}
    console.log("details",details)
    dispatch(createDepositRequest(data));
    setAmountPerDay("");
    setShowDepositModal(false);
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!selectedAccount.DSAccountNumber || !amountPerDay) {
      setError("Both fields are required.");
      return;
    }

    if (isNaN(amountPerDay) || parseFloat(amountPerDay) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    const details = { DSAccountNumber: selectedAccount.DSAccountNumber, amountPerDay: parseFloat(amountPerDay) };
    const data = {details}
    console.log("details",details)
    dispatch(editCustomerAccountRequest(data));
    setAmountPerDay("");
    setShowEditModal(false);
  };

    useEffect(() => {
        dispatch(fetchStaffRequest());
      }, [dispatch]);
    
      const accountpackages = ["Rent", "School fees", "Food"];
  
    const handleCreateAccount = (e) => {
      e.preventDefault();
      setError("");
  
      if (!accountNumber || !amountPerDay) {
        setError("Both fields are required.");
        return;
      }
  
      if (isNaN(amountPerDay) || parseFloat(amountPerDay) <= 0) {
        setError("Please enter a valid amount.");
        return;
      }
  
      // onSubmit({ accountNumber, amount: parseFloat(amount) });
          const details = { accountManagerId, accountType, accountNumber, amountPerDay: parseFloat(amountPerDay) }
          const data ={details}
          dispatch(createCustomerAccountRequest(data))
      setAmountPerDay("");
      setAccountType("");
      setAccountManagerId("");
      setShowCreateAccountModal(false);
    };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Customer Account Dashboard</h1>
        <p className="text-gray-700"><strong>Name:</strong> {customerName}</p>
        <p className="text-gray-700"><strong>Account Number:</strong> {accountNumber}</p>
        <p className="text-gray-700"><strong>Total Balance:</strong> ₦{ledgerBalance}</p>
        <p className="text-gray-700"><strong>Available Balance:</strong> ₦{availableBalance}</p>
      </header>
  {/* Add Account Section */}
<div className="mt-2">
  <h2 className="text-lg font-bold mb-2">Add New Package</h2>
  <div className="flex space-x-2 mb-2">
    <div className="cursor-pointer bg-blue-500 text-white w-8 h-8 rounded-lg flex items-center justify-center" onClick={() => setShowCreateAccountModal(true)}>
      DS
    </div>
    <div className="cursor-pointer bg-green-500 text-white w-8 h-8 rounded-lg flex items-center justify-center" onClick={() => setShowCreateAccountModal(true)}>
      BS
    </div>
    <div className="cursor-pointer bg-purple-500 text-white w-8 h-8 rounded-lg flex items-center justify-center" onClick={() => setShowCreateAccountModal(true)}>
      FD
    </div>
  </div>
</div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel - Account Details */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-bold mb-4">Accounts</h2>
          {Array.isArray(subAccount) && subAccount.length > 0 ? (
  <ul className="space-y-4">
    {subAccount.map((account, index) => (
      <li
        key={index}
        className="flex justify-between items-center bg-gray-50 p-3 rounded hover:shadow-md"
      >
        <div>
        <div
          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-1 ${
            account.accountType === "Rent"
              ? "bg-blue-100 text-gray-700"
              : account.accountType === "School fees"
              ? "bg-green-100 text-green-700"
              : account.accountType === "Food"
              ? "bg-purple-100 text-purple-700"
              : "bg-gray-100 text-blue-700"
          }`}
        >
          {account.accountType} Account <strong>{account.amountPerDay}</strong> 
          <button
        onClick={() => {
          setSelectedAccount(account);
          setGetAmountPerDay(account.amountPerDay);
          setShowEditModal(true);
        }}
       className="text-blue-600 hover:text-blue-800 ml-2"
        >
      <i className="fas fa-edit text-lg" title="Edit"></i>
      </button>

        </div>
          <p className="text-sm text-gray-600">
            Number: {account.DSAccountNumber || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            Balance: ₦{account.totalContribution || 0}
          </p>
        </div>
        <div className="flex space-x-2">
        {/* View Transactions */}
        <button
          onClick={() => accountTransaction(account._id)}
          className="text-blue-600 hover:underline"
        >
          <i className="fas fa-folder-open text-lg" title="View Transactions"></i>
        </button>
        {/* Deposit Icon */}
        <button
          onClick={() => {
            setSelectedAccount(account);
            setGetAmountPerDay(account.amountPerDay);
            setShowDepositModal(true);
          }}
          className="text-green-600 hover:text-green-800"
        >
          <i className="fas fa-plus-circle text-lg" title="Deposit"></i>
        </button>
        {/* Withdrawal Icon */}
        <button
          onClick={() => {
            // Add withdrawal logic here
          }}
          className="text-red-600 hover:text-red-800"
        >
          <i className="fas fa-minus-circle text-lg" title="Withdraw"></i>
        </button>
      </div>
      </li>
    ))}
  </ul>
) : (
  <p className="text-gray-600">Customer does not have any accounts.</p>
)}

        </div>

        {/* Right Panel - Transaction History */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-bold mb-4">Transaction History</h2>
          {selectedAccount ? (
            <div>
              <h3 className="text-md font-semibold mb-2">Account: {subAccount.DSAccountNumber}</h3>
              <ul className="space-y-2">
                {transactionHistory.length > 0 ? (
                  transactionHistory.map((transaction, index) => (
                    <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                      <div>
                        <p className="text-sm font-medium">{transaction.direction}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                      <p className={`text-sm font-semibold ${transaction.direction === 'Credit' ? "text-green-600" : "text-red-600"}`}>
                        {transaction.direction === 'Credit' ? "+" : "-"}
                        {transaction.amount}
                      </p>
                      <p className="text-sm text-gray-600">{transaction.narration}</p>
                      <p className="text-sm text-gray-600">Bal: ₦{transaction.balance}</p>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-600">No transactions found.</p>
                )}
              </ul>
            </div>
          ) : (
            <p className="text-gray-600">Select an account to view transactions.</p>
          )}
        </div>
      </div>

  
       {showDepositModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
  
      <div className="bg-white p-6 rounded shadow-md w-96">
      <h3 className="text-lg font-bold mb-4">
      Deposit <span className="text-green-600">₦{getAmountPerDay}</span> daily
     </h3>
        <form onSubmit={handleDepositSubmit}>
          <input
            type="number"
            value={amountPerDay}
            onChange={(e) => setAmountPerDay(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowDepositModal(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Deposit
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
       {showEditModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
  
      <div className="bg-white p-6 rounded shadow-md w-96">
      <h3 className="text-lg font-bold mb-4">
      Edit <span className="text-green-600">₦{getAmountPerDay}</span> daily
     </h3>
        <form onSubmit={handleEditSubmit}>
          <input
            type="number"
            value={amountPerDay}
            onChange={(e) => setAmountPerDay(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowEditModal(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
  
  {/* Create Account Package Modal */}
  {showCreateAccountModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h3 className="text-lg font-bold mb-4">Create Account Package</h3>
        <form onSubmit={handleCreateAccount}>
        
        <div className="mb-4">
          <Select
            label="Account Type"
            options={accountpackages}
            value={accountType}
            onChange={setAccountType}
          />
        </div>
        <div className="mb-4">
         <Select2
  label="Account Manager"
  options={staffs.map((staff) => ({ label: staff.name, value: staff._id }))}
  value={accountManagerId}
  onChange={(selectedId) => setAccountManagerId(selectedId)}
/>

        </div>
          <div className="mb-4">
            <label htmlFor="amountPerDay" className="block text-sm font-medium text-gray-700">
              Initial Deposit
            </label>
            <input
              id="amountPerDay"
              type="number"
              value={amountPerDay}
              onChange={(e) => setAmountPerDay(e.target.value)}
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded p-2 mt-1"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowCreateAccountModal(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
  </div>
  )
    };
    export default CustomerAccountDashboard;