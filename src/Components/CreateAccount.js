// import React, {useState,useEffect} from "react";
// import {useDispatch,useSelector} from 'react-redux'
// import {useNavigate} from 'react-router-dom'
// import { createCustomerAccountRequest } from '../redux/slices/createAccountSlice'
// import {fetchStaffRequest} from '../redux/slices/staffSlice'
// import Select2 from "./Select2";
// import Select from "./Select";



// const CreateAccount = () => {
//         const dispatch = useDispatch()
//         const navigate = useNavigate()
//   const { staffs } = useSelector((state) => state.staff);

//         const accountType = ["Rent", "Scool fees", "Food"];

//   const [accountNumber, setAccountNumber] = useState("");
//   const [amountPerDay, setAmountPerDay] = useState("");
//   const [accountManagerId, setAccountManagerId] = useState("");
//   const [error, setError] = useState("");
//     const [accountTypes, setAccountTypes] = useState("");

//     useEffect(() => {
//       dispatch(fetchStaffRequest());
//     }, [dispatch]);
  

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");

//     if (!accountNumber || !amountPerDay) {
//       setError("Both fields are required.");
//       return;
//     }

//     if (isNaN(amountPerDay) || parseFloat(amountPerDay) <= 0) {
//       setError("Please enter a valid amount.");
//       return;
//     }

//     // onSubmit({ accountNumber, amount: parseFloat(amount) });
//         const details = { accountManagerId, accountTypes, accountNumber, amountPerDay: parseFloat(amountPerDay) }
//         const data ={details,navigate}
//         dispatch(createCustomerAccountRequest(data))
//     setAccountNumber("");
//     setAmountPerDay("");
//     setAccountTypes("");
//     setAccountManagerId("");
//   };

//   return (
//     <div className="p-6 bg-white rounded shadow-md max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-4">Create Account</h2>
//       {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="DSAccountNumber" className="block text-sm font-medium text-gray-700">
//             Account Number
//           </label>
//           <input
//             id="accountNumber"
//             type="text"
//             value={accountNumber}
//             onChange={(e) => setAccountNumber(e.target.value)}
//             className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
//             placeholder="Enter account number"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           {/* <label htmlFor="DSAccountNumber" className="block text-sm font-medium text-gray-700">
//             Account Type
//           </label> */}
//           <Select
//             label="Account Type"
//             options={accountType}
//             value={accountTypes}
//             onChange={setAccountTypes}
//           />
//         </div>
//         <div className="mb-4">
//           {/* <label htmlFor="DSAccountNumber" className="block text-sm font-medium text-gray-700">
//             Account Type
//           </label> */}
//          <Select2
//   label="Account Manager"
//   options={staffs.map((staff) => ({ label: staff.name, value: staff._id }))}
//   value={accountManagerId}
//   onChange={(selectedId) => setAccountManagerId(selectedId)}
// />

//         </div>


//         <div className="mb-4">
//           <label htmlFor="amountPerDay" className="block text-sm font-medium text-gray-700">
//             Amount
//           </label>
//           <input
//             id="amountPerDay"
//             type="number"
//             step="0.01"
//             value={amountPerDay}
//             onChange={(e) => setAmountPerDay(e.target.value)}
//             className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
//             placeholder="Enter amount"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
//         >
//           Create Account
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateAccount;
