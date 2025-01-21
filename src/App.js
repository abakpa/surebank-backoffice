import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import Content from "./Components/Content";
import Viewbranches from "./Components/Viewbranches";
import Createbranch from "./Components/Createbranch";
import ViewStaff from "./Components/Viewstaff";
import CreateStaff from "./Components/Createstaff";
import ViewCustomer from "./Components/Viewcustomer";
import CreateCustomer from "./Components/Createcustomer";
import Deposit from "./Components/Deposit";
import CreateAccount from "./Components/CreateAccount";
import ViewCustomerAccount from "./Components/ViewCustomerAccount";
import CustomerAccountDashboard from "./Components/CustomerAccountDashboard";
import Login from "./Components/Stafflogin";
import Footer from "./Components/Footer";

function App() {
  const isLoggedIn = useSelector((state) => state.login.token);
  const token = isLoggedIn || localStorage.getItem("authToken");

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
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
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
                  <Route path="/" element={<Content />} />
                  <Route path="/branches" element={<Viewbranches />} />
                  <Route path="/createbranch" element={<Createbranch />} />
                  <Route path="/staff" element={<ViewStaff />} />
                  <Route path="/createstaff" element={<CreateStaff />} />
                  <Route path="/customers" element={<ViewCustomer />} />
                  <Route path="/createcustomer" element={<CreateCustomer />} />
                  <Route path="/content" element={<Content />} />
                  <Route path="/deposit" element={<Deposit />} />
                  <Route path="/createaccount" element={<CreateAccount />} />
                  <Route path="/viewcustomeraccount" element={<ViewCustomerAccount />} />
                  <Route path="/customeraccountdashboard/:customerId" element={<CustomerAccountDashboard />} />
                </>
              ) : (
                // Redirect unauthenticated users to Login
                <Route path="*" element={<Navigate to="/login" />} />
              )}
              {/* Login Route */}
              <Route path="/login" element={<Login />} />
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
