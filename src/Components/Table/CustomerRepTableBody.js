import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { transferCustomerRequest } from "../../redux/slices/customerSlice";
import Select2 from "../Select2";

// Utility to get branch name
const getBranchName = (branchId, branches = []) => {
  const branch = branches.find((b) => b._id === branchId);
  return branch ? branch.name : "Unknown Branch";
};

// Define palettes of text + background colors
const rowColors = [
  { text: "text-blue-800", bg: "bg-blue-50" },
  { text: "text-green-800", bg: "bg-green-50" },
  { text: "text-purple-800", bg: "bg-purple-50" },
  { text: "text-pink-800", bg: "bg-pink-50" },
  { text: "text-indigo-800", bg: "bg-indigo-50" },
  { text: "text-teal-800", bg: "bg-teal-50" },
  { text: "text-orange-800", bg: "bg-orange-50" },
];

const Tablebody = ({ customers = [], branches = [], oldStaff, staffList = [] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = localStorage.getItem("staffRole");
  const isManagerOrAgent = role === "Manager" || role === "Agent";

  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newStaff, setNewStaff] = useState("");

  const handleRowClick = (customerId) => {
    navigate(`/customeraccountdashboard/${customerId}`);
  };

  const openTransferModal = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCustomer(null);
    setNewStaff("");
  };

  const handleTransfer = () => {
    if (selectedCustomer && newStaff) {
      const transferDetails = {
        newStaff,
        oldStaff,
        customer: selectedCustomer._id,
      };
      dispatch(transferCustomerRequest(transferDetails));
      closeModal();
    }
  };

  const canTransfer = role === "Manager" || role === "Admin";

  // Sort customers alphabetically
  const sortedCustomers = [...customers].sort((a, b) => {
    const nameA = `${a.firstName || ""} ${a.lastName || ""}`.toLowerCase();
    const nameB = `${b.firstName || ""} ${b.lastName || ""}`.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  return (
    <>
      <tbody className="text-sm">
        {sortedCustomers.length > 0 ? (
          sortedCustomers.map((customer, index) => {
            const { text, bg } = rowColors[index % rowColors.length]; // pick matching colors
            return (
              <tr
                key={index}
                className={`cursor-pointer transition-colors duration-200 ${bg} ${text} hover:opacity-90`}
                onClick={() => handleRowClick(customer._id)}
              >
                <td className="border border-gray-300 p-2">
                  {customer.firstName} {customer.lastName}
                </td>
                <td className="border border-gray-300 p-2">{customer.address}</td>
                <td className="border border-gray-300 p-2">{customer.phone}</td>
                {!isManagerOrAgent && (
                  <td className="border border-gray-300 p-2">
                    {getBranchName(customer.branchId, branches)}
                  </td>
                )}
                {canTransfer && (
                  <td className="border border-gray-300 p-2">
                    <button
                      className="text-blue-700 underline hover:text-blue-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        openTransferModal(customer);
                      }}
                    >
                      Transfer Customer
                    </button>
                  </td>
                )}
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="5" className="text-center p-4">
              No customers found.
            </td>
          </tr>
        )}
      </tbody>

      {/* Transfer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Transfer Customer</h2>
            <p className="mb-4">
              Select a new staff for:{" "}
              <strong>
                {selectedCustomer?.firstName} {selectedCustomer?.lastName}
              </strong>
            </p>

            <Select2
              label="Account Manager"
              options={staffList.map((staff) => ({
                label: `${staff.firstName} ${staff.lastName}`,
                value: staff._id,
              }))}
              value={newStaff}
              onChange={setNewStaff}
            />

            <div className="flex justify-end mt-6 space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleTransfer}
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tablebody;
