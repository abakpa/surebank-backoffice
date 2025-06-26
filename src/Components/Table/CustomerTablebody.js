import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCustomerPasswordRequest } from "../../redux/slices/customerSlice";

const Tablebody = ({ customers = [], branches = [] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = localStorage.getItem("staffRole");
  const isManagerOrAgent = role === "Manager" || role === "Agent";

  const handleRowClick = (customerId) => {
    navigate(`/customeraccountdashboard/${customerId}`);
  };

  const resetPassword = (e, customer) => {
    e.stopPropagation();
    const details = { 
      customerId: customer._id,
      phone: customer.phone  // Added phone as it might be needed for password reset
    };
    dispatch(resetCustomerPasswordRequest(details));
  };

  return (
    <tbody className="text-sm">
      {Array.isArray(customers) && customers.length > 0 ? (
        customers.map((customer, index) => (
          <tr
            key={customer._id || index}
            className="hover:bg-gray-100"
          >
            <td 
              className="border border-gray-300 p-2 cursor-pointer"
              onClick={() => handleRowClick(customer._id)}
            >
              {customer.firstName} {customer.lastName}
            </td>
            <td 
              className="border border-gray-300 p-2 cursor-pointer"
              onClick={() => handleRowClick(customer._id)}
            >
              {customer.address}
            </td>
            <td 
              className="border border-gray-300 p-2 cursor-pointer"
              onClick={() => handleRowClick(customer._id)}
            >
              {customer.phone}
            </td>
            {!isManagerOrAgent && (
              <td 
                className="border border-gray-300 p-2 cursor-pointer"
                onClick={() => handleRowClick(customer._id)}
              >
                {branches.find(b => b._id === customer.branchId)?.name || "Unknown Branch"}
              </td>
            )}
             {!isManagerOrAgent && (
            <td className="border border-gray-300 p-2">
              <div className="flex justify-center">
                <button
                  onClick={(e) => resetPassword(e, customer)}
                  className={`px-3 py-1 rounded text-xs font-medium ${
                    customer.updatePassword === "false"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  {customer.updatePassword === "false" ? "Reset Password" : "Done"}
                </button>
              </div>
            </td>
              )}
          </tr>
        ))
      ) : (
        <tr>
          <td 
            colSpan={isManagerOrAgent ? 4 : 5} 
            className="text-center p-4 border border-gray-300"
          >
            No customers found.
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default Tablebody;