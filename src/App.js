import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Components/Sidebar";
import ManagerSidebar from "./Components/ManagerSidebar";
import RepSidebar from "./Components/RepSidebar";
import Topbar from "./Components/Topbar";
import Dashboard from "./Components/Dashboard";
import ManagerDashboard from "./Components/ManagerDashboard";
import RepDashboard from "./Components/RepDashboard";
import LandingPage from "./Components/LandingPage";
import Viewbranches from "./Components/Viewbranches";
import Createbranch from "./Components/Createbranch";
import Expenditure from "./Components/Expenditure";
import RepExpenditure from "./Components/RepExpenditure";
import BranchExpenditure from "./Components/BranchExpenditure";
import ViewStaff from "./Components/Viewstaff";
import ViewBranchStaff from "./Components/ViewBranchStaff";
import CreateStaff from "./Components/Createstaff";
import ViewCustomer from "./Components/Viewcustomer";
import ViewBranchCustomer from "./Components/ViewBranchCustomer";
import ViewRepCustomer from "./Components/ViewRepCustomer";
import CreateCustomer from "./Components/Createcustomer";
import Deposit from "./Components/Deposit";
import CreateAccount from "./Components/CreateAccount";
import ViewCustomerAccount from "./Components/ViewCustomerAccount";
import CustomerAccountDashboard from "./Components/CustomerAccountDashboard";
import ManagerViewRepDashboard from "./Components/ManagerViewRepDashboard";
import Login from "./Components/Stafflogin";
import StaffForgotPassword from "./Components/StaffForgotPassword";
import Footer from "./Components/Footer";
import SBIncome from "./Components/SbIncome";
import FDIncome from "./Components/FDincome";
import BranchSBIncome from "./Components/BranchSBIncome";
import DSIncome from "./Components/DSIcome";
import BranchDSIncome from "./Components/BranchDSIncome";
import ExpenditureReport from "./Components/ExpenditureReport";
import FDReport from "./Components/FDTransaction";
import BranchFDReport from "./Components/BranchFDTransaction";
import BranchExpenditureReport from "./Components/BranchExpenditureReport";
import RepExpenditureReport from "./Components/RepExpenditureReport";
import Transaction from "./Components/Transaction";
import Order from "./Components/Order";
import BranchOrder from "./Components/BranchOrder";
import RepOrder from "./Components/RepOrder";
import InterestRate from "./Components/InterestRate";


function App() {
  const isLoggedIn = useSelector((state) => state.login.token);
  const token = isLoggedIn || localStorage.getItem("authToken");
 const loggedInStaffRole = useSelector((state) => state.login.staff?.role) || localStorage.getItem("staffRole");

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false); // Track sidebar state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Logout logic: Clear token and close sidebar
    localStorage.removeItem("authToken");
    setIsSidebarOpen(false);
  };

  return (
    <Router>
      <div className="container mx-auto relative flex  h-screen ">
        {/* Render Sidebar only when logged in */}
        {token && (
  loggedInStaffRole === 'Admin' ? (
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
  ) :loggedInStaffRole === 'Agent' ? (
    <RepSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
  ):( <ManagerSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />)
)}

        {/* Overlay for small screens */}
        {isSidebarOpen && token && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex flex-col flex-1 pt-20">
          {/* Topbar */}
          <Topbar
            isLoggedIn={!!token}
            onLogout={handleLogout}
            toggleSidebar={toggleSidebar}
          />

          {/* Page Content */}
          <div className="content flex-1 bg-gray-100 overflow-y-auto">
            <Routes>
              {/* Protected Routes */}
              {token ? (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/branches" element={<Viewbranches />} />
                  <Route path="/createbranch" element={<Createbranch />} />
                  <Route path="/expenditure" element={<Expenditure />} />
                  <Route path="/expenditure" element={<Expenditure />} />
                  <Route path="/repexpenditure" element={<RepExpenditure />} />
                  <Route path="/branchexpenditure" element={<BranchExpenditure />} />
                  <Route path="/staff" element={<ViewStaff />} />
                  <Route path="/branchstaff" element={<ViewBranchStaff />} />
                  <Route path="/createstaff" element={<CreateStaff />} />
                  <Route path="/customers" element={<ViewCustomer />} />
                  <Route path="/branchcustomers" element={<ViewBranchCustomer />} />
                  <Route path="/repcustomers" element={<ViewRepCustomer />} />
                  <Route path="/createcustomer" element={<CreateCustomer />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/managerdashboard" element={<ManagerDashboard />} />
                  <Route path="/repdashboard" element={<RepDashboard />} />
                  <Route path="/transaction" element={<Transaction />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/branchorder" element={<BranchOrder />} />
                  <Route path="/reporder" element={<RepOrder />} />
                  <Route path="/landingpage" element={<LandingPage />} />
                  <Route path="/deposit" element={<Deposit />} />
                  <Route path="/sbincome" element={<SBIncome />} />
                  <Route path="/fdincome" element={<FDIncome />} />
                  <Route path="/branchsbincome" element={<BranchSBIncome />} />
                  <Route path="/dsincome" element={<DSIncome />} />
                  <Route path="/branchdsincome" element={<BranchDSIncome />} />
                  <Route path="/expenditurereport" element={<ExpenditureReport />} />
                  <Route path="/fdreport" element={<FDReport />} />
                  <Route path="/branchfdreport" element={<BranchFDReport />} />
                  <Route path="/branchexpenditurereport" element={<BranchExpenditureReport />} />
                  <Route path="/repexpenditurereport" element={<RepExpenditureReport />} />
                  <Route path="/createaccount" element={<CreateAccount />} />
                  <Route path="/viewcustomeraccount" element={<ViewCustomerAccount />} />
                  <Route path="/interest" element={<InterestRate />} />
                  <Route path="/customeraccountdashboard/:customerId" element={<CustomerAccountDashboard />} />
                  <Route path="/managerviewdashboard/:staffId" element={<ManagerViewRepDashboard />} />
                </>
              ) : (
                // Redirect unauthenticated users to Login
                <Route path="*" element={<Navigate to="/login" />} />
              )}
              {/* Login Route */}
              <Route path="/login" element={<Login />} />
              <Route path="/forgotpassword" element={<StaffForgotPassword />} />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
