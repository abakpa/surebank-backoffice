import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCustomerRequest } from "../redux/slices/customerSlice";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import { fetchStaffRequest } from "../redux/slices/staffSlice";
import Select2 from "./Select2";

const CreateCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, staffs } = useSelector((state) => state.staff);
  const { branches } = useSelector((state) => state.branch);
  const { error: createCustomerError } = useSelector((state) => state.customer);

  const loggedInRole = useSelector((state) => state.login.staff?.role);
  // const loggedInStaffId = useSelector((state) => state.login);
  const loggedInBranchId = useSelector((state) => state.login?.staff?.branch);
  const loggedInStaffName = useSelector((state) => state.login.staff?.name);

  const staffRole = loggedInRole || localStorage.getItem("staffRole");
  const isBranchManagerRole = ["Manager"].includes(staffRole);
  const loggedInStaff = localStorage.getItem("staffId")
  const staffBranchId = loggedInBranchId || localStorage.getItem("staffBranch");
  const branchName = branches.find((branch) => branch._id === staffBranchId)?.name || "";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [branchId, setBranchId] = useState("");
  const [accountManagerId, setAccountManagerId] = useState("");
  const [showError, setShowError] = useState(false);
  const [validationError, setValidationError] = useState("");
  useEffect(() => {
    if (createCustomerError) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [createCustomerError]);

  useEffect(() => {
    dispatch(fetchBranchRequest());
    dispatch(fetchStaffRequest());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }

    const details = {
      firstName,
      lastName,
      address,
      phone,
      password,
      branchId: staffRole === "Admin" ? branchId : staffBranchId,
      accountManagerId: staffRole === "Agent" ? loggedInStaff : staffRole === "OnlineRep" ? loggedInStaff : accountManagerId,
    };

    dispatch(createCustomerRequest({ details, navigate }));

    setFirstName("");
    setLastName("");
    setAddress("");
    setPhone("");
    setPassword("");
    setBranchId("");
    setAccountManagerId("");
  };

  if (error) return <p>{error}</p>;

  const branchOptions = branches
    .filter((branch) => branch.name !== "Head office")
    .map((branch) => ({ label: branch.name, value: branch._id }));

  // Only show non-admins as selectable staff
  const accountManagerOptions = staffs
  .filter((staff) => staff.role !== "Admin")
  .map((staff) => ({
    label: `${staff.firstName} ${staff.lastName}`,
    value: staff._id,
  }));


  return (
    <div className="p-6 mt-10 bg-white rounded shadow-md max-w-lg mx-auto mb-6">
      {showError && createCustomerError && (
        <div className="alert-slide bg-red-100 text-red-800 px-4 py-2 rounded mb-4 fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
          {createCustomerError}
        </div>
      )}
      {validationError && (
        <div className="alert-slide bg-red-100 text-red-800 px-4 py-2 rounded mb-4 fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
          {validationError}
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Create New Customer</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
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
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
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
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\s+/g, ''))}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative mt-1">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setValidationError("");
              }}
              className="block w-full px-4 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              )}
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">At least 6 characters</p>
        </div>

        {/* Branch */}
        {isBranchManagerRole || staffRole === "Agent" || staffRole === "OnlineRep" ? (
          <input type="hidden" name="branch" value={branchName} />
        ) : (
          <div className="mb-4">
            <Select2
              label="Branch"
              options={branchOptions}
              value={branchId}
              onChange={setBranchId}
            />
          </div>
        )}

        {/* Account Rep */}
        {staffRole === "Agent" ? (
          <input
            type="hidden"
            id="rep"
            value={loggedInStaffName}
            readOnly
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none"
          />
        ) :
        staffRole === "OnlineRep" ? (
          <input
            type="hidden"
            id="rep"
            value={loggedInStaffName}
            readOnly
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none"
          />
        ) : (
          <div className="mb-4">
            <Select2
              label="Account Rep"
              options={accountManagerOptions}
              value={accountManagerId}
              onChange={setAccountManagerId}
            />
          </div>
        )}

        {/* Submit Button */}
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
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Create Customer
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateCustomer;
