// src/components/RideList.js
import React, { useState, useEffect, useCallback } from 'react';
import { rideAdded$ } from '../pages/Rides';

const RideList = ({ status }) => {
  const [rides, setRides] = useState([]);
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const user_id = userInfo.id;
  status='available';
  const [cities, setCities] = useState([]);

  const [startCityFilter, setStartCityFilter] = useState('');
  const [destinationCityFilter, setDestinationCityFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [afterDateFilter, setAfterDateFilter] = useState('');
  
  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch('https://auicarpoolingserver.onrender.com//cities');
      const data = await response.json();
      setCities(data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredRides = rides.filter((ride) => {
    const dateObject = new Date(ride.date);
    const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;

    const startCityMatch = !startCityFilter || parseInt(startCityFilter) === ride.start_city_id;
    const destinationCityMatch = !destinationCityFilter || parseInt(destinationCityFilter) === ride.destination_city_id
    const priceMatch = !priceFilter || parseFloat(ride.price) <= parseFloat(priceFilter);
    const dateMatch = !dateFilter || formattedDate === dateFilter;
    const afterDateMatch = !afterDateFilter || ride.date > afterDateFilter;

    return startCityMatch && destinationCityMatch && priceMatch && dateMatch && afterDateMatch;

  });
  



  const fetchRides = useCallback(async () => {
    try {
      const response = await fetch(`https://auicarpoolingserver.onrender.com//rides/${status}`);
      const data = await response.json();
      setRides(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching rides:', error);
    }
  }, [status]);


  useEffect(() => {
    fetchRides(); // Fetch rides when the component mounts
    const subscription = rideAdded$.subscribe(() => {
      fetchRides(); // Refetch rides when a new ride is added
    });
    
    return () => {
      subscription.unsubscribe(); // Clean up the subscription when the component unmounts
    };
  }, [fetchRides]);

    

  async function bookRide(ride_id) {
    
  
    try {
      const response = await fetch('https://auicarpoolingserver.onrender.com//book-ride', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, ride_id }),
      });
  
      if (response.ok) {
        alert('Ride booked successfully');
        fetchRides(); 
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

 

  return (
    <div >
      <h2>Available Rides</h2>
     
      <div className="filters">
    <div className="filter">
      <label>Filter by start city:</label>
      <select
        value={startCityFilter}
        onChange={(e) => setStartCityFilter(e.target.value)}
      >
        <option value="">Select a start city</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.city_name}
          </option>
        ))}
      </select>
    </div>
    <div className="filter">
      <label>Filter by destination city:</label>
      <select
        value={destinationCityFilter}
        onChange={(e) => setDestinationCityFilter(e.target.value)}
      >
        <option value="">Select a destination city</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.city_name}
          </option>
        ))}
      </select>
    </div>
    <div className="filter">
      <label>Filter by max price:</label>
      <input
        type="number"
        value={priceFilter}
        onChange={(e) => setPriceFilter(e.target.value)}
      />
    </div>
    <div className="filter">
      <label>Filter by date:</label>
      <input
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      />
    </div>
    <div className="filter">
      <label>Filter by rides after date:</label>
      <input
        type="date"
        value={afterDateFilter}
        onChange={(e) => setAfterDateFilter(e.target.value)}
      />
    </div>
  </div>

  {Array.isArray(rides) ? (
    filteredRides.slice(0, 10).map((ride) => (
            <div key={ride.id} className="ride-post">
              <p>Ride ID: {ride.id}</p>
              <p>Start City: {ride.start_city_name}</p>
              <p>Destination: {ride.destination_city_name}</p>
              <p>Available Seats: {ride.seats}</p>
              <p>Status: {ride.status}</p>
              <p>Price: {ride.price}</p>
              <p>Date: {ride.date}</p>
              <p>Time: {ride.time}</p>
              <p>Rider: {ride.rider_name}</p>

              {ride.rider_id !== user_id && (
                <button onClick={() => bookRide(ride.id)}>Book Ride</button>
              )}
            </div>
          ))
        ) : (
          <p>No rides available.</p>
        )}
     
     {filteredRides.length > 10 && (
      <button>Next Page</button>
    )}
  </div>
  );
};

export default RideList;
