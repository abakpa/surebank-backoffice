// Tablebody.jsx
import { useNavigate } from "react-router-dom";

// Helper to get branch name
const getBranchName = (branchId, branches = []) => {
  const branch = branches.find((b) => b._id === branchId);
  return branch ? branch.name : "Unknown Branch";
};

// Helper to format role display
const formatRoleDisplay = (role) => (role === "Agent" ? "Rep" : role);

const Tablebody = ({ staffs = [], branches = [], count = {}, onToggleStatus }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("staffRole");
  const viewDeactivateAndResetPassword = role === "Admin";

  // Safely extract the nested `data` object that your API returns
  // e.g. count = { message: "...", data: { "staffId": 3, ... } }
  const countData = (count && count.data) || {};

  // Defensive: ensure staffs is an array
  const safeStaffs = Array.isArray(staffs) ? staffs : [];

  const handleRowClick = (staffId) => {
    navigate(`/managerviewdashboard/${staffId}`);
  };

  const filteredStaffs = safeStaffs.filter((staff) => {
    // defensive: staff might be nullish
    if (!staff) return false;
    const branchName = getBranchName(staff.branchId, branches);
    if (branchName === "Head office") return false;
    if (role === "Admin" && staff.role === "Admin") return false;
    if (role === "Manager" && staff.role === "Manager") return false;
    return true;
  });

  return (
    <tbody className="text-sm sm:text-base">
      {filteredStaffs.length === 0 ? (
        <tr>
          <td colSpan={viewDeactivateAndResetPassword ? 6 : 5} className="py-6 text-center text-gray-500">
            No staff found.
          </td>
        </tr>
      ) : (
        filteredStaffs.map((staff, index) => {
          const staffId = staff._id?.toString();
          const staffCount = staffId ? (countData[staffId] ?? 0) : 0;

          return (
            <tr
              key={staffId || index}
              className="text-center cursor-pointer hover:bg-gray-100 transition"
              onClick={() => handleRowClick(staff._id)}
            >
              <td className="border border-gray-300 p-2 whitespace-nowrap">
                {staff.firstName} {staff.lastName}
              </td>
              <td className="border border-gray-300 p-2">{staff.address}</td>
              <td className="border border-gray-300 p-2">{staff.phone}</td>
              <td className="border border-gray-300 p-2">{formatRoleDisplay(staff.role)}</td>

              {viewDeactivateAndResetPassword && (
                <td className="border border-gray-300 p-2">{getBranchName(staff.branchId, branches)}</td>
              )}

              <td className="border border-gray-300 p-2 font-semibold text-blue-600">{staffCount}</td>
            </tr>
          );
        })
      )}
    </tbody>
  );
};

export default Tablebody;
