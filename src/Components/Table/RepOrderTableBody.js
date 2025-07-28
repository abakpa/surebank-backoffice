import { useNavigate } from "react-router-dom";

const Tablebody = ({ customers = [], customers2 = [], branches = [] }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("staffRole");

  const handleRowClick = (customerId) => {
    navigate(`/customeraccountdashboard/${customerId}`);
  };
  const hasCustomers = Array.isArray(customers) && customers.length > 0;
const hasCustomers2 = Array.isArray(customers2) && customers2.length > 0;

  return (
    <tbody className="text-sm">
  
  
    {hasCustomers2 && customers2.map((customer, index) => (
      <tr
        key={`customer2-${index}`}
        className="text-center hover:bg-gray-100 cursor-pointer"
        onClick={() => handleRowClick(customer.customerId._id)}
      >
        <td className="border border-gray-300 p-2">{customer.customerId.firstName} {customer.customerId.lastName}</td>
        {/* {role !== "Manager" && (
          <td className="border border-gray-300 p-2">{customer.branchId.name}</td>
        )} */}
        <td className="border border-gray-300 p-2">{customer.productName}</td>
        <td className="border border-gray-300 p-2">{customer.sellingPrice?.toLocaleString('en-US')}</td>
        <td className="border border-gray-300 p-2">{new Date(customer?.createdAt).toLocaleDateString()}</td>

        <td className="border border-gray-300 p-2">{customer.status}</td>
        {/* <td className="border border-gray-300 p-2">{customer.accountManagerId.firstName} {customer.accountManagerId.lastName}</td> */}
      </tr>
    ))}
    {hasCustomers && customers.map((customer, index) => (
      <tr
        key={`customer-${index}`}
        className="text-center hover:bg-gray-100 cursor-pointer"
        onClick={() => handleRowClick(customer.customerId._id)}
      >
        <td className="border border-gray-300 p-2">{customer.customerId.firstName} {customer.customerId.lastName}</td>
        {/* {role !== "Manager" && (
          <td className="border border-gray-300 p-2">{customer.branchId.name}</td>
        )} */}
        <td className="border border-gray-300 p-2">{customer.productName}</td>
        <td className="border border-gray-300 p-2">{customer.sellingPrice?.toLocaleString('en-US')}</td>
        <td className="border border-gray-300 p-2">{new Date(customer?.createdAt).toLocaleDateString()}</td>

        <td className="border border-gray-300 p-2">{customer.status}</td>
        {/* <td className="border border-gray-300 p-2">{customer.accountManagerId.firstName} {customer.accountManagerId.lastName}</td> */}
      </tr>
    ))}
    {!hasCustomers && !hasCustomers2 && (
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