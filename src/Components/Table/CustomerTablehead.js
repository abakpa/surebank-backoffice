const Tablehead = () => {
  const role = localStorage.getItem("staffRole");
  const isManagerOrAgent = role === "Manager" || role === "Agent";
    return (
      <thead className="text-sm">
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2">Name</th>
          <th className="border border-gray-300 p-2">Address</th>
          <th className="border border-gray-300 p-2">Phone</th>
          {!isManagerOrAgent && (
          <th className="border border-gray-300 p-2">Branch</th>
          )}
           {!isManagerOrAgent && (
           <th className="border border-gray-300 p-2">Action</th>
           )}
        </tr>
      </thead>
    );
  };
  
  export default Tablehead;
  