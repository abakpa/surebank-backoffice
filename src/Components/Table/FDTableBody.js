import { useNavigate } from "react-router-dom";

// Mock function to get branch name from branchId
// const getBranchName = (branchId, branches = []) => {
  
//   const branch = branches.find((branch) => branch._id === branchId);
//   return branch ? branch.name : "Unknown Branch";
// };

const Tablebody = ({ customers = [], branches = [] }) => { // Default values for props
    console.log("checking",customers)
  const navigate = useNavigate();

  const handleRowClick = (customerId) => {
    navigate(`/customeraccountdashboard/${customerId}`);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
  
    const day = String(date.getDate()).padStart(2, '0');      // Get day and pad with 0
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

  return (
    <tbody className="text-sm">
      {Array.isArray(customers) && customers.length > 0 ? (
        customers.map((customer, index) => (
          <tr
            key={index}
            className="text-center hover:bg-gray-100 cursor-pointer"
            onClick={() => handleRowClick(customer.customerId._id)}
          >
            <td className="border border-gray-300 p-2">{customer.customerId.name}</td>
            <td className="border border-gray-300 p-2">{customer.fdamount}</td>
            <td className="border border-gray-300 p-2">{customer.durationMonths}</td>
            <td className="border border-gray-300 p-2">{formatDate(customer.maturityDate)}</td>
            <td className="border border-gray-300 p-2">{customer.incomeInterest}</td>
            <td className="border border-gray-300 p-2">{customer.expenseInterest}</td>
            <td className="border border-gray-300 p-2">{customer.status}</td>
            <td className="border border-gray-300 p-2">{customer.branchId.name}</td>
            <td className="border border-gray-300 p-2">{customer.createdBy.name}</td>
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
