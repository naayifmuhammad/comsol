import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbarleft from './NavbarLeft'; // Assuming you have a SideNav component
import './AppLayout.css'

const AppLayout = ({ children }) => {
  const location = useLocation();
  
  // List of paths where the side nav should be hidden
  const pathsWithoutSideNav = ['/login', '/register', '/about'];

  // Condition to determine whether to show side nav or not
  const showSideNav = !pathsWithoutSideNav.includes(location.pathname);
  const contentClassName = showSideNav ? 'content' : 'base';

  return (
    <div className="app-layout">
      {showSideNav && <Navbarleft />}
      <div className={contentClassName}>
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
