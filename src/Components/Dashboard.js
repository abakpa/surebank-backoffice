import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import { Link } from "react-router-dom"; // Import Link from react-router-dom


import {
  fetchDSContributionRequest,
  fetchSBContributionRequest,
  fetchFDContributionRequest,
  fetchFDInterestIncomeRequest,
  fetchFDInterestExpenseRequest,
  fetcTotalSBandDSRequest,
  fetchDSDailyContributionRequest,
  fetchFDDailyContributionRequest,
  fetchSBDailyContributionRequest,
  fetchTotalSBandDSDailyRequest,
  fetchDSWithdrawalRequest,
  fetchDSpackageRequest,
  fetchSBpackageRequest,
  fetchFDpackageRequest,
  fetchPackageRequest,
  fetchDSincomeRequest,
  fetchFDincomeRequest,
  fetchSBincomeRequest,
  fetchTotalincomeRequest,
  fetchTotalExpenditureRequest,
  fetchTotalProfitRequest,
  fetchAvailablaBalanceRequest
} from '../redux/slices/dashboardSlice'
import Loader from "./Loader";
import Select2 from "./Select2";



const Dashboard = () => {
    const dispatch = useDispatch();
    const { branches } = useSelector((state) => state.branch);
      // Exclude "Head office"
  const branchOptions = branches
  .filter((branch) => branch.name !== "Head office")
  .map((branch) => ({ label: branch.name, value: branch._id }));
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
    const [date15, setDate15] = useState("");
    const [date16, setDate16] = useState("");
    const [date17, setDate17] = useState("");
    const [date18, setDate18] = useState("");
    const [date19, setDate19] = useState("");
    const [date20, setDate20] = useState("");
    const [date21, setDate21] = useState("");
    const [branchId, setBranchId] = useState("");
    const [branchId1, setBranchId1] = useState("");
    const [branchId2, setBranchId2] = useState("");
    const [branchId3, setBranchId3] = useState("");
    const [branchId4, setBranchId4] = useState("");
    const [branchId5, setBranchId5] = useState("");
    const [branchId6, setBranchId6] = useState("");
    const [branchId7, setBranchId7] = useState("");
    const [branchId8, setBranchId8] = useState("");
    const [branchId9, setBranchId9] = useState("");
    const [branchId10, setBranchId10] = useState("");
    const [branchId11, setBranchId11] = useState("");
    const [branchId12, setBranchId12] = useState("");
    const [branchId13, setBranchId13] = useState("");
    const [branchId14, setBranchId14] = useState("");
    const [branchId15, setBranchId15] = useState("");
    const [branchId16, setBranchId16] = useState("");
    const [branchId17, setBranchId17] = useState("");
    const [branchId18, setBranchId18] = useState("");
    const [branchId19, setBranchId19] = useState("");
    const [branchId20, setBranchId20] = useState("");
    const [branchId21, setBranchId21] = useState("");
    const {
      loading,
      dscontribution,
      sbcontribution,
      fdcontribution,
      fdinterestincome,
      fdinterestexpense,
      fdpackage,
      totalsbandds,
      dailyds,
      dailyfd,
      dailysb,
      totaldailysbandds,
      dswithdrawal,
      dspackage,
      sbpackage,
      packages,
      dsincome,
      sbincome,
      fdincome,
      totalincome,
      totalexpenditure,
      profit,
      availablebalance
    } = useSelector((state)=>state.dashboard)
      const newdsContribution = dscontribution || 0
      const newsbContribution = sbcontribution || 0
      const newfdContribution = fdcontribution || 0
      const newtotalsbandds = totalsbandds || 0
      const newdailyds = dailyds || 0
      const newdailyfd = dailyfd || 0
      const newdailysb = dailysb || 0
      const newtotaldailysbandds = totaldailysbandds || 0
      const newdswithdrawal = dswithdrawal || 0
      const newdspackage = dspackage || 0
      const newsbpackage = sbpackage || 0
      const newfdpackage = fdpackage || 0
      const newpackages = packages || 0
      const newdsincome = dsincome || 0
      const newsbincome = sbincome || 0
      const newfdincome = fdincome || 0
      const newtotalincome = totalincome || 0
      const newtotalexpenditure = totalexpenditure || 0
      const newprofit = profit || 0
      const newinterestincome = fdinterestincome || 0
      const newinterestexpense = fdinterestexpense || 0
      const newAvailableBalance = availablebalance || 0



      useEffect(() => {
        dispatch(fetchBranchRequest());
      }, [dispatch]);

      useEffect(() => {
        const details = { branchId: branchId, date: date };
        const details1 = { branchId: branchId1, date: date1 };
        const details2 = { branchId: branchId2, date: date2 };
        const details3 = { branchId: branchId3, date: date3 };
        const details4 = { branchId: branchId4, date: date4 };
        const details5 = { branchId: branchId5, date: date5 };
        const details6 = { branchId: branchId6, date: date6 };
        const details7 = { branchId: branchId7, date: date7 };
        const details8 = { branchId: branchId8, date: date8 };
        const details9 = { branchId: branchId9, date: date9 };
        const details10 = { branchId: branchId10, date: date10 };
        const details11 = { branchId: branchId11, date: date11 };
        const details12 = { branchId: branchId12, date: date12 };
        const details13 = { branchId: branchId13, date: date13 };
        const details14 = { branchId: branchId14, date: date14 };
        const details15 = { branchId: branchId15, date: date15 };
        const details16 = { branchId: branchId16, date: date16 };
        const details17 = { branchId: branchId17, date: date17 };
        const details18 = { branchId: branchId18, date: date18 };
        const details19 = { branchId: branchId19, date: date19 };
        const details20 = { branchId: branchId20, date: date20 };
        const details21 = { branchId: branchId21, date: date21 };
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
        const data15 = {details15}
        const data16 = {details16}
        const data17 = {details17}
        const data18 = {details18}
        const data19 = {details19}
        const data20 = {details20}
        const data21 = {details21}
    
        dispatch(fetchDSContributionRequest(data));
        dispatch(fetchSBContributionRequest(data1));
        dispatch(fetcTotalSBandDSRequest(data2)); 
        dispatch(fetchDSDailyContributionRequest(data3)); 
        dispatch(fetchFDDailyContributionRequest(data19)); 
        dispatch(fetchSBDailyContributionRequest(data4)); 
        dispatch(fetchTotalSBandDSDailyRequest(data5)); 
        dispatch(fetchDSWithdrawalRequest(data6)); 
        dispatch(fetchDSpackageRequest(data7)); 
        dispatch(fetchSBpackageRequest(data8)); 
        dispatch(fetchPackageRequest(data9)); 
        dispatch(fetchDSincomeRequest(data10)); 
        dispatch(fetchFDincomeRequest(data20)); 
        dispatch(fetchAvailablaBalanceRequest(data21)); 
        dispatch(fetchSBincomeRequest(data11)); 
        dispatch(fetchTotalincomeRequest(data12)); 
        dispatch(fetchTotalExpenditureRequest(data13)); 
        dispatch(fetchTotalProfitRequest(data14)); 
        dispatch(fetchFDContributionRequest(data15));
        dispatch(fetchFDpackageRequest(data16));
        dispatch(fetchFDInterestIncomeRequest(data17));
        dispatch(fetchFDInterestExpenseRequest(data18));

    }, [
      dispatch,
      branchId,
      date,
      branchId1,
      date1,
      branchId2,
      date2,
      branchId3,
      date3,
      branchId4,
      date4,
      branchId5,
      date5,
      branchId6,
      date6,
      branchId7,
      date7,
      branchId8,
      date8,
      branchId9,
      date9,
      branchId10,
      date10,
      branchId11,
      date11,
      branchId12,
      date12,
      branchId13,
      date13,
      branchId14,
      date14,
      branchId15,
      date15,
      branchId16,
      date16,
      branchId17,
      date17,
      branchId18,
      date18,
      branchId19,
      date19,
      branchId20,
      date20,
      branchId21,
      date21,
    ]);
    
  return (
<div className="p-6">
  {loading && <Loader />}
  <h1 className="text-2xl font-bold mb-4 mt-10 text-center">Admin Dashboard</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 4 - Yellow */}
  <div className="p-4 rounded-lg shadow-md bg-yellow-100">
    <h3 className="text-sm font-semibold mb-2 text-yellow-800">Total DS Daily Contribution</h3>
    <p className="text-sm font-bold text-yellow-800">{newdailyds?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId3}
        onChange={(selectedId) => setBranchId3(selectedId)}
      />
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
    <p className="text-sm font-bold text-purple-800">{newdailysb?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId4}
        onChange={(selectedId) => setBranchId4(selectedId)}
      />
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date4}
        onChange={(e) => setDate4(e.target.value)}
      />
    
    </form>
  </div>
  {/* Card 5 - Purple */}
  <div className="p-4 rounded-lg shadow-md bg-purple-100">
    <h3 className="text-sm font-semibold mb-2 text-purple-800">Total FD Daily Contribution</h3>
    <p className="text-sm font-bold text-purple-800">{newdailyfd?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId19}
        onChange={(selectedId) => setBranchId19(selectedId)}
      />
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date19}
        onChange={(e) => setDate19(e.target.value)}
      />
    
    </form>
  </div>
    {/* Card 6 - Indigo */}
  <div className="p-4 rounded-lg shadow-md bg-indigo-100">
    <h3 className="text-sm font-semibold mb-2 text-indigo-800">Total Daily Contribution</h3>
    <p className="text-sm font-bold text-indigo-800">{newtotaldailysbandds?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId5}
        onChange={(selectedId) => setBranchId5(selectedId)}
      />
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date5}
        onChange={(e) => setDate5(e.target.value)}
      />
  
    </form>
  </div>
  {/* Card 1 - Blue */}
  <div className="p-4 rounded-lg shadow-md bg-blue-100">
    <h3 className="text-sm font-semibold mb-2 text-blue-800">Free to Withdraw</h3>
    <p className="text-sm font-bold text-blue-800">{newAvailableBalance?.toLocaleString('en-US')}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId21}
        onChange={(selectedId) => setBranchId21(selectedId)}
      />
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date21}
        onChange={(e) => setDate21(e.target.value)}
      />
   
    </form>
  </div>
   {/* Card 7 - Pink */}
  <div className="p-4 rounded-lg shadow-md bg-pink-100">
    <h3 className="text-sm font-semibold mb-2 text-pink-800">DS Withdrawal</h3>
    <p className="text-sm font-bold text-pink-800">{newdswithdrawal?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId6}
        onChange={(selectedId) => setBranchId6(selectedId)}
      />
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
    <p className="text-sm font-bold text-teal-800">{newdspackage?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId7}
        onChange={(selectedId) => setBranchId7(selectedId)}
      />
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
    <p className="text-sm font-bold text-orange-800">{newsbpackage?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId8}
        onChange={(selectedId) => setBranchId8(selectedId)}
      />
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date8}
        onChange={(e) => setDate8(e.target.value)}
      />
  
    </form>
  </div>
    {/* Card 16 - Fuchsia */}
    <div className="p-4 rounded-lg shadow-md bg-fuchsia-100">
    <h3 className="text-sm font-semibold mb-2 text-fuchsia-800">FD Package</h3>
    <p className="text-sm font-bold text-fuchsia-800">{ newfdpackage?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId16}
        onChange={(selectedId) => setBranchId16(selectedId)}
      />
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date16}
        onChange={(e) => setDate16(e.target.value)}
      />
  
    </form>
  </div>
   {/* Card 10 - Cyan */}
  <div className="p-4 rounded-lg shadow-md bg-cyan-100">
    <h3 className="text-sm font-semibold mb-2 text-cyan-800">Total Packages</h3>
    <p className="text-sm font-bold text-cyan-800">{newpackages?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId9}
        onChange={(selectedId) => setBranchId9(selectedId)}
      />
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date9}
        onChange={(e) => setDate9(e.target.value)}
      />
 
    </form>
  </div>
  {/* Card 1 - Blue */}
  <div className="p-4 rounded-lg shadow-md bg-blue-100">
    <h3 className="text-sm font-semibold mb-2 text-blue-800">Total DS Contribution</h3>
    <p className="text-sm font-bold text-blue-800">{newdsContribution?.toLocaleString('en-US')}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId}
        onChange={(selectedId) => setBranchId(selectedId)}
      />
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
    <p className="text-sm font-bold text-green-800">{newsbContribution?.toLocaleString('en-US')}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId1}
        onChange={(selectedId) => setBranchId1(selectedId)}
      />
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date1}
        onChange={(e) => setDate1(e.target.value)}
      />
  
    </form>
  </div>
    {/* Card 16 - Fuchsia */}
    <div className="relative p-4 rounded-lg shadow-md bg-violet-100">
  <Link to="/fdreport" className="absolute top-2 right-2 text-lime-800 hover:text-lime-900">
    <i className="fas fa-file-alt text-lg" title="View Transaction Statement"></i>
  </Link>
    <h3 className="text-sm font-semibold mb-2 text-fuchsia-800">Total FD Contribution</h3>
    <p className="text-sm font-bold text-fuchsia-800">{ newfdContribution?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId15}
        onChange={(selectedId) => setBranchId15(selectedId)}
      />
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date15}
        onChange={(e) => setDate15(e.target.value)}
      />
  
    </form>
  </div>
   {/* Card 3 - Red */}
  <div className="p-4 rounded-lg shadow-md bg-red-100">
    <h3 className="text-sm font-semibold mb-2 text-red-800">Total Contribution</h3>
    <p className="text-sm font-bold text-red-800">{newtotalsbandds?.toLocaleString('en-US')}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId2}
        onChange={(selectedId) => setBranchId2(selectedId)}
      />
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date2}
        onChange={(e) => setDate2(e.target.value)}
      />
  
    </form>
  </div>
  {/* Card 15 - Fuchsia */}
  <div className="p-4 rounded-lg shadow-md bg-fuchsia-100">
    <h3 className="text-sm font-semibold mb-2 text-fuchsia-800">FD Interest Icome</h3>
    <p className="text-sm font-bold text-fuchsia-800">{ newinterestincome?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId17}
        onChange={(selectedId) => setBranchId17(selectedId)}
      />
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date17}
        onChange={(e) => setDate17(e.target.value)}
      />
  
    </form>
  </div>
  {/* Card 15 - Fuchsia */}
  <div className="p-4 rounded-lg shadow-md bg-fuchsia-100">
    <h3 className="text-sm font-semibold mb-2 text-fuchsia-800">FD Interest Expense</h3>
    <p className="text-sm font-bold text-fuchsia-800">{ newinterestexpense?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId18}
        onChange={(selectedId) => setBranchId18(selectedId)}
      />
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date18}
        onChange={(e) => setDate18(e.target.value)}
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
    <p className="text-sm font-bold text-amber-800">{newdsincome?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId10}
        onChange={(selectedId) => setBranchId10(selectedId)}
      />
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
  <Link to="/sbincome" className="absolute top-2 right-2 text-lime-800 hover:text-lime-900">
    <i className="fas fa-file-alt text-lg" title="View Transaction Statement"></i>
  </Link>

  <h3 className="text-sm font-semibold mb-2 text-lime-800">SB Income</h3>
  <p className="text-sm font-bold text-lime-800">{newsbincome?.toLocaleString('en-US') || 0}</p>

  <form className="flex flex-col gap-2 mt-2">
    <Select2
      label="Branch"
      options={branchOptions}
      value={branchId11}
      onChange={(selectedId) => setBranchId11(selectedId)}
    />
    <input 
      type="date" 
      className="p-2 border rounded-md" 
      value={date11}
      onChange={(e) => setDate11(e.target.value)}
    />
  </form>
