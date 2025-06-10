

const Tablebody = ({ customers = [], branches = [] }) => { // Default values for props


  return (
    <tbody className="text-sm">
      {Array.isArray(customers) && customers.length > 0 ? (
        customers.map((customer, index) => (
          <tr
            key={index}
            className="text-center hover:bg-gray-100 cursor-pointer"
            // onClick={() => handleRowClick(customer.customerId._id)}
          >
            <td className="border border-gray-300 p-2">{customer.customerId.firstName} {customer.customerId.lastName}</td>
            <td className="border border-gray-300 p-2">{customer.branchId.name}</td>
            <td className="border border-gray-300 p-2">{customer.incomeInterest}</td>
            <td className="border border-gray-300 p-2">{customer.charge}</td>
            <td className="border border-gray-300 p-2">{customer.expenseInterest}</td>
            <td className="border border-gray-300 p-2">{customer.profit}</td>
         
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
