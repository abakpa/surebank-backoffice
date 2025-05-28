const Tablebody = ({ customers = [], branches = [] }) => {
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
              <td className="border border-gray-300 p-2">{customer.createdBy.firstName} {customer.createdBy.lastName}</td>
            )}
            {!isManagerOrAgent && (
              <td className="border border-gray-300 p-2">{customer.createdBy.branchId?.name}</td>
            )}
            <td className="border border-gray-300 p-2">{customer.reason}</td>
            <td className="border border-gray-300 p-2">{customer.amount}</td>
          </tr>
        )) 
      ) : (
        <tr>
          <td 
            colSpan={
              2 + // reason + amount (always visible)
              (isRep ? 0 : 1) + // createdBy.name
              (isManagerOrAgent ? 0 : 1) // branchId.name
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