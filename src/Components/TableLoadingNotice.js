import React from "react";

const TableLoadingNotice = ({ message = "Loading data..." }) => {
  return <p className="mt-3 text-sm text-blue-600 dark:text-sky-400">{message}</p>;
};

export default TableLoadingNotice;
