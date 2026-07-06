import "./Hotel.css";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import HotelContext from "../context/HotelContext";

const Hotel = () => {
  let { fetchData, FilterData } = useContext(HotelContext);

  let navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const mySubmit = async (data) => {
    if (Number(data.minPrice) > Number(data.maxPrice)) {
      alert("Enter valid Max Price");
      return;
    }

    if (data.rating == "") data.rating = "0";
    try {
      await FilterData(data);
    } catch (error) {
      console.log(error);
    }

    reset();
    navigate('/Filtered');
  };

  return (
    <form onSubmit={handleSubmit(mySubmit)}>
      <div className="filter-container">
        <h2>Filter Hotels</h2>

        <div className="filter-group">
          <label>Location</label>
          <input
            id="locationFilter"
            type="text"
            {...register("location", {
              required: true,
              minLength: { value: 3, message: "Enter a Valid City Name" },
            })}
            placeholder="Enter location (e.g. Noida)"
          />
          {errors.location && <p>{errors.location.message}</p>}
        </div>

        <div className="filter-group">
          <label>Minimum Rating</label>
          <select id="ratingFilter" {...register("rating")}>
            <option value="">All Ratings</option>
            <option value="1">1+ Star</option>
            <option value="2">2+ Star</option>
            <option value="3">3+ Star</option>
            <option value="4">4+ Star</option>
            <option value="5">5 Star</option>
          </select>
        </div>

        <div className="price-row">
          <div className="filter-group">
            <label>Min Price</label>
            <input
              type="number"
              id="minPrice"
              {...register("minPrice", {
                required: true,
                min: { value: 3, message: "Enter a Valid Price" },
              })}
              placeholder="₹0"
            />
            {errors.minPrice && <p>{errors.minPrice.message}</p>}
          </div>

          <div className="filter-group">
            <label>Max Price</label>
            <input
              type="number"
              id="maxPrice"
              {...register("maxPrice", {
                required: true,
                min: { value: 3, message: "Enter a Valid Price" },
              })}
              placeholder="₹10000"
            />
            {errors.maxPrice && <p>{errors.maxPrice.message}</p>}
          </div>
        </div>

        <button id="applyFilter" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Appling Filters" : "Apply Filters"}
        </button>
      </div>
    </form>
  );
};

export default Hotel;