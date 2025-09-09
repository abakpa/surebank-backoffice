const Tablebody = ({ 
  customers = [], 
  branches = [], 
  onDeleteClick, // callback to open delete modal with id
  loading 
}) => {
  const role = localStorage.getItem("staffRole");
  const isManagerOrAgent = role === "Manager" || role === "Agent";
  const isRep = role === "Agent";

  return (
    <tbody className="text-sm">
      {Array.isArray(customers) && customers.length > 0 ? (
        customers.map((customer, index) => (
          <tr
            key={index}
            className="text-center hover:bg-gray-100 cursor-pointer"
          >
            {!isRep && (
              <td className="border border-gray-300 p-2">
                {customer.createdBy.firstName} {customer.createdBy.lastName}
              </td>
            )}
            {!isManagerOrAgent && (
              <td className="border border-gray-300 p-2">
                {customer.createdBy.branchId?.name}
              </td>
            )}
            <td className="border border-gray-300 p-2">{customer.reason}</td>
            <td className="border border-gray-300 p-2">
              {customer.amount?.toLocaleString("en-US")}
            </td>

            {/* Delete button column */}
            <td className="border border-gray-300 p-2">
              <button
                onClick={() => onDeleteClick(customer._id)}
                disabled={loading}
                className={`px-3 py-1 rounded text-white text-xs font-medium 
                  ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={
              2 + // reason + amount (always visible)
              (isRep ? 0 : 1) + // createdBy.name
              (isManagerOrAgent ? 0 : 1) + // branchId.name
              1 // delete button column
            }
            className="text-center p-4"
          >
            No customers found.
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default Tablebody;
