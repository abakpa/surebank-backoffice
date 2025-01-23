const getBranchName = (branchId, branches = []) => {
  
    const branch = branches.find((branch) => branch._id === branchId);
    return branch ? branch.name : "Unknown Branch";
  };

const Tablebody = ({ staffs, branches = [] }) => {
    return (
        <tbody className="text-sm">
        {staffs.map((staff, index) => (
          <tr key={index} className="text-center">
            <td className="border border-gray-300 p-2">{staff.name}</td>
            <td className="border border-gray-300 p-2">{staff.address}</td>
            <td className="border border-gray-300 p-2">{staff.phone}</td>
            <td className="border border-gray-300 p-2">{staff.email}</td>
            <td className="border border-gray-300 p-2">{staff.role}</td>
            {/* <td className="border border-gray-300 p-2">{staff.branch}</td> */}
            <td className="border border-gray-300 p-2">
              {getBranchName(staff.branchId, branches)}
            </td>
          </tr>
        ))}
      </tbody>
    );
  };
  
  export default Tablebody;
  