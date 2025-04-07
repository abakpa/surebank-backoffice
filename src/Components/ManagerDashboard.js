import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchBranchRequest } from "../redux/slices/branchSlice";
import { Link } from "react-router-dom"; // Import Link from react-router-dom


import {
  fetchBranchDSContributionRequest,
  fetchBranchSBContributionRequest,
  fetcBranchTotalSBandDSRequest,
  fetchBranchDSDailyContributionRequest,
  fetchBranchSBDailyContributionRequest,
  fetchBranchTotalSBandDSDailyRequest,
  fetchBranchDSWithdrawalRequest,
  fetchBranchDSpackageRequest,
  fetchBranchSBpackageRequest,
  fetchBranchPackageRequest,
  fetchBranchDSincomeRequest,
  fetchBranchSBincomeRequest,
  fetchBranchTotalincomeRequest,
  fetchBranchTotalExpenditureRequest,
  fetchBranchTotalProfitRequest
} from '../redux/slices/managerdashboardSlice'
import Loader from "./Loader";
// import Select2 from "./Select2";



const ManagerDashboard = () => {
    const dispatch = useDispatch();
    // const { branches } = useSelector((state) => state.branch);
    const [date, setDate] = useState("");
    const [date1, setDate1] = useState("");
    const [date2, setDate2] = useState("");
    const [date3, setDate3] = useState("");
    const [date4, setDate4] = useState("");
    const [date5, setDate5] = useState("");
    const [date6, setDate6] = useState("");
    const [date7, setDate7] = useState("");
    const [date8, setDate8] = useState("");
    const [date9, setDate9] = useState("");
    const [date10, setDate10] = useState("");
    const [date11, setDate11] = useState("");
    const [date12, setDate12] = useState("");
    const [date13, setDate13] = useState("");
    const [date14, setDate14] = useState("");
    // const [branchId, setBranchId] = useState("");
    // const [branchId1, setBranchId1] = useState("");
    // const [branchId2, setBranchId2] = useState("");
    // const [branchId3, setBranchId3] = useState("");
    // const [branchId4, setBranchId4] = useState("");
    // const [branchId5, setBranchId5] = useState("");
    // const [branchId6, setBranchId6] = useState("");
    // const [branchId7, setBranchId7] = useState("");
    // const [branchId8, setBranchId8] = useState("");
    // const [branchId9, setBranchId9] = useState("");
    // const [branchId10, setBranchId10] = useState("");
    // const [branchId11, setBranchId11] = useState("");
    // const [branchId12, setBranchId12] = useState("");
    // const [branchId13, setBranchId13] = useState("");
    // const [branchId14, setBranchId14] = useState("");
    const {
      loading,
      branchdscontribution,
      branchsbcontribution,
      branchtotalsbandds,
      branchdailyds,
      branchdailysb,
      branchtotaldailysbandds,
      branchdswithdrawal,
      branchdspackage,
      branchsbpackage,
      branchpackages,
      branchdsincome,
      branchsbincome,
      branchtotalincome,
      branchtotalexpenditure,
      branchprofit
    } = useSelector((state)=>state.managerdashboard)
      const newdsContribution = branchdscontribution || 0
      const newsbContribution = branchsbcontribution || 0
      const newtotalsbandds = branchtotalsbandds || 0
      const newdailyds =  branchdailyds || 0
      const newdailysb =  branchdailysb || 0
      const newtotaldailysbandds =  branchtotaldailysbandds || 0
      const newdswithdrawal =  branchdswithdrawal || 0
      const newdspackage =  branchdspackage || 0
      const newsbpackage =  branchsbpackage || 0
      const newpackages =  branchpackages || 0
      const newdsincome =  branchdsincome || 0
      const newsbincome =  branchsbincome || 0
      const newtotalincome =  branchtotalincome || 0
      const newtotalexpenditure =  branchtotalexpenditure || 0
      const newprofit =  branchprofit || 0



    //   useEffect(() => {
    //     dispatch(fetchBranchRequest());
    //   }, [dispatch]);

      useEffect(() => {
        const details = {  date: date };
        const details1 = { date: date1 };
        const details2 = { date: date2 };
        const details3 = { date: date3 };
        const details4 = { date: date4 };
        const details5 = { date: date5 };
        const details6 = { date: date6 };
        const details7 = { date: date7 };
        const details8 = { date: date8 };
        const details9 = { date: date9 };
        const details10 = { date: date10 };
        const details11 = { date: date11 };
        const details12 = { date: date12 };
        const details13 = { date: date13 };
        const details14 = { date: date14 };
        const data = {details}
        const data1 = {details1}
        const data2 = {details2}
        const data3 = {details3}
        const data4 = {details4}
        const data5 = {details5}
        const data6 = {details6}
        const data7 = {details7}
        const data8 = {details8}
        const data9 = {details9}
        const data10 = {details10}
        const data11 = {details11}
        const data12 = {details12}
        const data13 = {details13}
        const data14 = {details14}
    
        dispatch(fetchBranchDSContributionRequest(data));
        dispatch(fetchBranchSBContributionRequest(data1));
        dispatch(fetcBranchTotalSBandDSRequest(data2)); 
        dispatch(fetchBranchDSDailyContributionRequest(data3)); 
        dispatch(fetchBranchSBDailyContributionRequest(data4)); 
        dispatch(fetchBranchTotalSBandDSDailyRequest(data5)); 
        dispatch(fetchBranchDSWithdrawalRequest(data6)); 
        dispatch(fetchBranchDSpackageRequest(data7)); 
        dispatch(fetchBranchSBpackageRequest(data8)); 
        dispatch(fetchBranchPackageRequest(data9)); 
        dispatch(fetchBranchDSincomeRequest(data10)); 
        dispatch(fetchBranchSBincomeRequest(data11)); 
        dispatch(fetchBranchTotalincomeRequest(data12)); 
        dispatch(fetchBranchTotalExpenditureRequest(data13)); 
        dispatch(fetchBranchTotalProfitRequest(data14)); 
    }, [
      dispatch,
      date,
      date1,
      date2,
      date3,
      date4,
      date5,
      date6,
      date7,
      date8,
      date9,
      date10,
      date11,
      date12,
      date13,
      date14,
    ]);
    
  return (
<div className="p-6">
  {loading && <Loader />}
  <h1 className="text-2xl font-bold mb-4 mt-10 text-center">Manager Dashboard</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Card 1 - Blue */}
  <div className="p-4 rounded-lg shadow-md bg-blue-100">
    <h3 className="text-sm font-semibold mb-2 text-blue-800">Total DS Contribution</h3>
    <p className="text-sm font-bold text-blue-800">{newdsContribution}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId}
        onChange={(selectedId) => setBranchId(selectedId)}
      /> */}
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
   
    </form>
  </div>

  {/* Card 2 - Green */}
  <div className="p-4 rounded-lg shadow-md bg-green-100">
    <h3 className="text-sm font-semibold mb-2 text-green-800">Total SB Contribution</h3>
    <p className="text-sm font-bold text-green-800">{newsbContribution}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId1}
        onChange={(selectedId) => setBranchId1(selectedId)}
      /> */}
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date1}
        onChange={(e) => setDate1(e.target.value)}
      />
  
    </form>
  </div>

  {/* Card 3 - Red */}
  <div className="p-4 rounded-lg shadow-md bg-red-100">
    <h3 className="text-sm font-semibold mb-2 text-red-800">Total Contribution</h3>
    <p className="text-sm font-bold text-red-800">{newtotalsbandds}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId2}
        onChange={(selectedId) => setBranchId2(selectedId)}
      /> */}
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date2}
        onChange={(e) => setDate2(e.target.value)}
      />
  
    </form>
  </div>

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

  {/* Card 11 - Amber */}
  <div className="relative p-4 rounded-lg shadow-md bg-amber-100">
      {/* Transaction Statement Icon (Top-right Corner) */}
  <Link to="/dsincome" className="absolute top-2 right-2 text-lime-800 hover:text-lime-900">
    <i className="fas fa-file-alt text-lg" title="View Transaction Statement"></i>
  </Link>
    <h3 className="text-sm font-semibold mb-2 text-amber-800">DS Income</h3>
    <p className="text-sm font-bold text-amber-800">{newdsincome || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId10}
        onChange={(selectedId) => setBranchId10(selectedId)}
      /> */}
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date10}
        onChange={(e) => setDate10(e.target.value)}
      />
  
    </form>
  </div>


