// src/components/RideForm.js
import React, { useState,useEffect } from "react";

const RideForm = ({ onSub }) => {
  const [start_city_id, setStartCityId] = useState("");
  const [destination_city_id, setDestinationCityId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState("");
  const [cities, setCities] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSub({ start_city_id, destination_city_id, date, time, price, seats });
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch("https://auicarpoolingserver.onrender.com//cities");
      const data = await response.json();
      setCities(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Start City:</label>
        <select value={start_city_id} onChange={(e) => setStartCityId(e.target.value)}>
          <option value="">Select a start city</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.city_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Destination City:</label>
        <select value={destination_city_id} onChange={(e) => setDestinationCityId(e.target.value)}>
          <option value="">Select a destination city</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.city_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Seats:</label>
        <input
          type="number"
          step="1"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />
      </div>

      <button type="submit">Add Ride</button>
    </form>
  );
};

export default RideForm;
