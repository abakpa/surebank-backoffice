import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCustomerPasswordRequest } from "../../redux/slices/customerSlice";

const rowColors = [
  "bg-sky-50 text-sky-900",
  "bg-emerald-50 text-emerald-900",
  "bg-purple-50 text-purple-900",
  "bg-orange-50 text-orange-900",
  "bg-indigo-50 text-indigo-900",
  "bg-teal-50 text-teal-900",
  "bg-rose-50 text-rose-900",
];

const Tablebody = ({ customers = [], branches = [] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = localStorage.getItem("staffRole");
  const isManagerOrAgent = role === "Manager" || role === "Agent";
  const isAdmin = role === "Admin";
  const branchLookup = Array.isArray(branches)
    ? branches.reduce((acc, branch) => {
        acc[branch._id] = branch.name;
        return acc;
      }, {})
    : branches;

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

  return (
    <tbody className="divide-y divide-slate-100 text-sm">
      {Array.isArray(customers) && customers.length > 0 ? (
        customers.map((customer, index) => {
          const rowStyle = rowColors[index % rowColors.length]; // cycle colors
          return (
            <tr
              key={customer._id || index}
              className={`cursor-pointer transition duration-200 ${rowStyle} hover:brightness-95`}
            >
              <td 
                className="px-4 py-3 font-black"
                onClick={() => handleRowClick(customer._id)}
              >
                {customer.firstName} {customer.lastName}
              </td>
              <td 
                className="max-w-[260px] px-4 py-3 font-semibold"
                onClick={() => handleRowClick(customer._id)}
              >
                {customer.address}
              </td>
              <td 
                className="px-4 py-3 font-black"
                onClick={() => handleRowClick(customer._id)}
              >
                {customer.phone}
              </td>
              {isAdmin && (
                <td 
                  className="px-4 py-3 font-semibold"
                  onClick={() => handleRowClick(customer._id)}
                >
                  {customer.email || "No email"}
                </td>
              )}
              {!isManagerOrAgent && (
                <td 
                  className="px-4 py-3"
                  onClick={() => handleRowClick(customer._id)}
                >
                  <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-black shadow-sm">
                    {branchLookup?.[customer.branchId] || "Unknown Branch"}
                  </span>
                </td>
              )}
              {isAdmin && (
                <td className="px-4 py-3">
                  <div className="flex justify-center">
                    <button
                      onClick={(e) => resetPassword(e, customer)}
                      className={`rounded-full px-3 py-2 text-xs font-black shadow-sm ${
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
            colSpan={isManagerOrAgent ? 3 : isAdmin ? 6 : 4} 
            className="p-6 text-center text-sm font-semibold text-slate-500"
          >
            No customers found.
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default Tablebody;
