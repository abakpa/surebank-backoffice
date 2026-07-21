import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPrint, FaReceipt, FaShareAlt, FaTimes } from "react-icons/fa";
import { url } from "../redux/sagas/url";

const formatCurrency = (amount) => `₦${Number(amount || 0).toLocaleString()}`;

const formatDate = (value) => {
  if (!value) return "N/A";
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDateInputDisplay = (value, fallback) => {
  if (!value) return fallback;

  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return fallback;

  return `${day}/${month}/${year}`;
};

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

const inlineComputedStyles = (source, target) => {
  const computedStyle = window.getComputedStyle(source);
  target.setAttribute("style", computedStyle.cssText);

  Array.from(source.children).forEach((sourceChild, index) => {
    const targetChild = target.children[index];
    if (targetChild) {
      inlineComputedStyles(sourceChild, targetChild);
    }
  });
};

const blobToDataUrl = (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onloadend = () => resolve(reader.result);
  reader.onerror = reject;
  reader.readAsDataURL(blob);
});

const embedImagesAsDataUrls = async (element) => {
  const images = Array.from(element.querySelectorAll("img"));
  await Promise.all(images.map(async (image) => {
    const source = image.getAttribute("src");
    if (!source || source.startsWith("data:")) return;

    try {
      const response = await fetch(source, { mode: "cors" });
      if (!response.ok) throw new Error("Image fetch failed");
      const blob = await response.blob();
      image.setAttribute("src", await blobToDataUrl(blob));
      image.removeAttribute("crossorigin");
    } catch (error) {
      image.removeAttribute("src");
      image.setAttribute("alt", image.getAttribute("alt") || "Signature unavailable for image export");
    }
  }));
};

