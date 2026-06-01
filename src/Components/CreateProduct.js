import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createProductRequest, updateProductRequest, fetchProductByIdRequest, clearProductState } from "../redux/slices/productSlice";
import { fetchCategoriesRequest } from "../redux/slices/productCategorySlice";
import { resolveImageUrl } from "../utils/image";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { loading, error, product } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.productCategories);
  const staffRole = localStorage.getItem("staffRole");
  const canManageEcommerce = ["Admin", "ProductManager", "Product Manager", "SubAdmin"].includes(staffRole);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    subCategoryId: "",
    costPrice: "",
    price: "",
    stock: "",
    sku: "",
    hasVariations: false,
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
  const [variationOptions, setVariationOptions] = useState([]);
  const [variations, setVariations] = useState([]);

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
      subCategoryId: product.subCategoryId || "",
      costPrice: product.costPrice ?? "",
      price: product.price ?? "",
      stock: product.stock ?? "",
      sku: product.sku || "",
      hasVariations: product.hasVariations === true,
      allowInstallment: product.allowInstallment !== false,
      minInstallmentAmount: product.minInstallmentAmount ?? "",
      isActive: product.isActive !== false,
    });
    setExistingImages(Array.isArray(product.images) ? product.images : []);
    setVariationOptions(
      Array.isArray(product.variationOptions)
        ? product.variationOptions.map((option) => ({
          name: option.name || "",
          valueText: Array.isArray(option.values) ? option.values.join(", ") : "",
        }))
        : []
    );
    setVariations(
      Array.isArray(product.variations)
        ? product.variations.map((variation) => ({
          id: variation._id,
          name: variation.name || "",
          optionValues: variation.optionValues || {},
          costPrice: variation.costPrice ?? "",
          price: variation.price ?? "",
          stock: variation.stock ?? "",
          sku: variation.sku || "",
          image: variation.image || "",
          imageFile: null,
          imagePreview: "",
          isActive: variation.isActive !== false,
        }))
        : []
    );
  }, [id, isEditMode, product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "categoryId" ? { subCategoryId: "" } : {}),
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const handleAddVariationOption = () => {
    setVariationOptions((prev) => [...prev, { name: "", valueText: "" }]);
  };

  const handleVariationOptionChange = (index, field, value) => {
    setVariationOptions((prev) =>
      prev.map((option, optionIndex) =>
        optionIndex === index ? { ...option, [field]: value } : option
      )
    );
  };

  const handleRemoveVariationOption = (index) => {
    setVariationOptions((prev) => prev.filter((_, optionIndex) => optionIndex !== index));
  };

  const handleAddVariation = () => {
    const optionValues = variationOptions.reduce((values, option) => {
      if (option.name.trim()) {
        values[option.name.trim()] = "";
      }
      return values;
    }, {});

    setVariations((prev) => [
      ...prev,
      {
        name: "",
        optionValues,
        costPrice: "",
        price: "",
        stock: "",
        sku: "",
        image: "",
        imageFile: null,
        imagePreview: "",
        isActive: true,
      },
    ]);
  };

  const handleVariationChange = (index, field, value) => {
    setVariations((prev) =>
      prev.map((variation, variationIndex) =>
        variationIndex === index ? { ...variation, [field]: value } : variation
      )
    );
  };

  const handleVariationImageChange = (index, file) => {
    setVariations((prev) =>
      prev.map((variation, variationIndex) =>
        variationIndex === index
          ? {
            ...variation,
            imageFile: file || null,
            imagePreview: file ? URL.createObjectURL(file) : "",
          }
          : variation
      )
    );
  };

  const handleVariationOptionValueChange = (variationIndex, optionName, value) => {
    setVariations((prev) =>
      prev.map((variation, index) =>
        index === variationIndex
          ? {
            ...variation,
            optionValues: {
              ...variation.optionValues,
              [optionName]: value,
            },
          }
          : variation
      )
    );
  };

  const handleRemoveVariation = (index) => {
    setVariations((prev) => prev.filter((_, variationIndex) => variationIndex !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canManageEcommerce) return;
    const normalizedVariationOptions = variationOptions.map((option) => ({
      name: option.name.trim(),
      values: option.valueText.split(",").map((value) => value.trim()).filter(Boolean),
    }));
    const variationOptionNames = normalizedVariationOptions.map((option) => option.name).filter(Boolean);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("categoryId", formData.categoryId);
    data.append("subCategoryId", formData.subCategoryId || "");
    data.append("costPrice", formData.costPrice || 0);
    data.append("price", formData.price);
    data.append("profit", calculatedProfit);
    data.append("stock", formData.stock);
    if (formData.sku) data.append("sku", formData.sku);
    data.append("hasVariations", formData.hasVariations);
    data.append(
      "variationOptions",
      JSON.stringify(normalizedVariationOptions)
    );
    data.append(
      "variations",
      JSON.stringify(
        variations.map((variation) => {
          const optionValues = variationOptionNames.reduce((values, optionName) => {
            values[optionName] = variation.optionValues?.[optionName] || "";
            return values;
          }, {});

          return {
            name: variation.name.trim() || Object.values(optionValues).filter(Boolean).join(" / "),
            optionValues,
            costPrice: variation.costPrice || 0,
            price: variation.price || 0,
            stock: variation.stock || 0,
            sku: variation.sku,
            image: variation.image,
            isActive: variation.isActive,
          };
        })
      )
    );
    variations.forEach((variation, index) => {
      if (variation.imageFile) {
        data.append(`variationImage_${index}`, variation.imageFile);
      }
    });
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

  const selectedCategory = categories.find((category) => category._id === formData.categoryId);
  const subcategories = Array.isArray(selectedCategory?.subcategories) ? selectedCategory.subcategories : [];

  if (!canManageEcommerce) {
    return (
      <div className="p-6 bg-white rounded shadow-md max-w-2xl mx-auto mt-12">
        <h2 className="text-xl font-bold mb-2">View Only</h2>
        <p className="text-gray-600">Only admin and product manager can create or edit ecommerce products.</p>
      </div>
    );
  }

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

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subcategory {subcategories.length > 0 ? "*" : "(Optional)"}
          </label>
          <select
            name="subCategoryId"
            value={formData.subCategoryId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            disabled={!formData.categoryId}
            required={subcategories.length > 0}
          >
            <option value="">
              {formData.categoryId ? "Select a subcategory" : "Select a category first"}
            </option>
            {subcategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </option>
            ))}
          </select>
          {formData.categoryId && subcategories.length === 0 && (
            <p className="mt-1 text-xs text-amber-600">
              This category has no subcategories yet. Add them in category management first.
            </p>
          )}
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
              required={!formData.hasVariations}
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
              required={!formData.hasVariations}
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
              required={!formData.hasVariations}
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

        <div className="mb-4 rounded border border-gray-200 p-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="hasVariations"
              checked={formData.hasVariations}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium text-gray-700">
              This product has variations
            </span>
          </label>
        </div>

        {formData.hasVariations && (
          <div className="mb-4 rounded border border-gray-200 p-4">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div>
                <p className="text-sm font-semibold text-gray-800">Variation Options</p>
                <p className="text-xs text-gray-500">Examples: Color with Red, Blue or Size with Small, Medium.</p>
              </div>
              <button
                type="button"
                onClick={handleAddVariationOption}
                className="px-3 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Add Option
              </button>
            </div>

            {variationOptions.map((option, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-3 mb-3">
                <input
                  type="text"
                  value={option.name}
                  onChange={(event) => handleVariationOptionChange(index, "name", event.target.value)}
                  placeholder="Option name"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required={formData.hasVariations}
                />
                <input
                  type="text"
                  value={option.valueText}
                  onChange={(event) => handleVariationOptionChange(index, "valueText", event.target.value)}
                  placeholder="Values separated by commas"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required={formData.hasVariations}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveVariationOption(index)}
                  className="px-3 py-2 border rounded text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="flex items-center justify-between gap-4 mt-5 mb-3">
              <div>
                <p className="text-sm font-semibold text-gray-800">Variation Rows</p>
                <p className="text-xs text-gray-500">Add the sellable versions customers will choose from.</p>
              </div>
              <button
                type="button"
                onClick={handleAddVariation}
                className="px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add Variation
              </button>
            </div>

            {variations.map((variation, variationIndex) => (
              <div key={variation.id || variationIndex} className="mb-4 rounded border border-gray-100 bg-gray-50 p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={variation.name}
                    onChange={(event) => handleVariationChange(variationIndex, "name", event.target.value)}
                    placeholder="Variation name"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  <input
                    type="text"
                    value={variation.sku}
                    onChange={(event) => handleVariationChange(variationIndex, "sku", event.target.value)}
                    placeholder="Variation SKU"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  {variationOptions.map((option) => {
                    const optionName = option.name.trim();
                    if (!optionName) return null;

                    const values = option.valueText.split(",").map((value) => value.trim()).filter(Boolean);
                    return (
                      <select
                        key={optionName}
                        value={variation.optionValues?.[optionName] || ""}
                        onChange={(event) => handleVariationOptionValueChange(variationIndex, optionName, event.target.value)}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        required={formData.hasVariations}
                      >
                        <option value="">Select {optionName}</option>
                        {values.map((value) => (
                          <option key={value} value={value}>{value}</option>
                        ))}
                      </select>
                    );
                  })}
                  <input
                    type="number"
                    value={variation.costPrice}
                    onChange={(event) => handleVariationChange(variationIndex, "costPrice", event.target.value)}
                    placeholder="Cost price"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    min="0"
                  />
                  <input
                    type="number"
                    value={variation.price}
                    onChange={(event) => handleVariationChange(variationIndex, "price", event.target.value)}
                    placeholder="Selling price"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    min="0"
                    required={formData.hasVariations}
                  />
                  <input
                    type="number"
                    value={variation.stock}
                    onChange={(event) => handleVariationChange(variationIndex, "stock", event.target.value)}
                    placeholder="Stock"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    min="0"
                    required={formData.hasVariations}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Variation Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleVariationImageChange(variationIndex, event.target.files?.[0])}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
                    />
                    {(variation.imagePreview || variation.image) && (
                      <img
                        src={variation.imagePreview || resolveImageUrl(variation.image)}
                        alt={`${variation.name || "Variation"} preview`}
                        className="mt-2 w-20 h-20 object-cover rounded border"
                      />
                    )}
                  </div>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={variation.isActive}
                      onChange={(event) => handleVariationChange(variationIndex, "isActive", event.target.checked)}
                      className="w-4 h-4"
                    />
                    Active
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveVariation(variationIndex)}
                  className="mt-3 px-3 py-2 border rounded text-red-600 hover:bg-red-50"
                >
                  Remove Variation
                </button>
              </div>
            ))}
          </div>
        )}

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
                    src={resolveImageUrl(image)}
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
