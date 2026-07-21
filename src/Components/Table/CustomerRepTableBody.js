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
  { text: "text-sky-900", bg: "bg-sky-50" },
  { text: "text-emerald-900", bg: "bg-emerald-50" },
  { text: "text-purple-900", bg: "bg-purple-50" },
  { text: "text-orange-900", bg: "bg-orange-50" },
  { text: "text-indigo-900", bg: "bg-indigo-50" },
  { text: "text-teal-900", bg: "bg-teal-50" },
  { text: "text-rose-900", bg: "bg-rose-50" },
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
      <tbody className="divide-y divide-slate-100 text-sm">
        {sortedCustomers.length > 0 ? (
          sortedCustomers.map((customer, index) => {
            const { text, bg } = rowColors[index % rowColors.length]; // pick matching colors
            return (
              <tr
                key={index}
                className={`cursor-pointer transition duration-200 ${bg} ${text} hover:brightness-95`}
                onClick={() => handleRowClick(customer._id)}
              >
                <td className="px-4 py-3 font-black">
                  {customer.firstName} {customer.lastName}
                </td>
                <td className="max-w-[260px] px-4 py-3 font-semibold">{customer.address}</td>
                <td className="px-4 py-3 font-black">{customer.phone}</td>
                {!isManagerOrAgent && (
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-black shadow-sm">
                      {getBranchName(customer.branchId, branches)}
                    </span>
                  </td>
                )}
                {canTransfer && (
                  <td className="px-4 py-3">
                    <button
                      className="rounded-full bg-white px-3 py-2 text-xs font-black text-sky-700 shadow-sm hover:bg-sky-50"
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
            <td colSpan="5" className="p-6 text-center text-sm font-semibold text-slate-500">
              No customers found.
            </td>
          </tr>
        )}
      </tbody>

      {/* Transfer Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-3">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
            <p className="text-xs font-black uppercase text-sky-600">Customer transfer</p>
            <h2 className="mb-2 text-lg font-black text-slate-950">Transfer Customer</h2>
            <p className="mb-4 text-sm font-semibold text-slate-600">
              Select a new staff for:{" "}
              <strong>
                {selectedCustomer?.firstName} {selectedCustomer?.lastName}
              </strong>
            </p>

            <Select2
              label="Account Secretary"
              options={staffList.map((staff) => ({
                label: `${staff.firstName} ${staff.lastName}`,
                value: staff._id,
              }))}
              value={newStaff}
              onChange={setNewStaff}
            />

            <div className="mt-6 flex justify-end gap-2">
              <button
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-black text-slate-700 hover:bg-slate-200"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-black text-white hover:bg-sky-700"
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
