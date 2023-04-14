// src/components/RideList.js
import React, { useState, useEffect } from 'react';

const RideList = ({ status }) => {
  const [rides, setRides] = useState([]);
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const user_id = userInfo.id;
  status='full';

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch(`https://auicarpoolingserver.onrender.com//rides/${status}`);
        const data = await response.json();
        setRides(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching rides:', error);
      }
    };
    fetchRides();
  }, [status]);


    
  
  
  

  return (
    <div>
      <h2>Full Rides</h2>
      <ul>
      {
        Array.isArray(rides) ? (
  rides.map((ride) => (
    <div key={ride.id}>
      <p>Ride ID: {ride.id}</p>
      <p>Start City: {ride.start_city_name}</p>
      <p>Destination: {ride.destination_city_name}</p>
      <p>Available Seats: {ride.seats}</p>
      <p>Status: {ride.status}</p>
      <p>Rider: {ride.rider_name}</p>
      <p>Price: {ride.price}</p>
      <p>Date: {ride.date}</p>
      <p>Time: {ride.time}</p>
       </div>
  ))
  ) : (
    <p>No rides available.</p>
  )
}
</ul>
</div>);
  

};

export default RideList;
