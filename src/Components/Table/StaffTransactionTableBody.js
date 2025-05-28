import { useNavigate } from "react-router-dom";

const Tablebody = ({ customers = [], branches = [] }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("staffRole");

  const handleRowClick = (customerId) => {
    navigate(`/customeraccountdashboard/${customerId}`);
  };

  return (
    <tbody className="text-sm">
      {Array.isArray(customers) && customers.length > 0 ? (
        customers.map((customer, index) => {
          const hideSensitiveInfo = role === "Manager" || "Agent";
          return (
            <tr
              key={index}
              className="text-center hover:bg-gray-100 cursor-pointer"
              onClick={() => handleRowClick(customer.customerId._id)}
            >
              <td className="border border-gray-300 p-2">{customer.customerId.name}</td>
              {!hideSensitiveInfo && (
                <td className="border border-gray-300 p-2">{customer.branchId.name}</td>
              )}
              <td className="border border-gray-300 p-2">{customer.narration}</td>
              <td className="border border-gray-300 p-2">{customer.amount}</td>
              <td className="border border-gray-300 p-2">{customer.date}</td>
              {!hideSensitiveInfo && (
                <td className="border border-gray-300 p-2">{customer.createdBy.name}</td>
              )}
            </tr>
          );
        })
      ) : (
        <tr>
          <td 
            colSpan={role === customers[0]?.customerId?.role ? "4" : "6"} 
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