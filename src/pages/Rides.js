
import React from 'react';
import RideForm from '../components/RideForm';
import RideList from '../components/RideList';
import FullRideList from '../components/FullRideList'
import { Subject } from 'rxjs';

export const rideAdded$ = new Subject();

const Rides = () => {

  const storedUserInfo = sessionStorage.getItem('userInfo');
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
  

  const addRide = async (rideData) => {
    try {
      const response = await fetch('https://auicarpoolingserver.onrender.com//rides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...rideData, rider_id: userInfo.id }),
      });
  
      if (response.ok) {
        alert('Ride added successfully');
        rideAdded$.next();
      } else {
        console.error('Failed to add ride');
      }
    } catch (error) {
      console.error('Error while adding ride:', error);
    }
  };
  

  return (
    <div>
      <h1>Rides Page</h1>
      <RideForm onSub={addRide}/>
      <div className="App"></div>
      <RideList />
      <FullRideList />
      
    </div>
  );
};

export default Rides;