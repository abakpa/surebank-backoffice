import React from "react";

const DashboardDateRangeFields = ({ rangeKey, dateRanges, setDateRanges }) => {
  const range = dateRanges[rangeKey] || { startDate: "", endDate: "" };
  const formatDisplayDate = (value, fallback) => {
    if (!value) return fallback;

    const [year, month, day] = value.split("-");
    if (!year || !month || !day) return fallback;

    return `${day}/${month}/${year}`;
  };

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
      <label className="dashboard-date-field">
        <span className="dashboard-date-icon" aria-hidden="true">
          <i className="fas fa-calendar-alt"></i>
        </span>
        <span className="dashboard-date-label">
          {formatDisplayDate(range.startDate, "Start")}
        </span>
        <input
          type="date"
          className="dashboard-date-input"
          value={range.startDate}
          onChange={(e) => updateField("startDate", e.target.value)}
          aria-label="Start date"
        />
      </label>
      <label className="dashboard-date-field">
        <span className="dashboard-date-icon" aria-hidden="true">
          <i className="fas fa-calendar-alt"></i>
        </span>
        <span className="dashboard-date-label">
          {formatDisplayDate(range.endDate, "End")}
        </span>
        <input
          type="date"
          className="dashboard-date-input"
          value={range.endDate}
          onChange={(e) => updateField("endDate", e.target.value)}
          aria-label="End date"
        />
      </label>
    </>
  );
};

export default DashboardDateRangeFields;