const captureReceiptAsBlob = async (element) => {
  if (!element) {
    throw new Error("Receipt is not ready to share.");
  }

  const clone = element.cloneNode(true);
  inlineComputedStyles(element, clone);
  clone.querySelectorAll('[data-receipt-actions="true"]').forEach((node) => node.remove());
  clone.style.maxHeight = "none";
  clone.style.overflow = "visible";
  await embedImagesAsDataUrls(clone);

  const width = Math.ceil(element.scrollWidth);
  const height = Math.ceil(element.scrollHeight);
  const serialized = new XMLSerializer().serializeToString(clone);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <foreignObject width="100%" height="100%">${serialized}</foreignObject>
    </svg>
  `;
  const imageUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));

  try {
    const image = new Image();
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
      image.src = imageUrl;
    });

    const canvas = document.createElement("canvas");
    canvas.width = width * 2;
    canvas.height = height * 2;
    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.scale(2, 2);
    context.drawImage(image, 0, 0);

    return await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 1));
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
};

const shareOrDownloadReceipt = async ({ element, fileName }) => {
  const blob = await captureReceiptAsBlob(element);
  if (!blob) {
    throw new Error("Could not create receipt image.");
  }

  const file = new File([blob], fileName, { type: "image/png" });
  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: "SureBank Receipt",
      text: "SureBank product receipt",
    });
    return;
  }

  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(downloadUrl);
};

const getBackofficeReceiptStaffName = (value) => {
  const name = String(value || "").trim();
  if (!name || name === "N/A" || name === "ECOMMERCE_SYSTEM") {
    return "Delivery staff not recorded";
  }
  return name;
};

const ReceiptModal = ({ receipt, isOpen, onClose }) => {
  const receiptRef = useRef(null);
  const [shareLoading, setShareLoading] = useState(false);
  if (!isOpen || !receipt) return null;

  const handlePrint = () => window.print();
  const product = receipt.product || {};
  const customer = receipt.customer || {};
  const payment = receipt.payment || {};
  const staff = receipt.staff || {};
  const deliveredByName = getBackofficeReceiptStaffName(staff.deliveredBy);
  const receiptFileName = `${String(receipt.receiptNumber || "surebank-receipt").replace(/[^a-zA-Z0-9-_]/g, "-")}.png`;

  const handleShare = async () => {
    setShareLoading(true);
    try {
      await shareOrDownloadReceipt({
        element: receiptRef.current,
        fileName: receiptFileName,
      });
    } catch (error) {
      alert(error.message || "Failed to share receipt image.");
    } finally {
      setShareLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-3 sm:p-5">
      <div ref={receiptRef} className="receipt-print-area max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="bg-gradient-to-r from-orange-500 via-fuchsia-600 to-indigo-700 px-5 py-5 text-white sm:px-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-orange-100 sm:text-xs">Sure-Bank Stores</p>
              <h2 className="mt-1 text-2xl font-black sm:text-3xl">Product Receipt</h2>
              <p className="mt-1 text-xs font-bold text-white/85 sm:text-sm">{receipt.receiptNumber}</p>
            </div>
            <button type="button" onClick={onClose} className="print:hidden rounded-full bg-white/15 px-3 py-1.5 text-xs font-black text-white hover:bg-white/25">
              Close
            </button>
          </div>
        </div>

        <div className="space-y-4 p-4 sm:p-7">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl bg-orange-50 p-3">
              <p className="text-[10px] font-black uppercase text-orange-700">Receipt Date</p>
              <p className="mt-1 text-xs font-bold text-slate-950 sm:text-sm">{formatDate(receipt.receiptDate)}</p>
            </div>
            <div className="rounded-2xl bg-purple-50 p-3">
              <p className="text-[10px] font-black uppercase text-purple-700">Paid</p>
              <p className="mt-1 text-xs font-bold text-slate-950 sm:text-sm">{formatDate(payment.paidAt)}</p>
            </div>
            <div className="rounded-2xl bg-sky-50 p-3">
              <p className="text-[10px] font-black uppercase text-sky-700">Status</p>
              <p className="mt-1 text-xs font-bold capitalize text-slate-950 sm:text-sm">{product.fulfillmentStatus || "delivered"}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-3">
              <p className="text-[10px] font-black uppercase text-emerald-700">Total Paid</p>
              <p className="mt-1 text-sm font-black text-emerald-800 sm:text-lg">{formatCurrency(product.totalAmount)}</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-slate-100 p-4">
              <h3 className="text-xs font-black uppercase text-slate-500">Customer</h3>
              <p className="mt-2 text-sm font-bold text-slate-800">{customer.name || "N/A"}</p>
              <p className="text-xs text-slate-500">{customer.phone || "N/A"}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">{customer.address || "No address supplied"}</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-100">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-950 text-left text-[10px] font-black uppercase text-white sm:text-xs">
                <tr>
                  <th className="px-3 py-3 sm:px-4">Product</th>
                  <th className="px-3 py-3 sm:px-4">Qty</th>
                  <th className="px-3 py-3 sm:px-4">Unit Price</th>
                  <th className="px-3 py-3 text-right sm:px-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-4 sm:px-4">
                    <p className="font-black text-slate-950">{product.name || "N/A"}</p>
                    {product.description && <p className="mt-1 text-xs text-slate-500">{product.description}</p>}
                  </td>
                  <td className="px-3 py-4 font-bold text-slate-700 sm:px-4">{Number(product.quantity || 1).toLocaleString()}</td>
                  <td className="px-3 py-4 font-bold text-slate-700 sm:px-4">{formatCurrency(product.unitPrice)}</td>
                  <td className="px-3 py-4 text-right font-black text-slate-950 sm:px-4">{formatCurrency(product.totalAmount)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <div className="w-full max-w-xs rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
              <p className="text-[10px] font-black uppercase tracking-wide text-slate-500">Authorized Signature</p>
              {staff.signatureUrl ? (
                <img
                  src={staff.signatureUrl}
                  alt={`${deliveredByName} signature`}
                  crossOrigin="anonymous"
                  className="mx-auto mt-2 h-14 w-full max-w-[220px] object-contain sm:h-16"
                />
              ) : (
                <div className="mx-auto mt-3 h-12 w-full max-w-[220px] border-b-2 border-slate-300"></div>
              )}
              <p className="mt-2 text-xs font-black text-slate-900">{deliveredByName}</p>
            </div>
          </div>

          <div data-receipt-actions="true" className="print:hidden flex justify-end gap-2">
            <button
              type="button"
              onClick={handleShare}
              disabled={shareLoading}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-sm font-black text-white hover:bg-purple-700 disabled:bg-purple-300"
            >
              <FaShareAlt /> {shareLoading ? "Preparing..." : "Share"}
            </button>
            <button type="button" onClick={handlePrint} className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-black text-white hover:bg-orange-600">
              <FaPrint /> Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeliveryDetailsModal = ({ title, items, isOpen, onClose, onOpenAccount, onOpenReceipt, receiptLoadingId = "", showDeliveredBy = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-lg bg-white shadow-xl dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
            <p className="text-sm text-gray-500 dark:text-slate-300">{items.length.toLocaleString()} product item(s)</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        <div className="max-h-[72vh] overflow-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-slate-700">
            <thead className="sticky top-0 bg-gray-50 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">SB Account</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Source</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Branch</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Qty</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Status</th>
                {showDeliveredBy && (
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Delivered By</th>
                )}
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Added</th>
                <th className="px-4 py-3 text-right text-xs font-bold uppercase text-gray-500 dark:text-slate-300">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={showDeliveredBy ? "11" : "10"} className="px-4 py-10 text-center text-gray-500 dark:text-slate-300">
                    No product item found.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-800">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900 dark:text-white">{item.customerName}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">{item.customerPhone || "N/A"}</p>
                    </td>
                    <td className="min-w-[220px] px-4 py-3 font-semibold text-gray-900 dark:text-white">{item.productName}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-slate-300">{item.SBAccountNumber}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-slate-300">{item.source || "Backoffice"}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-slate-300">{item.branchName}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-slate-300">{Number(item.quantity || 0).toLocaleString()}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">{formatCurrency(item.amount)}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-700 dark:bg-slate-700 dark:text-slate-100">
                        {item.fulfillmentStatus || "pending"}
                      </span>
                    </td>
                    {showDeliveredBy && (
                      <td className="px-4 py-3 font-semibold text-gray-700 dark:text-slate-300">{item.fulfilledBy || "N/A"}</td>
                    )}
                    <td className="px-4 py-3 text-gray-700 dark:text-slate-300">
                      <p>{formatDate(item.addedAt)}</p>
                      {item.fulfilledAt && <p className="text-xs text-emerald-600">Delivered: {formatDate(item.fulfilledAt)}</p>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        {["delivered", "completed"].includes(item.fulfillmentStatus || "") && (
                          <button
                            type="button"
                            onClick={() => onOpenReceipt(item)}
                            disabled={receiptLoadingId === item.id}
                            className="inline-flex items-center gap-1 rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white hover:bg-orange-600"
                          >
                            <FaReceipt /> {receiptLoadingId === item.id ? "Loading" : "Receipt"}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onOpenAccount(item)}
                          className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
                        >
                          Open
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const BackofficeProductDeliveryCards = ({ staffId = "" }) => {
  const navigate = useNavigate();
  const staffRole = localStorage.getItem("staffRole");
  const [deliveredDateRange, setDeliveredDateRange] = useState({
    dateFrom: "",
    dateTo: "",
  });
  const [summary, setSummary] = useState({
    pending: { count: 0, items: [] },
    delivered: { count: 0, items: [] },
  });
  const [pendingLoading, setPendingLoading] = useState(false);
  const [deliveredLoading, setDeliveredLoading] = useState(false);
  const [activeType, setActiveType] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [receiptLoadingId, setReceiptLoadingId] = useState("");
  const didMountDateRangeRef = useRef(false);

  const fetchSummary = useCallback(async ({ includePending = true, range = { dateFrom: "", dateTo: "" } } = {}) => {
    if (includePending) {
      setPendingLoading(true);
    }
    setDeliveredLoading(true);
    try {
      const response = await axios.get(
        `${url}/api/sbaccount/reports/backoffice-product-delivery`,
        {
          ...getAuthConfig(),
          params: {
            ...(staffId ? { staffId } : {}),
            ...(range.dateFrom ? { dateFrom: range.dateFrom } : {}),
            ...(range.dateTo ? { dateTo: range.dateTo } : {}),
          },
        }
      );
      setSummary((current) => ({
        pending: includePending
          ? (response.data?.pending || { count: 0, items: [] })
          : current.pending,
        delivered: response.data?.delivered || { count: 0, items: [] },
      }));
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    } finally {
      if (includePending) {
        setPendingLoading(false);
      }
      setDeliveredLoading(false);
    }
  }, [navigate, staffId]);

  useEffect(() => {
    fetchSummary({ includePending: true });
  }, [fetchSummary]);

  useEffect(() => {
    if (!didMountDateRangeRef.current) {
      didMountDateRangeRef.current = true;
      return;
    }
    fetchSummary({
      includePending: false,
      range: {
        dateFrom: deliveredDateRange.dateFrom,
        dateTo: deliveredDateRange.dateTo,
      },
    });
  }, [deliveredDateRange.dateFrom, deliveredDateRange.dateTo, fetchSummary]);

  const modalData = useMemo(() => {
    if (activeType === "delivered") {
      return {
        title: "Products Delivered",
        items: summary.delivered.items || [],
      };
    }

    return {
      title: "Products Not Delivered",
      items: summary.pending.items || [],
    };
  }, [activeType, summary]);

  const openAccount = (item) => {
    if (item?.actionUrl) {
      navigate(item.actionUrl);
    }
  };

  const openReceipt = async (item) => {
    const rawItemId = item?.itemId || String(item?.id || "").split("-").pop();
    if (!rawItemId) return;

    setReceiptLoadingId(item.id);
    try {
      const endpoint = item.source === "Ecommerce" && item.orderId
        ? `${url}/api/ecommerce/orders/staff/${encodeURIComponent(item.orderId)}/items/${encodeURIComponent(rawItemId)}/receipt`
        : `${url}/api/sbaccount/${encodeURIComponent(item.SBAccountNumber)}/items/${encodeURIComponent(rawItemId)}/receipt`;
      const response = await axios.get(endpoint, getAuthConfig());
      setReceipt(response.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load receipt.");
    } finally {
      setReceiptLoadingId("");
    }
  };

  const updateDeliveredDateRange = (field, value) => {
    setDeliveredDateRange((current) => ({ ...current, [field]: value }));
  };

  const resetDeliveredDateRange = () => {
    setDeliveredDateRange({ dateFrom: "", dateTo: "" });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setActiveType("pending")}
        className="relative rounded-lg bg-amber-100 p-1.5 text-left shadow-md ring-1 ring-white/70 transition hover:bg-amber-200 sm:p-3"
      >
        <FaEye className="absolute right-2 top-2 text-sm text-amber-800 sm:right-3 sm:top-3" />
        <h3 className="pr-7 text-[10px] font-semibold leading-tight text-amber-800 sm:text-xs">Products Not Delivered</h3>
        <p className="mt-1 text-[11px] font-bold text-amber-900 sm:text-sm">
          {pendingLoading ? "..." : Number(summary.pending.count || 0).toLocaleString()}
        </p>
        <p className="mt-1 text-[10px] font-semibold leading-tight text-amber-700 sm:text-xs">View product details</p>
      </button>

      <div className="relative rounded-lg bg-teal-100 p-1.5 text-left shadow-md ring-1 ring-white/70 transition hover:bg-teal-200 sm:p-3">
        <button
          type="button"
          onClick={() => setActiveType("delivered")}
          className="block w-full text-left"
        >
          <FaEye className="absolute right-2 top-2 text-sm text-teal-800 sm:right-3 sm:top-3" />
          <h3 className="pr-7 text-[10px] font-semibold leading-tight text-teal-800 sm:text-xs">Products Delivered</h3>
          <p className="mt-1 text-[11px] font-bold text-teal-900 sm:text-sm">
            {deliveredLoading ? "..." : Number(summary.delivered.count || 0).toLocaleString()}
          </p>
          <p className="mt-1 text-[10px] font-semibold leading-tight text-teal-700 sm:text-xs">View product details</p>
        </button>

        <div className="mt-1 border-t border-teal-200 pt-1 sm:mt-2 sm:pt-2">
          <div className="grid gap-1 sm:gap-2">
          <label className="dashboard-date-field">
            <span className="dashboard-date-icon" aria-hidden="true">
              <i className="fas fa-calendar-alt"></i>
            </span>
            <span className="dashboard-date-label">
              {formatDateInputDisplay(deliveredDateRange.dateFrom, "Start")}
            </span>
            <input
              type="date"
              value={deliveredDateRange.dateFrom}
              onChange={(event) => updateDeliveredDateRange("dateFrom", event.target.value)}
              className="dashboard-date-input"
              aria-label="Delivered from date"
            />
          </label>
          <label className="dashboard-date-field">
            <span className="dashboard-date-icon" aria-hidden="true">
              <i className="fas fa-calendar-alt"></i>
            </span>
            <span className="dashboard-date-label">
              {formatDateInputDisplay(deliveredDateRange.dateTo, "End")}
            </span>
            <input
              type="date"
              value={deliveredDateRange.dateTo}
              onChange={(event) => updateDeliveredDateRange("dateTo", event.target.value)}
              className="dashboard-date-input"
              aria-label="Delivered to date"
            />
          </label>
          {(deliveredDateRange.dateFrom || deliveredDateRange.dateTo) && (
            <button
              type="button"
              onClick={resetDeliveredDateRange}
              className="rounded border border-teal-300 bg-white px-2 py-1 text-[10px] font-semibold text-teal-700 hover:bg-teal-100 sm:px-3 sm:py-2 sm:text-xs"
            >
              Clear Range
            </button>
          )}
          </div>
        </div>
      </div>

      <DeliveryDetailsModal
        isOpen={Boolean(activeType)}
        title={modalData.title}
        items={modalData.items}
        onClose={() => setActiveType("")}
        onOpenAccount={openAccount}
        onOpenReceipt={openReceipt}
        receiptLoadingId={receiptLoadingId}
        showDeliveredBy={staffRole === "Admin"}
      />

      <ReceiptModal
        isOpen={Boolean(receipt)}
        receipt={receipt}
        onClose={() => setReceipt(null)}
      />
    </>
  );
};

export default BackofficeProductDeliveryCards;
