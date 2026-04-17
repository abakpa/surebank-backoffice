import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEcommerceIncomeReportRequest } from "../redux/slices/ecommerceIncomeReportSlice";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import Select2 from "./Select2";

const EcommerceIncomeReport = () => {
  const dispatch = useDispatch();
  const { loading, ecommerceIncomeReport, error } = useSelector(
    (state) => state.ecommerceIncomeReport
  );
  const { branches } = useSelector((state) => state.branch);

  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState("");
  const [branchId, setBranchId] = useState("");

  // Exclude "Head office"
  const branchOptions = branches
    .filter((branch) => branch.name !== "Head office")
    .map((branch) => ({ label: branch.name, value: branch._id }));

  useEffect(() => {
    dispatch(fetchBranchRequest());
    dispatch(fetchEcommerceIncomeReportRequest({ date, branchId }));
  }, [dispatch, date, branchId]);

  // Ensure report is always an array
  const reportList = Array.isArray(ecommerceIncomeReport) ? ecommerceIncomeReport : [];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredReportList = reportList.filter(
    (item) =>
      (item?.customerName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (item?.orderNumber?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (item?.productNames?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  // Calculate total profit
  const totalProfit = filteredReportList.reduce((sum, item) => sum + (item.profit || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <svg
          className="animate-spin h-10 w-10 text-blue-500"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Loading"
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
        <p className="text-blue-500 ml-4">Loading Ecommerce Income Report...</p>
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="flex flex-col p-4 bg-gray-100 min-h-screen w-full mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Ecommerce Income Report</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by customer, order ID, or product..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md"
        />
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full md:w-48">
            <Select2
              label="Branch"
              options={branchOptions}
              value={branchId}
              onChange={(selectedId) => setBranchId(selectedId)}
            />
          </div>
          <input
            type="date"
            className="p-2 border border-gray-300 rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      {/* Summary Card */}
      <div className="mb-4 p-4 bg-sky-100 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <span className="text-sky-800 font-semibold">Total Ecommerce Profit:</span>
          <span className="text-sky-800 font-bold text-lg">
            ₦{totalProfit.toLocaleString("en-US")}
          </span>
        </div>
        <div className="text-sky-600 text-sm mt-1">
          {filteredReportList.length} order(s) found
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border border-gray-300 p-2 text-left">S/N</th>
              <th className="border border-gray-300 p-2 text-left">Customer Name</th>
              <th className="border border-gray-300 p-2 text-left">Order ID</th>
              <th className="border border-gray-300 p-2 text-left">Product(s)</th>
              <th className="border border-gray-300 p-2 text-left">Profit (₦)</th>
              <th className="border border-gray-300 p-2 text-left">Date Sold</th>
            </tr>
          </thead>
          <tbody>
            {filteredReportList.length > 0 ? (
              filteredReportList.map((item, index) => (
                <tr
                  key={item._id || index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{item.customerName || "N/A"}</td>
                  <td className="border border-gray-300 p-2">{item.orderNumber || "N/A"}</td>
                  <td className="border border-gray-300 p-2">{item.productNames || "N/A"}</td>
                  <td className="border border-gray-300 p-2 text-green-600 font-semibold">
                    ₦{(item.profit || 0).toLocaleString("en-US")}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.soldDate
                      ? new Date(item.soldDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No ecommerce income records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EcommerceIncomeReport;
