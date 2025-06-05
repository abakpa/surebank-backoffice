import { useNavigate } from "react-router-dom";

const Tablebody = ({ customers = [], branches = [] }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("staffRole");

  const handleRowClick = (customerId) => {
    navigate(`/customeraccountdashboard/${customerId}`);
  };

  const hideSensitiveInfo = role === "Manager" || role === "Agent";

  const filteredCustomers = customers.filter((customer) => {
    const narration = customer.narration?.toLowerCase();
    return narration !== "interest" && narration !== "interest charge";
  });
  

  return (
    <tbody className="text-sm">
      {Array.isArray(filteredCustomers) && filteredCustomers.length > 0 ? (
        filteredCustomers.map((customer, index) => (
          <tr
            key={index}
            className="text-center hover:bg-gray-100 cursor-pointer"
            onClick={() => handleRowClick(customer.customerId._id)}
          >
            <td className="border border-gray-300 p-2">
              {customer.customerId.firstName} {customer.customerId.lastName}
            </td>

            {!hideSensitiveInfo && (
              <td className="border border-gray-300 p-2">
                {customer.branchId.name}
              </td>
            )}

            <td className="border border-gray-300 p-2">
              {customer.narration}
            </td>
            <td className="border border-gray-300 p-2">
              {customer.amount}
            </td>
            <td className="border border-gray-300 p-2">
              {customer.date}
            </td>

            {!hideSensitiveInfo && (
              <td className="border border-gray-300 p-2">
                {customer.createdBy.firstName} {customer.createdBy.lastName}
              </td>
            )}
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={hideSensitiveInfo ? "4" : "6"}
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
