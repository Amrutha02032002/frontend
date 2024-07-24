import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Inventry from './Components/Inventory';

// import NonInventry from './Components/NonInventry';
// import Qb from './Components/Qb';
// import Service from './Components/Service';
import Dropdowns from './Components/DropdownManager';
import List from './Components/List';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/inventory" element={<Inventry />} />
            {/* <Route path="/non-inventory" element={<NonInventry />} />
            <Route path="/qb" element={<Qb />} />
            <Route path="/service" element={<Service />} /> */}
            <Route path="/dropdowns" element={<Dropdowns />} />
            <Route path="/list" element={<List />} />
            <Route path="/" element={<List />} />
          </Routes>
        </div>
      </div>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();