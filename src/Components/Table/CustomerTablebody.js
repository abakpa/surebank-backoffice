import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCustomerPasswordRequest } from "../../redux/slices/customerSlice";

const rowColors = [
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-purple-100 text-purple-800",
  "bg-pink-100 text-pink-800",
  "bg-indigo-100 text-indigo-800",
  "bg-teal-100 text-teal-800",
  "bg-orange-100 text-orange-800",
];

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
      phone: customer.phone
    };
    dispatch(resetCustomerPasswordRequest(details));
  };

  // Sort customers alphabetically by firstName + lastName
  const sortedCustomers = [...customers].sort((a, b) => {
    const nameA = `${a.firstName || ""} ${a.lastName || ""}`.toLowerCase();
    const nameB = `${b.firstName || ""} ${b.lastName || ""}`.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  return (
    <tbody className="text-sm">
      {Array.isArray(sortedCustomers) && sortedCustomers.length > 0 ? (
        sortedCustomers.map((customer, index) => {
          const rowStyle = rowColors[index % rowColors.length]; // cycle colors
          return (
            <tr
              key={customer._id || index}
              className={`cursor-pointer transition-colors duration-200 ${rowStyle} hover:opacity-90`}
            >
              <td 
                className="border border-gray-300 p-2"
                onClick={() => handleRowClick(customer._id)}
              >
                {customer.firstName} {customer.lastName}
              </td>
              <td 
                className="border border-gray-300 p-2"
                onClick={() => handleRowClick(customer._id)}
              >
                {customer.address}
              </td>
              <td 
                className="border border-gray-300 p-2"
                onClick={() => handleRowClick(customer._id)}
              >
                {customer.phone}
              </td>
              {!isManagerOrAgent && (
                <td 
                  className="border border-gray-300 p-2"
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
          );
        })
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
