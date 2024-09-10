import React from "react";
import LeavesDashboard from "./components/LeavesDashboard";
import PartnersDashboard from "./components/PartnerDetails";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Index from "./components/Index";

function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/leaves" element={<LeavesDashboard />} />
          <Route path="/partners" element={<PartnersDashboard />} />
        </Routes>
    </div>
  );
}

export default App;
