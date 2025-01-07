import React,{useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux'
import {fetchBranchRequest} from '../redux/slices/branchSlice'

const Viewbranches = () => {
    const dispatch = useDispatch()
    const {loading,branches,error} = useSelector((state)=>state.branch)

    useEffect(()=>{
        dispatch(fetchBranchRequest())
    },[dispatch])
    if (loading) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <svg
                  className="animate-spin h-10 w-10 text-blue-500"
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
              <p className="text-blue-500 ml-4">Loading vehicles...</p>
          </div>
      );
  }
  if(error)return <p>Error: {error}</p>
  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Branches</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Branch Name</th>
            <th className="px-4 py-2 text-left">Location</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{branch.name}</td>
              <td className="px-4 py-2">{branch.address}</td>
              <td className="px-4 py-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-2 lg:ml-2 mt-2 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Viewbranches;
