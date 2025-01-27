import React, {useState,useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { createCustomerRequest } from '../redux/slices/customerSlice'
import {fetchBranchRequest} from '../redux/slices/branchSlice'
import {fetchStaffRequest} from '../redux/slices/staffSlice'
import Select2 from "./Select2";



const CreateCustomer = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {error,loading,staffs} = useSelector((state)=>state.staff)
    const {branches} = useSelector((state)=>state.branch)
      const { error:createCustomerError } = useSelector((state) => state.customer);
    

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branchId, setBranchId] = useState("");
  const [accountManagerId, setAccountManagerId] = useState("");
  const [showError, setShowError] = useState(false);
  

    useEffect(() => {
      if (createCustomerError) {
        setShowError(true);
        const timer = setTimeout(() => setShowError(false), 5000);
        return () => clearTimeout(timer);
      }
    }, [createCustomerError]);

  useEffect(()=>{
    dispatch(fetchBranchRequest())
},[dispatch])

  useEffect(()=>{
            dispatch(fetchStaffRequest())
        },[dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    const details = { name, address, phone, email, password, branchId, accountManagerId }
    const data ={details,navigate}
    dispatch(createCustomerRequest(data))
      setName("");
      setAddress("");
      setPhone("");
      setEmail("");
      setPassword("");
      setBranchId("");
  };
  if(error)return <p>{error}</p>
  return (
    <div className="p-6 mt-10 bg-white rounded shadow-md max-w-lg mx-auto mb-6">
        {showError && (
        <>
          {createCustomerError && (
            <div className="alert-slide bg-red-100 text-red-800 px-4 py-2 rounded mb-4 fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
              {createCustomerError}
            </div>
          )}
      
        </>
      )}
      <h2 className="text-xl font-bold mb-4">Create New Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>

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

        <div className="mb-4">
        <Select2
          label="Branch"
          options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
          value={branchId}
          onChange={(selectedId) => setBranchId(selectedId)}
        />
        </div>

        <div className="mb-4">
        <Select2
          label="Account Rep"
          options={staffs.map((staff) => ({ label: staff.name, value: staff._id }))}
          value={accountManagerId}
          onChange={(selectedId) => setAccountManagerId(selectedId)}
        />
        </div>
            <div>
            {loading ? (
                        <button type="button" className="w-full p-3 bg-blue-500 text-white rounded-lg flex items-center justify-center" disabled>
                            <svg
                                className="animate-spin h-5 w-5 mr-2 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                aria-label="Loading"
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
