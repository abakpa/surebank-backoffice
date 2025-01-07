import React, {useState} from "react";
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { createBranchRequest } from '../redux/slices/branchSlice'

const Createbranch = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading} = useSelector(state=>state.branch)
    const [details,setDetails] = useState({name:'',address:''})

    const handleChange = (e)=>{
        setDetails({...details, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const data ={details,navigate}
        dispatch(createBranchRequest(data))
    }

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-xl mx-auto mt-12 mb-6">
      <h2 className="text-xl font-bold mb-4">Create New Branch</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="branchName" className="block text-sm font-medium text-gray-700">
            Branch Name
          </label>
          <input
            type="text"
            name="name"
            value={details.name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="branchLocation" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="address"
            value={details.address}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
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
          Create Branch
        </button>
                    )}
        </div>
      </form>
    </div>
  );
};

export default Createbranch;
