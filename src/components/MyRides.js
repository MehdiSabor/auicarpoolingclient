import React, { useState, useEffect } from 'react';

const MyRides = () => {
  const [myRides, setMyRides] = useState([]);
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const rider_id = userInfo.id;
  const [visibleRideUsers, setVisibleRideUsers] = useState(null);
  const [showUsers, setShowUsers] = useState(false);


  useEffect(() => {
    fetchMyRides();
  }, []);

  const fetchMyRides = async () => {
    try {
      const response = await fetch(`https://auicarpoolingserver.onrender.com//rides/rider/${rider_id}`);
      const data = await response.json();
      setMyRides(data);
    } catch (error) {
      console.error('Error fetching rides:', error);
    }
  };

  


  const updateRideStatus = async (ride_id, status) => {
    try {
      const response = await fetch(`https://auicarpoolingserver.onrender.com//rides/${ride_id}/status/${rider_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchMyRides();
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const fetchRideUsers = async (ride_id) => {
    try {
      const response = await fetch(`https://auicarpoolingserver.onrender.com//username/${ride_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      setVisibleRideUsers(data);
    } catch (error) {
      console.error('Error fetching ride users:', error);
    }
  };
  

  const toggleShowUsers = (ride_id) => {
    setShowUsers(!showUsers);
    if (!showUsers) {
      fetchRideUsers(ride_id);
    } else {
      setVisibleRideUsers(null);
    }
  };

  return (
    <div>
      <h2>My Rides</h2>
      <ul>
        {myRides.map((ride) => (
          <li key={ride.id}>
            <div>
              <p>Ride ID: {ride.id}</p>
              <p>Start City: {ride.start_city_name}</p>
      <p>Destination: {ride.destination_city_name}</p>
              <p>Date: {ride.date}</p>
              <p>Time: {ride.time}</p>
              <p>Price: {ride.price}</p>
              <p>Available Seats: {ride.seats}</p>
              <p>Status: {ride.status}</p>
              <p>Price: {ride.price}</p>
             
              
                <div>
                  <button onClick={() => updateRideStatus(ride.id, 'running')}>Set to Running</button>
                  <button onClick={() => updateRideStatus(ride.id, 'finished')}>Set to Finished</button>
                  <button onClick={() => updateRideStatus(ride.id, 'cancelled')}>Set to Cancelled</button>
                </div>
              
            </div>
            <button onClick={() => toggleShowUsers(ride.id)}>
              {showUsers ? 'Hide Clients' : 'Show Clients'}
            </button>
            {showUsers && visibleRideUsers && (
              <ul>
                {visibleRideUsers.map((user) => (
                  <li key={user.id}>
                    <p>User ID: {user.id}</p>
                    <p>User Name: {user.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRides;
