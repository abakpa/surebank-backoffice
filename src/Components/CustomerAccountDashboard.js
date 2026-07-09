import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchAccountTransactionRequest } from "../redux/slices/createAccountSlice";
import { createDepositRequest,createCostPriceRequest,createSBDepositRequest,createCustomerFDAccountRequest,createFDWithdrawalRequest,createFDMaturedWithdrawalRequest,editCustomerFDAccountRequest, fetchReversalRequest,fetchDSReversalRequest,fetchFreeToWithdrawReversalRequest } from '../redux/slices/depositSlice';
import { fetchCustomerAccountRequest,clearDepositError,createMainWithdrawalRequest,createMainDepositRequest,createWalletToSBTransferRequest,createWithdrawalRequest, createSBWithdrawalRequest,createSBSellProductRequest,editCustomerAccountRequest,editCustomerSBAccountRequest,createCustomerAccountRequest,createCustomerSBAccountRequest } from '../redux/slices/depositSlice';
import {fetchStaffRequest} from '../redux/slices/staffSlice'
import {updatePhoneRequest} from '../redux/slices/depositSlice'
import { url } from "../redux/sagas/url";
import { resolveImageUrl } from "../utils/image";
import NotificationPopup from './Notification'
import Loader from "./Loader";
import Tablebody from "./Table/TransactionTableBody";
import Tablehead from "./Table/TransactionTableHead";


import { useParams } from "react-router-dom";
import Select from "./Select";
// import Select2 from "./Select2";

