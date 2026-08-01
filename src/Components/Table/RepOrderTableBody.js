import { useNavigate } from "react-router-dom";

const Tablebody = ({ items = [] }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("staffRole");

  const handleRowClick = (customerId) => {
    navigate(`/customeraccountdashboard/${customerId}`);
  };
  const getItemStatus = (item) => item.itemFulfillmentStatus || "N/A";
  const getItemStatusClass = (status) => {
    if (["delivered", "completed"].includes(String(status).toLowerCase())) {
      return "bg-green-100 text-green-700";
    }
    if (String(status).toLowerCase() === "pending") {
      return "bg-yellow-100 text-yellow-700";
    }
    return "bg-gray-100 text-gray-600";
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
        <td className="border border-gray-300 p-2">
          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getItemStatusClass(getItemStatus(customer))}`}>
            {getItemStatus(customer)}
          </span>
        </td>
      </tr>
    ))}
    {!hasItems && (
      <tr>
        <td colSpan={role !== "Manager" ? "7" : "6"} className="text-center p-4">
          No order found.
        </td>
      </tr>
    )}
  </tbody>
  
  );
};

export default Tablebody;
