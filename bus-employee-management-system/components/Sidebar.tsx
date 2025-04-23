'use client';

import Link from 'next/link'; // Importing the `Link` component from Next.js for navigation, so you can link to different pages.
import { useState } from 'react'; // Importing `useState` from React to manage component state.

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

// This defines the type for the `Sidebar` component's props. It expects `isCollapsed` (boolean for sidebar state) and `setIsCollapsed` (function to update the state).
const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);   // Declares the `openSubMenu` state variable, which tracks which submenu is open.
  const [activeItem, setActiveItem] = useState<string | null>(null);   // Declares the `activeItem` state variable to track which menu item is currently active.

  const toggleSubMenu = (id: string) => {
    setOpenSubMenu(prev => (prev === id ? null : id));
  };

  // Function to toggle the sidebar's collapsed state.
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };


  return (
    // This is the main `div` for the sidebar. It applies the `'collapsed'` class if the sidebar is collapsed.
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} id="sidebar">
      <div>
        <div className="logo">
          <img src="/assets/images/agilalogo.png" alt="Agila Logo" />
        </div>

        <div className="nav-links">
          {/* Assignment */}
          <div
            className={`nav-item module ${openSubMenu === 'assignment-submenu' ? 'active' : ''} ${activeItem === 'assignment' ? 'active' : ''}`}
            onClick={() => {
              toggleSubMenu('assignment-submenu');
              setActiveItem('assignment');
            }}
          >
            <img src="/assets/images/assignmentbus.png" alt="Assignment" className="nav-icon" />
            <span className="nav-text">Assignment</span>
          </div>

          {openSubMenu === 'assignment-submenu' && (
            <div className="sub-menu active">
              <Link
                href="/dashboard/bus-assignment"
                className={`sub-item ${activeItem === 'bus-assignment' ? 'active' : ''}`}
                onClick={() => setActiveItem('bus-assignment')}
              >
                Bus Driver/Conductor Assignment
              </Link>
              <Link
                href="/dashboard/bus-route-assignment"
                className={`sub-item ${activeItem === 'bus-route-assignment' ? 'active' : ''}`}
                onClick={() => setActiveItem('bus-route-assignment')}
              >
                Bus Route Assignment
              </Link>
              <Link
                href="/dashboard/qouta-assignment"
                className={`sub-item ${activeItem === 'qouta-assignment' ? 'active' : ''}`}
                onClick={() => setActiveItem('qouta-assignment')}
              >
                Quota Assignment
              </Link>
            </div>
          )}

          {/* Route Management */}
          <Link
            href="/dashboard/route-management"
            className={`nav-item ${activeItem === 'route-management' ? 'active' : ''}`}
            onClick={() => setActiveItem('route-management')}
          >
            <img src="/assets/images/routemanagement.png" alt="Route Management" className="nav-icon" />
            <span className="nav-text">Route Management</span>
          </Link>

          {/* GPS */}
          <Link
            href="/dashboard/gps"
            className={`nav-item ${activeItem === 'gps' ? 'active' : ''}`}
            onClick={() => setActiveItem('gps')}
          >
            <img src="/assets/images/GPS.png" alt="GPS" className="nav-icon" />
            <span className="nav-text">GPS</span>
          </Link>

          {/* Bus Operation */}
          <Link
            href="/dashboard/bus-operation"
            className={`nav-item ${activeItem === 'bus-operation' ? 'active' : ''}`}
            onClick={() => setActiveItem('bus-operation')}
          >
            <img src="/assets/images/busoperation.png" alt="Bus Operation" className="nav-icon" />
            <span className="nav-text">Bus Operation</span>
          </Link>

          {/* Bus Rental */}
          <Link
            href="/dashboard/bus-rental"
            className={`nav-item ${activeItem === 'bus-rental' ? 'active' : ''}`}
            onClick={() => setActiveItem('bus-rental')}
          >
            <img src="/assets/images/busrental.png" alt="Bus Rental" className="nav-icon" />
            <span className="nav-text">Bus Rental</span>
          </Link>

          {/* Performance Report */}
          <Link
            href="/dashboard/performance-report"
            className={`nav-item ${activeItem === 'performance-report' ? 'active' : ''}`}
            onClick={() => setActiveItem('performance-report')}
          >
            <img src="/assets/images/performancereport.png" alt="Performance Report" className="nav-icon" />
            <span className="nav-text">Performance Report</span>
          </Link>
        </div>
      </div>

      {/* Logout */}
      <div className="logout">
        <a href="#">
          <img src="/assets/images/logout.png" alt="Logout" className="nav-icon" />
          <span className="nav-text">Logout</span>
        </a>
      </div>

      {/* Sidebar Toggle Button */}
      <div className="toggle-btn" onClick={toggleSidebar}>
        <img 
          src={isCollapsed ? '/assets/images/arrow-right-line.png' : '/assets/images/arrow-left-line.png'} 
          alt="Sidebar Toggle" 
          id="arrow" 
        />
      </div>
    </div>
  );
};

export default Sidebar;