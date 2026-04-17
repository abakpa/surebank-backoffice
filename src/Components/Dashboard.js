import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranchRequest } from "../redux/slices/branchSlice";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FaEye } from "react-icons/fa";


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
  fetchAvailablaBalanceRequest,
  fetchEcommerceIncomeRequest,
  fetchEcommerceDepositRequest,
  fetchEcommerceDepositReportRequest
} from '../redux/slices/dashboardSlice'
import Loader from "./Loader";
import Select2 from "./Select2";
import EcommerceDepositDetailsModal from "./EcommerceDepositDetailsModal";
import DashboardDateRangeFields from "./DashboardDateRangeFields";

const getDateRangeValue = (dateRanges, key) =>
  dateRanges[key] || { startDate: "", endDate: "" };



const Dashboard = () => {
    const dispatch = useDispatch();
    const { branches } = useSelector((state) => state.branch);
      // Exclude "Head office"
  const branchOptions = branches
  .filter((branch) => branch.name !== "Head office")
  .map((branch) => ({ label: branch.name, value: branch._id }));
    const [dateRanges, setDateRanges] = useState({});
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
    const [branchId22, setBranchId22] = useState("");
    const [branchId23, setBranchId23] = useState("");
    const [isEcommerceDepositModalOpen, setIsEcommerceDepositModalOpen] = useState(false);
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
      availablebalance,
      ecommerceIncome,
      ecommerceDeposit,
      ecommerceDepositReport
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
      const newEcommerceIncome = ecommerceIncome || 0
      const newEcommerceDeposit = ecommerceDeposit || 0

      const openEcommerceDepositModal = () => {
        const details24 = { branchId: branchId23, date: getDateRangeValue(dateRanges, "date23") };
        dispatch(fetchEcommerceDepositReportRequest({ details24 }));
        setIsEcommerceDepositModalOpen(true);
      };



      useEffect(() => {
        dispatch(fetchBranchRequest());
      }, [dispatch]);

      useEffect(() => {
        const details = { branchId: branchId, date: getDateRangeValue(dateRanges, "date") };
        const details1 = { branchId: branchId1, date: getDateRangeValue(dateRanges, "date1") };
        const details2 = { branchId: branchId2, date: getDateRangeValue(dateRanges, "date2") };
        const details3 = { branchId: branchId3, date: getDateRangeValue(dateRanges, "date3") };
        const details4 = { branchId: branchId4, date: getDateRangeValue(dateRanges, "date4") };
        const details5 = { branchId: branchId5, date: getDateRangeValue(dateRanges, "date5") };
        const details6 = { branchId: branchId6, date: getDateRangeValue(dateRanges, "date6") };
        const details7 = { branchId: branchId7, date: getDateRangeValue(dateRanges, "date7") };
        const details8 = { branchId: branchId8, date: getDateRangeValue(dateRanges, "date8") };
        const details9 = { branchId: branchId9, date: getDateRangeValue(dateRanges, "date9") };
        const details10 = { branchId: branchId10, date: getDateRangeValue(dateRanges, "date10") };
        const details11 = { branchId: branchId11, date: getDateRangeValue(dateRanges, "date11") };
        const details12 = { branchId: branchId12, date: getDateRangeValue(dateRanges, "date12") };
        const details13 = { branchId: branchId13, date: getDateRangeValue(dateRanges, "date13") };
        const details14 = { branchId: branchId14, date: getDateRangeValue(dateRanges, "date14") };
        const details15 = { branchId: branchId15, date: getDateRangeValue(dateRanges, "date15") };
        const details16 = { branchId: branchId16, date: getDateRangeValue(dateRanges, "date16") };
        const details17 = { branchId: branchId17, date: getDateRangeValue(dateRanges, "date17") };
        const details18 = { branchId: branchId18, date: getDateRangeValue(dateRanges, "date18") };
        const details19 = { branchId: branchId19, date: getDateRangeValue(dateRanges, "date19") };
        const details20 = { branchId: branchId20, date: getDateRangeValue(dateRanges, "date20") };
        const details21 = { branchId: branchId21, date: getDateRangeValue(dateRanges, "date21") };
        const details22 = { branchId: branchId22, date: getDateRangeValue(dateRanges, "date22") };
        const details23 = { branchId: branchId23, date: getDateRangeValue(dateRanges, "date23") };
        const details24 = { branchId: branchId23, date: getDateRangeValue(dateRanges, "date23") };
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
        const data22 = {details22}
        const data23 = {details23}
        const data24 = {details24}

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
        dispatch(fetchEcommerceIncomeRequest(data22));
        dispatch(fetchEcommerceDepositRequest(data23));
        dispatch(fetchEcommerceDepositReportRequest(data24));

    }, [
      dispatch,
      dateRanges,
      branchId,
      branchId1,
      branchId2,
      branchId3,
      branchId4,
      branchId5,
      branchId6,
      branchId7,
      branchId8,
      branchId9,
      branchId10,
      branchId11,
      branchId12,
      branchId13,
      branchId14,
      branchId15,
      branchId16,
      branchId17,
      branchId18,
      branchId19,
      branchId20,
      branchId21,
      branchId22,
      branchId23,
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
      <DashboardDateRangeFields rangeKey="date3" dateRanges={dateRanges} setDateRanges={setDateRanges} />
    
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
      <DashboardDateRangeFields rangeKey="date4" dateRanges={dateRanges} setDateRanges={setDateRanges} />
    
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
      <DashboardDateRangeFields rangeKey="date19" dateRanges={dateRanges} setDateRanges={setDateRanges} />
    
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
      <DashboardDateRangeFields rangeKey="date5" dateRanges={dateRanges} setDateRanges={setDateRanges} />
  
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
      <DashboardDateRangeFields rangeKey="date21" dateRanges={dateRanges} setDateRanges={setDateRanges} />
   
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
      <DashboardDateRangeFields rangeKey="date6" dateRanges={dateRanges} setDateRanges={setDateRanges} />
  
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
      <DashboardDateRangeFields rangeKey="date7" dateRanges={dateRanges} setDateRanges={setDateRanges} />

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
      <DashboardDateRangeFields rangeKey="date8" dateRanges={dateRanges} setDateRanges={setDateRanges} />
  
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
      <DashboardDateRangeFields rangeKey="date16" dateRanges={dateRanges} setDateRanges={setDateRanges} />
  
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
      <DashboardDateRangeFields rangeKey="date9" dateRanges={dateRanges} setDateRanges={setDateRanges} />
 
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
      <DashboardDateRangeFields rangeKey="date" dateRanges={dateRanges} setDateRanges={setDateRanges} />
   
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
      <DashboardDateRangeFields rangeKey="date1" dateRanges={dateRanges} setDateRanges={setDateRanges} />
  
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
      <DashboardDateRangeFields rangeKey="date15" dateRanges={dateRanges} setDateRanges={setDateRanges} />
  
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
      <DashboardDateRangeFields rangeKey="date2" dateRanges={dateRanges} setDateRanges={setDateRanges} />
  
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
      <DashboardDateRangeFields rangeKey="date17" dateRanges={dateRanges} setDateRanges={setDateRanges} />
  
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
      <DashboardDateRangeFields rangeKey="date18" dateRanges={dateRanges} setDateRanges={setDateRanges} />
  
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
      <DashboardDateRangeFields rangeKey="date10" dateRanges={dateRanges} setDateRanges={setDateRanges} />
  
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
    <DashboardDateRangeFields rangeKey="date11" dateRanges={dateRanges} setDateRanges={setDateRanges} />
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
    <DashboardDateRangeFields rangeKey="date20" dateRanges={dateRanges} setDateRanges={setDateRanges} />
  </form>
</div>

  {/* Ecommerce Income Card */}
  <div className="relative p-4 rounded-lg shadow-md bg-sky-100">
    <Link to="/ecommerce-income" className="absolute top-2 right-2 text-sky-800 hover:text-sky-900">
      <i className="fas fa-file-alt text-lg" title="View Ecommerce Income Report"></i>
    </Link>
    <h3 className="text-sm font-semibold mb-2 text-sky-800">Ecommerce Income</h3>
    <p className="text-sm font-bold text-sky-800">{newEcommerceIncome?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId22}
        onChange={(selectedId) => setBranchId22(selectedId)}
      />
      <DashboardDateRangeFields rangeKey="date22" dateRanges={dateRanges} setDateRanges={setDateRanges} />
    </form>
  </div>

  <div className="relative p-4 rounded-lg shadow-md bg-emerald-100">
    <button
      type="button"
      onClick={openEcommerceDepositModal}
      className="absolute right-3 top-3 text-emerald-800 hover:text-emerald-900"
      title="View ecommerce deposit details"
    >
      <FaEye className="text-lg" />
    </button>
    <h3 className="text-sm font-semibold mb-2 text-emerald-800">Ecommerce Deposit</h3>
    <p className="text-sm font-bold text-emerald-800">{newEcommerceDeposit?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      <Select2
        label="Branch"
        options={branchOptions}
        value={branchId23}
        onChange={(selectedId) => setBranchId23(selectedId)}
      />
      <DashboardDateRangeFields rangeKey="date23" dateRanges={dateRanges} setDateRanges={setDateRanges} />
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
      <DashboardDateRangeFields rangeKey="date12" dateRanges={dateRanges} setDateRanges={setDateRanges} />

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
      <DashboardDateRangeFields rangeKey="date13" dateRanges={dateRanges} setDateRanges={setDateRanges} />
  
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
      <DashboardDateRangeFields rangeKey="date14" dateRanges={dateRanges} setDateRanges={setDateRanges} />
  
    </form>
  </div>


</div>

<EcommerceDepositDetailsModal
  isOpen={isEcommerceDepositModalOpen}
  onClose={() => setIsEcommerceDepositModalOpen(false)}
  title="Ecommerce Deposit Details"
  transactions={ecommerceDepositReport}
  showBranch
  showStaff
/>
</div>

  );
};

export default Dashboard;