const isDeliveredSBItem = (item) => ["delivered", "completed"].includes(item?.fulfillmentStatus);
const getActiveSBItems = (account) => (Array.isArray(account?.items) ? account.items.filter((item) => !isDeliveredSBItem(item)) : []);
const getActiveSBProductSummary = (account) => {
  const activeItems = getActiveSBItems(account);
  if (activeItems.length === 0 && Array.isArray(account?.items) && account.items.length > 0) {
    return "No active products";
  }
  return activeItems.length > 0
    ? activeItems.map((item) => item.productName).filter(Boolean).join(", ")
    : account?.productName;
};

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
  const newPhone = deposit?.customer
    const newSubAccount = deposit?.subAccount
  const staffId = localStorage.getItem("staffId");
  const canTransferWalletToPackage = ['Admin', 'Manager', 'Agent'].includes(loggedInStaffRole);
  const canManageCustomerFunds = ['Admin', 'Manager'].includes(loggedInStaffRole);
  const canRequestCustomerProduct = ['Agent', 'OnlineRep', 'Rep'].includes(loggedInStaffRole);
  const canChangeSBProduct = canTransferWalletToPackage;
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [getAmountPerDay, setGetAmountPerDay] = useState(null);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showDSReversalModal, setShowDSReversalModal] = useState(false);
  const [showDSChargeReversalModal, setShowDSChargeReversalModal] = useState(false);
  const [showFreeToWithdrawReversalModal, setShowFreeToWithdrawReversalModal] = useState(false);
  const [showCostPriceModal, setShowCostPriceModal] = useState(false);
  const [showSBDepositModal, setShowSBDepositModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [showSBWithdrawalModal, setShowSBWithdrawalModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [showSBItemFulfillmentModal, setShowSBItemFulfillmentModal] = useState(false);
  const [fulfillingSBItemId, setFulfillingSBItemId] = useState("");
  const [requestingSBItemId, setRequestingSBItemId] = useState("");
  const [sbItemActionMessage, setSbItemActionMessage] = useState(null);
  const [showMaturedWithdrawalModal, setShowMaturedWithdrawalModal] = useState(false);
  const [showMainWithdrawalModal, setShowMainWithdrawalModal] = useState(false);
  const [showMainDepositModal, setShowMainDepositModal] = useState(false);
  const [showWalletToSBTransferModal, setShowWalletToSBTransferModal] = useState(false);
  const [showFDWithdrawalModal, setShowFDWithdrawalModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSBEditModal, setShowSBEditModal] = useState(false);
  const [showEditPhoneModal, setShowEditPhoneModal] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [showFDEditModal, setShowFDEditModal] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [showCreateSBAccountModal, setShowCreateSBAccountModal] = useState(false);
  const [showCreateFDAccountModal, setShowCreateFDAccountModal] = useState(false);
  const [amountPerDay, setAmountPerDay] = useState("");
  const [amountCharged, setAmountCharged] = useState("");
  const [movedAmount, setMovedAmount] = useState("");
  const [walletTransferTargetAccountNumber, setWalletTransferTargetAccountNumber] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [fdamount, setFdamount] = useState("");
  const [fdcharge, setFdcharge] = useState("");
  const [durationMonths, setDurationMonths] = useState("");
  const [editfdamount, setEditFdamount] = useState("");
  // const [editfdcharge, setEditFdcharge] = useState("");
  const [editdurationMonths, setEditDurationMonths] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [ecommerceProducts, setEcommerceProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState("");
  const [showSBProductReplaceModal, setShowSBProductReplaceModal] = useState(false);
  const [replaceSBContext, setReplaceSBContext] = useState(null);
  const [replacementProductId, setReplacementProductId] = useState("");
  const [replacementVariationId, setReplacementVariationId] = useState("");
  const [replacementSearch, setReplacementSearch] = useState("");
  const [replaceLoading, setReplaceLoading] = useState(false);
  const [replaceError, setReplaceError] = useState("");
  const [selectedSBProducts, setSelectedSBProducts] = useState([]);
  const [showMobileSBProductActionModal, setShowMobileSBProductActionModal] = useState(false);
  const [sbItemCostInputs, setSbItemCostInputs] = useState({});
  const [approvingSBItemId, setApprovingSBItemId] = useState("");
  const [accountType, setAccountType] = useState("");
    // const [accountManagerId, setAccountManagerId] = useState("");
  
  const [errors, setErrors] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const duration = [6, 9, 12, 18, 24]
  const formatCurrency = (value) => `₦${Number(value || 0).toLocaleString("en-US")}`;
  const isAdmin = loggedInStaffRole === "Admin";

  useEffect(() => {
if(selectedAccount){
  setCostPrice(selectedAccount.costPrice)
}
  }, [selectedAccount]);

  useEffect(() => {
    if (selectedAccount) {
      setSellingPrice(selectedAccount.sellingPrice); // Pre-fill amount
      setProductName(selectedAccount.productName); // Pre-fill product name
    }
  }, [selectedAccount]);
  useEffect(() => {
    if (selectedAccount) {
      setFdcharge(selectedAccount.chargeInterest)
      setFdamount(selectedAccount.fdamount - fdcharge); // Pre-fill amount
      setDurationMonths(selectedAccount.durationMonths); // Pre-fill product name
    }
  }, [selectedAccount,fdcharge]);
  useEffect(() => {
    if (selectedAccount) {
      // setEditFdcharge(selectedAccount.chargeInterest)
      setEditFdamount(selectedAccount.fdamount); // Pre-fill amount
      setEditDurationMonths(selectedAccount.durationMonths); // Pre-fill product name
    }
  }, [selectedAccount,fdcharge]);

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

  useEffect(() => {
    if ((!showCreateSBAccountModal && !showSBProductReplaceModal) || ecommerceProducts.length > 0) {
      return;
    }

    let isMounted = true;
    const fetchEcommerceProducts = async () => {
      setProductsLoading(true);
      setProductsError("");

      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${url}/api/products/admin/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (isMounted) {
          setEcommerceProducts(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        if (isMounted) {
          setProductsError(error.response?.data?.message || "Unable to load products.");
        }
      } finally {
        if (isMounted) {
          setProductsLoading(false);
        }
      }
    };

    fetchEcommerceProducts();

    return () => {
      isMounted = false;
    };
  }, [showCreateSBAccountModal, showSBProductReplaceModal, ecommerceProducts.length]);


  // useEffect(() => {
  //   const data = { customerId: customerId };
  //   dispatch(fetchSubAccountDepositRequest(data));
  // }, [dispatch,customerId]);
  
  useEffect(() => {
    const data = { customerId: customerId };
    dispatch(fetchCustomerAccountRequest(data));
  }, [dispatch, customerId]);


  const customerName = localStorage.getItem("customerName");
  const createdBy = localStorage.getItem("createdBy");
  // const accountNumber = localStorage.getItem("accountNumber");
  // const mainAccountId = localStorage.getItem("mainAccountId");

  const accountTransaction = (accountTypeId) => {
    if (!accountTypeId) return;
    dispatch(fetchAccountTransactionRequest({ accountTypeId }));
    setSelectedAccount(accountTypeId);
    if (window.innerWidth < 768) {
      setShowMobileModal(true);
    }
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
    dispatch(createDepositRequest(data));
    setAmountPerDay("");
    setShowDepositModal(false);
  };

  const handleDSReversalSubmit = (e) => {
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
    dispatch(fetchReversalRequest(data));
    setAmountPerDay("");
    setShowDSReversalModal(false);
  };

  const handleDSChargeReversalSubmit = (e) => {
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

    const details = { DSAccountNumber: selectedAccount.DSAccountNumber,accountType:selectedAccount.accountType,customerId:customerId, amountPerDay: parseFloat(amountPerDay),amountCharged:parseFloat(amountCharged) };
    const data = {details}
    dispatch(fetchDSReversalRequest(data));
    setAmountPerDay("");
    setAmountCharged("")
    setShowDSChargeReversalModal(false);
  };
  const handleFreeToWithdrawReversalSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    // if (!selectedAccount.DSAccountNumber || !amountPerDay) {
    //   setErrors("Both fields are required.");
    //   return;
    // }

    if (isNaN(amountPerDay) || parseFloat(amountPerDay) <= 0) {
      setErrors("Please enter a valid amount.");
      return;
    }

    const details = { DSAccountNumber: selectedAccount.DSAccountNumber,accountType:selectedAccount.accountType,customerId:customerId,accountNumber:deposit?.account?.accountNumber, amountPerDay: parseFloat(amountPerDay),movedAmount:parseFloat(movedAmount),amountCharged:parseFloat(amountCharged) };
    const data = {details}
    console.log('charged data',data)

    dispatch(fetchFreeToWithdrawReversalRequest(data));
    setAmountPerDay("");
    setMovedAmount("");
    setAmountCharged("");
    setShowFreeToWithdrawReversalModal(false);
  };
  const handleCostPriceSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    if (!selectedAccount.SBAccountNumber || !costPrice) {
      setErrors("Both fields are required.");
      return;
    }

    if (isNaN(costPrice) || parseFloat(costPrice) <= 0) {
      setErrors("Please enter a valid amount.");
      return;
    }
    if (parseFloat(costPrice) > Number(selectedAccount.sellingPrice || 0)) {
      setErrors("Cost price cannot be greater than selling price.");
      return;
    }

    const details = { SBAccountNumber: selectedAccount.SBAccountNumber,customerId:customerId,productName:selectedAccount.productName, costPrice: parseFloat(costPrice) };
    const data = {details}
    dispatch(createCostPriceRequest(data));
    setCostPrice("");
    setShowCostPriceModal(false);
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
    dispatch(createFDWithdrawalRequest(data));
    setFdamount("");
    setShowFDWithdrawalModal(false);
  };
  const handleSellSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    const details = { SBAccountNumber: selectedAccount.SBAccountNumber,productName:selectedAccount.productName,customerId:customerId};
    const data = {details}
    dispatch(createSBSellProductRequest(data));
    setShowSellModal(false);
  };
  const handleSellIconClick = (account) => {
    setSelectedAccount(account);
    if (canRequestCustomerProduct) {
      if (Array.isArray(account.items) && account.items.length > 0) {
        setShowSBItemFulfillmentModal(true);
        return;
      }
      setErrors("This SB account does not have item details for customer request.");
      return;
    }
    if (Array.isArray(account.items) && account.items.length > 1) {
      setShowSBItemFulfillmentModal(true);
      return;
    }
    setShowSellModal(true);
  };

  const getSBItemActionKey = (account, itemId) => `${account?.SBAccountNumber || ""}-${itemId}`;

  const handleMarkSBItemDelivered = async (item, index, account = selectedAccount) => {
    if (!account?.SBAccountNumber) return;
    const itemId = index;
    const actionKey = getSBItemActionKey(account, itemId);
    setErrors("");
    setSbItemActionMessage(null);
    setFulfillingSBItemId(actionKey);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${url}/api/sbaccount/${encodeURIComponent(account.SBAccountNumber)}/items/${encodeURIComponent(itemId)}/mark-delivered`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data?.sbAccount) {
        setSelectedAccount(response.data.sbAccount);
      }
      setSbItemActionMessage({
        type: "success",
        accountNumber: account.SBAccountNumber,
        message: response.data?.message || "Item delivered successfully",
      });
      dispatch(fetchCustomerAccountRequest({ customerId }));
    } catch (error) {
      const message = error.response?.data?.message || "Failed to mark item delivered.";
      setErrors(message);
      setSbItemActionMessage({
        type: "error",
        accountNumber: account.SBAccountNumber,
        message,
      });
    } finally {
      setFulfillingSBItemId("");
    }
  };

  const handleCustomerRequestSBItem = async (item, index, account = selectedAccount) => {
    if (!account?.SBAccountNumber) return;
    const itemId = index;
    const actionKey = getSBItemActionKey(account, itemId);
    setErrors("");
    setSbItemActionMessage(null);
    setRequestingSBItemId(actionKey);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${url}/api/sbaccount/${encodeURIComponent(account.SBAccountNumber)}/items/${encodeURIComponent(itemId)}/customer-request`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data?.sbAccount) {
        setSelectedAccount(response.data.sbAccount);
      }
      setSbItemActionMessage({
        type: "success",
        accountNumber: account.SBAccountNumber,
        message: response.data?.message || "Customer request submitted successfully",
      });
      dispatch(fetchCustomerAccountRequest({ customerId }));
    } catch (error) {
      const message = error.response?.data?.message || "Failed to submit customer request.";
      setErrors(message);
      setSbItemActionMessage({
        type: "error",
        accountNumber: account.SBAccountNumber,
        message,
      });
    } finally {
      setRequestingSBItemId("");
    }
  };

  const handleApproveSBItemCostPrice = async (item, index, account = selectedAccount) => {
    if (!account?.SBAccountNumber) return;
    const itemId = index;
    const actionKey = getSBItemActionKey(account, itemId);
    const nextCostPrice = Number(sbItemCostInputs[actionKey] || 0);
    if (nextCostPrice <= 0) {
      setErrors("Enter a valid cost price for this item.");
      return;
    }
    const quantity = Math.max(1, Number(item?.quantity || 1));
    const itemAmount = Number(item?.subtotal || item?.price || 0);
    if (nextCostPrice * quantity > itemAmount) {
      setErrors("Cost price cannot be greater than item selling price.");
      return;
    }

    setErrors("");
    setApprovingSBItemId(actionKey);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${url}/api/sbaccount/${encodeURIComponent(account.SBAccountNumber)}/items/${encodeURIComponent(itemId)}/costprice`,
        { costPrice: nextCostPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data?.sbAccount) {
        setSelectedAccount(response.data.sbAccount);
      }
      setSbItemCostInputs((current) => ({ ...current, [actionKey]: "" }));
      dispatch(fetchCustomerAccountRequest({ customerId }));
    } catch (error) {
      setErrors(error.response?.data?.message || "Failed to approve item cost price.");
    } finally {
      setApprovingSBItemId("");
    }
  };
  const handleMaturedFDSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    const details = { FDAccountNumber: selectedAccount.FDAccountNumber,customerId:customerId};
    const data = {details}
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
  const handleMainDepositSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    if (!deposit?.account?.accountNumber || !amountPerDay) {
      setErrors("Amount is required.");
      return;
    }

    if (isNaN(amountPerDay) || parseFloat(amountPerDay) <= 0) {
      setErrors("Please enter a valid amount.");
      return;
    }

    const details = {
      accountNumber: deposit?.account?.accountNumber,
      customerId,
      amountPerDay: parseFloat(amountPerDay)
    };
    const data = { details };
    dispatch(createMainDepositRequest(data));
    setAmountPerDay("");
    setShowMainDepositModal(false);
  };
  const handleWalletToSBTransferSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    if (!deposit?.account?.accountNumber || !walletTransferTargetAccountNumber || !amountPerDay) {
      setErrors("Amount and target account number are required.");
      return;
    }

    if (isNaN(amountPerDay) || parseFloat(amountPerDay) <= 0) {
      setErrors("Please enter a valid amount.");
      return;
    }

    const details = {
      accountNumber: deposit?.account?.accountNumber,
      targetAccountNumber: walletTransferTargetAccountNumber,
      customerId,
      amountPerDay: parseFloat(amountPerDay)
    };
    const data = { details };
    dispatch(createWalletToSBTransferRequest(data));
    setAmountPerDay("");
    setWalletTransferTargetAccountNumber("");
    setShowWalletToSBTransferModal(false);
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
    dispatch(editCustomerSBAccountRequest(data));
    setSellingPrice("");
    setShowSBEditModal(false);
  };
  const handleEditPhoneSubmit = (e) => {
    e.preventDefault();
    setErrors("");
    if (!selectedAccount) {
      setErrors("Field is required.");
      return;
    }

    if (isNaN(phone) || parseFloat(phone) <= 0) {
      setErrors("Please enter a valid number.");
      return;
    }

    const details = { phone: phone,customerId:selectedAccount};
    const data = {details}
    dispatch(updatePhoneRequest(data));
    setPhone("");
    setShowEditPhoneModal(false);
  };
  const handleFDEditSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    if (!selectedAccount.FDAccountNumber || !editfdamount) {
      setErrors("Both fields are required.");
      return;
    }

    if (isNaN(editfdamount) || parseFloat(editfdamount) <= 0) {
      setErrors("Please enter a valid amount.");
      return;
    }

    const details = { FDAccountNumber: selectedAccount.FDAccountNumber,customerId:customerId,durationMonths:editdurationMonths, fdamount: parseFloat(editfdamount) };
    const data = {details}
    dispatch(editCustomerFDAccountRequest(data));
    setEditFdamount("");
    setEditDurationMonths("");
    setShowFDEditModal(false);
  };

    useEffect(() => {
        dispatch(fetchStaffRequest());
      }, [dispatch]);
    
      const accountpackages = ["Rent", "School fees", "Food"];
  
    const handleCreateAccount = (e) => {
      e.preventDefault();
      setErrors("");
      if (!accountType) {
        setErrors("Please select an Account Type");
        return;
      }
    
      if (!amountPerDay) {
        setErrors("Please enter the daily deposit amount");
        return;
      }
  
          const details = { 
            accountManagerId:loggedInStaffRole === "Agent" ? staffId : createdBy, 
            accountType,
            customerId:customerId, 
            accountNumber:deposit?.account?.accountNumber, 
            amountPerDay: parseFloat(amountPerDay) 
          }
          const data ={details}
          dispatch(createCustomerAccountRequest(data))
      setAmountPerDay("");
      setAccountType("");
      // setAccountManagerId("");
      setShowCreateAccountModal(false);
    };

    const updateSBPackageSummary = (items) => {
      setProductName(items.map((item) => item.productName).join(", "));
      setProductDescription(items.map((item) => item.productDescription).filter(Boolean).join(" | "));
      setSellingPrice(items.reduce((sum, item) => sum + Number(item.subtotal || 0), 0).toString());
    };

    const getActiveProductVariations = (product) => (
      product?.hasVariations && Array.isArray(product.variations)
        ? product.variations.filter((variation) => variation.isActive !== false)
        : []
    );

    const getVariationLabel = (variation) => {
      if (!variation) return "";
      const optionValues = variation.optionValues && typeof variation.optionValues === "object"
        ? Object.values(variation.optionValues).filter(Boolean)
        : [];
      return optionValues.length > 0 ? optionValues.join(" / ") : variation.name;
    };

    const buildSBProductItem = (product) => {
      const activeVariations = getActiveProductVariations(product);
      const requiresVariation = activeVariations.length > 0;
      return {
        productId: product._id,
        productName: product.name || "",
        productDescription: product.description || "",
        hasVariations: requiresVariation,
        variations: activeVariations,
        variationId: "",
        variationName: "",
        quantity: 1,
        price: Number(product.price || 0),
        subtotal: Number(product.price || 0)
      };
    };

    const isMobileViewport = () => (
      typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
    );

    const handleSelectSBProduct = (product) => {
      if (isMobileViewport()) {
        const nextItems = [buildSBProductItem(product)];
        setSelectedSBProducts(nextItems);
        updateSBPackageSummary(nextItems);
        setShowMobileSBProductActionModal(true);
        setErrors("");
        return;
      }

      const nextItems = selectedSBProducts.some((item) => item.productId === product._id)
        ? selectedSBProducts
        : [
            ...selectedSBProducts,
            buildSBProductItem(product)
          ];

      setSelectedSBProducts(nextItems);
      updateSBPackageSummary(nextItems);
      setErrors("");
    };

    const handleUpdateSBProductVariation = (productId, variationId) => {
      const nextItems = selectedSBProducts.map((item) => {
        if (item.productId !== productId) return item;
        const variation = (item.variations || []).find((entry) => String(entry._id || "") === String(variationId));
        const price = Number(variation?.price || 0);
        const quantity = Math.max(1, Number(item.quantity || 1));

        return {
          ...item,
          variationId,
          variationName: getVariationLabel(variation),
          price,
          subtotal: price * quantity
        };
      });

      setSelectedSBProducts(nextItems);
      updateSBPackageSummary(nextItems);
      setErrors("");
    };

    const handleRemoveSBProduct = (productId) => {
      const nextItems = selectedSBProducts.filter((item) => item.productId !== productId);
      setSelectedSBProducts(nextItems);
      updateSBPackageSummary(nextItems);
      setErrors("");
    };

    const handleUpdateSBProductQuantity = (productId, quantity) => {
      const nextItems = selectedSBProducts.map((item) => (
        item.productId === productId
          ? {
              ...item,
              quantity,
              subtotal: Number(item.price || 0) * Number(quantity || 0)
            }
          : item
      ));

      setSelectedSBProducts(nextItems);
      updateSBPackageSummary(nextItems);
      setErrors("");
    };

    const handleNormalizeSBProductQuantity = (productId) => {
      const nextItems = selectedSBProducts.map((item) => {
        if (item.productId !== productId) return item;
        const normalizedQuantity = Math.max(1, Number(item.quantity || 1));

        return {
          ...item,
          quantity: normalizedQuantity,
          subtotal: Number(item.price || 0) * normalizedQuantity
        };
      });

      setSelectedSBProducts(nextItems);
      updateSBPackageSummary(nextItems);
    };

    const handleCloseCreateSBAccountModal = () => {
      setShowCreateSBAccountModal(false);
      setShowMobileSBProductActionModal(false);
      setSelectedSBProducts([]);
      setSellingPrice("");
      setProductName("");
      setProductDescription("");
      setErrors("");
    };

    const handleCreateSBAccount = (e) => {
      e.preventDefault();
      setErrors("");
  
      if (!deposit?.account?.accountNumber || selectedSBProducts.length === 0) {
        setErrors("Please select at least one product to create the SB package.");
        return;
      }
  
      if (isNaN(sellingPrice) || parseFloat(sellingPrice) <= 0) {
        setErrors("Please enter a valid selling price.");
        return;
      }

      const missingVariationItem = selectedSBProducts.find((item) => item.hasVariations && !item.variationId);
      if (missingVariationItem) {
        setErrors(`Please select a variation for ${missingVariationItem.productName}.`);
        return;
      }
  
          const normalizedItems = selectedSBProducts.map(({ variations, hasVariations, ...item }) => {
            const quantity = Math.max(1, Number(item.quantity || 1));
            return {
              ...item,
              quantity,
              subtotal: Number(item.price || 0) * quantity
            };
          });

          const details = { 
            accountManagerId:loggedInStaffRole === "Agent" ? staffId : createdBy, 
            productName, 
            productDescription, 
            customerId:customerId, 
            accountNumber:deposit?.account?.accountNumber, 
            items: normalizedItems,
            sellingPrice: normalizedItems.reduce((sum, item) => sum + Number(item.subtotal || 0), 0) 
          }
          const data = { details }
          dispatch(createCustomerSBAccountRequest(data))
      setSellingPrice("");
      setProductName("");
      setProductDescription("");
      setSelectedSBProducts([]);
      // setAccountManagerId("");
      setShowMobileSBProductActionModal(false);
      setShowCreateSBAccountModal(false);
    };

    const selectedReplacementProduct = ecommerceProducts.find((product) => String(product._id || "") === String(replacementProductId));
    const activeReplacementVariations = getActiveProductVariations(selectedReplacementProduct);
    const selectedReplacementVariation = activeReplacementVariations.find((variation) => String(variation._id || "") === String(replacementVariationId));
    const replacementQuantity = Math.max(1, Number(replaceSBContext?.item?.quantity || 1));
    const replacementUnitPrice = Number(selectedReplacementVariation?.price ?? selectedReplacementProduct?.price ?? 0);
    const replacementSubtotal = replacementUnitPrice * replacementQuantity;
    const replacePaidAmount = Number(replaceSBContext?.item?.paidAmount || 0);
    const replacementAmountTooLow = replacementProductId && replacementSubtotal < replacePaidAmount;
    const filteredReplacementProducts = ecommerceProducts.filter((product) => {
      const search = replacementSearch.trim().toLowerCase();
      if (!search) return true;
      return [product.name, product.description]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(search));
    });

    const handleOpenSBProductReplaceModal = (item, index, account) => {
      setReplaceSBContext({ item, index, account });
      setReplacementProductId("");
      setReplacementVariationId("");
      setReplacementSearch("");
      setReplaceError("");
      setShowSBProductReplaceModal(true);
    };

    const handleCloseSBProductReplaceModal = () => {
      setShowSBProductReplaceModal(false);
      setReplaceSBContext(null);
      setReplacementProductId("");
      setReplacementVariationId("");
      setReplacementSearch("");
      setReplaceError("");
      setReplaceLoading(false);
    };

    const handleSelectReplacementProduct = (product) => {
      setReplacementProductId(product._id);
      setReplacementVariationId("");
      setReplaceError("");
    };

    const handleReplaceSBProduct = async () => {
      const account = replaceSBContext?.account;
      const item = replaceSBContext?.item;
      const itemId = item?._id || replaceSBContext?.index;

      if (!account?.SBAccountNumber || itemId === undefined || itemId === null) {
        setReplaceError("Unable to identify this SB product.");
        return;
      }
      if (!replacementProductId) {
        setReplaceError("Select a replacement product.");
        return;
      }
      if (activeReplacementVariations.length > 0 && !replacementVariationId) {
        setReplaceError("Select a product variation.");
        return;
      }
      if (replacementAmountTooLow) {
        setReplaceError("Replacement product amount cannot be less than the amount already paid for this product.");
        return;
      }

      setReplaceLoading(true);
      setReplaceError("");

      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.put(
          `${url}/api/ecommerce/orders/staff/sb/${encodeURIComponent(account.SBAccountNumber)}/items/${encodeURIComponent(itemId)}/replace`,
          {
            productId: replacementProductId,
            variationId: replacementVariationId
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setSbItemActionMessage({
          type: "success",
          accountNumber: account.SBAccountNumber,
          message: response.data?.message || "Product changed successfully",
        });
        dispatch(fetchCustomerAccountRequest({ customerId }));
        handleCloseSBProductReplaceModal();
      } catch (error) {
        setReplaceError(error.response?.data?.message || "Failed to change product.");
      } finally {
        setReplaceLoading(false);
      }
    };

    const handleCreateFDAccount = (e) => {
      e.preventDefault();
      setErrors("");
      if (!durationMonths) {
        setErrors("Please select duration");
        return;
      }
    
      if (!fdamount) {
        setErrors("Please enter the amount");
        return;
      }
  
          const details = { 
            accountManagerId:loggedInStaffRole === "Agent" ? staffId : createdBy, 
            durationMonths, 
            customerId:customerId, 
            accountNumber:deposit?.account?.accountNumber, 
            fdamount:parseFloat(fdamount) 
          }
          const data ={details}
          dispatch(createCustomerFDAccountRequest(data))
      setFdamount("");
      setDurationMonths("");
      // setAccountManagerId("");
      setShowCreateFDAccountModal(false);
    };

  const renderSBAccountItemsTable = (account) => {
    const activeItems = getActiveSBItems(account);
    const colSpan = isAdmin ? 6 : 5;

    return (
      <div className="mt-2 overflow-x-auto rounded border border-gray-200 bg-white md:mt-3">
        {sbItemActionMessage?.accountNumber === account.SBAccountNumber && (
          <p className={`m-2 rounded px-3 py-2 text-xs font-semibold md:text-sm ${
            sbItemActionMessage.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}>
            {sbItemActionMessage.message}
          </p>
        )}
        <table className="min-w-[720px] w-full text-[11px] md:text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="border-b border-gray-200 p-1 text-left md:p-2">Product</th>
              <th className="border-b border-gray-200 p-1 text-left md:p-2">Qty</th>
              <th className="border-b border-gray-200 p-1 text-left md:p-2">Amount</th>
              {isAdmin && <th className="border-b border-gray-200 p-1 text-left md:p-2">Cost</th>}
              <th className="border-b border-gray-200 p-1 text-left md:p-2">Status</th>
              <th className="border-b border-gray-200 p-1 text-left md:p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {activeItems.length === 0 ? (
              <tr>
                <td className="p-2 text-center text-xs text-gray-500 md:p-4 md:text-sm" colSpan={colSpan}>
                  No active products pending on this SB account.
                </td>
              </tr>
            ) : activeItems.map((item, activeIndex) => {
              const originalIndex = (account.items || []).findIndex((accountItem) => (
                accountItem === item || (
                  item._id &&
                  String(accountItem._id || '') === String(item._id || '')
                )
              ));
              const index = originalIndex >= 0 ? originalIndex : 0;
              const itemId = index;
              const actionKey = getSBItemActionKey(account, itemId);
              const delivered = ["delivered", "completed"].includes(item.fulfillmentStatus);
              const itemAmount = Number(item.subtotal || item.price || 0);
              const requested = Number(item.paidAmount || 0) >= itemAmount && itemAmount > 0;
              const needsCostApproval = !delivered && (item.requiresCostApproval || (isAdmin && Number(item.costSubtotal || 0) <= 0));

              return (
                <tr key={`${account.SBAccountNumber || "sb"}-${item._id || activeIndex}-${index}`}>
                  <td className="border-t border-gray-200 p-1 md:p-2">{item.productName}</td>
                  <td className="border-t border-gray-200 p-1 md:p-2">{item.quantity || 1}</td>
                  <td className="border-t border-gray-200 p-1 md:p-2">₦{Number(item.subtotal || 0).toLocaleString("en-US")}</td>
                  {isAdmin && (
                    <td className="border-t border-gray-200 p-1 md:p-2">
                      {needsCostApproval ? (
                        <div className="flex min-w-[150px] gap-1 md:min-w-[190px] md:gap-2">
                          <input
                            type="number"
                            min="1"
                            value={sbItemCostInputs[actionKey] || ""}
                            onChange={(event) => setSbItemCostInputs((current) => ({ ...current, [actionKey]: event.target.value }))}
                            placeholder="Cost each"
                            className="w-20 rounded border border-gray-300 px-1.5 py-1 text-[11px] md:w-24 md:px-2 md:text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => handleApproveSBItemCostPrice(item, index, account)}
                            disabled={approvingSBItemId === actionKey}
                            className="rounded bg-blue-600 px-1.5 py-1 text-[11px] font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400 md:px-2 md:text-xs"
                          >
                            {approvingSBItemId === actionKey ? "Saving..." : "Approve"}
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-gray-700 md:text-xs">₦{Number(item.costSubtotal || 0).toLocaleString("en-US")}</span>
                      )}
                    </td>
                  )}
                  <td className="border-t border-gray-200 p-1 md:p-2">
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold md:px-2 md:py-1 md:text-xs ${delivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {item.fulfillmentStatus || "pending"}
                    </span>
                  </td>
                  <td className="border-t border-gray-200 p-1 md:p-2">
                    {delivered ? (
                      <span className="text-[10px] text-gray-400 md:text-xs">No action</span>
                    ) : canRequestCustomerProduct ? (
                      <div className="flex min-w-[120px] flex-col gap-1 md:min-w-[150px] md:gap-1.5">
                        {canChangeSBProduct && (
                          <button
                            type="button"
                            onClick={() => handleOpenSBProductReplaceModal(item, index, account)}
                            className="rounded bg-blue-600 px-2 py-1 text-[10px] font-semibold text-white hover:bg-blue-700 md:px-3 md:py-1.5 md:text-xs"
                          >
                            Change Product
                          </button>
                        )}
                        {requested ? (
                          <span className="text-[10px] font-semibold text-green-700 md:text-xs">Requested</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleCustomerRequestSBItem(item, index, account)}
                            disabled={requestingSBItemId === actionKey}
                            className="rounded bg-yellow-600 px-2 py-1 text-[10px] font-semibold text-white hover:bg-yellow-700 disabled:bg-gray-400 md:px-3 md:py-1.5 md:text-xs"
                          >
                            {requestingSBItemId === actionKey ? "Processing..." : "Customer Request"}
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="flex min-w-[120px] flex-col gap-1 md:min-w-[150px] md:gap-1.5">
                        {canChangeSBProduct && (
                          <button
                            type="button"
                            onClick={() => handleOpenSBProductReplaceModal(item, index, account)}
                            className="rounded bg-blue-600 px-2 py-1 text-[10px] font-semibold text-white hover:bg-blue-700 md:px-3 md:py-1.5 md:text-xs"
                          >
                            Change Product
                          </button>
                        )}
                        {needsCostApproval ? (
                          <span className="text-[10px] text-gray-400 md:text-xs">Approve cost first</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleMarkSBItemDelivered(item, index, account)}
                            disabled={fulfillingSBItemId === actionKey}
                            className="rounded bg-green-600 px-2 py-1 text-[10px] font-semibold text-white hover:bg-green-700 disabled:bg-gray-400 md:px-3 md:py-1.5 md:text-xs"
                          >
                            {fulfillingSBItemId === actionKey ? "Processing..." : "Mark Delivered"}
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const sbAccountWithItemDetails = Array.isArray(newSubAccount?.sbAccount)
    ? newSubAccount.sbAccount.find((account) => Array.isArray(account?.items) && account.items.length > 0)
    : null;

  return (
    <div className="min-h-screen bg-gray-100 px-3 py-6 md:px-4 lg:px-5">
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
        <div className="flex items-center gap-2">
        <p className="text-gray-700">
    <strong>Account Number:</strong> {deposit?.account?.accountNumber}
  </p>
  {((loggedInStaffRole === 'Admin')) && (
  <button
    onClick={() => {
      setSelectedAccount(newPhone._id);
      setPhone(newPhone.phone)
      setShowEditPhoneModal(true);
    }}
    className="text-blue-600 hover:text-blue-800"
    title="Edit"
  >
    <i className="fas fa-edit text-sm"></i>
  </button>

)}
</div>
        {/* <p className="text-gray-700"><strong>Total Balance:</strong> ₦{deposit?.account?.ledgerBalance}</p> */}
        <p className="text-gray-700 flex flex-wrap items-center gap-x-1 gap-y-2 min-w-0 break-words">
          <strong>Free to withdraw:</strong>
          <span className="break-words">₦{deposit?.account?.availableBalance?.toLocaleString('en-US')}</span>
          <button
          onClick={() => accountTransaction(deposit?.account?._id)}
          className="text-blue-600 hover:underline ml-1 shrink-0"
        >
          <i className="fas fa-folder-open text-3xl md:text-lg" title="View Transactions"></i>
        </button>
  {canManageCustomerFunds && (
	  <button
	    onClick={() => setShowMainDepositModal(true)}
	    className="text-green-600 hover:text-green-800 ml-1 shrink-0"
	  >
    <i className="fas fa-plus-circle text-3xl md:text-lg" title="Deposit"></i>
  </button>
)}
  {canManageCustomerFunds && (
	  <button
	    onClick={() => setShowMainWithdrawalModal(true)}
	    className="text-red-600 hover:text-red-800 ml-1 shrink-0"
	  >
    <i className="fas fa-minus-circle text-lg" title="Withdraw"></i>
  </button>
)}
  {canTransferWalletToPackage && (
  <button
    onClick={() => setShowWalletToSBTransferModal(true)}
    className="text-amber-600 hover:text-amber-800 ml-1"
  >
    <i className="fas fa-exchange-alt text-lg" title="Transfer wallet to SB or DS account"></i>
  </button>
)}


        </p>
        <p className="text-gray-700 flex flex-wrap items-center gap-x-1 gap-y-2 min-w-0 break-words">
          <strong>SB Order Wallet:</strong>
          <span className="break-words">₦{Number(deposit?.sbWalletAccount?.availableBalance || 0).toLocaleString('en-US')}</span>
          {deposit?.sbWalletAccount?._id && (
            <button
              onClick={() => accountTransaction(deposit?.sbWalletAccount?._id)}
              className="text-blue-600 hover:underline ml-1 shrink-0"
            >
              <i className="fas fa-folder-open text-3xl md:text-lg" title="View SB Order Wallet Transactions"></i>
            </button>
          )}
          {sbAccountWithItemDetails && loggedInStaffRole !== 'OnlineRep' && (
            <button
              onClick={() => { setSelectedAccount(sbAccountWithItemDetails); setShowSBDepositModal(true); }}
              className="text-green-600 hover:text-green-800 ml-1 shrink-0"
            >
              <i className="fas fa-plus-circle text-3xl md:text-lg" title="Deposit to SB Account"></i>
            </button>
          )}
        </p>
      </header>
  {/* Add Account Section */}
<div className="mt-2">
  <h2 className="text-lg font-bold mb-2">Add New Package</h2>
  <div className="flex space-x-2 mb-2">
    {loggedInStaffRole !== 'OnlineRep' && (
    <div className="cursor-pointer bg-blue-500 text-white w-8 h-8 rounded-lg flex items-center justify-center" onClick={() => setShowCreateAccountModal(true)}>
      DS
    </div>
    )}
    <div className="cursor-pointer bg-green-500 text-white w-8 h-8 rounded-lg flex items-center justify-center" onClick={() => {
      setErrors("");
      setShowCreateSBAccountModal(true);
    }}>
      SB
    </div>
    {loggedInStaffRole !== 'OnlineRep' && (

    <div className="cursor-pointer bg-purple-500 text-white w-8 h-8 rounded-lg flex items-center justify-center" onClick={() => setShowCreateFDAccountModal(true)}>
      FD
    </div>
    )}
  </div>
</div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2.4fr)_minmax(280px,0.9fr)]">
        {/* Left Panel - Account Details */}
        <div className="min-w-0">
          {(Array.isArray(newSubAccount?.dsAccount) && newSubAccount.dsAccount.length > 0) || 
          (Array.isArray(newSubAccount?.fdAccount) && newSubAccount.fdAccount.length > 0) || 
 (Array.isArray(newSubAccount?.sbAccount) && newSubAccount.sbAccount.length > 0) ? (
  <ul className="space-y-4">
    {/* DS Accounts */}
  {Array.isArray(newSubAccount?.dsAccount) &&
  newSubAccount.dsAccount.map((account, index) => (
    <li
      key={`ds-${index}`}
      className="flex flex-col md:flex-row md:justify-between md:items-center bg-gray-50 p-3 rounded hover:shadow-md mb-3"
    >
      {/* Account Info */}
      <div className="flex-1">
        <div
          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2 ${
            account.accountType === "Rent"
              ? "bg-blue-100 text-gray-700"
              : account.accountType === "School fees"
              ? "bg-green-100 text-green-700"
              : account.accountType === "Food"
              ? "bg-purple-100 text-purple-700"
              : "bg-gray-100 text-blue-700"
          }`}
        >
          {account.accountType} Account{" "}
          <strong>₦{account.amountPerDay?.toLocaleString("en-US")}</strong>
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
        <p className="text-sm text-gray-600">
          <span className="bg-blue-500 text-white px-1 rounded-sm">DS:</span>{" "}
          {account.DSAccountNumber || "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          Balance: ₦{account.totalContribution?.toLocaleString("en-US") || 0}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap md:flex-nowrap space-x-2 md:space-x-4 mt-3 md:mt-0">
        <button
          onClick={() => accountTransaction(account._id)}
          className="text-blue-600 hover:underline"
        >
          <i className="fas fa-folder-open text-3xl md:text-lg" title="View Transactions"></i>
        </button>
        {loggedInStaffRole === "Admin" && (
   <button
  onClick={() => {
    setSelectedAccount(account);
    setGetAmountPerDay(account.amountPerDay);
    setShowDSReversalModal(true);
  }}
  className="text-indigo-600 hover:text-indigo-800"
>
  {/* DS Reversal */}
  <i className="fas fa-history text-lg" title="DS Reversal"></i>
</button>
        )}
        {loggedInStaffRole === "Admin" && (
<button
  onClick={() => {
    setSelectedAccount(account);
    setGetAmountPerDay(account.amountPerDay);
    setShowFreeToWithdrawReversalModal(true);
  }}
  className="text-orange-600 hover:text-orange-800"
>
  {/* Free To Withdraw Reversal */}
  <i className="fas fa-undo-alt text-lg" title="Free To Withdraw Reversal "></i>
</button>
        )}
        {loggedInStaffRole === "Admin" && (
<button
  onClick={() => {
    setSelectedAccount(account);
    setGetAmountPerDay(account.amountPerDay);
    setShowDSChargeReversalModal(true);
  }}
  className="text-red-600 hover:text-red-800"
>
  {/* Charge Reversal */}
  <i className="fas fa-ban text-lg" title="Charge Reversal"></i>
</button>
        )}
        <button
          onClick={() => {
            setSelectedAccount(account);
            setGetAmountPerDay(account.amountPerDay);
            setShowDepositModal(true);
          }}
          className="text-green-600 hover:text-green-800"
        >
          <i className="fas fa-plus-circle text-3xl md:text-lg" title="Deposit"></i>
        </button>
        {canManageCustomerFunds && (
          <button
            onClick={() => {
              setSelectedAccount(account);
              setShowWithdrawalModal(true);
            }}
            className="text-red-600 hover:text-red-800"
          >
            <i className="fas fa-minus-circle text-lg" title="Withdraw"></i>
          </button>
        )}
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
            FD Account <strong>₦{account.fdamount?.toLocaleString('en-US')}</strong>
            {/* {account.totalAmount === 0 &&( */}
            {loggedInStaffRole === 'Admin' && (
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
    {/* )} */}
          </div>
          <p className="text-sm text-gray-600"><span className="bg-purple-500 text-white w-8 h-8 rounded-sm"> FD:</span> {account.FDAccountNumber || "N/A"}</p>
          <p className="text-sm text-gray-600">Interest: ₦{account.expenseInterest?.toLocaleString('en-US') || 0}</p>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => accountTransaction(account._id)} className="text-blue-600 hover:underline">
            <i className="fas fa-folder-open text-3xl md:text-lg" title="View Transactions"></i>
          </button>
          {/* <button onClick={() => { setSelectedAccount(account); setGetAmountPerDay(account.amountPerDay); setShowDepositModal(true); }} className="text-green-600 hover:text-green-800">
            <i className="fas fa-plus-circle text-sm md:text-lg" title="Deposit"></i>
          </button> */}
           {canManageCustomerFunds && (
          <button onClick={() => { setSelectedAccount(account); setShowFDWithdrawalModal(true); }} className="text-red-600 hover:text-red-800">
            <i className="fas fa-minus-circle text-lg md:text-lg" title="Withdraw"></i>
          </button>
           )}
          {/* New Button for Withdrawing Matured Fixed Deposit */}
          {(isMatured && account.totalAmount > 0 && canManageCustomerFunds) && (
    <button
      onClick={() => { setSelectedAccount(account); setShowMaturedWithdrawalModal(true); }}
      className="text-yellow-600 hover:text-yellow-800"
    >
      <i className="fas fa-unlock text-lg md:text-lg" title="Withdraw Matured FD"></i>
    </button>
  )}
        </div>
      </li>
    );
  })}


    {/* SB Accounts */}
    {Array.isArray(newSubAccount?.sbAccount) &&
  newSubAccount.sbAccount.map((account, index) => {
    const activeSBItems = getActiveSBItems(account);
    const activeSBTotal = activeSBItems.length > 0
      ? activeSBItems.reduce((sum, item) => sum + Number(item.subtotal || item.price || 0), 0)
      : 0;
    const hasSBItemDetails = Array.isArray(account.items) && account.items.length > 0;
    const isClosedLegacyAccount = (
      account.accountMode !== 'multi_item' &&
      (!Array.isArray(account.items) || account.items.length === 0) &&
      Number(account.balance || 0) <= 0
    );
    return (
    <li
      key={`sb-${index}`}
      className={`${hasSBItemDetails ? "bg-white p-3 md:p-4" : "bg-gray-50 p-3"} rounded hover:shadow-md relative`}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
      <div className="min-w-0 flex-1">
        {/* Product Info Container - Responsive Flex */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-3">
          {/* Product Name & Price */}
          {!hasSBItemDetails && (
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
              {getActiveSBProductSummary(account)} <strong>₦{(activeSBItems.length > 0 ? activeSBTotal : Number(account.sellingPrice || 0)).toLocaleString('en-US')}</strong>
            </span>
          )}

          {/* Tooltip & Edit - Same Row on Desktop, Below on Mobile */}
          {!hasSBItemDetails && (
          <div className="flex items-center space-x-2 mt-1 md:mt-0">
            {/* Info Icon with Tooltip */}
            <div>
              <button
                type="button"
                className="text-gray-600 hover:text-gray-800"
                title={account.productDescription || "No description available"}
              >
                <i className="fas fa-info-circle text-sm"></i>
              </button>
            </div>

            {/* Edit Button */}
            {/* {(loggedInStaffRole === 'Admin'||loggedInStaffRole === 'Manager') && ( */}
            <button
              onClick={() => {
                setSelectedAccount(account);
                setShowSBEditModal(true);
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              <i className="fas fa-edit text-sm" title="Edit"></i>
            </button>
              {/* )} */}
               {/* Cost Price Icon */}
        {loggedInStaffRole === 'Admin' && (
        <button onClick={() => { 
        setSelectedAccount(account); 
        setShowCostPriceModal(true); }} 
        className="text-green-500 hover:text-green-800">
          <i className="fas fa-naira-sign text-sm"></i>
        </button>
        )}

          </div>
          )}
        </div>

        {/* Account Details */}
        <p className="text-xs text-gray-600"><span className="bg-green-500 text-white w-8 h-8 rounded-sm"> SB:</span> {account.SBAccountNumber || "N/A"}</p>
        {account.accountMode !== 'multi_item' && Number(account.balance || 0) > 0 && (
          <p className="text-xs text-gray-600">Balance: ₦{account.balance?.toLocaleString('en-US') || 0}</p>
        )}
        {loggedInStaffRole === 'Admin' && isClosedLegacyAccount && (
          <span className="mt-1 inline-flex rounded-full bg-red-100 px-2 py-1 text-[10px] font-semibold text-red-700">
            Closed Legacy Account - Admin Only
          </span>
        )}
      </div>

      {/* Action Buttons */}
      {!hasSBItemDetails && (
      <div className="flex shrink-0 space-x-4">
        {/* View Transactions */}
        <button onClick={() => accountTransaction(account._id)} className="text-blue-600 hover:underline">
          <i className="fas fa-folder-open text-3xl md:text-lg" title="View Transactions"></i>
        </button>
        {/* Deposit Icon */}
        {loggedInStaffRole !== 'OnlineRep' && !isClosedLegacyAccount &&(
        <button onClick={() => { setSelectedAccount(account); setShowSBDepositModal(true); }} className="text-green-600 hover:text-green-800">
          <i className="fas fa-plus-circle text-3xl md:text-lg" title="Deposit"></i>
        </button>
        )}
        {/* Withdrawal Icon */}
        {loggedInStaffRole === 'Admin' && !hasSBItemDetails && (
          <button onClick={() => { setSelectedAccount(account); setShowSBWithdrawalModal(true); }} className="text-red-600 hover:text-red-800">
            <i className="fas fa-minus-circle text-lg md:text-lg" title="Withdraw"></i>
          </button>
        )}
        {/* Sell Icon */}
        {canManageCustomerFunds && !hasSBItemDetails && (
        <button onClick={() => handleSellIconClick(account)} className="text-yellow-600 hover:text-yellow-800">
          <i className="fas fa-shopping-cart text-lg md:text-lg" title={canRequestCustomerProduct ? "Customer Request" : "Sell"}></i>
        </button>
        )}
      </div>
      )}
      </div>
      {hasSBItemDetails && renderSBAccountItemsTable(account)}
    </li>
  )})}
  </ul>
) : (
  <p className="text-gray-600">Customer does not have any accounts.</p>
)}
  </div>
     {/* Desktop Right Panel */}
	     <div className="hidden md:block bg-white p-4 rounded shadow-md min-w-0 overflow-hidden">
	        <h2 className="text-lg font-bold mb-4">Transaction History</h2>
	        {selectedAccount ? (
	          <div className="min-w-0">
	            <h3 className="text-md font-semibold mb-2 break-words">Account: {subAccount.DSAccountNumber}</h3>
	            {transactionHistory.length > 0 ? (
                <div className="max-w-full overflow-x-auto">
  	              <table className="min-w-[760px] w-full table-auto">
  	                <Tablehead />
  	                <Tablebody customers={transactionHistory} branches={staffs} />
  	              </table>
                </div>
	            ) : (
	              <p className="text-gray-600">No transactions found.</p>
	            )}
          </div>
        ) : (
          <p className="text-gray-600">Select an account to view transactions.</p>
        )}
      </div>

    

      {/* Mobile Modal */}
      {showMobileModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center md:hidden">
	          <div className="bg-white w-[90%] max-w-[95vw] max-h-[80%] overflow-auto p-4 rounded shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Transaction History</h2>
              <button
                className="text-red-500 font-bold"
                onClick={() => setShowMobileModal(false)}
              >
                ✕
              </button>
            </div>
            {selectedAccount ? (
	              <div className="min-w-0">
	                <h3 className="text-md font-semibold mb-2 break-words">Account: {subAccount.DSAccountNumber}</h3>
	                {transactionHistory.length > 0 ? (
                    <div className="max-w-full overflow-x-auto">
  	                  <table className="min-w-[760px] w-full table-auto">
  	                    <Tablehead />
  	                    <Tablebody customers={transactionHistory} branches={staffs} />
  	                  </table>
                    </div>
	                ) : (
                  <p className="text-gray-600">No transactions found.</p>
                )}
              </div>
            ) : (
              <p className="text-gray-600">Select an account to view transactions.</p>
            )}
          </div>
        </div>
      )}
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
  
       {showDSReversalModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}
  
      <div className="bg-white p-6 rounded shadow-md w-96">
      <h3 className="text-lg font-bold mb-4">
     Reverse Deposit
     </h3>
        <form onSubmit={handleDSReversalSubmit}>
          <input
            type="number"
            value={amountPerDay}
            onChange={(e) => setAmountPerDay(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowDSReversalModal(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
             Reverse
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
       {showDSChargeReversalModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}
  
      <div className="bg-white p-6 rounded shadow-md w-96">
      <h3 className="text-lg font-bold mb-4">
     Reverse DS Charge
     </h3>
        <form onSubmit={handleDSChargeReversalSubmit}>
          <input
            type="number"
            value={amountPerDay}
            onChange={(e) => setAmountPerDay(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <input
            type="number"
            value={amountCharged}
            onChange={(e) => setAmountCharged(e.target.value)}
            placeholder="Enter charge"
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowDSChargeReversalModal(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
             Reverse
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
       {showFreeToWithdrawReversalModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}
  
      <div className="bg-white p-6 rounded shadow-md w-96">
      <h3 className="text-lg font-bold mb-4">
     Reverse DS Moved Amount
     </h3>
        <form onSubmit={handleFreeToWithdrawReversalSubmit}>
          <input
            type="number"
            value={amountPerDay}
            onChange={(e) => setAmountPerDay(e.target.value)}
            placeholder="Enter total amount"
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <input
            type="number"
            value={movedAmount}
            onChange={(e) => setMovedAmount(e.target.value)}
            placeholder="Enter moved amount"
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <input
            type="number"
            value={amountCharged}
            onChange={(e) => setAmountCharged(e.target.value)}
            placeholder="Enter charged amount"
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowFreeToWithdrawReversalModal(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
             Reverse
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
       {showCostPriceModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}
  
      <div className="bg-white p-6 rounded shadow-md w-96">
      <h3 className="text-lg font-bold mb-4">
      Input cost price
     </h3>
        <form onSubmit={handleCostPriceSubmit}>
          <input
            type="number"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            placeholder="Enter amount"
            required
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowCostPriceModal(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Submit
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
       {showSBItemFulfillmentModal && selectedAccount && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h5 className="text-base font-bold">SB Account Items</h5>
            <p className="text-xs text-gray-500">{selectedAccount.SBAccountNumber}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowSBItemFulfillmentModal(false);
              setErrors("");
            }}
            className="text-gray-500 hover:text-gray-800"
          >
            ×
          </button>
        </div>

        {errors && <p className="mb-3 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{errors}</p>}

        {renderSBAccountItemsTable(selectedAccount)}
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
       {showMainDepositModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}
  
      <div className="bg-white p-6 rounded shadow-md w-96">
      <h3 className="text-lg font-bold mb-4">
      Deposit
     </h3>
        <form onSubmit={handleMainDepositSubmit}>
          <input
            type="number"
            value={amountPerDay}
            onChange={(e) => setAmountPerDay(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowMainDepositModal(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Deposit
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
       {showWalletToSBTransferModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}

      <div className="bg-white p-6 rounded shadow-md w-96">
      <h3 className="text-lg font-bold mb-4">
      Transfer Wallet To Account
     </h3>
        <form onSubmit={handleWalletToSBTransferSubmit}>
          <input
            type="text"
            value={walletTransferTargetAccountNumber}
            onChange={(e) => setWalletTransferTargetAccountNumber(e.target.value)}
            placeholder="Enter SB or DS account number"
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <input
            type="number"
            value={amountPerDay}
            onChange={(e) => setAmountPerDay(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <p className="text-xs text-gray-500 mb-4">
            This debits the customer wallet and credits the specified SB or DS account.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => {
                setShowWalletToSBTransferModal(false);
                setWalletTransferTargetAccountNumber("");
              }}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-amber-600 text-white px-4 py-2 rounded"
            >
              Transfer
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
       {showEditPhoneModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white p-6 rounded shadow-md w-96">
    <h3 className="text-lg font-bold mb-4">Edit</h3>

    {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}

    <form onSubmit={handleEditPhoneSubmit}>
      <input
        type="number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        // placeholder="Enter amount"
        className="w-full border border-gray-300 rounded p-2 mb-4"
      />

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setShowEditPhoneModal(false)}
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
        value={editfdamount}
        onChange={(e) => setEditFdamount(e.target.value)}
        // placeholder="Enter amount"
        className="w-full border border-gray-300 rounded p-2 mb-4"
      />
    {/* Duration Dropdown */}
    <div className="mb-4">
    <Select
            label="Duration (Months)"
            options={duration}
            value={editdurationMonths}
            onChange={setEditDurationMonths}
          />
        </div>
 
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
        {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}
        <form onSubmit={handleCreateAccount}>
        
        <div className="mb-4">
          <Select
            label="Account Type"
            options={accountpackages}
            value={accountType}
            onChange={setAccountType}
            required
          />
        </div>
        {/* <div className="mb-4">
         <Select2
  label="Account Manager"
  options={staffs.map((staff) => ({ label: `${staff.firstName} ${staff.lastName}`, value: staff._id }))}
  value={accountManagerId}
  onChange={(selectedId) => setAccountManagerId(selectedId)}
/>

        </div> */}
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
              required
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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-5 py-3">
          <h3 className="text-lg font-bold text-gray-900">Create SB Package</h3>
          <p className="text-xs text-gray-600 mt-1">Select one or more products to create a single SB package order for this customer.</p>
        </div>

        <form onSubmit={handleCreateSBAccount} className="p-5">
          {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}

          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-gray-800">Products</h4>
              {productsLoading && <span className="text-xs text-gray-500">Loading products...</span>}
            </div>

            {productsError && (
              <div className="border border-red-200 bg-red-50 text-red-700 rounded-md px-4 py-3 text-sm mb-4">
                {productsError}
              </div>
            )}

            {!productsLoading && !productsError && ecommerceProducts.length === 0 && (
              <div className="border border-gray-200 bg-gray-50 text-gray-600 rounded-md px-4 py-6 text-center text-sm">
                No ecommerce products are available.
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {ecommerceProducts.map((product) => {
                const productImage = Array.isArray(product.images) && product.images.length > 0
                  ? resolveImageUrl(product.images[0])
                  : "";
                const isSelected = selectedSBProducts.some((item) => item.productId === product._id);

                return (
                  <button
                    type="button"
                    key={product._id}
                    onClick={() => handleSelectSBProduct(product)}
                    className={`text-left border rounded-md overflow-hidden transition shadow-sm hover:shadow-md ${
                      isSelected ? "border-green-600 ring-2 ring-green-200" : "border-gray-200"
                    }`}
                  >
                    <div className="h-28 bg-gray-100">
                      {productImage ? (
                        <img
                          src={productImage}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-semibold text-gray-900 text-xs leading-snug line-clamp-1">{product.name}</h5>
                        {isSelected && (
                          <span className="shrink-0 text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                            Added
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-600 mt-0.5 line-clamp-1">{product.description}</p>
                      <p className="text-xs font-bold text-green-700 mt-1">{formatCurrency(product.price)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden md:block border border-gray-200 rounded-md p-3 mb-5 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-gray-800">Selected Products</h4>
              <span className="text-xs font-semibold text-green-700">Total: {formatCurrency(sellingPrice)}</span>
            </div>

            {selectedSBProducts.length === 0 ? (
              <p className="text-sm text-gray-500">No product selected yet.</p>
            ) : (
              <div className="space-y-2">
                {selectedSBProducts.map((item) => (
                  <div key={item.productId} className="grid grid-cols-1 md:grid-cols-[1fr_180px_90px_110px_auto] gap-2 items-center rounded border border-gray-200 bg-white p-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.productName}</p>
                      <p className="text-xs text-gray-500">
                        {item.variationName ? `${item.variationName} • ` : ""}{formatCurrency(item.price)} each
                      </p>
                    </div>
                    {item.hasVariations ? (
                      <select
                        value={item.variationId}
                        onChange={(e) => handleUpdateSBProductVariation(item.productId, e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 text-sm"
                        required
                      >
                        <option value="">Select variation</option>
                        {(item.variations || []).map((variation) => (
                          <option key={variation._id} value={variation._id}>
                            {getVariationLabel(variation)} - {formatCurrency(variation.price)}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-xs text-gray-400">No variation</span>
                    )}
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateSBProductQuantity(item.productId, e.target.value)}
                      onBlur={() => handleNormalizeSBProductQuantity(item.productId)}
                      className="w-full border border-gray-300 rounded p-2 text-sm"
                    />
                    <p className="text-sm font-semibold text-gray-800">{formatCurrency(item.subtotal)}</p>
                    <button
                      type="button"
                      onClick={() => handleRemoveSBProduct(item.productId)}
                      className="rounded bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {showMobileSBProductActionModal && selectedSBProducts[0] && (
            <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-0 md:hidden">
              <div className="max-h-[88vh] w-full overflow-y-auto rounded-t-2xl bg-white p-4 shadow-2xl">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-base font-bold text-gray-900">Selected Product</h4>
                    <p className="text-xs text-gray-500">Create or add this product to the customer's SB order.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowMobileSBProductActionModal(false)}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700"
                  >
                    Close
                  </button>
                </div>

                {errors && <p className="mb-3 rounded bg-red-50 px-3 py-2 text-xs text-red-700">{errors}</p>}

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                  <p className="text-sm font-bold text-gray-900">{selectedSBProducts[0].productName}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {selectedSBProducts[0].variationName ? `${selectedSBProducts[0].variationName} • ` : ""}
                    {formatCurrency(selectedSBProducts[0].price)} each
                  </p>

                  {selectedSBProducts[0].hasVariations ? (
                    <div className="mt-3">
                      <label className="mb-1 block text-xs font-semibold text-gray-700">Variation</label>
                      <select
                        value={selectedSBProducts[0].variationId}
                        onChange={(e) => handleUpdateSBProductVariation(selectedSBProducts[0].productId, e.target.value)}
                        className="w-full rounded border border-gray-300 p-3 text-sm"
                        required
                      >
                        <option value="">Select variation</option>
                        {(selectedSBProducts[0].variations || []).map((variation) => (
                          <option key={variation._id} value={variation._id}>
                            {getVariationLabel(variation)} - {formatCurrency(variation.price)}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <p className="mt-3 text-xs text-gray-400">No variation required</p>
                  )}

                  <div className="mt-3 grid grid-cols-[1fr_auto] items-end gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-gray-700">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={selectedSBProducts[0].quantity}
                        onChange={(e) => handleUpdateSBProductQuantity(selectedSBProducts[0].productId, e.target.value)}
                        onBlur={() => handleNormalizeSBProductQuantity(selectedSBProducts[0].productId)}
                        className="w-full rounded border border-gray-300 p-3 text-sm"
                      />
                    </div>
                    <div className="rounded-lg bg-white px-3 py-2 text-right">
                      <p className="text-[10px] font-semibold uppercase text-gray-500">Total</p>
                      <p className="text-sm font-bold text-green-700">{formatCurrency(selectedSBProducts[0].subtotal)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowMobileSBProductActionModal(false);
                      setSelectedSBProducts([]);
                      updateSBPackageSummary([]);
                    }}
                    className="rounded-lg bg-gray-100 px-3 py-3 text-sm font-semibold text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || selectedSBProducts.length === 0}
                    className={`rounded-lg px-3 py-3 text-sm font-semibold text-white ${
                      loading || selectedSBProducts.length === 0 ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {loading ? "Saving..." : "Create / Add"}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCloseCreateSBAccountModal}
              className="bg-gray-200 text-gray-800 px-3 py-2 rounded text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={selectedSBProducts.length === 0}
              className={`px-3 py-2 rounded text-white text-sm ${
                selectedSBProducts.length > 0 ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
  {showSBProductReplaceModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-3">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-xl">
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-4 py-3 md:px-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-gray-900 md:text-lg">Change Product</h3>
              <p className="mt-1 text-xs text-gray-600">
                Replace this product on {replaceSBContext?.account?.SBAccountNumber || "SB account"}.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCloseSBProductReplaceModal}
              className="rounded bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>

        <div className="p-4 md:p-5">
          {replaceError && (
            <p className="mb-3 rounded bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 md:text-sm">
              {replaceError}
            </p>
          )}

          <div className="mb-4 rounded border border-gray-200 bg-gray-50 p-3">
            <p className="text-[11px] font-semibold uppercase text-gray-500">Current product</p>
            <p className="mt-1 text-sm font-bold text-gray-900">{replaceSBContext?.item?.productName || "Product"}</p>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-gray-700">
              <span>Qty: <b>{replaceSBContext?.item?.quantity || 1}</b></span>
              <span>Amount: <b>{formatCurrency(replaceSBContext?.item?.subtotal)}</b></span>
              <span>Paid: <b>{formatCurrency(replaceSBContext?.item?.paidAmount)}</b></span>
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-xs font-semibold text-gray-700">Search product</label>
            <input
              type="text"
              value={replacementSearch}
              onChange={(event) => setReplacementSearch(event.target.value)}
              placeholder="Search product name"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          {productsLoading && (
            <div className="rounded border border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
              Loading products...
            </div>
          )}

          {productsError && (
            <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {productsError}
            </div>
          )}

          {!productsLoading && !productsError && (
            <div className="grid max-h-[330px] grid-cols-2 gap-2.5 overflow-y-auto pr-1 md:grid-cols-3 lg:grid-cols-4">
              {filteredReplacementProducts.map((product) => {
                const productImage = Array.isArray(product.images) && product.images.length > 0
                  ? resolveImageUrl(product.images[0])
                  : "";
                const selected = String(product._id || "") === String(replacementProductId);

                return (
                  <button
                    type="button"
                    key={product._id}
                    onClick={() => handleSelectReplacementProduct(product)}
                    className={`overflow-hidden rounded-md border text-left shadow-sm transition hover:shadow-md ${
                      selected ? "border-blue-600 ring-2 ring-blue-100" : "border-gray-200"
                    }`}
                  >
                    <div className="h-24 bg-gray-100 md:h-28">
                      {productImage ? (
                        <img src={productImage} alt={product.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">No image</div>
                      )}
                    </div>
                    <div className="p-2">
                      <p className="line-clamp-2 text-xs font-bold text-gray-900">{product.name}</p>
                      <p className="mt-1 text-xs font-bold text-green-700">{formatCurrency(product.price)}</p>
                    </div>
                  </button>
                );
              })}
              {filteredReplacementProducts.length === 0 && (
                <div className="col-span-full rounded border border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
                  No matching product found.
                </div>
              )}
            </div>
          )}

          {selectedReplacementProduct && (
            <div className="mt-4 rounded border border-gray-200 bg-white p-3">
              <div className="grid gap-3 md:grid-cols-[1fr_220px] md:items-end">
                <div>
                  <p className="text-xs font-semibold text-gray-500">Replacement</p>
                  <p className="mt-1 text-sm font-bold text-gray-900">{selectedReplacementProduct.name}</p>
                  {activeReplacementVariations.length > 0 && (
                    <div className="mt-3">
                      <label className="mb-1 block text-xs font-semibold text-gray-700">Variation</label>
                      <select
                        value={replacementVariationId}
                        onChange={(event) => {
                          setReplacementVariationId(event.target.value);
                          setReplaceError("");
                        }}
                        className="w-full rounded border border-gray-300 p-2 text-sm"
                      >
                        <option value="">Select variation</option>
                        {activeReplacementVariations.map((variation) => (
                          <option key={variation._id} value={variation._id}>
                            {getVariationLabel(variation)} - {formatCurrency(variation.price)}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div className="rounded bg-gray-50 p-3 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">Qty</span>
                    <b>{replacementQuantity}</b>
                  </div>
                  <div className="mt-1 flex justify-between gap-3">
                    <span className="text-gray-500">New total</span>
                    <b className="text-green-700">{formatCurrency(replacementSubtotal)}</b>
                  </div>
                  {replacePaidAmount > 0 && (
                    <div className="mt-1 flex justify-between gap-3">
                      <span className="text-gray-500">Paid carried</span>
                      <b>{formatCurrency(replacePaidAmount)}</b>
                    </div>
                  )}
                </div>
              </div>
              {replacementAmountTooLow && (
                <p className="mt-3 rounded bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
                  Replacement product amount cannot be less than the amount already paid for this product.
                </p>
              )}
            </div>
          )}

          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCloseSBProductReplaceModal}
              className="rounded bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleReplaceSBProduct}
              disabled={replaceLoading || !replacementProductId || replacementAmountTooLow}
              className={`rounded px-4 py-2 text-sm font-semibold text-white ${
                replaceLoading || !replacementProductId || replacementAmountTooLow
                  ? "bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {replaceLoading ? "Changing..." : "Change Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
  {/* Create FD Account Package Modal */}
  {showCreateFDAccountModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-md w-96">
      <h3 className="text-lg font-bold mb-4">Create Account Package</h3>
      {errors && <p className="text-red-600 mb-4 text-sm">{errors}</p>}
      <form onSubmit={handleCreateFDAccount}>
        {/* Account Manager Select */}
        {/* {(loggedInStaffRole === "Admin" || loggedInStaffRole === "Manager") &&
        <div className="mb-4">
          <Select2
            label="Account Manager"
            options={staffs.map((staff) => ({
              label: `${staff.firstName} ${staff.lastName}`,
              value: staff._id
            }))}
            value={accountManagerId}
            onChange={(selectedId) => setAccountManagerId(selectedId)}
          />
        </div>
        } */}
        {/* Amount Input */}
        <div className="mb-4">
          <label htmlFor="fdamount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            id="fdamount"
            type="number"
            value={fdamount}
            onChange={(e) => setFdamount(e.target.value)}
            placeholder="Enter amount"
            required
            className="w-full border border-gray-300 rounded p-2 mt-1"
          />
        </div>

        {/* Duration Dropdown */}
        <div className="mb-4">
          {/* <label htmlFor="durationMonths" className="block text-sm font-medium text-gray-700">
            Duration (Months)
          </label>
          <select
            id="durationMonths"
            value={durationMonths}
            onChange={(e) => setDurationMonths(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mt-1"
          >
            <option value="">Select duration</option>
            {[6, 9, 12, 18, 24].map((month) => (
              <option key={month} value={month}>
                {month} Month{month > 1 ? 's' : ''}
              </option>
            ))}
          </select> */}
          <Select
            label="Duration (Months)"
            options={duration}
            value={durationMonths}
            onChange={setDurationMonths}
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setShowCreateFDAccountModal(false)}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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

    
