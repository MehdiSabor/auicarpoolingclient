// src/pages/Test.js
import React from 'react';
import {useNavigate } from 'react-router-dom';

const Home = () => {
  
const navigate = useNavigate();

function handleClick() {
    navigate("/rides");
  }

  return (
    <button onClick={handleClick}>run</button>
  );
};

export default Home;