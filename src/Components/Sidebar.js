import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Open'} Sidebar
      </button>
      <nav className="sidebar-nav">
        <ul>
          <li><Link to="/inventory">Inventory</Link></li>
          {/* <li><Link to="/non-inventory">Non-Inventory</Link></li>
          <li><Link to="/qb">QB</Link></li>
          <li><Link to="/service">Service</Link></li> */}
          <li><Link to="/dropdowns">Dropdowns</Link></li>
          <li><Link to="/list">List</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
