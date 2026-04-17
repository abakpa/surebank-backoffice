import React,{useEffect,useMemo,useState} from "react";
import {useDispatch,useSelector} from 'react-redux'
import {fetchBranchRequest} from '../redux/slices/branchSlice'
import Tablehead from "./Table/BranchTableHead";
import Tablebody from "./Table/BranchTableBody";
import { Link } from "react-router-dom";
import TableLoadingNotice from "./TableLoadingNotice";


const Viewbranches = () => {
    const dispatch = useDispatch()
    const {loading,branches,error} = useSelector((state)=>state.branch)
     const [searchTerm, setSearchTerm] = useState("");

    useEffect(()=>{
        dispatch(fetchBranchRequest())
    },[dispatch])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
      };
    
      const filteredBranches = useMemo(() => branches.filter((branch) =>
        branch.name.toLowerCase().includes(searchTerm.toLowerCase())
      ), [branches, searchTerm]);
  if(error)return <p>Error: {error}</p>
  return (
    <div className="flex flex-col p-6 bg-gray-100 mt-10">
      <h2 className=" text-xl font-bold mb-4 text-center">Branches</h2>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md"
        />
         <Link to="/createbranch" className="text-xs">
        <button className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Create Branch
        </button>
        </Link>
      </div>
      <table className="w-full border-collapse border border-gray-300">
          <Tablehead />
          <Tablebody branches={filteredBranches} />
        </table>
      {loading && <TableLoadingNotice message="Loading branches..." />}
    </div>
  );
};

export default Viewbranches;
