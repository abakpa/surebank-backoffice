import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchOrdersRequest,
  updateOrderStatusRequest,
} from "../redux/slices/ecommerceOrderSlice";
import TableLoadingNotice from "./TableLoadingNotice";
import PaginationControls from "./PaginationControls";

const PAGE_SIZE = 25;

const EcommerceOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.ecommerceOrders);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPayment, setFilterPayment] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchOrdersRequest({}));
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterPayment, filterStatus, searchTerm]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatusRequest({ orderId, status }));
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

  const getPaymentStatusColor = (status) => {
    const colors = {
      unpaid: "bg-red-100 text-red-800",
      partial: "bg-orange-100 text-orange-800",
      paid: "bg-green-100 text-green-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const orderList = useMemo(() => (Array.isArray(orders) ? orders : []), [orders]);

  const filteredOrders = useMemo(() => orderList.filter((order) => {
    const matchesStatus = filterStatus === "" || order.status === filterStatus;
    const matchesPayment =
      filterPayment === "" || order.paymentStatus === filterPayment;
    const matchesSearch =
      searchTerm === "" ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone?.includes(searchTerm);
    return matchesStatus && matchesPayment && matchesSearch;
  }), [filterPayment, filterStatus, orderList, searchTerm]);

  const totalPages = Math.max(Math.ceil(filteredOrders.length / PAGE_SIZE), 1);
  const paginatedOrders = useMemo(
    () => filteredOrders.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [currentPage, filteredOrders]
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">E-Commerce Orders</h1>
        <Link
          to="/ecommerce-orders/overdue"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
        >
          View Overdue Installments
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by order # or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="paid">Paid</option>
          <option value="partially_paid">Partially Paid</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={filterPayment}
          onChange={(e) => setFilterPayment(e.target.value)}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          <option value="">All Payment Status</option>
          <option value="unpaid">Unpaid</option>
          <option value="partial">Partial</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded dark:bg-slate-900 dark:border-slate-700">
          <thead className="bg-gray-100 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-slate-300">
                Order #
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-slate-300">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-slate-300">
                Items
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-slate-300">
                Total
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-slate-300">
                Payment Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-slate-300">
                Payment Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-slate-300">
                Order Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-slate-300">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-slate-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
            {paginatedOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-slate-800">
                <td className="px-4 py-3 text-sm font-medium dark:text-slate-100">
                  {order.orderNumber}
                </td>
                <td className="px-4 py-3 text-sm dark:text-slate-100">
                  <div>{order.customerPhone}</div>
                  <div className="text-xs text-gray-500 truncate max-w-xs dark:text-slate-400">
                    {order.shippingAddress}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm dark:text-slate-100">{order.items?.length || 0}</td>
                <td className="px-4 py-3 text-sm font-medium dark:text-slate-100">
                  ₦{order.totalAmount?.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm dark:text-slate-100">
                  <span className="capitalize">{order.paymentType}</span>
                  {order.paymentType === "installment" && (
                    <div className="text-xs text-gray-500 dark:text-slate-400">
                      {order.installmentPlan?.frequency} x{" "}
                      {order.installmentPlan?.duration}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${getPaymentStatusColor(
                      order.paymentStatus
                    )}`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className={`px-2 py-1 text-xs rounded border ${getStatusColor(
                      order.status
                    )}`}
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
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-slate-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <Link
                    to={`/ecommerce-order/${order._id}`}
                    className="text-blue-600 hover:text-blue-800 dark:text-sky-400 dark:hover:text-sky-300 text-sm"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && <TableLoadingNotice message="Loading ecommerce orders..." />}
      <PaginationControls
        page={currentPage}
        totalPages={totalPages}
        total={filteredOrders.length}
        onPageChange={setCurrentPage}
        disabled={loading}
      />

      {filteredOrders.length === 0 && (
        <div className="text-center py-8 text-gray-500">No orders found</div>
      )}
    </div>
  );
};

export default EcommerceOrders;
