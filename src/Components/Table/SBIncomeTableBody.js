import { useNavigate } from "react-router-dom";

// Mock function to get branch name from branchId
// const getBranchName = (branchId, branches = []) => {
  
//   const branch = branches.find((branch) => branch._id === branchId);
//   return branch ? branch.name : "Unknown Branch";
// };

const Tablebody = ({ customers = [], branches = [] }) => { // Default values for props
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
            onClick={() => handleRowClick(customer.customerId._id)}
          >
            <td className="border border-gray-300 p-2">{customer.customerId.firstName} {customer.customerId.lastName}</td>
            <td className="border border-gray-300 p-2">{customer.customerId.branchId.name}</td>
            <td className="border border-gray-300 p-2">{customer.narration}</td>
            <td className="border border-gray-300 p-2">{customer.amount?.toLocaleString('en-US')}</td>
            {/* <td className="border border-gray-300 p-2">
              {getBranchName(customer.branchId, branches)}
            </td> */}
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
