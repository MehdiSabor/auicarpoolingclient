// src/Login.js
import React from 'react';

const Login = ({ onLogin }) => {
  return (
    <div>
      <button onClick={onLogin}>Login</button>
    </div>
  );
};

export default Login;
