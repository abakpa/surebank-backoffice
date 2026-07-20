import React from "react";

const DashboardDateRangeFields = ({ rangeKey, dateRanges, setDateRanges }) => {
  const range = dateRanges[rangeKey] || { startDate: "", endDate: "" };

  const updateField = (field, value) => {
    setDateRanges((prev) => ({
      ...prev,
      [rangeKey]: {
        ...(prev[rangeKey] || { startDate: "", endDate: "" }),
        [field]: value,
      },
    }));
  };

  return (
    <>
      <input
        type="date"
        className="w-full rounded-md border p-1 text-[10px] sm:p-2 sm:text-sm"
        value={range.startDate}
        onChange={(e) => updateField("startDate", e.target.value)}
      />
      <input
        type="date"
        className="w-full rounded-md border p-1 text-[10px] sm:p-2 sm:text-sm"
        value={range.endDate}
        onChange={(e) => updateField("endDate", e.target.value)}
      />
    </>
  );
};

export default DashboardDateRangeFields;
