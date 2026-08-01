import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchStaffRequest, updateStaffRequest,resetStaffPasswordRequest } from "../../redux/slices/staffSlice";
import { url } from "../../redux/sagas/url";

// Helper to get branch name
const getBranchName = (branchId, branches = []) => {
  const branch = branches.find((b) => b._id === branchId);
  return branch ? branch.name : "Unknown Branch";
};

// Helper to format role display
const formatRoleDisplay = (role) => {
  if (role === "Agent") return "Rep";
  if (role === "Manager") return "Secretary";
  if (role === "ProductManager") return "Product Secretary";
  if (role === "OnlineRep") return "Online Rep";
  return role;
};

const roleOptions = [
  { label: "Secretary", value: "Manager" },
  { label: "Product Secretary", value: "ProductManager" },
  { label: "Rep", value: "Agent" },
  { label: "Online Rep", value: "OnlineRep" },
];

const loadImage = (file) => new Promise((resolve, reject) => {
  const image = new Image();
  const objectUrl = URL.createObjectURL(file);
  image.onload = () => {
    URL.revokeObjectURL(objectUrl);
    resolve(image);
  };
  image.onerror = () => {
    URL.revokeObjectURL(objectUrl);
    reject(new Error("Could not read signature image."));
  };
  image.src = objectUrl;
});

const cropSignatureImage = async (file) => {
  const image = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth || image.width;
  canvas.height = image.naturalHeight || image.height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.drawImage(image, 0, 0);

  const { width, height } = canvas;
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const red = data[index];
      const green = data[index + 1];
      const blue = data[index + 2];
      const alpha = data[index + 3];
      const isInk = alpha > 20 && (red < 245 || green < 245 || blue < 245);

      if (isInk) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (minX > maxX || minY > maxY) {
    throw new Error("No visible signature found. Please upload a clear signature image.");
  }

  const padding = Math.max(8, Math.round(Math.min(width, height) * 0.03));
  minX = Math.max(0, minX - padding);
  minY = Math.max(0, minY - padding);
  maxX = Math.min(width - 1, maxX + padding);
  maxY = Math.min(height - 1, maxY + padding);

  const croppedWidth = maxX - minX + 1;
  const croppedHeight = maxY - minY + 1;
  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = croppedWidth;
  outputCanvas.height = croppedHeight;
  outputCanvas.getContext("2d").drawImage(
    canvas,
    minX,
    minY,
    croppedWidth,
    croppedHeight,
    0,
    0,
    croppedWidth,
    croppedHeight
  );

  return await new Promise((resolve) => {
    outputCanvas.toBlob((blob) => resolve(blob), "image/png", 1);
  });
};

const Tablebody = ({ staffs, branches = [], onToggleStatus }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = localStorage.getItem("staffRole");
  const viewDeactivateAndResetPassword = role === 'Admin';
  const [signaturePreview, setSignaturePreview] = useState(null);
  const [signatureProcessingStaffId, setSignatureProcessingStaffId] = useState("");

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

  const handleSignatureSelect = async (event, staff) => {
    event.stopPropagation();
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      setSignatureProcessingStaffId(staff._id);
      const croppedBlob = await cropSignatureImage(file);
      const previewUrl = URL.createObjectURL(croppedBlob);
      setSignaturePreview({
        staff,
        blob: croppedBlob,
        previewUrl,
        uploading: false,
      });
    } catch (error) {
      alert(error.message || "Failed to crop signature image.");
    } finally {
      setSignatureProcessingStaffId("");
    }
  };

  const closeSignaturePreview = () => {
    if (signaturePreview?.previewUrl) {
      URL.revokeObjectURL(signaturePreview.previewUrl);
    }
    setSignaturePreview(null);
  };

  const uploadCroppedSignature = async () => {
    if (!signaturePreview?.blob || !signaturePreview?.staff) return;

    const formData = new FormData();
    formData.append("image", signaturePreview.blob, `${signaturePreview.staff.firstName || "staff"}-signature.png`);

    try {
      setSignaturePreview((current) => ({ ...current, uploading: true }));
      setSignatureProcessingStaffId(signaturePreview.staff._id);
      await axios.put(`${url}/api/staff/${signaturePreview.staff._id}/signature`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Staff signature updated successfully.");
      dispatch(fetchStaffRequest());
      closeSignaturePreview();
    } catch (error) {
      setSignaturePreview((current) => current ? { ...current, uploading: false } : current);
      alert(error.response?.data?.message || "Failed to upload staff signature.");
    } finally {
      setSignatureProcessingStaffId("");
    }
  };

  // Filter out admin accounts, self-role peers, and "Head office" branch
  const filteredStaffs = staffs.filter((staff) => {
    const branchName = getBranchName(staff.branchId, branches);
    if (staff.role === "Admin") return false;
    if (branchName === "Head office") return false;
    if ((role === "Manager" || role === "ProductManager") && (staff.role === "Manager" || staff.role === "ProductManager")) return false;
    return true;
  });

  return (
    <>
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
          <td className="border border-gray-300 p-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center gap-2">
              {staff.signature?.url ? (
                <img
                  src={staff.signature.url}
                  alt={`${staff.firstName} ${staff.lastName} signature`}
                  className="h-10 max-w-[110px] rounded border border-gray-200 bg-white object-contain"
                />
              ) : (
                <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-700">
                  No signature
                </span>
              )}
              {signatureProcessingStaffId === staff._id ? (
                <div className="inline-flex items-center gap-2 rounded bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-purple-300 border-t-purple-700"></span>
                  Preparing...
                </div>
              ) : (
              <label className="cursor-pointer rounded bg-purple-600 px-3 py-1 text-xs font-bold text-white hover:bg-purple-700">
                {staff.signature?.url ? "Update" : "Upload"}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                  onChange={(event) => handleSignatureSelect(event, staff)}
                />
              </label>
              )}
            </div>
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
    {signaturePreview && createPortal(
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            {signaturePreview.uploading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-white/80">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-700"></div>
                <p className="mt-3 text-sm font-black text-purple-700">Uploading signature...</p>
              </div>
            )}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-slate-950">Preview Signature</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Blank space has been cropped automatically. Confirm before uploading.
                </p>
              </div>
              <button
                type="button"
                onClick={closeSignaturePreview}
                disabled={signaturePreview.uploading}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700"
              >
                Close
              </button>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <img
                src={signaturePreview.previewUrl}
                alt="Cropped signature preview"
                className="mx-auto h-20 max-w-full object-contain"
              />
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeSignaturePreview}
                disabled={signaturePreview.uploading}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={uploadCroppedSignature}
                disabled={signaturePreview.uploading}
                className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-black text-white hover:bg-purple-700 disabled:bg-purple-300"
              >
                {signaturePreview.uploading ? "Uploading..." : "Upload Signature"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Tablebody;
