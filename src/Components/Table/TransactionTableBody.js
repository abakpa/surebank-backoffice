
// Mock function to get branch name from branchId
const getBranchName = (staffId, staffs = []) => {
  const staff = staffs.find((staff) => staff._id === staffId);
  return staff ? `${staff.firstName} ${staff.lastName || ""}`.trim() : "Unknown Staff";
};

const getTransactionNarration = (transaction) => {
  const narration = String(transaction?.narration || "");
  const customerRequestMatch = narration.match(/^Customer request debit for (.+?)(?:\s+-\s+.+)?$/i);

  if (customerRequestMatch) {
    return `Debited from wallet for ${customerRequestMatch[1]}`;
  }

  return narration.replace(/\s+-\s+Ref:.+$/i, "");
};

const Tablebody = ({ customers = [], branches = [] }) => { // Default values for props
  const amountClass = (direction) =>
    direction === 'Credit'
      ? "text-green-600"
      : direction === 'Transfer'
      ? "text-green-600"
      : direction === 'Moved'
      ? "text-purple-500"
      : "text-red-600";

  return (
    <tbody className="text-xs">
      {Array.isArray(customers) && customers.length > 0 ? (
        customers.map((customer, index) => {
          const displayNarration = getTransactionNarration(customer);
          return (
          <tr
            key={index}
            className=" hover:bg-gray-100"
          >
            <td className="p-2 align-top break-words">
            <p className="text-xs mb-2 font-semibold min-w-0">
                <span className={amountClass(customer.direction)}>
                {customer.direction}
                </span>
                <br />
                <span className="text-gray-500 break-words">{customer.date}</span>
            </p>
            </td>            
            <td className="p-2 align-top whitespace-nowrap">
            <p className={`text-xs font-semibold whitespace-nowrap ${amountClass(customer.direction)}`}>
            {customer.direction === 'Credit' ? "+" : customer.direction === 'Transfer'? "+" : "-"} {customer.amount?.toLocaleString('en-US')}
            </p>
            </td>
            <td className="p-2 align-top min-w-0">
  <p
    className={`text-xs flex flex-wrap items-center gap-1 min-w-0 break-words ${amountClass(customer.direction)}`}
  >
    {/* Icon with smaller size */}
    <span
      className={`cursor-pointer text-[10px] font-bold text-white w-4 h-4 rounded flex items-center justify-center ${
        customer.narration === "SB Deposit" ? "bg-green-500" :customer.narration === "DS Deposit"? "bg-blue-500":customer.narration === "DS Charge"? "bg-blue-500":customer.narration === "Total DS"? "bg-blue-500":""
      }`}
    >
      {customer.narration === "SB Deposit" ? "SB" :customer.narration==="DS Deposit"? "DS":customer.narration==="DS Charge"? "DS":customer.narration==="Total DS"? "DS":""}
    </span>

    {/* Text "Deposit" */}
    <span className="inline-flex min-w-0 flex-wrap items-center gap-1 break-words">
  {customer.narration === "From DS account" ? (
    <>
      From
      <span className="cursor-pointer bg-blue-500 text-white w-4 h-4 text-[10px] font-bold rounded flex items-center justify-center">
        DS
      </span>
      account
    </>
  ) : customer.narration === "DS Deposit" ? (
    "Deposit"
  ) : customer.narration === "DS Charge" ? (
    "Charge"
  ) : customer.narration === "SB Deposit" ? (
    "Deposit"
  ) : customer.narration === "Total DS" ? (
    "Total"
  ) : (
    displayNarration
  )}
</span>
 
</p>
</td>

            <td className="p-2 align-top whitespace-nowrap"><p className={`whitespace-nowrap ${amountClass(customer.direction)}`}>{customer.balance?.toLocaleString('en-US')}</p></td>
            <td className="p-2 align-top min-w-0">
              <p className={`break-words ${amountClass(customer.direction)}`}>
                {customer.createdByName || getBranchName(customer.createdBy, branches)}
              </p>
            </td>
          </tr>
          );
        })
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
