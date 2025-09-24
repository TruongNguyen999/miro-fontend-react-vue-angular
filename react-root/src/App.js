import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ProjectContent from "./components/ProjectContent";
import MessageHub from "./components/MessageHub";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-container">
          {/* Header */}
          <div className="header">
            <Routes>
              <Route path="/" element={<Navigate to="/angular" />} />
              <Route path="/:project" element={<ProjectContent />} />
            </Routes>
          </div>

          {/* Message Center */}
          <MessageHub />

          {/* Microfrontends container */}
          <div className="mf-container">
            <div id="angular-mf-container" className="mf-card"></div>
            <div id="vue-mf-container" className="mf-card"></div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
