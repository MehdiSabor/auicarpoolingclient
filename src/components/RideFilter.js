// src/components/RideFilter.js
import React from 'react';

const RideFilter = ({
  onStartCityChange,
  onDestinationCityChange,
  onMinPriceChange,
  onDateChange,
  onDateAfterChange,
  onFilterButtonClick,
  cities,
}) => {
  return (
    <div>
      <h3>Filters</h3>
      <div className="ride-filter">
        <div>
          <label>Start City:</label>
          <select onChange={(e) => onStartCityChange(e.target.value)}>
            <option value="">All start cities</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.city_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Destination City:</label>
          <select onChange={(e) => onDestinationCityChange(e.target.value)}>
            <option value="">All destination cities</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.city_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Min Price:</label>
          <input
            type="number"
            onChange={(e) => onMinPriceChange(e.target.value)}
          />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" onChange={(e) => onDateChange(e.target.value)} />
        </div>
        <div>
          <label>Date After:</label>
          <input
            type="date"
            onChange={(e) => onDateAfterChange(e.target.value)}
          />
        </div>
        <button onClick={onFilterButtonClick}>Apply Filters</button>
      </div>
    </div>
  );
};

export default RideFilter;
