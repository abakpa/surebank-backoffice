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
        customers.map((customer, index) => (
          <tr
            key={index}
            className="text-center hover:bg-gray-100 cursor-pointer"
            onClick={() => handleRowClick(customer.customerId._id)}
          >
            <td className="border border-gray-300 p-2">{customer.customerId.firstName} {customer.customerId.lastName}</td>
            {role !== "Manager" && (
              <td className="border border-gray-300 p-2">{customer.branchId.name}</td>
            )}
            <td className="border border-gray-300 p-2">{customer.productName}</td>
            <td className="border border-gray-300 p-2">{customer.sellingPrice}</td>
            <td className="border border-gray-300 p-2">{customer.status}</td>
            <td className="border border-gray-300 p-2">{customer.accountManagerId.firstName} {customer.accountManagerId.lastName}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td 
            colSpan={role === "Manager" ? "5" : "6"} 
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