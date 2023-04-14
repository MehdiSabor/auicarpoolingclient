// src/NavBar.js
import React from 'react';
import Logout from './Logout';
import {useNavigate} from 'react-router-dom';

const NavBar = ({ isAuthenticated, onLogout }) => {

  const navigate = useNavigate();

  function handleClickRides() {
      navigate("/rides");
    }
    function handleClickProfile() {
      navigate("/profile");
    }
    function handleClickHome() {
      navigate("/home");
    }
  


  return (
    <nav className="navbar">
      {/* Add your logo and other navigation content here */}
      {isAuthenticated &&<button onClick={handleClickHome}>Home</button>}
      {isAuthenticated &&<button onClick={handleClickRides}>Rides</button>}
      {isAuthenticated &&<button onClick={handleClickProfile}>Profile</button>}
      {isAuthenticated &&  <Logout onLogout={onLogout} />}
    </nav>
  );
};

export default NavBar;
