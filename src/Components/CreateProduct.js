import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createProductRequest, updateProductRequest, fetchProductByIdRequest, clearProductState } from "../redux/slices/productSlice";
import { fetchCategoriesRequest } from "../redux/slices/productCategorySlice";
import { url } from "../redux/sagas/url";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { loading, error, product } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.productCategories);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    costPrice: "",
    price: "",
    stock: "",
    sku: "",
    allowInstallment: true,
    minInstallmentAmount: "",
    isActive: true,
  });

  // Calculate profit
  const calculatedProfit = formData.price && formData.costPrice
    ? parseFloat(formData.price) - parseFloat(formData.costPrice)
    : 0;
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
    if (isEditMode) {
      dispatch(fetchProductByIdRequest({ productId: id }));
    }

    return () => {
      dispatch(clearProductState());
    };
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (!isEditMode || !product || product._id !== id) return;

    setFormData({
      name: product.name || "",
      description: product.description || "",
      categoryId: product.categoryId || "",
      costPrice: product.costPrice ?? "",
      price: product.price ?? "",
      stock: product.stock ?? "",
      sku: product.sku || "",
      allowInstallment: product.allowInstallment !== false,
      minInstallmentAmount: product.minInstallmentAmount ?? "",
      isActive: product.isActive !== false,
    });
    setExistingImages(Array.isArray(product.images) ? product.images : []);
  }, [id, isEditMode, product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("categoryId", formData.categoryId);
    data.append("costPrice", formData.costPrice || 0);
    data.append("price", formData.price);
    data.append("profit", calculatedProfit);
    data.append("stock", formData.stock);
    if (formData.sku) data.append("sku", formData.sku);
    data.append("allowInstallment", formData.allowInstallment);
    data.append("isActive", formData.isActive);
    data.append("minInstallmentAmount", formData.allowInstallment ? formData.minInstallmentAmount || 0 : 0);

    images.forEach((image) => {
      data.append("images", image);
    });

    if (isEditMode) {
      dispatch(updateProductRequest({ productId: id, formData: data, navigate }));
    } else {
      dispatch(createProductRequest({ formData: data, navigate }));
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-2xl mx-auto mt-12 mb-6">
      <h2 className="text-xl font-bold mb-4">{isEditMode ? "Edit Product" : "Create New Product"}</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cost Price (₦) *
            </label>
            <input
              type="number"
              name="costPrice"
              value={formData.costPrice}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Selling Price (₦) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock *
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profit per Unit (₦)
            </label>
            <div className={`w-full px-4 py-2 border rounded bg-gray-100 font-bold ${calculatedProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₦{calculatedProfit.toLocaleString('en-US')}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SKU (Optional)
          </label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="allowInstallment"
              checked={formData.allowInstallment}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium text-gray-700">
              Allow Installment Payment
            </span>
          </label>
        </div>

        {formData.allowInstallment && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Installment Amount (₦)
            </label>
            <input
              type="number"
              name="minInstallmentAmount"
              value={formData.minInstallmentAmount}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              min="0"
            />
          </div>
        )}

        {isEditMode && (
          <div className="mb-4 rounded border border-gray-200 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Product Status</p>
                <p className="text-xs text-gray-500">
                  Inactive products will not show on the ecommerce storefront.
                </p>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <span className={`text-sm font-semibold ${formData.isActive ? "text-green-600" : "text-gray-500"}`}>
                  {formData.isActive ? "Active" : "Inactive"}
                </span>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${
                    formData.isActive ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow transition ${
                      formData.isActive ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </span>
              </label>
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Images (Max 5)
          </label>
          {isEditMode && existingImages.length > 0 && imagePreview.length === 0 && (
            <div className="mb-3">
              <p className="text-sm text-gray-500 mb-2">Current Images:</p>
              <div className="flex gap-2 flex-wrap">
                {existingImages.map((image, index) => (
                  <img
                    key={`${image}-${index}`}
                    src={`${url}${image}`}
                    alt={`Current product ${index + 1}`}
                    className="w-20 h-20 object-cover rounded border"
                  />
                ))}
              </div>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          {imagePreview.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {imagePreview.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          {loading ? (
            <button
              type="button"
              className="flex-1 p-3 bg-blue-500 text-white rounded flex items-center justify-center"
              disabled
            >
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="opacity-25"
                />
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  className="opacity-75"
                />
              </svg>
              {isEditMode ? "Updating..." : "Creating..."}
            </button>
          ) : (
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              {isEditMode ? "Update Product" : "Create Product"}
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="px-6 py-3 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
