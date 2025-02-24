import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountTransactionRequest } from "../redux/slices/createAccountSlice";
import { createDepositRequest,createSBDepositRequest,createCustomerFDAccountRequest,createFDWithdrawalRequest,createFDMaturedWithdrawalRequest,editCustomerFDAccountRequest } from '../redux/slices/depositSlice';
import { fetchCustomerAccountRequest,clearDepositError,createMainWithdrawalRequest,createWithdrawalRequest, createSBWithdrawalRequest,createSBSellProductRequest,editCustomerAccountRequest,editCustomerSBAccountRequest,createCustomerAccountRequest,createCustomerSBAccountRequest } from '../redux/slices/depositSlice';
import {fetchStaffRequest} from '../redux/slices/staffSlice'
import NotificationPopup from './Notification'
import Loader from "./Loader";
import Tablebody from "./Table/TransactionTableBody";
import Tablehead from "./Table/TransactionTableHead";


import { useParams } from "react-router-dom";
import Select from "./Select";
import Select2 from "./Select2";

const CustomerAccountDashboard = () => {
  const { customerId } = useParams();
  const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.login.staff?.role);
    const loggedInStaffRole = isLoggedIn || localStorage.getItem("staffRole");
  const { customerAccount,error:customerAccountError } = useSelector((state) => state.customerAccount);
  const { subAccount } = useSelector((state) => state.subAccount);
    const { staffs } = useSelector((state) => state.staff);
    const {withdrawal,error:withdrawalError} = useSelector((state)=>state.withdrawal)
    const {loading,deposit,error:depositError} = useSelector((state)=>state.deposit)
    const newSubAccount = deposit?.subAccount
  
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [getAmountPerDay, setGetAmountPerDay] = useState(null);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showSBDepositModal, setShowSBDepositModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [showSBWithdrawalModal, setShowSBWithdrawalModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [showMaturedWithdrawalModal, setShowMaturedWithdrawalModal] = useState(false);
  const [showMainWithdrawalModal, setShowMainWithdrawalModal] = useState(false);
  const [showFDWithdrawalModal, setShowFDWithdrawalModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSBEditModal, setShowSBEditModal] = useState(false);
  const [showFDEditModal, setShowFDEditModal] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [showCreateSBAccountModal, setShowCreateSBAccountModal] = useState(false);
  const [showCreateFDAccountModal, setShowCreateFDAccountModal] = useState(false);
  const [amountPerDay, setAmountPerDay] = useState("");
  const [amount, setAmount] = useState("");
  const [fdamount, setFdamount] = useState("");
  const [durationMonths, setDurationMonths] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [accountType, setAccountType] = useState("");
    const [accountManagerId, setAccountManagerId] = useState("");
  
  const [errors, setErrors] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (selectedAccount) {
      setSellingPrice(selectedAccount.sellingPrice); // Pre-fill amount
      setProductName(selectedAccount.productName); // Pre-fill product name
    }
  }, [selectedAccount]);
  useEffect(() => {
    if (selectedAccount) {
      setFdamount(selectedAccount.fdamount); // Pre-fill amount
      setDurationMonths(selectedAccount.durationMonths); // Pre-fill product name
    }
  }, [selectedAccount]);

  useEffect(() => {
    if (customerAccount?.message) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [customerAccount?.message]);

  useEffect(() => {
    if (customerAccountError) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [customerAccountError]);
  useEffect(() => {
    if (withdrawal?.message) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [withdrawal?.message]);

  useEffect(() => {
    if (withdrawalError) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [withdrawalError]);
  useEffect(() => {
    if (deposit?.message) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [deposit?.message]);

  useEffect(() => {
    if (depositError) {
      setShowError(true);
    }
  }, [depositError]);
  
  useEffect(() => {
    if (!showError) {
      dispatch(clearDepositError()); // Reset error immediately when showError is false
    }
  }, [showError, dispatch]);


  // useEffect(() => {
  //   const data = { customerId: customerId };
  //   dispatch(fetchSubAccountDepositRequest(data));
  // }, [dispatch,customerId]);
  
  useEffect(() => {
    const data = { customerId: customerId };
    dispatch(fetchCustomerAccountRequest(data));
  }, [dispatch, customerId]);


  const customerName = localStorage.getItem("customerName");
  // const accountNumber = localStorage.getItem("accountNumber");
  // const mainAccountId = localStorage.getItem("mainAccountId");

  const accountTransaction = (accountTypeId) => {
    if (!accountTypeId) return;
    dispatch(fetchAccountTransactionRequest({ accountTypeId }));
    setSelectedAccount(accountTypeId);
  };
  
  const transactionHistory = Array.isArray(customerAccount) ? customerAccount : [];

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    if (!selectedAccount.DSAccountNumber || !amountPerDay) {
      setErrors("Both fields are required.");
      return;
    }

    if (isNaN(amountPerDay) || parseFloat(amountPerDay) <= 0) {
      setErrors("Please enter a valid amount.");
      return;
    }

    const details = { DSAccountNumber: selectedAccount.DSAccountNumber,accountType:selectedAccount.accountType,customerId:customerId, amountPerDay: parseFloat(amountPerDay) };
    const data = {details}
    console.log("details",details)
    dispatch(createDepositRequest(data));
    setAmountPerDay("");
    setShowDepositModal(false);
  };
  const handleSBDepositSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    if (!selectedAccount.SBAccountNumber || !amount) {
      setErrors("Both fields are required.");
      return;
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setErrors("Please enter a valid amount.");
      return;
    }

    const details = { SBAccountNumber: selectedAccount.SBAccountNumber,productName:selectedAccount.productName,customerId:customerId, amount: parseFloat(amount) };
    const data = {details}
    console.log("details",details)
     dispatch(createSBDepositRequest(data));

    setAmount("");
    setShowSBDepositModal(false);
  };
  const handleWithdrawalSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    if (!selectedAccount.DSAccountNumber || !amountPerDay) {
      setErrors("Both fields are required.");
      return;
    }

    if (isNaN(amountPerDay) || parseFloat(amountPerDay) <= 0) {
      setErrors("Please enter a valid amount.");
      return;
    }

    const details = { DSAccountNumber: selectedAccount.DSAccountNumber,accountType:selectedAccount.accountType,customerId:customerId, amountPerDay: parseFloat(amountPerDay) };
    const data = {details}
    console.log("details",details)
    dispatch(createWithdrawalRequest(data));
    setAmountPerDay("");
    setShowWithdrawalModal(false);
  };
  const handleSBWithdrawalSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    if (!selectedAccount.SBAccountNumber || !amount) {
      setErrors("Both fields are required.");
      return;
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setErrors("Please enter a valid amount.");
      return;
    }

    const details = { SBAccountNumber: selectedAccount.SBAccountNumber,productName:selectedAccount.productName,customerId:customerId, amount: parseFloat(amount) };
    const data = {details}
    console.log("details",details)
    dispatch(createSBWithdrawalRequest(data));
    setAmount("");
    setShowSBWithdrawalModal(false);
  };
  const handleFDWithdrawalSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    if (!selectedAccount.FDAccountNumber || !fdamount) {
      setErrors("Both fields are required.");
      return;
    }

    if (isNaN(fdamount) || parseFloat(fdamount) <= 0) {
      setErrors("Please enter a valid amount.");
      return;
    }

    const details = { FDAccountNumber: selectedAccount.FDAccountNumber,customerId:customerId, fdamount: parseFloat(fdamount) };
    const data = {details}
    console.log("details",details)
    dispatch(createFDWithdrawalRequest(data));
    setFdamount("");
    setShowFDWithdrawalModal(false);
  };
  const handleSellSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    const details = { SBAccountNumber: selectedAccount.SBAccountNumber,productName:selectedAccount.productName,customerId:customerId};
    const data = {details}
    console.log("details",details)
    dispatch(createSBSellProductRequest(data));
    setShowSellModal(false);
  };
  const handleMaturedFDSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    const details = { FDAccountNumber: selectedAccount.FDAccountNumber,customerId:customerId};
    const data = {details}
    console.log("details",details)
    dispatch(createFDMaturedWithdrawalRequest(data));
    setShowMaturedWithdrawalModal(false);
  };
  const handleMainWithdrawalSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    if (isNaN(amountPerDay) || parseFloat(amountPerDay) <= 0) {
      setErrors("Please enter a valid amount.");
      return;
    }

    const details = { accountNumber: deposit?.account?.accountNumber,customerId:customerId, amountPerDay: parseFloat(amountPerDay) };
    const data = {details}
    dispatch(createMainWithdrawalRequest(data));
    setAmountPerDay("");
    setShowMainWithdrawalModal(false);
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    if (!selectedAccount.DSAccountNumber || !amountPerDay) {
      setErrors("Both fields are required.");
      return;
    }

    if (isNaN(amountPerDay) || parseFloat(amountPerDay) <= 0) {
      setErrors("Please enter a valid amount.");
      return;
    }

    const details = { DSAccountNumber: selectedAccount.DSAccountNumber,customerId:customerId, amountPerDay: parseFloat(amountPerDay) };
    const data = {details}
    console.log("details",details)
    dispatch(editCustomerAccountRequest(data));
    setAmountPerDay("");
    setShowEditModal(false);
  };
  const handleSBEditSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    if (!selectedAccount.SBAccountNumber || !sellingPrice) {
      setErrors("Both fields are required.");
      return;
    }

    if (isNaN(sellingPrice) || parseFloat(sellingPrice) <= 0) {
      setErrors("Please enter a valid amount.");
      return;
    }

    const details = { SBAccountNumber: selectedAccount.SBAccountNumber,productName,customerId:customerId, sellingPrice: parseFloat(sellingPrice) };
    const data = {details}
    console.log("details",details)
    dispatch(editCustomerSBAccountRequest(data));
    setSellingPrice("");
    setShowSBEditModal(false);
  };
  const handleFDEditSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    if (!selectedAccount.FDAccountNumber || !fdamount) {
      setErrors("Both fields are required.");
      return;
    }

    if (isNaN(fdamount) || parseFloat(fdamount) <= 0) {
      setErrors("Please enter a valid amount.");
      return;
    }

    const details = { FDAccountNumber: selectedAccount.FDAccountNumber,customerId:customerId,durationMonths:durationMonths, fdamount: parseFloat(fdamount) };
    const data = {details}
    console.log("details",details)
    dispatch(editCustomerFDAccountRequest(data));
    setFdamount("");
    setDurationMonths("");
    setShowFDEditModal(false);
  };

    useEffect(() => {
        dispatch(fetchStaffRequest());
      }, [dispatch]);
    
      const accountpackages = ["Rent", "School fees", "Food"];
  
    const handleCreateAccount = (e) => {
      console.log("handle")
      e.preventDefault();
      setErrors("");
  
      if (!deposit.account.accountNumber || !amountPerDay) {
        setErrors("Both fields are required.");
        return;
      }
  
      if (isNaN(amountPerDay) || parseFloat(amountPerDay) <= 0) {
        setErrors("Please enter a valid amount.");
        return;
      }
  
          const details = { accountManagerId, accountType,customerId:customerId, accountNumber:deposit?.account?.accountNumber, amountPerDay: parseFloat(amountPerDay) }
          console.log("44",details)
          const data ={details}
          dispatch(createCustomerAccountRequest(data))
      setAmountPerDay("");
      setAccountType("");
      setAccountManagerId("");
      setShowCreateAccountModal(false);
    };
    const handleCreateSBAccount = (e) => {
      console.log("handle")
      e.preventDefault();
      setErrors("");
  
      if (!deposit.account.accountNumber || !sellingPrice) {
        setErrors("Both fields are required.");
        return;
      }
  
      if (isNaN(sellingPrice) || parseFloat(sellingPrice) <= 0) {
        setErrors("Please enter a valid selling price.");
        return;
      }
  
          const details = { accountManagerId, productName, productDescription, customerId:customerId, accountNumber:deposit?.account?.accountNumber, sellingPrice: parseFloat(sellingPrice) }
          console.log("44",details)
          const data ={details}
          dispatch(createCustomerSBAccountRequest(data))
      setSellingPrice("");
      setProductName("");
      setAccountManagerId("");
      setShowCreateSBAccountModal(false);
    };
    const handleCreateFDAccount = (e) => {
      console.log("handle")
      e.preventDefault();
      setErrors("");
  
      if (!deposit.account.accountNumber || !fdamount) {
        setErrors("Both fields are required.");
        return;
      }
  
      if (isNaN(fdamount) || parseFloat(fdamount) <= 0) {
        setErrors("Please enter a valid amount.");
        return;
      }
  
          const details = { accountManagerId, durationMonths, customerId:customerId, accountNumber:deposit?.account?.accountNumber, fdamount:parseFloat(fdamount) }
          console.log("44",details)
          const data ={details}
          dispatch(createCustomerFDAccountRequest(data))
      setFdamount("");
      setDurationMonths("");
      setAccountManagerId("");
      setShowCreateFDAccountModal(false);
    };


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {loading && <Loader />}
     
         {showSuccess && (
        <NotificationPopup 
          messages={[deposit?.message, withdrawal?.message, customerAccount?.message].filter(Boolean)}
          type="success"
          onClose={() => setShowSuccess(false)}
        />
      )}
      {showError && (
        <NotificationPopup 
          messages={[depositError, withdrawalError, customerAccountError].filter(Boolean)}
          type="error"
          onClose={() => setShowError(false)}
        />
      )}
      {/* Header */}
      <header className="mb-6 mt-6">
        <h1 className="text-2xl font-bold">Customer Account Dashboard</h1>
        <p className="text-gray-700"><strong>Name:</strong> {customerName}</p>
        <p className="text-gray-700"><strong>Account Number:</strong> {deposit?.account?.accountNumber}</p>
        <p className="text-gray-700"><strong>Total Balance:</strong> ₦{deposit?.account?.ledgerBalance}</p>
        <p className="text-gray-700">
          <strong>Available Balance:</strong> ₦{deposit?.account?.availableBalance} 
          <button
          onClick={() => accountTransaction(deposit?.account?._id)}
          className="text-blue-600 hover:underline ml-1"
        >
          <i className="fas fa-folder-open text-lg" title="View Transactions"></i>
        </button>
          <button
          onClick={() => {
            setShowMainWithdrawalModal(true);
          }}
          className="text-red-600 hover:text-red-800 ml-1"
        >
          <i className="fas fa-minus-circle text-lg" title="Withdraw"></i>
        </button>
        </p>
      </header>
  {/* Add Account Section */}
