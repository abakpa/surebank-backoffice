import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createStaffRequest } from "../redux/slices/staffSlice";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import Select from "./Select3";
import Select2 from "./Select2";

const CreateStaff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { branches } = useSelector((state) => state.branch);
  const { error, loading } = useSelector((state) => state.staff);

  const isLoggedIn = useSelector((state) => state.login.staff?.role);
  const loggedInStaffRole = isLoggedIn || localStorage.getItem("staffRole");
  const isLoggedInBranch = useSelector((state) => state.login?.staff?.branch);
  const loggedInStaffBranch = isLoggedInBranch || localStorage.getItem("staffBranch");

  const loggedInBranchName =
    branches.find((branch) => branch._id === loggedInStaffBranch)?.name || "";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(loggedInStaffRole === "Manager" ? "Agent" : "");
  const [branchId, setBranchId] = useState(
    loggedInStaffRole === "Manager" ? loggedInStaffBranch : ""
  );

  // Role options
  const allRoles = [
    { label: "Manager", value: "Manager" },
    { label: "Rep", value: "Agent" },
    { label: "Admin", value: "Admin" },
  ];

  // Remove "Admin" role if current user is an Admin
  const roles =
    loggedInStaffRole === "Admin"
      ? allRoles.filter((r) => r.value !== "Admin")
      : allRoles;

  const branchOptions = branches
    .filter((branch) => branch.name !== "Head office")
    .map((branch) => ({ label: branch.name, value: branch._id }));

  useEffect(() => {
    dispatch(fetchBranchRequest());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const details = { firstName,lastName, address, phone, email, role, branchId, password };
    const data = { details, navigate };
    dispatch(createStaffRequest(data));

    setFirstName("");
    setLastName("");
    setAddress("");
    setPhone("");
    setEmail("");
    setPassword("");
    setRole(loggedInStaffRole === "Manager" ? "Agent" : "");
    setBranchId(loggedInStaffRole === "Manager" ? loggedInStaffBranch : "");
  };

  return (
    <div className="p-6 mt-10 bg-white rounded shadow-md max-w-lg mx-auto mb-6">
      <h2 className="text-xl font-bold mb-4">Create New Staff</h2>
      {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>

        {/* Role */}
        {loggedInStaffRole === "Manager" ? (
          <div className="mb-4">
            {/* <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label> */}
            <input
              id="role"
              type="hidden"
              value="Agent"
              readOnly
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none"
            />
          </div>
        ) : loggedInStaffRole === "Admin" ? (
          <Select label="Role" options={roles} value={role} onChange={setRole} />
        ) : null}

        {/* Branch */}
        {loggedInStaffRole === "Manager" ? (
          <div className="mb-4">
            {/* <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
              Branch
            </label> */}
            <input
              id="branch"
              type="hidden"
              value={loggedInBranchName}
              readOnly
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none"
            />
          </div>
        ) : loggedInStaffRole === "Admin" ? (
          <Select2
            label="Branch"
            options={branchOptions}
            value={branchId}
            onChange={setBranchId}
          />
        ) : null}

        {/* Submit */}
        <div>
          {loading ? (
            <button
              type="button"
              className="w-full p-3 bg-blue-500 text-white rounded-lg flex items-center justify-center"
              disabled
            >
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="opacity-25"
                />
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  className="opacity-75"
                />
              </svg>
              Processing...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full"
            >
              Create Staff
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateStaff;
