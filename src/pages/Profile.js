// src/pages/Test.js
import React from 'react';

import BookingList from '../components/BookingList'
import MyRides from '../components/MyRides'


const Profile = () => {

  return (
    <div>
      <h1>Profile Page</h1>
     
      <MyRides />
      <BookingList />
      
    </div>
  );
};

export default Profile;