<div className="mt-2">
  <h2 className="text-lg font-bold mb-2">Add New Package</h2>
  <div className="flex space-x-2 mb-2">
    <div className="cursor-pointer bg-blue-500 text-white w-8 h-8 rounded-lg flex items-center justify-center" onClick={() => setShowCreateAccountModal(true)}>
      DS
    </div>
    <div className="cursor-pointer bg-green-500 text-white w-8 h-8 rounded-lg flex items-center justify-center" onClick={() => setShowCreateSBAccountModal(true)}>
      SB
    </div>
    <div className="cursor-pointer bg-purple-500 text-white w-8 h-8 rounded-lg flex items-center justify-center" onClick={() => setShowCreateFDAccountModal(true)}>
      FD
    </div>
  </div>
</div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel - Account Details */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-bold mb-4">Accounts</h2>
          {(Array.isArray(newSubAccount?.dsAccount) && newSubAccount.dsAccount.length > 0) || 
 (Array.isArray(newSubAccount?.sbAccount) && newSubAccount.sbAccount.length > 0) ? (
  <ul className="space-y-4">
    {/* DS Accounts */}
    {Array.isArray(newSubAccount?.dsAccount) &&
      newSubAccount.dsAccount.map((account, index) => (
        <li
          key={`ds-${index}`}
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
              {account.accountType} Account <strong>₦{account.amountPerDay}</strong>
              <button
                onClick={() => {
                  setSelectedAccount(account);
                  setGetAmountPerDay(account.amountPerDay);
                  setShowEditModal(true);
                }}
                className="text-blue-600 hover:text-blue-800 ml-2"
              >
                <i className="fas fa-edit text-sm" title="Edit"></i>
              </button>
            </div>
            <p className="text-sm text-gray-600">Number: {account.DSAccountNumber || "N/A"}</p>
            <p className="text-sm text-gray-600">Balance: ₦{account.totalContribution || 0}</p>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => accountTransaction(account._id)} className="text-blue-600 hover:underline">
              <i className="fas fa-folder-open text-sm md:text-lg" title="View Transactions"></i>
            </button>
            <button onClick={() => { setSelectedAccount(account);setGetAmountPerDay(account.amountPerDay); setShowDepositModal(true); }} className="text-green-600 hover:text-green-800">
              <i className="fas fa-plus-circle text-sm md:text-lg" title="Deposit"></i>
            </button>
            <button onClick={() => { setSelectedAccount(account); setShowWithdrawalModal(true); }} className="text-red-600 hover:text-red-800">
              <i className="fas fa-minus-circle text-sm md:text-lg" title="Withdraw"></i>
            </button>
          </div>
        </li>
      ))}
{/* FD Accounts */}
{Array.isArray(newSubAccount?.fdAccount) &&
  newSubAccount.fdAccount.map((account, index) => {
    const today = new Date();
    const maturityDate = new Date(account.maturityDate);
    const isMatured = maturityDate <= today; // Check if matured
    return (
      <li
        key={`fd-${index}`}
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
            FD Account <strong>₦{account.fdamount}</strong>
            {account.totalAmount === 0 &&(
            <button
              onClick={() => {
                setSelectedAccount(account);
                setGetAmountPerDay(account.fdamount);
                setShowFDEditModal(true);
              }}
              className="text-blue-600 hover:text-blue-800 ml-2"
            >
              <i className="fas fa-edit text-sm" title="Edit"></i>
            </button>
    )}
          </div>
          <p className="text-sm text-gray-600">Number: {account.FDAccountNumber || "N/A"}</p>
          <p className="text-sm text-gray-600">Balance: ₦{account.totalAmount || 0}</p>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => accountTransaction(account._id)} className="text-blue-600 hover:underline">
            <i className="fas fa-folder-open text-sm md:text-lg" title="View Transactions"></i>
          </button>
          <button onClick={() => { setSelectedAccount(account); setGetAmountPerDay(account.amountPerDay); setShowDepositModal(true); }} className="text-green-600 hover:text-green-800">
            <i className="fas fa-plus-circle text-sm md:text-lg" title="Deposit"></i>
          </button>
          <button onClick={() => { setSelectedAccount(account); setShowFDWithdrawalModal(true); }} className="text-red-600 hover:text-red-800">
            <i className="fas fa-minus-circle text-sm md:text-lg" title="Withdraw"></i>
          </button>

          {/* New Button for Withdrawing Matured Fixed Deposit */}
          {isMatured && account.totalAmount > 0 && (
           
            <button
              onClick={() => { setSelectedAccount(account); setShowMaturedWithdrawalModal(true); }}
              className="text-yellow-600 hover:text-yellow-800"
            >
              <i className="fas fa-unlock text-sm md:text-lg" title="Withdraw Matured FD"></i>
            </button>
          )}
        </div>
      </li>
    );
  })}


    {/* SB Accounts */}
    {Array.isArray(newSubAccount?.sbAccount) &&
  newSubAccount.sbAccount.map((account, index) => (
    <li
      key={`sb-${index}`}
      className="flex justify-between items-center bg-gray-50 p-3 rounded hover:shadow-md relative"
    >
      <div>
        {/* Product Info Container - Responsive Flex */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-3">
          {/* Product Name & Price */}
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              account.accountType === "Rent"
                ? "bg-blue-100 text-gray-700"
                : account.accountType === "School fees"
                ? "bg-green-100 text-green-700"
                : account.accountType === "Food"
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 text-blue-700"
            }`}
          >
            {account.productName} <strong>₦{account.sellingPrice}</strong>
          </span>

          {/* Tooltip & Edit - Same Row on Desktop, Below on Mobile */}
          <div className="flex items-center space-x-2 mt-1 md:mt-0">
            {/* Info Icon with Tooltip */}
            <div className="relative group">
              <button className="text-gray-600 hover:text-gray-800">
                <i className="fas fa-info-circle text-sm" title="Product description"></i>
              </button>
              <div className="absolute left-14 transform -translate-x-1/2 bottom-full mb-2 w-48 bg-green-700 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {account.productDescription || "No description available"}
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => {
                setSelectedAccount(account);
                setShowSBEditModal(true);
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              <i className="fas fa-edit text-sm" title="Edit"></i>
            </button>
          </div>
        </div>

        {/* Account Details */}
        <p className="text-xs text-gray-600">Number: {account.SBAccountNumber || "N/A"}</p>
        <p className="text-xs text-gray-600">Balance: ₦{account.balance || 0}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-1">
        {/* View Transactions */}
        <button onClick={() => accountTransaction(account._id)} className="text-blue-600 hover:underline">
          <i className="fas fa-folder-open text-sm md:text-lg" title="View Transactions"></i>
        </button>
        {/* Deposit Icon */}
        <button onClick={() => { setSelectedAccount(account); setShowSBDepositModal(true); }} className="text-green-600 hover:text-green-800">
          <i className="fas fa-plus-circle text-sm md:text-lg" title="Deposit"></i>
        </button>
        {/* Withdrawal Icon */}
        {loggedInStaffRole === 'Admin' && (
          <button onClick={() => { setSelectedAccount(account); setShowSBWithdrawalModal(true); }} className="text-red-600 hover:text-red-800">
            <i className="fas fa-minus-circle text-sm md:text-lg" title="Withdraw"></i>
          </button>
        )}
        {/* Sell Icon */}
        <button onClick={() => { setSelectedAccount(account); setShowSellModal(true); }} className="text-yellow-600 hover:text-yellow-800">
          <i className="fas fa-shopping-cart text-sm md:text-lg" title="Sell"></i>
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
          
                  <table className="md:min-w-[500px] md:ml-4">
                  <Tablehead />
                  <Tablebody customers={transactionHistory} branches={staffs} />
                </table>
                  
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
      {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}
  
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
       {showSBDepositModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}
  
      <div className="bg-white p-6 rounded shadow-md w-96">
      <h3 className="text-lg font-bold mb-4">
      Deposit
     </h3>
        <form onSubmit={handleSBDepositSubmit}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowSBDepositModal(false)}
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
       {showWithdrawalModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}
  
      <div className="bg-white p-6 rounded shadow-md w-96">
      <h3 className="text-lg font-bold mb-4">
      Withdrawal 
     </h3>
        <form onSubmit={handleWithdrawalSubmit}>
          <input
            type="number"
            value={amountPerDay}
            onChange={(e) => setAmountPerDay(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowWithdrawalModal(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Withdraw
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
       {showSBWithdrawalModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}
  
      <div className="bg-white p-6 rounded shadow-md w-96">
      <h3 className="text-lg font-bold mb-4">
      Withdrawal 
     </h3>
        <form onSubmit={handleSBWithdrawalSubmit}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowSBWithdrawalModal(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Withdraw
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
       {showSellModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}
  
      <div className="bg-white p-6 rounded shadow-md w-96">
      <h5 className="text-sm font-bold mb-4">
      {"Are you sure you want to sell the product?"}
     </h5>
        <form onSubmit={handleSellSubmit}>
    
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowSellModal(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Sell
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
       {showMaturedWithdrawalModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}
  
      <div className="bg-white p-6 rounded shadow-md w-96">
      <h5 className="text-sm font-bold mb-4">
      {"Are you sure you want to withdraw the money?"}
     </h5>
        <form onSubmit={handleMaturedFDSubmit}>
    
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowMaturedWithdrawalModal(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Yes
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
       {showMainWithdrawalModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}
  
      <div className="bg-white p-6 rounded shadow-md w-96">
      <h3 className="text-lg font-bold mb-4">
      Withdrawal 
     </h3>
        <form onSubmit={handleMainWithdrawalSubmit}>
          <input
            type="number"
            value={amountPerDay}
            onChange={(e) => setAmountPerDay(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowMainWithdrawalModal(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Withdraw
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
       {showFDWithdrawalModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}
  
      <div className="bg-white p-6 rounded shadow-md w-96">
      <h3 className="text-lg font-bold mb-4">
      Withdrawal 
     </h3>
        <form onSubmit={handleFDWithdrawalSubmit}>
          <input
            type="number"
            value={fdamount}
            onChange={(e) => setFdamount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowFDWithdrawalModal(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Withdraw
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
       {showEditModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}
  
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
       {showSBEditModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white p-6 rounded shadow-md w-96">
    <h3 className="text-lg font-bold mb-4">Edit</h3>

    {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}

    <form onSubmit={handleSBEditSubmit}>
      <input
        type="number"
        value={sellingPrice}
        onChange={(e) => setSellingPrice(e.target.value)}
        // placeholder="Enter amount"
        className="w-full border border-gray-300 rounded p-2 mb-4"
      />
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        // placeholder="Enter product name"
        className="w-full border border-gray-300 rounded p-2 mb-4"
      />
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setShowSBEditModal(false)}
          type="button"
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
       {showFDEditModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white p-6 rounded shadow-md w-96">
    <h3 className="text-lg font-bold mb-4">Edit</h3>

    {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}

    <form onSubmit={handleFDEditSubmit}>
      <input
        type="number"
        value={fdamount}
        onChange={(e) => setFdamount(e.target.value)}
        // placeholder="Enter amount"
        className="w-full border border-gray-300 rounded p-2 mb-4"
      />
      <input
        type="number"
        value={durationMonths}
        onChange={(e) => setDurationMonths(e.target.value)}
        // placeholder="Enter amount"
        className="w-full border border-gray-300 rounded p-2 mb-4"
      />
 
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setShowFDEditModal(false)}
          type="button"
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
              Daily Deposit
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
  
  {/* Create SB Account Package Modal */}
  {showCreateSBAccountModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h3 className="text-lg font-bold mb-4">Create Account Package</h3>
        <form onSubmit={handleCreateSBAccount}>
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
              Product Name
            </label>
            <input
              id="productName"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter Product Name"
              className="w-full border border-gray-300 rounded p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amountPerDay" className="block text-sm font-medium text-gray-700">
              Product Description
            </label>
            <input
              id="productDescription"
              type="text"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Enter Product Description"
              className="w-full border border-gray-300 rounded p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amountPerDay" className="block text-sm font-medium text-gray-700">
              Seling Price
            </label>
            <input
              id="sellingPrice"
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded p-2 mt-1"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowCreateSBAccountModal(false)}
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
  {/* Create FD Account Package Modal */}
  {showCreateFDAccountModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h3 className="text-lg font-bold mb-4">Create Account Package</h3>
        <form onSubmit={handleCreateFDAccount}>
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
              Amount
            </label>
            <input
              id="fdamount"
              type="number"
              value={fdamount}
              onChange={(e) => setFdamount(e.target.value)}
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amountPerDay" className="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <input
              id="durationMonths"
              type="number"
              value={durationMonths}
              onChange={(e) => setDurationMonths(e.target.value)}
              placeholder="Enter duration"
              className="w-full border border-gray-300 rounded p-2 mt-1"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowCreateFDAccountModal(false)}
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

    