import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFDRequest } from "../redux/slices/fdSlice";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import Tablehead from "./Table/FDTableHead";
import Tablebody from "./Table/FDTableBody";
import TableLoadingNotice from "./TableLoadingNotice";

const FDTransaction = () => {
  const dispatch = useDispatch();
  const { loading, fdreport, error } = useSelector((state) => state.fd);
  const { branches } = useSelector((state) => state.branch);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    dispatch(fetchBranchRequest());
    dispatch(fetchFDRequest());
  }, [dispatch]);


  // Ensure customers is always an array
  const fdList = useMemo(() => (Array.isArray(fdreport) ? fdreport : []), [fdreport]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredfdList = useMemo(() => fdList.filter((fdItem) =>
    (fdItem?.createdBy?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (fdItem?.createdBy?.branchId?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  ), [fdList, searchTerm]);

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="flex flex-col p-4 bg-gray-100 min-h-screen w-full mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">FD Statement</h2>
      
      {/* Search and Create Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by branch or name..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md"
        />
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse border border-gray-300">
          <Tablehead />
          <Tablebody customers={filteredfdList} branches={branches} />
        </table>
      </div>
      {loading && <TableLoadingNotice message="Loading FD statement..." />}
    </div>
  );
};

export default FDTransaction;
