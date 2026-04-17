import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FaEye } from "react-icons/fa";

// import { useParams } from "react-router-dom";
// import { fetchBranchRequest } from "../redux/slices/branchSlice";
import { Link } from "react-router-dom"; // Import Link from react-router-dom


import {

  fetchRepDSDailyContributionRequest,
  fetchRepSBDailyContributionRequest,
  fetchRepFDDailyContributionRequest,
  fetchRepTotalSBandDSDailyRequest,
  fetchRepDSWithdrawalRequest,
  fetchRepDSpackageRequest,
  fetchRepSBpackageRequest,
  fetchRepFDpackageRequest,
  fetchRepPackageRequest,
  fetchRepTotalExpenditureRequest,
  fetchReferralRequest,
  fetchRepEcommerceDepositRequest,
  fetchRepEcommerceDepositReportRequest

} from '../redux/slices/repdashboardSlice'
import Loader from "./Loader";
// import Select2 from "./Select2";
import EcommerceDepositDetailsModal from "./EcommerceDepositDetailsModal";
import DashboardDateRangeFields from "./DashboardDateRangeFields";

const getDateRangeValue = (dateRanges, key) =>
  dateRanges[key] || { startDate: "", endDate: "" };



const RepDashboard = () => {
    const dispatch = useDispatch();
    //  const { staffId } = useParams();
      const { search } = useLocation();
      const query = new URLSearchParams(search);
      const staffId = query.get("staffId");
  const loggedInStaffRole = localStorage.getItem("staffRole");
    // const { branches } = useSelector((state) => state.branch);

    const [dateRanges, setDateRanges] = useState({});
    const [isEcommerceDepositModalOpen, setIsEcommerceDepositModalOpen] = useState(false);
    const {
      loading,
     repdailyds,
     repdailyfd,
     repdailysb,
     reptotaldailysbandds,
     repdswithdrawal,
     repdspackage,
     repsbpackage,
     reppackages,
     fdpackage,
     reptotalexpenditure,
     referral,
     repEcommerceDeposit,
     repEcommerceDepositReport
  
    } = useSelector((state)=>state.repdashboard)
  
      const newdailyds = repdailyds || 0
      const newdailyfd = repdailyfd || 0
      const newdailysb = repdailysb || 0
      const newtotaldailysbandds = reptotaldailysbandds || 0
      const newdswithdrawal = repdswithdrawal || 0
      const newdspackage = repdspackage || 0
      const newsbpackage = repsbpackage || 0
      const newpackages = reppackages || 0
      const newfdpackage = Number(fdpackage) || 0
      const newrepexpenditure = reptotalexpenditure || 0
      const newreferral = Number(referral) || 0
      const newRepEcommerceDeposit = repEcommerceDeposit || 0

      const openEcommerceDepositModal = () => {
        const details19 = { date: getDateRangeValue(dateRanges, "date18") };
        dispatch(fetchRepEcommerceDepositReportRequest({ details19 }));
        setIsEcommerceDepositModalOpen(true);
      };
      



    //   useEffect(() => {
    //     dispatch(fetchBranchRequest());
    //   }, [dispatch]);

      useEffect(() => {
    
        const details3 = { date: getDateRangeValue(dateRanges, "date3") };
        const details4 = { date: getDateRangeValue(dateRanges, "date4") };
        const details5 = { date: getDateRangeValue(dateRanges, "date5") };
        const details6 = { date: getDateRangeValue(dateRanges, "date6") };
        const details7 = { date: getDateRangeValue(dateRanges, "date7") };
        const details8 = { date: getDateRangeValue(dateRanges, "date8") };
        const details9 = { date: getDateRangeValue(dateRanges, "date9") };
        const details13 = { date: getDateRangeValue(dateRanges, "date13") };
        const details15 = { date: getDateRangeValue(dateRanges, "date15") };
        const details16 = { date: getDateRangeValue(dateRanges, "date16") };
        const details17 = { date: getDateRangeValue(dateRanges, "date17"),staffId:staffId };
        const details18 = { date: getDateRangeValue(dateRanges, "date18") };
        const details19 = { date: getDateRangeValue(dateRanges, "date18") };
    
   
        const data3 = {details3}
        const data4 = {details4}
        const data5 = {details5}
        const data6 = {details6}
        const data7 = {details7}
        const data8 = {details8}
        const data9 = {details9}
        const data13 = {details13}
        const data15 = {details15}
        const data16 = {details16}
        const data17 = {details17}
        const data18 = {details18}
        const data19 = {details19}
        dispatch(fetchReferralRequest(data17)); 
 
        dispatch(fetchRepDSDailyContributionRequest(data3)); 
        dispatch(fetchRepSBDailyContributionRequest(data4)); 
        dispatch(fetchRepFDDailyContributionRequest(data16)); 
        dispatch(fetchRepTotalSBandDSDailyRequest(data5)); 
        dispatch(fetchRepDSWithdrawalRequest(data6)); 
        dispatch(fetchRepDSpackageRequest(data7)); 
        dispatch(fetchRepSBpackageRequest(data8)); 
        dispatch(fetchRepFDpackageRequest(data15)); 
        dispatch(fetchRepPackageRequest(data9)); 
        dispatch(fetchRepTotalExpenditureRequest(data13)); 
        dispatch(fetchRepEcommerceDepositRequest(data18)); 
        dispatch(fetchRepEcommerceDepositReportRequest(data19)); 
 
    }, [
      dispatch,
      dateRanges,
      staffId
    ]);
    
  return (
<div className="p-6">
  {loading && <Loader />}
  <h1 className="text-2xl font-bold mb-4 mt-10 text-center">Rep Dashboard</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

  {/* Card 4 - Yellow */}
  {loggedInStaffRole === 'Agent' && (
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

      )}
  {/* Card 5 - Purple */}
  {loggedInStaffRole === 'Agent' && (

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
  )}
  {/* Card 5 - Purple */}
  {loggedInStaffRole === 'Agent' && (

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
      <DashboardDateRangeFields rangeKey="date16" dateRanges={dateRanges} setDateRanges={setDateRanges} />
    
    </form>
  </div>
  )}
  {/* Card 6 - Indigo */}
  {loggedInStaffRole === 'Agent' && (

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
  )}
  {/* Card 7 - Pink */}
  {loggedInStaffRole === 'Agent' && (

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
  )}
  {/* Card 8 - Teal */}
  {loggedInStaffRole === 'Agent' && (

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
  )}
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
    <p className="text-sm font-bold text-emerald-800">{newRepEcommerceDeposit?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
      <DashboardDateRangeFields rangeKey="date18" dateRanges={dateRanges} setDateRanges={setDateRanges} />
    </form>
  </div>
    {/* Card 16 - Fuchsia */}
  {loggedInStaffRole === 'Agent' && (

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
      <DashboardDateRangeFields rangeKey="date15" dateRanges={dateRanges} setDateRanges={setDateRanges} />
  
    </form>
  </div>
  )}
  {/* Card 10 - Cyan */}
  {loggedInStaffRole === 'Agent' && (

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
  )}
    {/* Card 16 - Fuchsia */}
    {/* <div className="relative p-4 rounded-lg shadow-md bg-violet-100"> */}
  {/* <Link to="/branchfdreport" className="absolute top-2 right-2 text-lime-800 hover:text-lime-900">
    <i className="fas fa-file-alt text-lg" title="View FD Transaction Statement"></i>
  </Link> */}
    {/* <h3 className="text-sm font-semibold mb-2 text-fuchsia-800">FD Contribution</h3>
    <p className="text-sm font-bold text-fuchsia-800">{ newfdContribution || 0}</p>
    <form className="flex flex-col gap-2 mt-2"> */}
      {/* <Select2
        label="Branch"
        options={branches.map((branch) => ({ label: branch.name, value: branch._id }))}
        value={branchId15}
        onChange={(selectedId) => setBranchId15(selectedId)}
      /> */}
      {/* Date range input intentionally omitted for the archived FD contribution card. */}
    {/* </form>
  </div> */}
    {/* Card 14 - Violet */}
    <div className="relative p-4 rounded-lg shadow-md bg-violet-100">
         {/* Transaction Statement Icon (Top-right Corner) */}
  <Link to="/repexpenditurereport" className="absolute top-2 right-2 text-lime-800 hover:text-lime-900">
    <p className="text-sm md:text-sm">View Expenditure</p>
  </Link>
    <h3 className="text-sm font-semibold mb-2 text-violet-800">Total Expenses</h3>
    <p className="text-sm font-bold text-violet-800">{ newrepexpenditure?.toLocaleString('en-US') || 0}</p>
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
     {/* Card 14 - Violet */}
      <div className="relative p-4 rounded-lg shadow-md bg-violet-100">
           {/* Transaction Statement Icon (Top-right Corner) */}
    <Link to={`/staffreferral?staffId=${staffId}`}className="absolute top-2 right-2 text-lime-800 hover:text-lime-900">
      <p className="text-sm md:text-sm">View Referral</p>
    </Link>
      <h3 className="text-sm font-semibold mb-2 text-violet-800">Staff Referrals</h3>
      <p className="text-sm font-bold text-violet-800">{ newreferral?.toLocaleString('en-US') || 0}</p>
      <form className="flex flex-col gap-2 mt-2">
     
        <DashboardDateRangeFields rangeKey="date17" dateRanges={dateRanges} setDateRanges={setDateRanges} />
    
      </form>
    </div>
</div>

<EcommerceDepositDetailsModal
  isOpen={isEcommerceDepositModalOpen}
  onClose={() => setIsEcommerceDepositModalOpen(false)}
  title="Rep Ecommerce Deposit Details"
  transactions={repEcommerceDepositReport}
/>
</div>

  );
};

export default RepDashboard;
