import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchOrderByIdRequest,
  updateOrderStatusRequest,
  recordPaymentRequest,
  cancelOrderRequest,
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

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
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

  const handleStatusChange = (status) => {
    dispatch(updateOrderStatusRequest({ orderId: id, status }));
  };

  const handleRecordPayment = () => {
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

  const handleCancelOrder = () => {
    if (!cancelReason) {
      alert("Please provide a cancellation reason");
      return;
    }

    dispatch(cancelOrderRequest({ orderId: id, reason: cancelReason }));
    setShowCancelModal(false);
    setCancelReason("");
  };

  const handleCreditSBAccount = () => {
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
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) return <Loader />;
  if (!order) return <div className="p-4">Order not found</div>;

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
            </tr>
          </thead>
          <tbody className="divide-y">
            {order.items?.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-3 text-sm">{item.productName}</td>
                <td className="px-4 py-3 text-sm">₦{item.price?.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">{item.quantity}</td>
                <td className="px-4 py-3 text-sm font-medium">₦{item.subtotal?.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan="3" className="px-4 py-3 text-right font-semibold">Total:</td>
              <td className="px-4 py-3 font-bold">₦{order.totalAmount?.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {order.paymentType === "installment" && order.accountNumber && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg shadow p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-green-800">Wallet Account</h3>
            <button
              onClick={() => setShowCreditModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Credit Account
            </button>
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
              <span className="text-gray-600 text-xs">Next Payment Due</span>
              <p className="font-medium text-gray-800">
                {order.installmentPlan?.payments?.find(p => p.status === 'pending')
                  ? new Date(order.installmentPlan.payments.find(p => p.status === 'pending').date).toLocaleDateString()
                  : "All Paid"}
              </p>
              <p className="text-xs text-gray-500">
                ₦{order.installmentPlan?.amountPerPeriod?.toLocaleString() || "0"} per period
              </p>
            </div>
          </div>
          <div className="mt-3 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
            <strong>How it works:</strong> When the customer's wallet Account has sufficient balance, scheduled payments are automatically deducted on their due date. Credit this account to add funds for installment payments.
          </div>
        </div>
      )}

      {order.paymentType === "installment" && order.installmentPlan && (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="font-semibold mb-3">Installment Plan</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
            <div>
              <span className="text-gray-600">Frequency:</span>
              <p className="font-medium capitalize">{order.installmentPlan.frequency}</p>
            </div>
            <div>
              <span className="text-gray-600">Duration:</span>
              <p className="font-medium">{order.installmentPlan.duration} payments</p>
            </div>
            <div>
              <span className="text-gray-600">Amount per Period:</span>
              <p className="font-medium">₦{order.installmentPlan.amountPerPeriod?.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-gray-600">Remaining Balance:</span>
              <p className="font-medium text-red-600">₦{order.installmentPlan.remainingBalance?.toLocaleString()}</p>
            </div>
          </div>

          <h4 className="font-medium mb-2">Payment Schedule</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left">Due Date</th>
                  <th className="px-3 py-2 text-left">Amount</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Paid At</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {order.installmentPlan.payments?.map((payment, index) => (
                  <tr key={index}>
                    <td className="px-3 py-2">{new Date(payment.date).toLocaleDateString()}</td>
                    <td className="px-3 py-2">₦{payment.amount?.toLocaleString()}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          payment.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : payment.status === "overdue"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      {payment.paidAt ? new Date(payment.paidAt).toLocaleDateString() : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex gap-4 flex-wrap">
        <select
          value={order.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="paid">Paid</option>
          <option value="partially_paid">Partially Paid</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {order.paymentStatus !== "paid" && order.status !== "cancelled" && (
          <button
            onClick={() => setShowPaymentModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Record Payment
          </button>
        )}

        {order.status !== "delivered" && order.status !== "cancelled" && (
          <button
            onClick={() => setShowCancelModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Cancel Order
          </button>
        )}
      </div>

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

      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="font-semibold text-lg mb-4">Cancel Order</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Cancellation Reason</label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCancelOrder}
                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                Cancel Order
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 border py-2 rounded hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreditModal && (
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
              <label className="block text-sm font-medium mb-1">Amount to Credit (₦)</label>
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
              <strong>Note:</strong> After crediting the customer's main wallet, any due installment payments will be processed automatically whenever the wallet has sufficient balance.
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCreditSBAccount}
                disabled={!creditAmount || parseFloat(creditAmount) <= 0}
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Credit Account
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
