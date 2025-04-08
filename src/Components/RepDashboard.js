import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchBranchRequest } from "../redux/slices/branchSlice";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom


import {

  fetchRepDSDailyContributionRequest,
  fetchRepSBDailyContributionRequest,
  fetchRepTotalSBandDSDailyRequest,
  fetchRepDSWithdrawalRequest,
  fetchRepDSpackageRequest,
  fetchRepSBpackageRequest,
  fetchRepPackageRequest,

} from '../redux/slices/repdashboardSlice'
import Loader from "./Loader";
// import Select2 from "./Select2";



const RepDashboard = () => {
    const dispatch = useDispatch();
    // const { branches } = useSelector((state) => state.branch);

    const [date3, setDate3] = useState("");
    const [date4, setDate4] = useState("");
    const [date5, setDate5] = useState("");
    const [date6, setDate6] = useState("");
    const [date7, setDate7] = useState("");
    const [date8, setDate8] = useState("");
    const [date9, setDate9] = useState("");
    const {
      loading,
     repdailyds,
     repdailysb,
     reptotaldailysbandds,
     repdswithdrawal,
     repdspackage,
     repsbpackage,
     reppackages,
  
    } = useSelector((state)=>state.repdashboard)
  
      const newdailyds = repdailyds || 0
      const newdailysb = repdailysb || 0
      const newtotaldailysbandds = reptotaldailysbandds || 0
      const newdswithdrawal = repdswithdrawal || 0
      const newdspackage = repdspackage || 0
      const newsbpackage = repsbpackage || 0
      const newpackages = reppackages || 0
      



    //   useEffect(() => {
    //     dispatch(fetchBranchRequest());
    //   }, [dispatch]);

      useEffect(() => {
    
        const details3 = { date: date3 };
        const details4 = { date: date4 };
        const details5 = { date: date5 };
        const details6 = { date: date6 };
        const details7 = { date: date7 };
        const details8 = { date: date8 };
        const details9 = { date: date9 };
    
   
        const data3 = {details3}
        const data4 = {details4}
        const data5 = {details5}
        const data6 = {details6}
        const data7 = {details7}
        const data8 = {details8}
        const data9 = {details9}
  
        dispatch(fetchRepDSDailyContributionRequest(data3)); 
        dispatch(fetchRepSBDailyContributionRequest(data4)); 
        dispatch(fetchRepTotalSBandDSDailyRequest(data5)); 
        dispatch(fetchRepDSWithdrawalRequest(data6)); 
        dispatch(fetchRepDSpackageRequest(data7)); 
        dispatch(fetchRepSBpackageRequest(data8)); 
        dispatch(fetchRepPackageRequest(data9)); 
 
    }, [
      dispatch,
 
      date3,
      date4,
      date5,
      date6,
      date7,
      date8,
      date9,

    ]);
    
  return (
<div className="p-6">
  {loading && <Loader />}
  <h1 className="text-2xl font-bold mb-4 mt-10 text-center">Rep Dashboard</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

  {/* Card 4 - Yellow */}
  <div className="p-4 rounded-lg shadow-md bg-yellow-100">
    <h3 className="text-sm font-semibold mb-2 text-yellow-800">Total DS Daily Contribution</h3>
    <p className="text-sm font-bold text-yellow-800">{newdailyds || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId3}
        onChange={(selectedId) => setBranchId3(selectedId)}
      /> */}
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date3}
        onChange={(e) => setDate3(e.target.value)}
      />
    
    </form>
  </div>

  {/* Card 5 - Purple */}
  <div className="p-4 rounded-lg shadow-md bg-purple-100">
    <h3 className="text-sm font-semibold mb-2 text-purple-800">Total SB Daily Contribution</h3>
    <p className="text-sm font-bold text-purple-800">{newdailysb || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId4}
        onChange={(selectedId) => setBranchId4(selectedId)}
      /> */}
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date4}
        onChange={(e) => setDate4(e.target.value)}
      />
    
    </form>
  </div>

  {/* Card 6 - Indigo */}
  <div className="p-4 rounded-lg shadow-md bg-indigo-100">
    <h3 className="text-sm font-semibold mb-2 text-indigo-800">Total Daily Contribution</h3>
    <p className="text-sm font-bold text-indigo-800">{newtotaldailysbandds || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId5}
        onChange={(selectedId) => setBranchId5(selectedId)}
      /> */}
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date5}
        onChange={(e) => setDate5(e.target.value)}
      />
  
    </form>
  </div>

  {/* Card 7 - Pink */}
  <div className="p-4 rounded-lg shadow-md bg-pink-100">
    <h3 className="text-sm font-semibold mb-2 text-pink-800">DS Withdrawal</h3>
    <p className="text-sm font-bold text-pink-800">{newdswithdrawal || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId6}
        onChange={(selectedId) => setBranchId6(selectedId)}
      /> */}
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date6}
        onChange={(e) => setDate6(e.target.value)}
      />
  
    </form>
  </div>

  {/* Card 8 - Teal */}
  <div className="p-4 rounded-lg shadow-md bg-teal-100">
    <h3 className="text-sm font-semibold mb-2 text-teal-800">DS Package</h3>
    <p className="text-sm font-bold text-teal-800">{newdspackage || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId7}
        onChange={(selectedId) => setBranchId7(selectedId)}
      /> */}
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date7}
        onChange={(e) => setDate7(e.target.value)}
      />

    </form>
  </div>

  {/* Card 9 - Orange */}
  <div className="p-4 rounded-lg shadow-md bg-orange-100">
    <h3 className="text-sm font-semibold mb-2 text-orange-800">SB Package</h3>
    <p className="text-sm font-bold text-orange-800">{newsbpackage || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId8}
        onChange={(selectedId) => setBranchId8(selectedId)}
      /> */}
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date8}
        onChange={(e) => setDate8(e.target.value)}
      />
  
    </form>
  </div>

  {/* Card 10 - Cyan */}
  <div className="p-4 rounded-lg shadow-md bg-cyan-100">
    <h3 className="text-sm font-semibold mb-2 text-cyan-800">Total Packages</h3>
    <p className="text-sm font-bold text-cyan-800">{newpackages || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId9}
        onChange={(selectedId) => setBranchId9(selectedId)}
      /> */}
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date9}
        onChange={(e) => setDate9(e.target.value)}
      />
 
    </form>
  </div>
</div>
</div>

  );
};

export default RepDashboard;
