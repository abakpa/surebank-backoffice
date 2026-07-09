import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchOrderByIdRequest,
  updateOrderItemFulfillmentRequest,
  recordPaymentRequest,
  creditSBAccountRequest,
  clearOrderState,
} from "../redux/slices/ecommerceOrderSlice";
import Loader from "./Loader";

const EcommerceOrderDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { order, sbAccount, loading, success, error, message } = useSelector(
    (state) => state.ecommerceOrders
  );
  const staffRole = localStorage.getItem("staffRole");
  const isAdmin = staffRole === "Admin";
  const isManager = staffRole === "Manager";
  const canManageEcommerce = ["Admin", "Manager", "Agent", "OnlineRep"].includes(staffRole);
  const canUpdateOrderStatus = isAdmin || isManager;

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [creditAmount, setCreditAmount] = useState("");

  useEffect(() => {
    dispatch(fetchOrderByIdRequest({ orderId: id }));
    return () => {
      dispatch(clearOrderState());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(clearOrderState());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const handleItemFulfillment = (itemId, status = "delivered") => {
    if (!canUpdateOrderStatus) return;
    dispatch(updateOrderItemFulfillmentRequest({ orderId: id, itemId, status }));
  };

  const handleRecordPayment = () => {
    if (!canManageEcommerce) return;
    if (!paymentAmount || !transactionRef) {
      alert("Please fill in all fields");
      return;
    }

    dispatch(
      recordPaymentRequest({
        orderId: id,
        amount: parseFloat(paymentAmount),
        transactionRef,
        paymentType: order.paymentType,
      })
    );
    setShowPaymentModal(false);
    setPaymentAmount("");
    setTransactionRef("");
  };

  const handleCreditSBAccount = () => {
    if (!isAdmin) return;
    if (!creditAmount || parseFloat(creditAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    dispatch(
      creditSBAccountRequest({
        orderId: id,
        amount: parseFloat(creditAmount),
      })
    );
    setShowCreditModal(false);
    setCreditAmount("");
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      paid: "bg-green-100 text-green-800",
      partially_paid: "bg-orange-100 text-orange-800",
      processing: "bg-purple-100 text-purple-800",
      shipped: "bg-indigo-100 text-indigo-800",
      delivered: "bg-green-200 text-green-900",
      completed: "bg-emerald-200 text-emerald-900",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getSelectedOptionsText = (item) => {
    if (!item?.selectedOptions) return "";
    return Object.entries(item.selectedOptions)
      .filter(([, value]) => value)
      .map(([name, value]) => `${name}: ${value}`)
      .join(" • ");
  };

  const getItemStatusColor = (status) => {
    const colors = {
      unpaid: "bg-red-100 text-red-800",
      partial: "bg-orange-100 text-orange-800",
      paid: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      delivered: "bg-green-200 text-green-900",
      completed: "bg-emerald-200 text-emerald-900",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const isDeliveredItem = (item = {}) =>
    ["delivered", "completed"].includes(item.fulfillmentStatus || "pending");

  const isDebitPayment = (payment = {}) =>
    payment.type === "debit" || ["Debit", "Purchased", "Bought", "Delivered"].includes(payment.direction);

  if (loading) return <Loader />;
  if (!order) return <div className="p-4">Order not found</div>;

  const orderItems = Array.isArray(order.items) ? order.items : [];
  const activeItemsSubtotal = Number(
    order.activeItemsSubtotal ??
      orderItems
        .filter((item) => !isDeliveredItem(item))
        .reduce((sum, item) => sum + Number(item.subtotal || 0), 0)
  );
  const deliveredItemsSubtotal = Number(
    order.deliveredItemsSubtotal ??
      orderItems
        .filter(isDeliveredItem)
        .reduce((sum, item) => sum + Number(item.subtotal || 0), 0)
  );
  const installmentPayments = Array.isArray(order.installmentPlan?.payments)
    ? order.installmentPlan.payments
    : [];
  const customerStatement = order.customerStatement || {};
  const statementTransactions = Array.isArray(customerStatement.transactions)
    ? customerStatement.transactions
    : installmentPayments;
  const totalPaid = Number(
    customerStatement.paidTotal ??
      customerStatement.walletBalance ??
      order.installmentPlan?.walletBalance ??
      order.installmentPlan?.totalPaid ??
      0
  );
  const remainingBalance = Number(
    customerStatement.remainingBalance ??
      order.installmentPlan?.remainingBalance ??
      Math.max(0, activeItemsSubtotal - totalPaid)
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order: {order.orderNumber}</h1>
        <button
          onClick={() => navigate("/ecommerce-orders")}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Back to Orders
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {message || "Operation successful"}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3">Order Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Status:</span>
              <span className="font-medium">{order.paymentStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Type:</span>
              <span className="font-medium capitalize">{order.paymentType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Date:</span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-bold">₦{order.totalAmount?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pending Items Subtotal:</span>
              <span className="font-bold text-orange-600">₦{activeItemsSubtotal.toLocaleString()}</span>
            </div>
            {deliveredItemsSubtotal > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Delivered Items Subtotal:</span>
                <span className="font-medium text-gray-700">₦{deliveredItemsSubtotal.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3">Customer Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">
                {order.customerId?.firstName || order.customerId?.lastName
                  ? `${order.customerId?.firstName || ''} ${order.customerId?.lastName || ''}`.trim()
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span>{order.customerPhone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span>{order.customerEmail || "N/A"}</span>
            </div>
            <div>
              <span className="text-gray-600">Shipping Address:</span>
              <p className="mt-1">{order.shippingAddress}</p>
              {order.shippingCity && <p>{order.shippingCity}, {order.shippingState}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="font-semibold mb-3">Order Items</h3>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Product</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Price</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Qty</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Subtotal</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Paid</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Fulfillment</th>
              {canUpdateOrderStatus && (
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Action</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y">
            {order.items?.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-3 text-sm">
                  <div className="font-medium text-gray-800">{item.productName}</div>
                  {(item.variationName || getSelectedOptionsText(item)) && (
                    <div className="mt-1 text-xs text-gray-500">
                      {item.variationName && <span>{item.variationName}</span>}
                      {item.variationName && getSelectedOptionsText(item) && <span> • </span>}
                      {getSelectedOptionsText(item) && <span>{getSelectedOptionsText(item)}</span>}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-sm">₦{item.price?.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">{item.quantity}</td>
                <td className="px-4 py-3 text-sm font-medium">₦{item.subtotal?.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="font-medium">₦{Number(item.paidAmount || 0).toLocaleString()}</div>
                  <span className={`mt-1 inline-flex rounded px-2 py-1 text-xs ${getItemStatusColor(item.paymentStatus)}`}>
                    {item.paymentStatus || "unpaid"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={`inline-flex rounded px-2 py-1 text-xs ${getItemStatusColor(item.fulfillmentStatus || "pending")}`}>
                    {item.fulfillmentStatus || "pending"}
                  </span>
                </td>
                {canUpdateOrderStatus && (
                  <td className="px-4 py-3 text-sm">
                    {!["delivered", "completed"].includes(item.fulfillmentStatus || "pending") ? (
                      <button
                        type="button"
                        onClick={() => handleItemFulfillment(item._id, "delivered")}
                        disabled={loading}
                        className="rounded bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                      >
                        {loading ? "Processing..." : "Mark Delivered"}
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">No action</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan="3" className="px-4 py-3 text-right font-semibold">Pending subtotal:</td>
              <td className="px-4 py-3 font-bold text-orange-600">₦{activeItemsSubtotal.toLocaleString()}</td>
              <td />
              <td />
              {canUpdateOrderStatus && <td />}
            </tr>
            {deliveredItemsSubtotal > 0 && (
              <tr>
                <td colSpan="3" className="px-4 py-2 text-right text-sm font-medium text-gray-600">
                  Delivered subtotal:
                </td>
                <td className="px-4 py-2 text-sm font-semibold text-gray-700">
                  ₦{deliveredItemsSubtotal.toLocaleString()}
                </td>
                <td />
                <td />
                {canUpdateOrderStatus && <td />}
              </tr>
            )}
          </tfoot>
        </table>
      </div>

      {order.paymentType === "installment" && order.accountNumber && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg shadow p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-green-800">Wallet Account</h3>
            {isAdmin && (
              <button
                onClick={() => setShowCreditModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Credit Account
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <span className="text-gray-600 text-xs">Account Number</span>
              <p className="font-bold text-gray-800">{order.accountNumber}</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <span className="text-gray-600 text-xs">Wallet Balance</span>
              <p className="font-bold text-2xl text-green-600">
                ₦{sbAccount?.availableBalance?.toLocaleString() || "0"}
              </p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <span className="text-gray-600 text-xs">Payment Mode</span>
              <p className="font-medium text-gray-800">
                Flexible pay small small
              </p>
              <p className="text-xs text-gray-500">
                Customer can pay any amount until fully paid
              </p>
            </div>
          </div>
          <div className="mt-3 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
            <strong>How it works:</strong> Credit this account to add funds to the customer's wallet. The system immediately debits the wallet and credits this order's SB Account, reducing the remaining balance.
          </div>
        </div>
      )}

      {order.paymentType === "installment" && order.installmentPlan && (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="font-semibold mb-3">Customer Statement of Account</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <span className="text-gray-600">Wallet Balance:</span>
              <p className="font-medium text-green-600">₦{totalPaid.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-gray-600">Remaining Balance:</span>
              <p className="font-medium text-red-600">₦{remainingBalance.toLocaleString()}</p>
            </div>
          </div>

          <h4 className="font-medium mb-2">Statement Transactions</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left">Date</th>
                  <th className="px-3 py-2 text-left">Narration</th>
                  <th className="px-3 py-2 text-left">Type</th>
                  <th className="px-3 py-2 text-left">Amount</th>
                  <th className="px-3 py-2 text-left">Balance</th>
                  <th className="px-3 py-2 text-left">Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {statementTransactions.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-3 py-6 text-center text-gray-500">
                      No statement transaction has been recorded for this order yet.
                    </td>
                  </tr>
                )}
                {statementTransactions.map((payment, index) => {
                  const isDebit = isDebitPayment(payment);
                  const typeLabel = isDebit ? (["Bought", "Delivered"].includes(payment.direction) ? payment.direction : "Product payment") : "Wallet deposit";
                  const transactionDate = payment.paidAt || payment.date || payment.createdAt;
                  const reference = payment.transactionRef || payment.reference || "-";
                  const hasBalance = payment.balance !== undefined && payment.balance !== null;

                  return (
                    <tr key={index} className={isDebit ? "text-red-700" : ""}>
                      <td className="px-3 py-2">
                        {transactionDate ? new Date(transactionDate).toLocaleDateString() : "-"}
                      </td>
                      <td className="px-3 py-2 min-w-[220px] text-gray-700">
                        {payment.narration || typeLabel}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            isDebit ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                          }`}
                        >
                          {typeLabel}
                        </span>
                      </td>
                      <td className={`px-3 py-2 font-medium ${isDebit ? "text-red-700" : "text-green-700"}`}>
                        {isDebit ? "-" : "+"}₦{Number(payment.amount || 0).toLocaleString()}
                      </td>
                      <td className="px-3 py-2 font-medium">
                        {hasBalance ? `₦${Number(payment.balance || 0).toLocaleString()}` : "-"}
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-600 min-w-[160px]">
                        {reference}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {canManageEcommerce && order.paymentType !== "installment" && order.paymentStatus !== "paid" && order.status !== "cancelled" && (
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => setShowPaymentModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Record Payment
          </button>
        </div>
      )}

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="font-semibold text-lg mb-4">
              {order.paymentType === "installment" ? "Record Installment Payment" : "Record Payment"}
            </h3>

            {order.paymentType === "installment" && sbAccount && (
              <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">SB Account Balance:</span>
                  <span className="font-bold text-green-600">₦{sbAccount.balance?.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  This amount will be debited from the SB Account
                </p>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Amount (₦)</label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                placeholder={
                  order.paymentType === "installment"
                    ? order.installmentPlan?.amountPerPeriod
                    : order.totalAmount
                }
              />
              {order.paymentType === "installment" && sbAccount && paymentAmount && parseFloat(paymentAmount) > sbAccount.balance && (
                <p className="text-xs text-red-600 mt-1">
                  Insufficient balance. Available: ₦{sbAccount.balance?.toLocaleString()}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Transaction Reference</label>
              <input
                type="text"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                placeholder="e.g., TXN123456"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRecordPayment}
                disabled={order.paymentType === "installment" && sbAccount && paymentAmount && parseFloat(paymentAmount) > sbAccount.balance}
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {order.paymentType === "installment" ? "Debit & Record" : "Record"}
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 border py-2 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreditModal && isAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="font-semibold text-lg mb-4">Credit Wallet Account</h3>

            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Account Number:</span>
                <span className="font-medium">{order.accountNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Current Balance:</span>
                <span className="font-bold text-green-600">₦{sbAccount?.availableBalance?.toLocaleString() || "0"}</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Amount to Deposit for Order (₦)</label>
              <input
                type="number"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter amount"
                min="1"
              />
            </div>

            <div className="mb-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
              <strong>Note:</strong> This will credit the customer's wallet, then immediately debit the wallet and credit this order's SB Account.
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCreditSBAccount}
                disabled={!creditAmount || parseFloat(creditAmount) <= 0}
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Deposit for Order
              </button>
              <button
                onClick={() => {
                  setShowCreditModal(false);
                  setCreditAmount("");
                }}
                className="flex-1 border py-2 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EcommerceOrderDetail;
