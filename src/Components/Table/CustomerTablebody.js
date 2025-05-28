import { useNavigate } from "react-router-dom";

const Tablebody = ({ customers = [], branches = [] }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("staffRole");
  const isManagerOrAgent = role === "Manager" || role === "Agent";

  const handleRowClick = (customerId) => {
    navigate(`/customeraccountdashboard/${customerId}`);
  };

  return (
    <tbody className="text-sm">
      {Array.isArray(customers) && customers.length > 0 ? (
        customers.map((customer, index) => (
          <tr
            key={index}
            className="text-center hover:bg-gray-100 cursor-pointer"
            onClick={() => handleRowClick(customer._id)}
          >
            <td className="border border-gray-300 p-2">{customer.name}</td>
            <td className="border border-gray-300 p-2">{customer.address}</td>
            <td className="border border-gray-300 p-2">{customer.phone}</td>
            {!isManagerOrAgent && (
              <td className="border border-gray-300 p-2">
                {branches.find(b => b._id === customer.branchId)?.name || "Unknown Branch"}
              </td>
            )}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={isManagerOrAgent ? "3" : "4"} className="text-center p-4">
            No customers found.
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default Tablebody;