</div>
{/* Card 12 - Lime */}
<div className="relative p-4 rounded-lg shadow-md bg-lime-100">
  {/* Transaction Statement Icon (Top-right Corner) */}
  <Link to="/fdincome" className="absolute top-2 right-2 text-lime-800 hover:text-lime-900">
    <i className="fas fa-file-alt text-lg" title="View Transaction Statement"></i>
  </Link>

  <h3 className="text-sm font-semibold mb-2 text-lime-800">FD Income</h3>
  <p className="text-sm font-bold text-lime-800">{newfdincome?.toLocaleString('en-US') || 0}</p>

  <form className="flex flex-col gap-2 mt-2">
    <Select2
      label="Branch"
      options={branchOptions}
      value={branchId20}
      onChange={(selectedId) => setBranchId20(selectedId)}
    />
    <input 
      type="date" 
      className="p-2 border rounded-md" 
      value={date20}
      onChange={(e) => setDate20(e.target.value)}
    />
  </form>
</div>



  {/* Card 13 - Emerald */}
  <div className="p-4 rounded-lg shadow-md bg-emerald-100">
    <h3 className="text-sm font-semibold mb-2 text-emerald-800">Total Income</h3>
    <p className="text-sm font-bold text-emerald-800">{newtotalincome?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId12}
        onChange={(selectedId) => setBranchId12(selectedId)}
      />
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
  <Link to="/expenditurereport" className="absolute top-2 right-2 text-lime-800 hover:text-lime-900">
  <p className="text-sm md:text-sm">View Expenditure</p>
  </Link>
    <h3 className="text-sm font-semibold mb-2 text-violet-800">Total Expenses</h3>
    <p className="text-sm font-bold text-violet-800">{ newtotalexpenditure?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId13}
        onChange={(selectedId) => setBranchId13(selectedId)}
      />
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
    <p className="text-sm font-bold text-fuchsia-800">{ newprofit?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId14}
        onChange={(selectedId) => setBranchId14(selectedId)}
      />
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

export default Dashboard;
