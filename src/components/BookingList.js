import React, { useState, useEffect } from 'react';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const user_id = userInfo.id;


  const fetchBookings = async () => {
    try {
      const response = await fetch(`https://auicarpoolingserver.onrender.com//bookings/${user_id}`);
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
   
    fetchBookings();
  }, [user_id]);


  const cancelRide = async (ride_id) => {
    try {
      const response = await fetch('https://auicarpoolingserver.onrender.com//cancel-ride', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, ride_id }),
      });

      if (response.ok) {
        alert('Ride canceled successfully');
        fetchBookings();
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>My Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.ride_id}>
            <div>
              <p>Ride ID: {booking.ride_id}</p>
              <p>Start City: {booking.start_city_name}</p>
              <p>Destination: {booking.destination_city_name}</p>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
              <p>Price: {booking.price}</p>
              <p>Available Seats: {booking.seats}</p>
              <p>Status: {booking.status}</p>
              <p>Price: {booking.price}</p>
              <p>Rider: {booking.rider_name}</p>
              
              {(booking.status === 'available' || booking.status === 'full') && (
                <button onClick={() => cancelRide(booking.ride_id)}>Cancel Ride</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
