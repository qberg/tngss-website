import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../asset/css/Navbar.css';
import logo from '../asset/img/logo.png';

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (open) => {
    setOpenDrawer(open);
  };

  return (
    <header>
      {/* Fixed Logo */}
      <div className="logo-container">
        <Link to="/tngss-web-app">
          <img src={logo} alt="TNGSS" className="navbar-logo" />
        </Link>
      </div>

      {/* Navbar */}
      <nav className="custom-navbar navbar navbar-expand-lg fixed-top">
        <div className="container-fluid justify-content-center align-items-center position-relative">
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => toggleDrawer(!openDrawer)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${openDrawer ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav mx-auto nav-links-container">
              <li className="nav-item" style={{marginRight:10}}>
                <Link className="nav-link" to="/tngss-web-app">About</Link>
              </li>
              <li className="nav-item dropdown" style={{marginRight:100}}>
                <Link
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Why Attend
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/tngss-web-app/why-attend-startups">Startups</Link></li>
                  <li><Link className="dropdown-item" to="/tngss-web-app/why-attend-corporates">Corporates</Link></li>
                  <li><Link className="dropdown-item" to="/tngss-web-app/why-attend-investors">Investors</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tngss-web-app/program-details">Program</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tngss-web-app/speakers-list">Speakers</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
