import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchBranchRequest } from "../redux/slices/branchSlice";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FaEye } from "react-icons/fa";


import {
  // fetchBranchDSContributionRequest,
  // fetchBranchSBContributionRequest,
  // fetcBranchTotalSBandDSRequest,
  fetchBranchDSDailyContributionRequest,
  fetchBranchFDDailyContributionRequest,
  fetchBranchSBDailyContributionRequest,
  fetchBranchTotalSBandDSDailyRequest,
  fetchBranchDSWithdrawalRequest,
  fetchBranchDSpackageRequest,
  fetchBranchSBpackageRequest,
  fetchBranchPackageRequest,
  fetchBranchFDpackageRequest,
  // fetchBranchFDContributionRequest,
  fetchBranchTotalExpenditureRequest,
  fetchBranchEcommerceDepositRequest,
  fetchBranchEcommerceDepositReportRequest
} from '../redux/slices/managerdashboardSlice'
import Loader from "./Loader";
// import Select2 from "./Select2";
import EcommerceDepositDetailsModal from "./EcommerceDepositDetailsModal";
import DashboardDateRangeFields from "./DashboardDateRangeFields";

const getDateRangeValue = (dateRanges, key) =>
  dateRanges[key] || { startDate: "", endDate: "" };



const ManagerDashboard = () => {
    const dispatch = useDispatch();
    // const { branches } = useSelector((state) => state.branch);
    const [dateRanges, setDateRanges] = useState({});
    const [isEcommerceDepositModalOpen, setIsEcommerceDepositModalOpen] = useState(false);

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
      // branchdscontribution,
      // branchsbcontribution,
      // branchtotalsbandds,
      branchdailyds,
      branchdailyfd,
      branchdailysb,
      branchtotaldailysbandds,
      branchdswithdrawal,
      branchdspackage,
      branchsbpackage,
      branchpackages,
      branchtotalexpenditure,
      // fdcontribution,
      fdpackage,
      branchEcommerceDeposit,
      branchEcommerceDepositReport,
    } = useSelector((state)=>state.managerdashboard)
      // const newdsContribution = branchdscontribution || 0
      // const newsbContribution = branchsbcontribution || 0
      // const newtotalsbandds = branchtotalsbandds || 0
      const newdailyds =  branchdailyds || 0
      const newdailyfd =  branchdailyfd || 0
      const newdailysb =  branchdailysb || 0
      const newtotaldailysbandds =  branchtotaldailysbandds || 0
      const newdswithdrawal =  branchdswithdrawal || 0
      const newdspackage =  branchdspackage || 0
      const newsbpackage =  branchsbpackage || 0
      const newpackages =  branchpackages || 0
      const newtotalexpenditure =  branchtotalexpenditure || 0
      const newfdpackage = fdpackage || 0
      const newBranchEcommerceDeposit = branchEcommerceDeposit || 0

      const openEcommerceDepositModal = () => {
        const details18 = { date: getDateRangeValue(dateRanges, "date17") };
        dispatch(fetchBranchEcommerceDepositReportRequest({ details18 }));
        setIsEcommerceDepositModalOpen(true);
      };
      // const newfdContribution = fdcontribution || 0
    //   useEffect(() => {
    //     dispatch(fetchBranchRequest());
    //   }, [dispatch]);

      useEffect(() => {
        // const details = {  date: date };
        // const details1 = { date: date1 };
        const details2 = { date: getDateRangeValue(dateRanges, "date2") };
        const details3 = { date: getDateRangeValue(dateRanges, "date3") };
        const details4 = { date: getDateRangeValue(dateRanges, "date4") };
        const details5 = { date: getDateRangeValue(dateRanges, "date5") };
        const details6 = { date: getDateRangeValue(dateRanges, "date6") };
        const details7 = { date: getDateRangeValue(dateRanges, "date7") };
        const details8 = { date: getDateRangeValue(dateRanges, "date8") };
        const details9 = { date: getDateRangeValue(dateRanges, "date9") };
        const details13 = { date: getDateRangeValue(dateRanges, "date13") };
        // const details15 = { date: date15 };
        const details16 = { date: getDateRangeValue(dateRanges, "date16")};
        const details17 = { date: getDateRangeValue(dateRanges, "date17") };
        const details18 = { date: getDateRangeValue(dateRanges, "date17") };
        // const data = {details}
        // const data1 = {details1}
        const data2 = {details2}
        const data3 = {details3}
        const data4 = {details4}
        const data5 = {details5}
        const data6 = {details6}
        const data7 = {details7}
        const data8 = {details8}
        const data9 = {details9}
        const data13 = {details13}
        // const data15 = {details15}
        const data16 = {details16}
        const data17 = {details17}
        const data18 = {details18}
        // dispatch(fetchBranchDSContributionRequest(data));
        // dispatch(fetchBranchSBContributionRequest(data1));
        // dispatch(fetcBranchTotalSBandDSRequest(data2)); 
        dispatch(fetchBranchDSDailyContributionRequest(data3)); 
        dispatch(fetchBranchFDDailyContributionRequest(data2)); 
        dispatch(fetchBranchSBDailyContributionRequest(data4)); 
        dispatch(fetchBranchTotalSBandDSDailyRequest(data5)); 
        dispatch(fetchBranchDSWithdrawalRequest(data6)); 
        dispatch(fetchBranchDSpackageRequest(data7)); 
        dispatch(fetchBranchSBpackageRequest(data8)); 
        dispatch(fetchBranchPackageRequest(data9)); 
        dispatch(fetchBranchTotalExpenditureRequest(data13)); 
        // dispatch(fetchBranchFDContributionRequest(data15));
        dispatch(fetchBranchFDpackageRequest(data16));
        dispatch(fetchBranchEcommerceDepositRequest(data17));
        dispatch(fetchBranchEcommerceDepositReportRequest(data18));
   
    }, [
      dispatch,
      dateRanges,
  
    ]);
    
  return (
<div className="p-6">
  {loading && <Loader />}
  <h1 className="text-2xl font-bold mb-4 mt-10 text-center">Manager Dashboard</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

  {/* Card 4 - Yellow */}
  <div className="p-4 rounded-lg shadow-md bg-yellow-100">
    <h3 className="text-sm font-semibold mb-2 text-yellow-800">Total DS Daily Contribution</h3>
    <p className="text-sm font-bold text-yellow-800">{newdailyds?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId3}
        onChange={(selectedId) => setBranchId3(selectedId)}
      /> */}
      <DashboardDateRangeFields rangeKey="date3" dateRanges={dateRanges} setDateRanges={setDateRanges} />
    
    </form>
  </div>

  {/* Card 5 - Purple */}
  <div className="p-4 rounded-lg shadow-md bg-purple-100">
    <h3 className="text-sm font-semibold mb-2 text-purple-800">Total SB Daily Contribution</h3>
    <p className="text-sm font-bold text-purple-800">{newdailysb?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId4}
        onChange={(selectedId) => setBranchId4(selectedId)}
      /> */}
      <DashboardDateRangeFields rangeKey="date4" dateRanges={dateRanges} setDateRanges={setDateRanges} />
    
    </form>
  </div>
  {/* Card 5 - Purple */}
  <div className="p-4 rounded-lg shadow-md bg-purple-100">
    <h3 className="text-sm font-semibold mb-2 text-purple-800">Total FD Daily Contribution</h3>
    <p className="text-sm font-bold text-purple-800">{newdailyfd?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId4}
        onChange={(selectedId) => setBranchId4(selectedId)}
      /> */}
      <DashboardDateRangeFields rangeKey="date2" dateRanges={dateRanges} setDateRanges={setDateRanges} />
    
    </form>
  </div>

  {/* Card 6 - Indigo */}
  <div className="p-4 rounded-lg shadow-md bg-indigo-100">
    <h3 className="text-sm font-semibold mb-2 text-indigo-800">Total Daily Contribution</h3>
    <p className="text-sm font-bold text-indigo-800">{newtotaldailysbandds?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId5}
        onChange={(selectedId) => setBranchId5(selectedId)}
      /> */}
      <DashboardDateRangeFields rangeKey="date5" dateRanges={dateRanges} setDateRanges={setDateRanges} />
  
    </form>
  </div>

  {/* Card 7 - Pink */}
  <div className="p-4 rounded-lg shadow-md bg-pink-100">
    <h3 className="text-sm font-semibold mb-2 text-pink-800">DS Withdrawal</h3>
    <p className="text-sm font-bold text-pink-800">{newdswithdrawal?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId6}
        onChange={(selectedId) => setBranchId6(selectedId)}
      /> */}
      <DashboardDateRangeFields rangeKey="date6" dateRanges={dateRanges} setDateRanges={setDateRanges} />
  
    </form>
  </div>

  {/* Card 8 - Teal */}
  <div className="p-4 rounded-lg shadow-md bg-teal-100">
    <h3 className="text-sm font-semibold mb-2 text-teal-800">DS Package</h3>
    <p className="text-sm font-bold text-teal-800">{newdspackage?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId7}
        onChange={(selectedId) => setBranchId7(selectedId)}
      /> */}
      <DashboardDateRangeFields rangeKey="date7" dateRanges={dateRanges} setDateRanges={setDateRanges} />

    </form>
  </div>

  {/* Card 9 - Orange */}
  <div className="p-4 rounded-lg shadow-md bg-orange-100">
    <h3 className="text-sm font-semibold mb-2 text-orange-800">SB Package</h3>
    <p className="text-sm font-bold text-orange-800">{newsbpackage?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId8}
        onChange={(selectedId) => setBranchId8(selectedId)}
      /> */}
      <DashboardDateRangeFields rangeKey="date8" dateRanges={dateRanges} setDateRanges={setDateRanges} />
  
    </form>
  </div>
  {/* Card 16 - Fuchsia */}
  <div className="p-4 rounded-lg shadow-md bg-fuchsia-100">
    <h3 className="text-sm font-semibold mb-2 text-fuchsia-800">FD Package</h3>
    <p className="text-sm font-bold text-fuchsia-800">{ newfdpackage?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId16}
        onChange={(selectedId) => setBranchId16(selectedId)}
      /> */}
      <DashboardDateRangeFields rangeKey="date16" dateRanges={dateRanges} setDateRanges={setDateRanges} />
  
    </form>
  </div>
  {/* Card 10 - Cyan */}
  <div className="p-4 rounded-lg shadow-md bg-cyan-100">
    <h3 className="text-sm font-semibold mb-2 text-cyan-800">Total Packages</h3>
    <p className="text-sm font-bold text-cyan-800">{newpackages?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId9}
        onChange={(selectedId) => setBranchId9(selectedId)}
      /> */}
      <DashboardDateRangeFields rangeKey="date9" dateRanges={dateRanges} setDateRanges={setDateRanges} />
 
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
    <p className="text-sm font-bold text-emerald-800">{newBranchEcommerceDeposit?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      <DashboardDateRangeFields rangeKey="date17" dateRanges={dateRanges} setDateRanges={setDateRanges} />
    </form>
  </div>
  {/* Card 14 - Violet */}
  <div className="relative p-4 rounded-lg shadow-md bg-violet-100">
         {/* Transaction Statement Icon (Top-right Corner) */}
  <Link to="/branchexpenditurereport" className="absolute top-2 right-2 text-lime-800 hover:text-lime-900">
  <p className="text-sm md:text-sm">View Expenditure</p>
  </Link>
    <h3 className="text-sm font-semibold mb-2 text-violet-800">Total Expenses</h3>
    <p className="text-sm font-bold text-violet-800">{ newtotalexpenditure?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId13}
        onChange={(selectedId) => setBranchId13(selectedId)}
      /> */}
      <DashboardDateRangeFields rangeKey="date13" dateRanges={dateRanges} setDateRanges={setDateRanges} />
  
    </form>
  </div>



</div>

<EcommerceDepositDetailsModal
  isOpen={isEcommerceDepositModalOpen}
  onClose={() => setIsEcommerceDepositModalOpen(false)}
  title="Branch Ecommerce Deposit Details"
  transactions={branchEcommerceDepositReport}
  showStaff
/>
</div>

  );
};

export default ManagerDashboard;
