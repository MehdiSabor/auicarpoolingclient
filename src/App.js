// src/App.js
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { PublicClientApplication } from '@azure/msal-browser';
import { config } from './services/Config';

import './App.css';
import Login from './components/Login';

import NavBar from './components/NavBar';
import Home from'./pages/Home';
import Profile from'./pages/Profile';
import Rides from'./pages/Rides';
import Test from'./pages/test';

// ... (rest of the code including setAuthState and getAuthState)


const setAuthState = (value) => {
  sessionStorage.setItem('isAuthenticated', JSON.stringify(value));
};

const getAuthState = () => {
  const value = sessionStorage.getItem('isAuthenticated');
  return value ? JSON.parse(value) : false;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isAuthenticated: getAuthState(),
      user: {},
      sentUserInfo: false,
    };
    this.login = this.login.bind(this);
    this.publicClientApplication = new PublicClientApplication({
      auth: {
        clientId: config.appId,
        redirectUri: config.redirectUri,
        authority: config.authority,
      },
      cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: true,
      },
    });
  }
  


  
  async componentDidMount() {
    this.publicClientApplication.handleRedirectPromise().then(async (response) => {
      if (response) {
        this.setState({ isAuthenticated: true });
        setAuthState(true);
        if (!this.state.sentUserInfo) {
          const userInfo = await this.getUserInfo();
          this.setState({ user: userInfo, sentUserInfo: true });
        }
      }
    });
  }

  async login() {
    try {
      await this.publicClientApplication.loginRedirect({
        scopes: config.scopes,
        prompt: 'select_account',
      });
      this.setState({ isAuthenticated: true });
      setAuthState(true);
     
    } catch (err) {
      this.setState({
        isAuthenticated: false,
        user: {},
        error: err,
        sentUserInfo: false,
      });
    }
  }
  


  
  async getUserInfo() {
  
    const account = this.publicClientApplication.getAllAccounts()[0];
    console.log(account);
  
    if (account) {
      const { username, name, localAccountId } = account;
      const userInfo = { username, name, localAccountId };
  
      // Send the user info to the backend server
      const response = await fetch('https://auicarpoolingserver.onrender.com//login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
  
      // Get the response from the server and update the userInfo object
      const serverResponse = await response.json();
      userInfo.id = serverResponse.id;
  
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
      return userInfo;
    }
  
    return null;
  }
  

  logout() {
    this.publicClientApplication.logout();
    this.setState({ isAuthenticated: false, sentUserInfo: false });
    setAuthState(false);
  }

  render() {
    const { isAuthenticated } = this.state;

    const ProtectedRoutes = () => {
      return (
        <>
          {isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />}
        </>
      );
    };

    const AlreadyConnectedRoutes = () => {
      return (
        <>
          {!isAuthenticated ? <Outlet /> : <Navigate to="/home" replace />}
        </>
      );
    };

    return (
      <BrowserRouter>
        <div className="App">
          <NavBar isAuthenticated={isAuthenticated} onLogout={() => this.logout()} />
          <Routes>
            {/* Add Connected routes here */}
            <Route element={<AlreadyConnectedRoutes />}>
              <Route path="/login" element={<Login onLogin={() => this.login()} />} />
              {/* Add more Connected routes as children of the ProtectedRoutes component */}
            </Route>

            {/* Add protected routes here */}
            <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
              <Route path="/home" element={<Home />} />
              <Route path="/rides" element={<Rides />} />
              <Route path="/" element={<Home />} />
              <Route path="/test" element={<Test />} />
              
              {/* Add more protected routes as children of the ProtectedRoutes component */}
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;