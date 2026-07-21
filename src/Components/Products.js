import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchProductsRequest,
  deleteProductRequest,
  fetchProductDemandRequest,
  fetchProductSalesRequest,
  fetchProductDemandDetailRequest,
  updateProductStockRequest,
  clearProductDemandDetail,
  fetchStockTransfersRequest,
  createStockTransferRequest,
  acceptStockTransferRequest,
  rejectStockTransferRequest,
  cancelStockTransferRequest,
} from "../redux/slices/productSlice";
import { fetchCategoriesRequest } from "../redux/slices/productCategorySlice";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import Loader from "./Loader";
import { resolveImageUrl } from "../utils/image";

const MobileTransferDropdown = ({ value, options, placeholder, onChange, getLabel }) => {
  const [open, setOpen] = useState(false);
  const selectedOption = (options || []).find((option) => String(option.value || "") === String(value || ""));

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between rounded border border-gray-300 bg-white px-3 py-3 text-left text-sm"
      >
        <span className={selectedOption ? "font-semibold text-gray-900" : "text-gray-500"}>
          {selectedOption ? getLabel(selectedOption) : placeholder}
        </span>
        <span className={`ml-3 text-xs transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-[90] max-h-56 overflow-y-auto rounded border border-gray-200 bg-white shadow-xl">
          {(options || []).map((option) => {
            const selected = String(option.value || "") === String(value || "");
            return (
              <button
                type="button"
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`block w-full border-b border-gray-100 px-3 py-2 text-left text-xs font-semibold last:border-b-0 ${
                  selected ? "border-orange-600 bg-orange-50 text-orange-800" : "bg-white text-gray-700"
                }`}
              >
                {getLabel(option)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Products = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading,
    productDemand,
    productDemandDetail,
    productDemandLoading,
    productDemandError,
    productSales,
    stockTransfers,
    stockTransferPagination,
    stockTransferLoading,
    stockTransferError,
  } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.productCategories);
  const { branches } = useSelector((state) => state.branch);
  const staffRole = localStorage.getItem("staffRole");
  const staffBranch = localStorage.getItem("staffBranch");
  const isAdmin = staffRole === "Admin";
  const isManager = staffRole === "Manager";
  const canViewStockTransfers = isAdmin || isManager;
  const canManageEcommerce = ["Admin", "ProductManager", "Product Manager", "SubAdmin"].includes(staffRole);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubCategory, setFilterSubCategory] = useState("");
  const [selectedDemandProduct, setSelectedDemandProduct] = useState(null);
  const [selectedStockProduct, setSelectedStockProduct] = useState(null);
  const [selectedBranchStockProduct, setSelectedBranchStockProduct] = useState(null);
  const [stockModalValues, setStockModalValues] = useState({});
  const [selectedTransferProduct, setSelectedTransferProduct] = useState(null);
  const [transferForm, setTransferForm] = useState({
    variationId: "",
    destinationBranchId: "",
    quantity: 1,
    note: "",
  });
  const [showTransfers, setShowTransfers] = useState(false);
  const [transferFilters, setTransferFilters] = useState({
    status: "",
    dateFrom: "",
    dateTo: "",
    sourceBranchId: "",
    destinationBranchId: "",
    page: 1,
    limit: 25,
  });

  useEffect(() => {
    dispatch(fetchProductsRequest());
    dispatch(fetchCategoriesRequest());
    if (isAdmin) {
      dispatch(fetchProductDemandRequest());
      dispatch(fetchProductSalesRequest());
    }
    if (canViewStockTransfers) {
      dispatch(fetchBranchRequest());
      dispatch(fetchStockTransfersRequest({
        status: "",
        dateFrom: "",
        dateTo: "",
        sourceBranchId: "",
        destinationBranchId: "",
        page: 1,
        limit: 25,
      }));
    }
  }, [dispatch, isAdmin, canViewStockTransfers]);

  const handleDelete = (productId) => {
    if (!canManageEcommerce) return;
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductRequest({ productId }));
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c._id === categoryId);
    return category ? category.name : "Unknown";
  };

  const getSubCategoryName = (categoryId, subCategoryId) => {
    const category = categories.find((c) => c._id === categoryId);
    const subCategory = category?.subcategories?.find((item) => item._id === subCategoryId);
    return subCategory ? subCategory.name : "Unassigned";
  };

  const openDemandReport = (product) => {
    if (!isAdmin) return;
    setSelectedDemandProduct(product);
    dispatch(fetchProductDemandDetailRequest({ productId: product._id }));
  };

  const closeDemandReport = () => {
    setSelectedDemandProduct(null);
    dispatch(clearProductDemandDetail());
  };

  const openBranchStockReport = (product) => {
    if (!isAdmin) return;
    setSelectedBranchStockProduct(product);
  };

  const closeBranchStockReport = () => {
    setSelectedBranchStockProduct(null);
  };

  const getStockInputKey = (productId, variationId = "") => `${productId}:${variationId}`;

  const getBranchStockQuantity = (product, variationId = "") => {
    const row = (product.branchStocks || []).find(
      (stock) => stock.branchId === staffBranch && (stock.variationId || "") === (variationId || "")
    );
    return Number(row?.quantity || 0);
  };

  const openStockModal = (product) => {
    if (!isManager) return;
    const nextValues = {};

    if (product.hasVariations && Array.isArray(product.variations) && product.variations.length > 0) {
      product.variations.forEach((variation) => {
        nextValues[getStockInputKey(product._id, variation._id)] = getBranchStockQuantity(product, variation._id);
      });
    } else {
      nextValues[getStockInputKey(product._id)] = getBranchStockQuantity(product);
    }

    setStockModalValues(nextValues);
    setSelectedStockProduct(product);
  };

  const closeStockModal = () => {
    setSelectedStockProduct(null);
    setStockModalValues({});
  };

  const openTransferModal = (product) => {
    if (!isManager) return;
    const firstVariationId = product.hasVariations && Array.isArray(product.variations) && product.variations.length > 0
      ? product.variations[0]._id
      : "";
    setSelectedTransferProduct(product);
    setTransferForm({
      variationId: firstVariationId,
      destinationBranchId: "",
      quantity: 1,
      note: "",
    });
  };

  const closeTransferModal = () => {
    setSelectedTransferProduct(null);
    setTransferForm({
      variationId: "",
      destinationBranchId: "",
      quantity: 1,
      note: "",
    });
  };

  const handleTransferFormChange = (field, value) => {
    setTransferForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTransferSubmit = (event) => {
    event.preventDefault();
    if (!isManager || !selectedTransferProduct) return;

    const quantity = Number(transferForm.quantity || 0);
    if (!transferForm.destinationBranchId || !Number.isFinite(quantity) || quantity <= 0) {
      return;
    }

    dispatch(createStockTransferRequest({
      productId: selectedTransferProduct._id,
      variationId: transferForm.variationId || "",
      destinationBranchId: transferForm.destinationBranchId,
      quantity,
      note: transferForm.note,
    }));
    closeTransferModal();
  };

  const fetchTransfersWithFilters = (overrides = {}) => {
    const nextFilters = { ...transferFilters, ...overrides };
    dispatch(fetchStockTransfersRequest(nextFilters));
  };

  const handleTransferFilterChange = (field, value) => {
    setTransferFilters((prev) => ({
      ...prev,
      [field]: value,
      page: 1,
    }));
  };

  const applyTransferFilters = (event) => {
    event.preventDefault();
    fetchTransfersWithFilters({ page: 1 });
  };

  const resetTransferFilters = () => {
    const nextFilters = {
      status: "",
      dateFrom: "",
      dateTo: "",
      sourceBranchId: "",
      destinationBranchId: "",
      page: 1,
      limit: 25,
    };
    setTransferFilters(nextFilters);
    dispatch(fetchStockTransfersRequest(nextFilters));
  };

  const goToTransferPage = (page) => {
    const nextPage = Math.max(1, page);
    setTransferFilters((prev) => ({ ...prev, page: nextPage }));
    fetchTransfersWithFilters({ page: nextPage });
  };

  const handleStockModalChange = (productId, variationId, value) => {
    const key = getStockInputKey(productId, variationId);
    setStockModalValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleStockModalSubmit = (event) => {
    event.preventDefault();
    if (!isManager || !selectedStockProduct) return;

    const product = selectedStockProduct;
    const stockItems = product.hasVariations && Array.isArray(product.variations) && product.variations.length > 0
      ? product.variations.map((variation) => ({
        variationId: variation._id,
        quantity: Number(stockModalValues[getStockInputKey(product._id, variation._id)] || 0),
      }))
      : [{
        variationId: "",
        quantity: Number(stockModalValues[getStockInputKey(product._id)] || 0),
      }];

    if (stockItems.some((item) => !Number.isFinite(item.quantity) || item.quantity < 0)) {
      return;
    }

    dispatch(updateProductStockRequest({ productId: product._id, stockItems }));
    closeStockModal();
  };

  const renderAdminStock = (product) => (
    <span className="font-semibold text-gray-900">{product.totalStock ?? product.stock ?? 0}</span>
  );

  const renderManagerStockSummary = (product) => {
    if (!isManager) {
      return <span>{product.totalStock ?? product.stock ?? 0}</span>;
    }

    if (product.hasVariations && Array.isArray(product.variations) && product.variations.length > 0) {
      const total = product.variations.reduce(
        (sum, variation) => sum + getBranchStockQuantity(product, variation._id),
        0
      );
      return (
        <div className="text-sm">
          <p className="font-semibold text-gray-900">{total}</p>
          <p className="text-xs text-gray-500">{product.variations.length} variation{product.variations.length === 1 ? "" : "s"}</p>
        </div>
      );
    }

    return <span className="font-medium text-gray-900">{getBranchStockQuantity(product)}</span>;
  };

  const selectedCategory = categories.find((category) => category._id === filterCategory);
  const availableSubCategories = selectedCategory?.subcategories || [];
  const destinationBranches = (branches || []).filter((branch) => branch._id !== staffBranch && branch.isActive !== false);
  const transferVariationOptions = selectedTransferProduct?.hasVariations && Array.isArray(selectedTransferProduct.variations)
    ? selectedTransferProduct.variations.map((variation) => ({
        value: variation._id,
        label: `${variation.name} - Available: ${getBranchStockQuantity(selectedTransferProduct, variation._id)}`,
      }))
    : [];
  const transferBranchOptions = destinationBranches.map((branch) => ({
    value: branch._id,
    label: branch.name,
  }));
  const transferAllBranchOptions = (branches || []).map((branch) => ({
    value: branch._id,
    label: branch.name,
  }));
  const transferStatusOptions = [
    { value: "", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
    { value: "cancelled", label: "Cancelled" },
  ];
  const transferRowsOptions = [
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
  ];
  const pendingTransfers = (stockTransfers || []).filter((transfer) => transfer.status === "pending");
  const incomingPendingTransfers = pendingTransfers.filter((transfer) => transfer.destinationBranchId === staffBranch);
  const outgoingPendingTransfers = pendingTransfers.filter((transfer) => transfer.sourceBranchId === staffBranch);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "" || product.categoryId === filterCategory;
    const matchesSubCategory = filterSubCategory === "" || product.subCategoryId === filterSubCategory;
    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  if (loading) return <Loader />;

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Products</h1>
        <div className="flex flex-wrap items-center gap-2">
          {canViewStockTransfers && (
            <button
              type="button"
              onClick={() => {
                setShowTransfers(true);
                dispatch(fetchStockTransfersRequest(transferFilters));
              }}
              className="rounded bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
            >
              {isAdmin ? `Stock Transfers (${pendingTransfers.length})` : `Transfers (${incomingPendingTransfers.length})`}
            </button>
          )}
          {canManageEcommerce && (
            <Link
              to="/createproduct"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add New Product
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <select
          value={filterCategory}
          onChange={(e) => {
            setFilterCategory(e.target.value);
            setFilterSubCategory("");
          }}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          value={filterSubCategory}
          onChange={(e) => setFilterSubCategory(e.target.value)}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          disabled={!filterCategory}
        >
          <option value="">{filterCategory ? "All Subcategories" : "Select Category First"}</option>
          {availableSubCategories.map((subCategory) => (
            <option key={subCategory._id} value={subCategory._id}>
              {subCategory.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subcategory</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {isManager ? "Branch Stock" : "Stock"}
              </th>
              {isAdmin && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sold Qty</th>
              )}
              {isAdmin && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uncompleted</th>
              )}
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              {(canManageEcommerce || isManager) && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={resolveImageUrl(product.images[0])}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-sm">{product.name}</td>
                <td className="px-4 py-3 text-sm">{getCategoryName(product.categoryId)}</td>
                <td className="px-4 py-3 text-sm">{getSubCategoryName(product.categoryId, product.subCategoryId)}</td>
                <td className="px-4 py-3 text-sm font-medium">₦{product.price?.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">
                  {isAdmin ? renderAdminStock(product) : renderManagerStockSummary(product)}
                </td>
                {isAdmin && (
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                    {Number(productSales?.[product._id]?.totalSoldQuantity || 0).toLocaleString()}
                  </td>
                )}
                {isAdmin && (
                  <td className="px-4 py-3 text-sm">
                    {(() => {
                      const demand = productDemand[product._id];
                      if (!demand) {
                        return (
                          <button
                            type="button"
                            disabled
                            className="inline-flex min-w-[74px] items-center justify-center rounded border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-400"
                          >
                            0
                          </button>
                        );
                      }

                      return (
                        <button
                          type="button"
                          onClick={() => openDemandReport(product)}
                          className="inline-flex min-w-[92px] items-center justify-center rounded border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100"
                        >
                          View ({demand.activeOrderCount})
                        </button>
                      );
                    })()}
                  </td>
                )}
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      product.isActive !== false
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.isActive !== false ? "Active" : "Inactive"}
                  </span>
                </td>
                {(canManageEcommerce || isManager) && (
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      {isManager && (
                        <>
                          <button
                            type="button"
                            onClick={() => openStockModal(product)}
                            className="rounded bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
                          >
                            Stock
                          </button>
                          <button
                            type="button"
                            onClick={() => openTransferModal(product)}
                            className="rounded bg-orange-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-orange-700"
                          >
                            Transfer
                          </button>
                        </>
                      )}
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={() => openBranchStockReport(product)}
                          className="rounded border border-indigo-200 bg-indigo-50 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100"
                        >
                          Stock
                        </button>
                      )}
                      {canManageEcommerce && (
                        <>
                          <Link
                            to={`/editproduct/${product._id}`}
                            className="rounded border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(product._id)}
                            className="rounded border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found
        </div>
      )}

      {isAdmin && selectedBranchStockProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b p-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Branch Stock</h2>
                <p className="text-sm text-gray-600">{selectedBranchStockProduct.name}</p>
                <p className="mt-1 text-xs text-gray-500">
                  Total quantity: {selectedBranchStockProduct.totalStock ?? selectedBranchStockProduct.stock ?? 0}
                </p>
              </div>
              <button
                type="button"
                onClick={closeBranchStockReport}
                className="rounded px-3 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            <div className="max-h-[70vh] overflow-auto p-4">
              {(selectedBranchStockProduct.branchStocks || []).length === 0 ? (
                <div className="rounded border border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-500">
                  No branch has entered stock for this product.
                </div>
              ) : (
                <table className="min-w-full border text-sm">
                  <thead className="sticky top-0 bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Branch</th>
                      <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Variation</th>
                      <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {(selectedBranchStockProduct.branchStocks || []).map((stock) => (
                      <tr key={`${stock.branchId}-${stock.variationId || "base"}`}>
                        <td className="px-3 py-2">{stock.branchName}</td>
                        <td className="px-3 py-2">{stock.variationName || "Default"}</td>
                        <td className="px-3 py-2 text-right font-semibold">{stock.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <div className="mt-4 flex flex-col gap-2 border-t pt-3 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
                <p>
                  Page {stockTransferPagination?.page || 1} of {stockTransferPagination?.totalPages || 1}
                  {" "}({stockTransferPagination?.total || 0} records)
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={!stockTransferPagination?.hasPrevPage || stockTransferLoading}
                    onClick={() => goToTransferPage((stockTransferPagination?.page || 1) - 1)}
                    className="rounded border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    disabled={!stockTransferPagination?.hasNextPage || stockTransferLoading}
                    onClick={() => goToTransferPage((stockTransferPagination?.page || 1) + 1)}
                    className="rounded border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isManager && selectedStockProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b p-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Edit Branch Stock</h2>
                <p className="text-sm text-gray-600">{selectedStockProduct.name}</p>
              </div>
              <button
                type="button"
                onClick={closeStockModal}
                className="rounded px-3 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleStockModalSubmit}>
              <div className="max-h-[65vh] overflow-auto p-4">
                {selectedStockProduct.hasVariations && Array.isArray(selectedStockProduct.variations) && selectedStockProduct.variations.length > 0 ? (
                  <div className="space-y-3">
                    {selectedStockProduct.variations.map((variation) => {
                      const inputKey = getStockInputKey(selectedStockProduct._id, variation._id);
                      return (
                        <div key={variation._id} className="grid gap-3 rounded border border-gray-200 p-3 sm:grid-cols-[1fr_140px] sm:items-center">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-900">{variation.name}</p>
                            {variation.sku && (
                              <p className="mt-1 text-xs text-gray-500">SKU: {variation.sku}</p>
                            )}
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium uppercase text-gray-500">
                              Quantity
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={stockModalValues[inputKey] ?? 0}
                              onChange={(event) => handleStockModalChange(selectedStockProduct._id, variation._id, event.target.value)}
                              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded border border-gray-200 p-4">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={stockModalValues[getStockInputKey(selectedStockProduct._id)] ?? 0}
                      onChange={(event) => handleStockModalChange(selectedStockProduct._id, "", event.target.value)}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 border-t bg-gray-50 p-4">
                <button
                  type="button"
                  onClick={closeStockModal}
                  className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Save Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isManager && selectedTransferProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl overflow-visible rounded-lg bg-white shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b p-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Transfer Stock</h2>
                <p className="text-sm text-gray-600">{selectedTransferProduct.name}</p>
                <p className="mt-1 text-xs text-gray-500">
                  Stock will be reserved from your branch until the destination secretary accepts or rejects it.
                </p>
              </div>
              <button
                type="button"
                onClick={closeTransferModal}
                className="rounded px-3 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleTransferSubmit} className="overflow-visible">
              <div className="space-y-4 overflow-visible p-4">
                {stockTransferError && (
                  <div className="rounded bg-red-100 p-3 text-sm text-red-700">{stockTransferError}</div>
                )}

                {selectedTransferProduct.hasVariations && Array.isArray(selectedTransferProduct.variations) && selectedTransferProduct.variations.length > 0 && (
                  <div className="relative overflow-visible">
                    <label className="mb-1 block text-sm font-medium text-gray-700">Variation</label>
                    <MobileTransferDropdown
                      value={transferForm.variationId}
                      options={transferVariationOptions}
                      placeholder="Select variation"
                      onChange={(variationId) => handleTransferFormChange("variationId", variationId)}
                      getLabel={(option) => option.label}
                    />
                    <select
                      value={transferForm.variationId}
                      onChange={(event) => handleTransferFormChange("variationId", event.target.value)}
                      className="hidden w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-100 md:block"
                    >
                      {transferVariationOptions.map((variation) => (
                        <option key={variation.value} value={variation.value}>
                          {variation.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="relative overflow-visible">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Destination Branch</label>
                  <MobileTransferDropdown
                    value={transferForm.destinationBranchId}
                    options={transferBranchOptions}
                    placeholder="Select destination branch"
                    onChange={(branchId) => handleTransferFormChange("destinationBranchId", branchId)}
                    getLabel={(option) => option.label}
                  />
                  <select
                    value={transferForm.destinationBranchId}
                    onChange={(event) => handleTransferFormChange("destinationBranchId", event.target.value)}
                    className="hidden w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-100 md:block"
                  >
                    <option value="">Select destination branch</option>
                    {transferBranchOptions.map((branch) => (
                      <option key={branch.value} value={branch.value}>
                        {branch.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={transferForm.quantity}
                    onChange={(event) => handleTransferFormChange("quantity", event.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-100"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Available in your branch: {getBranchStockQuantity(selectedTransferProduct, transferForm.variationId || "")}
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Note</label>
                  <textarea
                    value={transferForm.note}
                    onChange={(event) => handleTransferFormChange("note", event.target.value)}
                    rows="3"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-100"
                    placeholder="Optional note"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t bg-gray-50 p-4">
                <button
                  type="button"
                  onClick={closeTransferModal}
                  className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={stockTransferLoading}
                  className="rounded bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 disabled:opacity-60"
                >
                  {stockTransferLoading ? "Sending..." : "Send Transfer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {canViewStockTransfers && showTransfers && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b p-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">{isAdmin ? "Stock Transfer Report" : "Stock Transfers"}</h2>
                <p className="text-sm text-gray-600">
                  {isAdmin
                    ? `Pending on page: ${pendingTransfers.length} | Total records: ${stockTransferPagination?.total || 0}`
                    : `Incoming pending: ${incomingPendingTransfers.length} | Outgoing pending: ${outgoingPendingTransfers.length}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowTransfers(false)}
                className="rounded px-3 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            <div className="max-h-[72vh] overflow-auto p-4">
              <form onSubmit={applyTransferFilters} className="mb-4 grid gap-3 overflow-visible rounded border bg-gray-50 p-3 text-sm md:grid-cols-6">
                <div className="relative overflow-visible">
                  <label className="mb-1 block text-xs font-medium uppercase text-gray-500">Status</label>
                  <MobileTransferDropdown
                    value={transferFilters.status}
                    options={transferStatusOptions}
                    placeholder="All"
                    onChange={(value) => handleTransferFilterChange("status", value)}
                    getLabel={(option) => option.label}
                  />
                  <select
                    value={transferFilters.status}
                    onChange={(event) => handleTransferFilterChange("status", event.target.value)}
                    className="hidden w-full rounded border border-gray-300 px-2 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-100 md:block"
                  >
                    {transferStatusOptions.map((option) => (
                      <option key={option.value || "all"} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase text-gray-500">From Date</label>
                  <input
                    type="date"
                    value={transferFilters.dateFrom}
                    onChange={(event) => handleTransferFilterChange("dateFrom", event.target.value)}
                    className="w-full rounded border border-gray-300 px-2 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase text-gray-500">To Date</label>
                  <input
                    type="date"
                    value={transferFilters.dateTo}
                    onChange={(event) => handleTransferFilterChange("dateTo", event.target.value)}
                    className="w-full rounded border border-gray-300 px-2 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-100"
                  />
                </div>
                {isAdmin && (
                  <>
                    <div className="relative overflow-visible">
                      <label className="mb-1 block text-xs font-medium uppercase text-gray-500">Source</label>
                      <MobileTransferDropdown
                        value={transferFilters.sourceBranchId}
                        options={[{ value: "", label: "All branches" }, ...transferAllBranchOptions]}
                        placeholder="All branches"
                        onChange={(value) => handleTransferFilterChange("sourceBranchId", value)}
                        getLabel={(option) => option.label}
                      />
                      <select
                        value={transferFilters.sourceBranchId}
                        onChange={(event) => handleTransferFilterChange("sourceBranchId", event.target.value)}
                        className="hidden w-full rounded border border-gray-300 px-2 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-100 md:block"
                      >
                        <option value="">All branches</option>
                        {transferAllBranchOptions.map((branch) => (
                          <option key={branch.value} value={branch.value}>{branch.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="relative overflow-visible">
                      <label className="mb-1 block text-xs font-medium uppercase text-gray-500">Destination</label>
                      <MobileTransferDropdown
                        value={transferFilters.destinationBranchId}
                        options={[{ value: "", label: "All branches" }, ...transferAllBranchOptions]}
                        placeholder="All branches"
                        onChange={(value) => handleTransferFilterChange("destinationBranchId", value)}
                        getLabel={(option) => option.label}
                      />
                      <select
                        value={transferFilters.destinationBranchId}
                        onChange={(event) => handleTransferFilterChange("destinationBranchId", event.target.value)}
                        className="hidden w-full rounded border border-gray-300 px-2 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-100 md:block"
                      >
                        <option value="">All branches</option>
                        {transferAllBranchOptions.map((branch) => (
                          <option key={branch.value} value={branch.value}>{branch.label}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                <div className="relative overflow-visible">
                  <label className="mb-1 block text-xs font-medium uppercase text-gray-500">Rows</label>
                  <MobileTransferDropdown
                    value={String(transferFilters.limit || "25")}
                    options={transferRowsOptions}
                    placeholder="25"
                    onChange={(value) => handleTransferFilterChange("limit", value)}
                    getLabel={(option) => option.label}
                  />
                  <select
                    value={transferFilters.limit}
                    onChange={(event) => handleTransferFilterChange("limit", event.target.value)}
                    className="hidden w-full rounded border border-gray-300 px-2 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-100 md:block"
                  >
                    {transferRowsOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end gap-2 md:col-span-6">
                  <button
                    type="submit"
                    className="rounded bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    onClick={resetTransferFilters}
                    className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Reset
                  </button>
                </div>
              </form>

              {stockTransferLoading && (
                <div className="py-6 text-center text-sm text-gray-500">Loading transfers...</div>
              )}
              {stockTransferError && (
                <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">{stockTransferError}</div>
              )}
              {(stockTransfers || []).length === 0 ? (
                <div className="rounded border border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-500">
                  No stock transfers found.
                </div>
              ) : (
                <table className="min-w-full border text-sm">
                  <thead className="sticky top-0 bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Product</th>
                      <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">From</th>
                      <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">To</th>
                      <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">Qty</th>
                      <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                      <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Date</th>
                      <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Initiated By</th>
                      <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {(stockTransfers || []).map((transfer) => {
                      const isIncoming = transfer.destinationBranchId === staffBranch;
                      const isOutgoing = transfer.sourceBranchId === staffBranch;
                      return (
                        <tr key={transfer._id}>
                          <td className="px-3 py-2">
                            <p className="font-medium text-gray-900">{transfer.productName}</p>
                            {transfer.variationName && (
                              <p className="text-xs text-gray-500">{transfer.variationName}</p>
                            )}
                          </td>
                          <td className="px-3 py-2">{transfer.sourceBranchName}</td>
                          <td className="px-3 py-2">{transfer.destinationBranchName}</td>
                          <td className="px-3 py-2 text-right font-semibold">{transfer.quantity}</td>
                          <td className="px-3 py-2">
                            <span className={`rounded px-2 py-1 text-xs font-medium ${
                              transfer.status === "accepted"
                                ? "bg-green-100 text-green-700"
                                : transfer.status === "pending"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-gray-100 text-gray-700"
                            }`}>
                              {transfer.status}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-600">
                            {transfer.createdAt ? new Date(transfer.createdAt).toLocaleString() : "N/A"}
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-600">
                            <p>{transfer.initiatedByName || "N/A"}</p>
                            {transfer.acceptedByName && <p>Accepted: {transfer.acceptedByName}</p>}
                            {transfer.rejectedByName && <p>Rejected: {transfer.rejectedByName}</p>}
                            {transfer.cancelledByName && <p>Cancelled: {transfer.cancelledByName}</p>}
                          </td>
                          <td className="px-3 py-2">
                            {isAdmin && (
                              <span className="text-xs text-gray-500">View only</span>
                            )}
                            {isManager && transfer.status === "pending" && isIncoming && (
                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() => dispatch(acceptStockTransferRequest({ transferId: transfer._id }))}
                                  className="rounded bg-green-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-green-700"
                                >
                                  Accept
                                </button>
                                <button
                                  type="button"
                                  onClick={() => dispatch(rejectStockTransferRequest({ transferId: transfer._id }))}
                                  className="rounded bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                            {isManager && transfer.status === "pending" && isOutgoing && (
                              <button
                                type="button"
                                onClick={() => dispatch(cancelStockTransferRequest({ transferId: transfer._id }))}
                                className="rounded border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
                              >
                                Cancel
                              </button>
                            )}
                            {isManager && transfer.status !== "pending" && (
                              <span className="text-xs text-gray-500">No action</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      {isAdmin && selectedDemandProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b p-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Product Demand Report</h2>
                <p className="text-sm text-gray-600">{selectedDemandProduct.name}</p>
                <p className="mt-1 text-xs text-gray-500">
                  Orders counted here are not completed and not cancelled.
                </p>
              </div>
              <button
                type="button"
                onClick={closeDemandReport}
                className="rounded px-3 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            <div className="p-4">
              {productDemandLoading && (
                <div className="py-8 text-center text-gray-500">Loading demand report...</div>
              )}
              {productDemandError && (
                <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">{productDemandError}</div>
              )}
              {productDemandDetail && (
                <>
                  <div className="mb-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
                    <div className="rounded border bg-gray-50 p-3">
                      <p className="text-xs uppercase text-gray-500">Orders</p>
                      <p className="text-lg font-bold">{productDemandDetail.activeOrderCount}</p>
                    </div>
                    <div className="rounded border bg-gray-50 p-3">
                      <p className="text-xs uppercase text-gray-500">Customers</p>
                      <p className="text-lg font-bold">{productDemandDetail.activeCustomerCount}</p>
                    </div>
                    <div className="rounded border bg-gray-50 p-3">
                      <p className="text-xs uppercase text-gray-500">Total Quantity</p>
                      <p className="text-lg font-bold">{productDemandDetail.totalQuantity}</p>
                    </div>
                  </div>

                  <div className="max-h-[55vh] overflow-auto">
                    <table className="min-w-full border text-sm">
                      <thead className="sticky top-0 bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Customer</th>
                          <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Phone</th>
                          <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Order</th>
                          <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">SB Account</th>
                          <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Variation</th>
                          <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Qty</th>
                          <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Payment</th>
                          <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                          <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Remaining</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {productDemandDetail.entries?.length === 0 && (
                          <tr>
                            <td colSpan="9" className="px-3 py-6 text-center text-gray-500">
                              No uncompleted orders found for this product.
                            </td>
                          </tr>
                        )}
                        {productDemandDetail.entries?.map((entry) => (
                          <tr key={`${entry.orderId}-${entry.variationId || "default"}`}>
                            <td className="px-3 py-2">{entry.customerName}</td>
                            <td className="px-3 py-2">{entry.customerPhone || "N/A"}</td>
                            <td className="px-3 py-2">{entry.orderNumber}</td>
                            <td className="px-3 py-2">{entry.SBAccountNumber || "N/A"}</td>
                            <td className="px-3 py-2">
                              {entry.variationName || Object.entries(entry.selectedOptions || {}).map(([name, value]) => `${name}: ${value}`).join(", ") || "Default"}
                            </td>
                            <td className="px-3 py-2">{entry.quantity}</td>
                            <td className="px-3 py-2 capitalize">{entry.paymentStatus}</td>
                            <td className="px-3 py-2 capitalize">{entry.orderStatus}</td>
                            <td className="px-3 py-2">₦{Number(entry.remainingBalance || 0).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
