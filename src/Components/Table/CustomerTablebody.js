import { useNavigate } from "react-router-dom";

const Tablebody = ({ customers = [] }) => { // Default value for customers
  const navigate = useNavigate();

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
            <td className="border border-gray-300 p-2">{customer.email}</td>
            <td className="border border-gray-300 p-2">{customer.branch}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="text-center p-4">
            No customers found.
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default Tablebody;
