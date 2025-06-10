const Tablehead = ({ customers = [] }) => {
  const role = localStorage.getItem("staffRole");
  
  // Check if we should hide sensitive columns
  const shouldHideSensitiveColumns = role === "Manager" || role === "Agent";


  return (
    <thead className="text-sm">
      <tr className="bg-gray-100">
        <th className="border border-gray-300 p-2">Name</th>
        {!shouldHideSensitiveColumns && (
          <th className="border border-gray-300 p-2">Branch</th>
        )}
        <th className="border border-gray-300 p-2">Narration</th>
        <th className="border border-gray-300 p-2">Amount</th>
        <th className="border border-gray-300 p-2">Date</th>
        {!shouldHideSensitiveColumns && (
          <th className="border border-gray-300 p-2">Rep</th>
        )}
      </tr>
    </thead>
  );
};

export default Tablehead;