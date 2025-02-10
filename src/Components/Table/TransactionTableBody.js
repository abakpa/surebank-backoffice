
// Mock function to get branch name from branchId
const getBranchName = (staffId, staffs = []) => {
  
    const staff = staffs.find((staff) => staff._id === staffId);
    return staff ? staff.name : "Unknown Branch";
  };

const Tablebody = ({ customers = [], branches = [] }) => { // Default values for props
  console.log("check???",customers,branches)
  return (
    <tbody className="text-xs">
      {Array.isArray(customers) && customers.length > 0 ? (
        customers.map((customer, index) => (
          <tr
            key={index}
            className=" hover:bg-gray-100"
          >
            <td>
            <p className="text-xs ml-2 mb-2 font-semibold">
                <span className={customer.direction === 'Credit' ? "text-green-600" :customer.direction === 'Moved' ? "text-purple-500": "text-red-600"}>
                {customer.direction}
                </span>
                <br />
                <span className="text-gray-500">{customer.date}</span>
            </p>
            </td>            
            <td>
            <p className={`text-xs ml-1 font-semibold ${customer.direction === 'Credit' ?  "text-green-600" :customer.direction === 'Moved' ? "text-purple-500" :  "text-red-600"}`}>
            {customer.direction === 'Credit' ? "+" : "-"} {customer.amount}
            </p>
            </td>
            <td ><p className={`ml-2 ${customer.direction === 'Credit' ?  "text-green-600" :customer.direction === 'Moved' ? "text-purple-500" :  "text-red-600"}`}>{customer.narration}</p></td>
            <td ><p className={`${customer.direction === 'Credit' ?  "text-green-600" :customer.direction === 'Moved' ? "text-purple-500" :  "text-red-600"}`}>{customer.balance}</p></td>
            <td >
              <p className={`${customer.direction === 'Credit' ?  "text-green-600" :customer.direction === 'Moved' ? "text-purple-500" :  "text-red-600"}`}>{getBranchName(customer.createdBy, branches)}</p>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="text-center p-4">
            No transaction found.
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default Tablebody;
