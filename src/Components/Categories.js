import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategoriesRequest, deleteCategoryRequest, toggleCategoryStatusRequest } from "../redux/slices/productCategorySlice";
import Loader from "./Loader";
import { url } from "../redux/sagas/url";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.productCategories);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  const handleDelete = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoryRequest({ categoryId }));
    }
  };

  const handleToggleStatus = (categoryId, currentStatus) => {
    const action = currentStatus ? "deactivate" : "activate";
    if (window.confirm(`Are you sure you want to ${action} this category?`)) {
      dispatch(toggleCategoryStatusRequest({ categoryId }));
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Product Categories</h1>
        <Link
          to="/createcategory"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add New Category
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category) => (
          <div
            key={category._id}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              {category.image ? (
                <img
                  src={`${url}${category.image}`}
                  alt={category.name}
                  className="w-16 h-16 object-cover rounded"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                  No Image
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {category.description || "No description"}
                </p>
                {/* Toggle Switch */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleToggleStatus(category._id, category.isActive)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      category.isActive ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        category.isActive ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span
                    className={`text-xs font-medium ${
                      category.isActive ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {category.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t">
              <Link
                to={`/editcategory/${category._id}`}
                className="flex-1 text-center text-blue-600 hover:text-blue-800 text-sm py-2 border rounded hover:bg-blue-50"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(category._id)}
                className="flex-1 text-center text-red-600 hover:text-red-800 text-sm py-2 border rounded hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-8 text-gray-500">No categories found</div>
      )}
    </div>
  );
};

export default Categories;
