import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import Content from "./Components/Content";
import Viewbranches from "./Components/Viewbranches";
import Createbranch from "./Components/Createbranch";
import ViewStaff from "./Components/Viewstaff";
import CreateStaff from "./Components/Createstaff";
import ViewCustomer from "./Components/Viewcustomer";
import Footer from "./Components/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsSidebarOpen(false); // Close sidebar (just in case)
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsSidebarOpen(false); // Close sidebar
  };

  return (
    <Router>
      <div className="relative flex h-screen">
        {/* Render Sidebar only when logged in */}
        {isLoggedIn && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}

        {/* Overlay for small screens */}
        {isSidebarOpen && isLoggedIn && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex flex-col flex-1 pt-20">
          {/* Topbar */}
          <Topbar
            isLoggedIn={isLoggedIn}
            onLogin={handleLogin}
            onLogout={handleLogout}
            toggleSidebar={toggleSidebar}
          />

          {/* Page Content */}
          <div className="flex-1 bg-gray-100 overflow-y-auto">
            {isLoggedIn ? (
              <Routes>
                <Route path="/" element={<Content />} />
                <Route path="/branches" element={<Viewbranches />} />
                <Route path="/createbranch" element={<Createbranch />} />
                <Route path="/staff" element={<ViewStaff />} />
                <Route path="/createstaff" element={<CreateStaff />} />
                <Route path="/customers" element={<ViewCustomer />} />
              </Routes>
            ) : (
              <Content />
            )}
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
