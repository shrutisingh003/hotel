import "./Filtered.css";
import React, { useContext, useEffect } from "react";
import HotelContext from "../context/HotelContext";
import { useNavigate } from "react-router-dom";

const Filtered = () => {
  const naviagte = useNavigate();
  const { data } = useContext(HotelContext);

  useEffect(()=>{
    if(!localStorage.getItem('filters')) naviagte('/hotel');
  }, [naviagte]);

  const handleFilter = () => {
    localStorage.removeItem('filters');
    naviagte("/hotel");
  };

  return (
    <div className="hotel-list">
      <div className="filter-header">
        <h1>Filtered Data</h1>
        <button onClick={handleFilter}>Filter Again</button>
      </div>
      {data &&
        data.map((hotel) => (
          <div className="hotel-card" key={hotel.id}>
            <img
              src={hotel.thumbnail}
              alt={hotel.name}
              className="hotel-image"
            />

            <div className="hotel-content">
              <div className="hotel-top">
                <h2>{hotel.name}</h2>

                <span className="rating">⭐ {hotel.rating}</span>
              </div>

              <p className="location">📍 {hotel.location}</p>

              <p className="description">{hotel.description}</p>

              <div className="hotel-bottom">
                <h3>₹ {Number(hotel.price).toFixed(2)}</h3>

                <button className="book-btn">View Details</button>
              </div>
            </div>
          </div>
        ))}
        {data.length === 0 && "No Data Found For This City Explore For More."}
    </div>
  );
};

export default Filtered;