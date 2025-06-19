import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchBranchRequest } from "../redux/slices/branchSlice";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useParams } from "react-router-dom";
import Tablehead from "./Table/StaffTransactionTableHead";
import Tablebody from "./Table/StaffTransactionTableBody";


import {

  fetchMVRepDSDailyContributionRequest,
  fetchMVRepSBDailyContributionRequest,
  fetchMVRepFDDailyContributionRequest,
  fetchMVRepTotalSBandDSDailyRequest,
  fetchMVRepDSWithdrawalRequest,
  fetchMVRepDSpackageRequest,
  fetchMVRepSBpackageRequest,
  fetchMVRepFDpackageRequest,
  fetchMVRepPackageRequest,
  fetchMVRepTotalExpenditureRequest,
  fetchBranchStaffRequest,
  fetchMVTransactionRequest,

} from '../redux/slices/managerviewrepdashboardSlice'
import Loader from "./Loader";
// import Select2 from "./Select2";



const ManagerViewRepDashboard = () => {
    const dispatch = useDispatch();
     const { staffId } = useParams();
    // const { branches } = useSelector((state) => state.branch);
      const { branches } = useSelector((state) => state.branch);
    
    const [date3, setDate3] = useState("");
    const [date4, setDate4] = useState("");
    const [date5, setDate5] = useState("");
    const [date6, setDate6] = useState("");
    const [date7, setDate7] = useState("");
    const [date8, setDate8] = useState("");
    const [date9, setDate9] = useState("");
    const [date13, setDate13] = useState("");
    const [date15, setDate15] = useState("");
    const [date16, setDate16] = useState("");
    const {
      loading,
     repdailyds,
     repdailyfd,
     branchstaff,
     repdailysb,
     reptotaldailysbandds,
     repdswithdrawal,
     repdspackage,
     repsbpackage,
     reppackages,
     fdpackage,
     reptotalexpenditure,
     transaction,
  
    } = useSelector((state)=>state.mvrepdashboard)
      const newdailyds = repdailyds || 0
      const newdailyfd = repdailyfd || 0
      const newdailysb = repdailysb || 0
      const newtotaldailysbandds = reptotaldailysbandds || 0
      const newdswithdrawal = repdswithdrawal || 0
      const newdspackage = repdspackage || 0
      const newsbpackage = repsbpackage || 0
      const newpackages = reppackages || 0
      const newfdpackage = fdpackage || 0
      const newrepexpenditure = reptotalexpenditure || 0
      



    //   useEffect(() => {
    //     dispatch(fetchBranchRequest());
    //   }, [dispatch]);

      useEffect(() => {
    
        const details3 = { date: date3,staffId };
        const details4 = { date: date4,staffId };
        const details5 = { date: date5,staffId };
        const details6 = { date: date6,staffId };
        const details7 = { date: date7,staffId };
        const details8 = { date: date8,staffId };
        const details9 = { date: date9,staffId };
        const details13 = { date: date13,staffId };
        const details15 = { date: date15,staffId };
        const details16 = { date: date16,staffId };
   
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
  
        dispatch(fetchMVRepDSDailyContributionRequest(data3)); 
        dispatch(fetchMVRepSBDailyContributionRequest(data4)); 
        dispatch(fetchMVRepFDDailyContributionRequest(data16)); 
        dispatch(fetchMVRepTotalSBandDSDailyRequest(data5)); 
        dispatch(fetchMVRepDSWithdrawalRequest(data6)); 
        dispatch(fetchMVRepDSpackageRequest(data7)); 
        dispatch(fetchMVRepSBpackageRequest(data8)); 
        dispatch(fetchMVRepFDpackageRequest(data15)); 
        dispatch(fetchMVRepPackageRequest(data9)); 
        dispatch(fetchMVRepTotalExpenditureRequest(data13)); 
        dispatch(fetchBranchStaffRequest(staffId))
        dispatch(fetchMVTransactionRequest(staffId))
 
    }, [
      dispatch,
        staffId,
      date3,
      date4,
      date5,
      date6,
      date7,
      date8,
      date9,
      date13,
      date15,
      date16,

    ]);
    const transactionList = Array.isArray(transaction) ? transaction : [];

  return (
<div className="p-6">
  {loading && <Loader />}
  <h1 className="text-2xl font-bold mb-4 mt-10 text-center ">{branchstaff?.firstName} {branchstaff?.lastName}
         <Link to={`/repcustomers?staffId=${staffId}`} className="text-xs md:ml-10">
          <button className="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            View Customers
          </button>
        </Link>
  </h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

  {/* Card 4 - Yellow */}
  <div className="p-4 rounded-lg shadow-md bg-yellow-100">
    <h3 className="text-sm font-semibold mb-2 text-yellow-800">Total DS Daily Contribution</h3>
    <p className="text-sm font-bold text-yellow-800">{newdailyds?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">

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
   
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date16}
        onChange={(e) => setDate16(e.target.value)}
      />
    
    </form>
  </div>

  {/* Card 6 - Indigo */}
  <div className="p-4 rounded-lg shadow-md bg-indigo-100">
    <h3 className="text-sm font-semibold mb-2 text-indigo-800">Total Daily Contribution</h3>
    <p className="text-sm font-bold text-indigo-800">{newtotaldailysbandds?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
 
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
    <p className="text-sm font-bold text-pink-800">{newdswithdrawal?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
  
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
    
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date15}
        onChange={(e) => setDate15(e.target.value)}
      />
  
    </form>
  </div>
  {/* Card 10 - Cyan */}
  <div className="p-4 rounded-lg shadow-md bg-cyan-100">
    <h3 className="text-sm font-semibold mb-2 text-cyan-800">Total Packages</h3>
    <p className="text-sm font-bold text-cyan-800">{newpackages?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
    
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date9}
        onChange={(e) => setDate9(e.target.value)}
      />
 
    </form>
  </div>

 
    {/* Card 14 - Violet */}
    <div className="relative p-4 rounded-lg shadow-md bg-violet-100">
         {/* Transaction Statement Icon (Top-right Corner) */}
  <Link to={`/repexpenditurereport?staffId=${staffId}`}className="absolute top-2 right-2 text-lime-800 hover:text-lime-900">
    <p className="text-sm md:text-sm">View Expenditure</p>
  </Link>
    <h3 className="text-sm font-semibold mb-2 text-violet-800">Total Expenses</h3>
    <p className="text-sm font-bold text-violet-800">{ newrepexpenditure?.toLocaleString('en-US') || 0}</p>
    <form className="flex flex-col gap-2 mt-2">
   
      <input 
        type="date" 
        className="p-2 border rounded-md" 
        value={date13}
        onChange={(e) => setDate13(e.target.value)}
      />
  
    </form>
  </div>

</div>
<div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse border border-gray-300">
          <Tablehead customers={transactionList} branches={branches}/>
          <Tablebody customers={transactionList} branches={branches} />
        </table>
      </div>
</div>

  );
};

export default ManagerViewRepDashboard;
