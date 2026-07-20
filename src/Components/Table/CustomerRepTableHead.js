const Tablehead = () => {
    const role = localStorage.getItem("staffRole");
    const isManagerOrAgent = role === "Manager" || role === "Agent";
    const canTransfer = role === "Manager" || role === "Admin";
  
    return (
      <thead className="bg-slate-900 text-xs font-black uppercase tracking-wide text-slate-100">
        <tr>
          <th className="px-4 py-3 text-left">Name</th>
          <th className="px-4 py-3 text-left">Address</th>
          <th className="px-4 py-3 text-left">Phone</th>
          {!isManagerOrAgent && (
          <th className="px-4 py-3 text-left">Branch</th>
          )}
          {canTransfer && (
            <th className="px-4 py-3 text-left">Transfer Customer</th>
          )}
        </tr>
      </thead>
    );
  };
  
  export default Tablehead;
  
