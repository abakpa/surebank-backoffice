import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createCategoryRequest, updateCategoryRequest, fetchCategoryByIdRequest, clearCategoryState } from "../redux/slices/productCategorySlice";
import { url } from "../redux/sagas/url";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { loading, error, category } = useSelector((state) => state.productCategories);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchCategoryByIdRequest({ categoryId: id }));
    }
    return () => {
      dispatch(clearCategoryState());
    };
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (isEditMode && category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
      });
      if (category.image) {
        setExistingImage(category.image);
      }
    }
  }, [isEditMode, category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    if (image) {
      data.append("image", image);
    }

    if (isEditMode) {
      dispatch(updateCategoryRequest({ categoryId: id, formData: data, navigate }));
    } else {
      dispatch(createCategoryRequest({ formData: data, navigate }));
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-xl mx-auto mt-12 mb-6">
      <h2 className="text-xl font-bold mb-4">{isEditMode ? "Edit Category" : "Create New Category"}</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Name *
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
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Image
          </label>
          {existingImage && !imagePreview && (
            <div className="mb-2">
              <p className="text-sm text-gray-500 mb-1">Current Image:</p>
              <img
                src={`${url}${existingImage}`}
                alt="Current"
                className="w-24 h-24 object-cover rounded border"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          {imagePreview && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">New Image:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded"
              />
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
              {isEditMode ? "Update Category" : "Create Category"}
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate("/categories")}
            className="px-6 py-3 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
