const Tablehead = () => {
    const role = localStorage.getItem("staffRole");
    const canTransfer = role === "Manager" || role === "Admin";
  
    return (
      <thead className="text-sm">
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2">Name</th>
          <th className="border border-gray-300 p-2">Address</th>
          <th className="border border-gray-300 p-2">Phone</th>
          <th className="border border-gray-300 p-2">Branch</th>
          {canTransfer && (
            <th className="border border-gray-300 p-2">Transfer Customer</th>
          )}
        </tr>
      </thead>
    );
  };
  
  export default Tablehead;
  