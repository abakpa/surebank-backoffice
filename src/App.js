import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import Content from "./Components/Content";
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
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
          toggleSidebar={toggleSidebar}
        />

        {/* Page Content */}
        <div className="flex-1 bg-gray-100 overflow-y-auto">
          <Content />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
