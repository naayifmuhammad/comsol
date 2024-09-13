import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NavbarLeft from './components/NavbarLeft';
import NavbarTop from './components/NavbarTop';

import './App.css';
import ComplaintRegistration from './components/ComplaintRegistration';
import ViewComplaints from './components/ViewComplaints';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="main-container">
          <NavbarLeft />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route path="/complaint-reg" element={<ComplaintRegistration />} />
            <Route path="/views-complaints" element={<ViewComplaints />} />
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
