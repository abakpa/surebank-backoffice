
import { useNavigate } from "react-router-dom";

const getBranchNames = (branchId, branches = []) => {
  const branch = branches.find((branch) => branch._id === branchId);
  return branch ? branch.name : "Unknown Branch";
};

const Tablebody = ({ staffs, branches = [] }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("staffRole");

  const handleRowClick = (staffId) => {
    navigate(`/managerviewdashboard/${staffId}`);
  };

  // Filter out rows if role is Admin or (Manager viewing another Manager)
  const filteredStaffs = staffs.filter((staff) => {
    if (role === "Admin" && staff.role === "Admin") return false;
    if (role === "Manager" && staff.role === "Manager") return false;
    return true;
  });

  return (
    <tbody className="text-sm">
      {filteredStaffs.map((staff, index) => (
        <tr
          key={index}
          className="text-center cursor-pointer"
          onClick={() => handleRowClick(staff._id)}
        >
          <td className="border border-gray-300 p-2">{staff.name}</td>
          <td className="border border-gray-300 p-2">{staff.address}</td>
          <td className="border border-gray-300 p-2">{staff.phone}</td>
          <td className="border border-gray-300 p-2">{staff.role}</td>
          <td className="border border-gray-300 p-2">
            {getBranchNames(staff.branchId, branches)}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default Tablebody;

