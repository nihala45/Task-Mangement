import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import OTPVerification from './pages/OTPVerification';

import UserProtectedRoute from './routes/UserProtectedRoute'
import UserLoginRedirect from './routes/UserLoginRedirect';

const App = () => {
  return (
    <Routes>
     
      <Route
        path="/"
        element={
          <UserProtectedRoute>
            <Home />
          </UserProtectedRoute>
        }
      />

    
      <Route
        path="/login"
        element={
          <UserLoginRedirect>
            <Login />
          </UserLoginRedirect>
        }
      />
      <Route
        path="/register"
        element={
          <UserLoginRedirect>
            <Register />
          </UserLoginRedirect>
        }
      />

      
      <Route path="/otp/:id" element={<OTPVerification />} />
    </Routes>
  );
};

export default App;
