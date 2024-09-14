import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import ComplaintRegistration from './components/ComplaintRegistration';
import CustomerComplainRegistration from './pages/CustomerComplainRegistration'
import ViewComplaints from './components/ViewComplaints';
import { LoginPage } from './pages/LoginPage';
import AppLayout from './components/AppLayout';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New state to handle loading

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/current-user', { withCredentials: true });
      if (response.data.success) {
        setUser(response.data.user);
        console.log("Successfully fetched data");
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      setUser(JSON.parse(localUser));
      setLoading(false); // Set loading to false if user is in local storage
    } else {
      fetchCurrentUser();
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator or spinner
  }

  // If no user is logged in, redirect to login page
  if (!user) {
    return (
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<LoginPage />} />
          </Routes>
        </AppLayout>
      </Router>
    );
  }

  // If user is logged in, handle routing based on user type
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={user.user_type === 'Admin' ? <AdminDashboard /> : <StaffDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path="/complaint-reg" element={<CustomerComplainRegistration />} />
          <Route path="/views-complaints" element={<ViewComplaints />} />
          {/* Optionally handle unmatched routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
