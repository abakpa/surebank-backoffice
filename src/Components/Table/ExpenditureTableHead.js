const Tablehead = () => {
  const role = localStorage.getItem("staffRole");
  const isManagerOrAgent = role === "Manager" || role === "Agent";
  const isRep = role === "Agent";
    return (
      <thead className="text-sm">
        <tr className="bg-gray-100">
        {!isRep && (
          <th className="border border-gray-300 p-2">Name</th>
        )}
         {!isManagerOrAgent && (
          <th className="border border-gray-300 p-2">Branch</th>
         )}
          <th className="border border-gray-300 p-2">Narration</th>
          <th className="border border-gray-300 p-2">Amount</th>
        </tr>
      </thead>
    );
  };
  
  export default Tablehead;
  