import React, { useState, useEffect } from 'react';
import '../styles/NavbarTop.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NavbarTop() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      setUser(JSON.parse(localUser));
    } else {
      // Fetch user from the server if not available in local storage
      fetchCurrentUser();
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/current-user', { withCredentials: true });
      if (response.data.success) {
        setUser(response.data.user);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, );
      localStorage.removeItem('user'); // Clear user from local storage
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleProfile = () => {
    navigate('/profile'); // Change this to your profile route
  };

  return (
    <div className="navbar-top">
      <div className="navbar-right">
        {user && (
          <div className="user-menu">
            <span
              className="user-name"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              {user.first_name}
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleProfile}>Profile</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavbarTop;
