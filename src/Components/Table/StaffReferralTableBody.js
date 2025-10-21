import { useNavigate } from "react-router-dom";

// Helper to get branch name
const getBranchName = (branchId, branches = []) => {
  const branch = branches.find((b) => b._id === branchId);
  return branch ? branch.name : "Unknown Branch";
};

// Helper to format role display
const formatRoleDisplay = (role) => {
  return role === "Agent" ? "Rep" : role;
};

const Tablebody = ({ staffs, branches = [], count, onToggleStatus }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("staffRole");
  const viewDeactivateAndResetPassword = role === "Admin";

  // ✅ Safely extract count data
  const countData = count?.data || {};

  const handleRowClick = (staffId) => {
    navigate(`/managerviewdashboard/${staffId}`);
  };

  // ✅ Filter staff based on role and branch rules
  const filteredStaffs = staffs.filter((staff) => {
    const branchName = getBranchName(staff.branchId, branches);
    if (branchName === "Head office") return false;
    if (role === "Admin" && staff.role === "Admin") return false;
    if (role === "Manager" && staff.role === "Manager") return false;
    return true;
  });

  return (
    <tbody className="text-sm">
      {filteredStaffs.map((staff, index) => {
        const staffCount = countData[staff._id] || 0; // ✅ Get correct count per staff
        return (
          <tr
            key={index}
            className="text-center cursor-pointer hover:bg-gray-100 transition"
            onClick={() => handleRowClick(staff._id)}
          >
            <td className="border border-gray-300 p-2">
              {staff.firstName} {staff.lastName}
            </td>
            <td className="border border-gray-300 p-2">{staff.address}</td>
            <td className="border border-gray-300 p-2">{staff.phone}</td>
            <td className="border border-gray-300 p-2">
              {formatRoleDisplay(staff.role)}
            </td>

            {viewDeactivateAndResetPassword && (
              <td className="border border-gray-300 p-2">
                {getBranchName(staff.branchId, branches)}
              </td>
            )}

            <td className="border border-gray-300 p-2 font-semibold text-blue-600">
              {staffCount}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default Tablebody;
