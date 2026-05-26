import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateStaffRequest,resetStaffPasswordRequest } from "../../redux/slices/staffSlice";

// Helper to get branch name
const getBranchName = (branchId, branches = []) => {
  const branch = branches.find((b) => b._id === branchId);
  return branch ? branch.name : "Unknown Branch";
};

// Helper to format role display
const formatRoleDisplay = (role) => {
  if (role === "Agent") return "Rep";
  if (role === "SubAdmin") return "Sub Admin";
  if (role === "OnlineRep") return "Online Rep";
  return role;
};

const roleOptions = [
  { label: "Manager", value: "Manager" },
  { label: "Sub Admin", value: "SubAdmin" },
  { label: "Rep", value: "Agent" },
  { label: "Online Rep", value: "OnlineRep" },
];

const Tablebody = ({ staffs, branches = [], onToggleStatus }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = localStorage.getItem("staffRole");
  const viewDeactivateAndResetPassword = role === 'Admin';

  const handleRowClick = (staffId) => {
    navigate(`/managerviewdashboard/${staffId}`);
  };

  const handleToggle = (e, staff) => {
    e.stopPropagation();
    const newStatus = staff.status === "isActive" ? "inactive" : "isActive";
    const details = { staffId: staff._id, status: newStatus };
    dispatch(updateStaffRequest(details));
  };
  const resetPassword = (e, staff) => {
    e.stopPropagation();
    // const newStatus = staff.status === "isActive" ? "inactive" : "isActive";
    const details = { staffId: staff._id};
    dispatch(resetStaffPasswordRequest(details));
  };

  const handleRoleChange = (e, staff) => {
    e.stopPropagation();
    const newRole = e.target.value;
    if (!newRole || newRole === staff.role) return;

    if (window.confirm(`Change ${staff.firstName} ${staff.lastName}'s role to ${formatRoleDisplay(newRole)}?`)) {
      dispatch(updateStaffRequest({ staffId: staff._id, role: newRole }));
    }
  };

  // Filter out self-role (Admin or Manager) and "Head office" branch
  const filteredStaffs = staffs.filter((staff) => {
    const branchName = getBranchName(staff.branchId, branches);
    if (branchName === "Head office") return false;
    if (role === "Admin" && staff.role === "Admin") return false;
    if ((role === "Manager" || role === "SubAdmin") && (staff.role === "Manager" || staff.role === "SubAdmin")) return false;
    return true;
  });

  return (
    <tbody className="text-sm">
      {filteredStaffs.map((staff, index) => (
        <tr
          key={index}
          className="text-center cursor-pointer hover:bg-gray-100"
          onClick={() => handleRowClick(staff._id)}
        >
          <td className="border border-gray-300 p-2">{staff.firstName} {staff.lastName}</td>
          <td className="border border-gray-300 p-2">{staff.address}</td>
          <td className="border border-gray-300 p-2">{staff.phone}</td>
          <td className="border border-gray-300 p-2">
            {formatRoleDisplay(staff.role)}
          </td>
          {viewDeactivateAndResetPassword && (
          <td className="border border-gray-300 p-2" onClick={(e) => e.stopPropagation()}>
            <select
              value={staff.role}
              onChange={(e) => handleRoleChange(e, staff)}
              className="w-full min-w-[120px] rounded border border-gray-300 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </td>
          )}
          {viewDeactivateAndResetPassword && (
          <td className="border border-gray-300 p-2">
            {getBranchName(staff.branchId, branches)}
          </td>
          )}

          {viewDeactivateAndResetPassword && (
          <td className="border border-gray-300 p-2">
            <button
              onClick={(e) => handleToggle(e, staff)}
              className={`px-3 py-1 rounded text-xs font-medium ${
                staff.status === "isActive"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {staff.status === "isActive" ? "Deactivate" : "Activate"}
            </button>
            <button
              onClick={(e) => resetPassword(e, staff)}
              className={`px-3 py-1 ml-1 mt-1 rounded text-xs font-medium ${
                staff.updatePassword === "false"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >

              {staff.updatePassword === "false" ? "Reset Password" : "Done"}
            </button>
          </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default Tablebody;
