import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateStaffRequest } from "../../redux/slices/staffSlice";

// Helper to get branch name
const getBranchName = (branchId, branches = []) => {
  const branch = branches.find((b) => b._id === branchId);
  return branch ? branch.name : "Unknown Branch";
};

// Helper to format role display
const formatRoleDisplay = (role) => {
  return role === "Agent" ? "Rep" : role;
};

const Tablebody = ({ staffs, branches = [], onToggleStatus }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = localStorage.getItem("staffRole");

  const handleRowClick = (staffId) => {
    navigate(`/managerviewdashboard/${staffId}`);
  };

  const handleToggle = (e, staff) => {
    e.stopPropagation();
    const newStatus = staff.status === "isActive" ? "inactive" : "isActive";
    const details = { staffId: staff._id, status: newStatus };
    dispatch(updateStaffRequest(details));
  };

  // Filter out self-role (Admin or Manager) and "Head office" branch
  const filteredStaffs = staffs.filter((staff) => {
    const branchName = getBranchName(staff.branchId, branches);
    if (branchName === "Head office") return false;
    if (role === "Admin" && staff.role === "Admin") return false;
    if (role === "Manager" && staff.role === "Manager") return false;
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
          <td className="border border-gray-300 p-2">
            {getBranchName(staff.branchId, branches)}
          </td>
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
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default Tablebody;