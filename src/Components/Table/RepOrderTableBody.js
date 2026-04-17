import { useNavigate } from "react-router-dom";

const Tablebody = ({ items = [] }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("staffRole");

  const handleRowClick = (customerId) => {
    navigate(`/customeraccountdashboard/${customerId}`);
  };
  const hasItems = Array.isArray(items) && items.length > 0;

  return (
    <tbody className="text-sm">
    {hasItems && items.map((customer, index) => (
      <tr
        key={`customer-${index}`}
        className="text-center hover:bg-gray-100 cursor-pointer"
        onClick={() => handleRowClick(customer.customerId?._id)}
      >
        <td className="border border-gray-300 p-2">{customer.customerId?.firstName} {customer.customerId?.lastName}</td>
        <td className="border border-gray-300 p-2">{customer.productName}</td>
        <td className="border border-gray-300 p-2">{customer.sellingPrice?.toLocaleString('en-US')}</td>
        <td className="border border-gray-300 p-2">{new Date(customer?.createdAt).toLocaleDateString()}</td>
        <td className="border border-gray-300 p-2">{customer.status}</td>
      </tr>
    ))}
    {!hasItems && (
      <tr>
        <td colSpan={role !== "Manager" ? "6" : "5"} className="text-center p-4">
          No order found.
        </td>
      </tr>
    )}
  </tbody>
  
  );
};

export default Tablebody;
