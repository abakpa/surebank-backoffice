import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../redux/sagas/url";

const ProductReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const staffRole = localStorage.getItem("staffRole");
  const canManageEcommerce = ["Admin"].includes(staffRole);

  const fetchReviews = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${url}/api/product-reviews/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleToggleVisibility = async (review) => {
    if (!canManageEcommerce) return;
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${url}/api/product-reviews/admin/${review._id}/visibility`,
        { showOnEcommerce: !review.showOnEcommerce },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReviews((prev) =>
        prev.map((item) =>
          item._id === review._id ? response.data.review : item
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update review visibility");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Platform Reviews</h1>
        <p className="text-sm text-gray-500">
          Toggle customer experience reviews on when they should appear on the ecommerce storefront.
        </p>
      </div>

      {error && <div className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</div>}

      <div className="overflow-x-auto rounded border bg-white">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Order</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Rating</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Review</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
              {canManageEcommerce && (
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Action</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={canManageEcommerce ? "6" : "5"} className="px-4 py-8 text-center text-gray-500">Loading reviews...</td>
              </tr>
            ) : reviews.length === 0 ? (
              <tr>
                <td colSpan={canManageEcommerce ? "6" : "5"} className="px-4 py-8 text-center text-gray-500">No reviews yet</td>
              </tr>
            ) : (
              reviews.map((review) => (
                <tr key={review._id}>
                  <td className="px-4 py-3 text-sm">{review.customerName || "Customer"}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{review.orderNumber || "N/A"}</td>
                  <td className="px-4 py-3 text-sm text-orange-500">
                    {"★".repeat(Number(review.rating || 0))}
                    <span className="text-gray-300">{"★".repeat(5 - Number(review.rating || 0))}</span>
                  </td>
                  <td className="max-w-md px-4 py-3 text-sm text-gray-700">{review.review}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-1 text-xs ${
                        review.showOnEcommerce
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {review.showOnEcommerce ? "Showing" : "Hidden"}
                    </span>
                  </td>
                  {canManageEcommerce && (
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleToggleVisibility(review)}
                        className={`rounded px-3 py-2 text-sm text-white ${
                          review.showOnEcommerce
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {review.showOnEcommerce ? "Hide" : "Show"}
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductReviews;
