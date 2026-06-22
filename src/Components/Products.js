import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchProductsRequest,
  deleteProductRequest,
  fetchProductDemandRequest,
  fetchProductDemandDetailRequest,
  updateProductStockRequest,
  clearProductDemandDetail,
} from "../redux/slices/productSlice";
import { fetchCategoriesRequest } from "../redux/slices/productCategorySlice";
import Loader from "./Loader";
import { resolveImageUrl } from "../utils/image";

const Products = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading,
    productDemand,
    productDemandDetail,
    productDemandLoading,
    productDemandError,
  } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.productCategories);
  const staffRole = localStorage.getItem("staffRole");
  const staffBranch = localStorage.getItem("staffBranch");
  const isAdmin = staffRole === "Admin";
  const isManager = staffRole === "Manager";
  const canManageEcommerce = ["Admin", "ProductManager", "Product Manager", "SubAdmin"].includes(staffRole);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubCategory, setFilterSubCategory] = useState("");
  const [selectedDemandProduct, setSelectedDemandProduct] = useState(null);
  const [selectedStockProduct, setSelectedStockProduct] = useState(null);
  const [selectedBranchStockProduct, setSelectedBranchStockProduct] = useState(null);
  const [stockModalValues, setStockModalValues] = useState({});

  useEffect(() => {
    dispatch(fetchProductsRequest());
    dispatch(fetchCategoriesRequest());
    if (isAdmin) {
      dispatch(fetchProductDemandRequest());
    }
  }, [dispatch, isAdmin]);

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
        {canManageEcommerce && (
          <Link
            to="/createproduct"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add New Product
          </Link>
        )}
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
                        <button
                          type="button"
                          onClick={() => openStockModal(product)}
                          className="rounded bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
                        >
                          Stock
                        </button>
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