{/* Card 12 - Lime */}
<div className="relative p-4 rounded-lg shadow-md bg-lime-100">
  {/* Transaction Statement Icon (Top-right Corner) */}
  <Link to="/branchsbincome" className="absolute top-2 right-2 text-lime-800 hover:text-lime-900">
    <i className="fas fa-file-alt text-lg" title="View Transaction Statement"></i>
  </Link>

  <h3 className="text-sm font-semibold mb-2 text-lime-800">SB Income</h3>
  <p className="text-sm font-bold text-lime-800">{newsbincome || 0}</p>

  <form className="flex flex-col gap-2 mt-2">
    {/* <Select2
      label="Branch"
      options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
      value={branchId11}
      onChange={(selectedId) => setBranchId11(selectedId)}
    /> */}
    <input 
      type="date" 
      className="p-2 border rounded-md" 
      value={date11}
      onChange={(e) => setDate11(e.target.value)}
    />
  </form>
</div>



  {/* Card 13 - Emerald */}
  <div className="p-4 rounded-lg shadow-md bg-emerald-100">
    <h3 className="text-sm font-semibold mb-2 text-emerald-800">Total Income</h3>
    <p className="text-sm font-bold text-emerald-800">{newtotalincome || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId12}
        onChange={(selectedId) => setBranchId12(selectedId)}
      /> */}
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date12}
        onChange={(e) => setDate12(e.target.value)}
      />
   
    </form>
  </div>

  {/* Card 14 - Violet */}
  <div className="relative p-4 rounded-lg shadow-md bg-violet-100">
         {/* Transaction Statement Icon (Top-right Corner) */}
  <Link to="/branchexpenditurereport" className="absolute top-2 right-2 text-lime-800 hover:text-lime-900">
    <i className="fas fa-file-alt text-lg" title="View Transaction Statement"></i>
  </Link>
    <h3 className="text-sm font-semibold mb-2 text-violet-800">Total Expenses</h3>
    <p className="text-sm font-bold text-violet-800">{ newtotalexpenditure || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId13}
        onChange={(selectedId) => setBranchId13(selectedId)}
      /> */}
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date13}
        onChange={(e) => setDate13(e.target.value)}
      />
  
    </form>
  </div>

  {/* Card 15 - Fuchsia */}
  <div className="p-4 rounded-lg shadow-md bg-fuchsia-100">
    <h3 className="text-sm font-semibold mb-2 text-fuchsia-800">Profit</h3>
    <p className="text-sm font-bold text-fuchsia-800">{ newprofit || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId14}
        onChange={(selectedId) => setBranchId14(selectedId)}
      /> */}
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date14}
        onChange={(e) => setDate14(e.target.value)}
      />
  
    </form>
  </div>
</div>
</div>

  );
};

export default ManagerDashboard;
