import { useNavigate } from "react-router-dom";

const Tablebody = ({ items = [] }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("staffRole");

  const handleRowClick = (customerId) => {
    navigate(`/customeraccountdashboard/${customerId}`);
  };

  // Helper to display rep name - handles both populated Staff objects and ecommerce orders
  const getRepName = (accountManagerId) => {
    if (accountManagerId && typeof accountManagerId === 'object' && accountManagerId.firstName) {
      return `${accountManagerId.firstName} ${accountManagerId.lastName || ''}`;
    }
    if (accountManagerId === 'ECOMMERCE_SYSTEM' || accountManagerId === '') {
      return 'Ecommerce';
    }
    return 'N/A';
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
        key={`customer-${customer._id || index}`}
        className="text-center hover:bg-gray-100 cursor-pointer"
        onClick={() => handleRowClick(customer.customerId?._id)}
      >
        <td className="border border-gray-300 p-2">{customer.customerId?.firstName} {customer.customerId?.lastName}</td>
        {role !== "Manager" && (
          <td className="border border-gray-300 p-2">{customer.branchId?.name || 'N/A'}</td>
        )}
        <td className="border border-gray-300 p-2">{customer.productName}</td>
        <td className="border border-gray-300 p-2">{customer.sellingPrice?.toLocaleString('en-US')}</td>
        <td className="border border-gray-300 p-2">{new Date(customer?.createdAt).toLocaleDateString()}</td>
        <td className="border border-gray-300 p-2">{customer.status}</td>
        <td className="border border-gray-300 p-2">
          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getItemStatusClass(getItemStatus(customer))}`}>
            {getItemStatus(customer)}
          </span>
        </td>
        <td className="border border-gray-300 p-2">{getRepName(customer.accountManagerId)}</td>
      </tr>
    ))}
    {!hasItems && (
      <tr>
        <td colSpan={role !== "Manager" ? "8" : "7"} className="text-center p-4">
          No order found.
        </td>
      </tr>
    )}
  </tbody>
  );
};

export default Tablebody;
