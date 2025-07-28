import { useEffect, useState } from "react";

const Tablehead = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Get role from localStorage when component mounts
    setRole(localStorage.getItem("staffRole"));
  }, []);

  return (
    <thead className="text-sm">
      <tr className="bg-gray-100">
        <th className="border border-gray-300 p-2">Name</th>
        {role !== "Manager" && (
          <th className="border border-gray-300 p-2">Branch</th>
        )}
        <th className="border border-gray-300 p-2">Product</th>
        <th className="border border-gray-300 p-2">Price</th>
        <th className="border border-gray-300 p-2">Date</th>
        <th className="border border-gray-300 p-2">Status</th>
        <th className="border border-gray-300 p-2">Rep</th>
      </tr>
    </thead>
  );
};

export default Tablehead;