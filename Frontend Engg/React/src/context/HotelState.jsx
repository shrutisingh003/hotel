import { useState, useEffect } from "react";
import HotelContext from "./HotelContext";

const HotelState = (props) => {
  const [data, setData] = useState([]);

  let fetchData = async () => {
    let response = await fetch("https://demohotelsapi.pythonanywhere.com/hotels/");
    let res = await response.json();
    setData(res.data);
  };

  let FilterData = async (filterRequirment) => {
    console.log(filterRequirment);
    setData(await fetchData());
    console.log(data);

    let updatedData = data.filter((item) => {
      return (
        item.location
          .toLowerCase()
          .includes(filterRequirment.location.toLowerCase()) &&
        item.rating >= Number(filterRequirment.rating) &&
        Number(item.price) >= Number(filterRequirment.minPrice) &&
        Number(item.price) <= Number(filterRequirment.maxPrice)
      );
    });

    localStorage.setItem("filters", JSON.stringify(updatedData));
    await setData(updatedData);
  };

  useEffect(() => {
    fetchData().then(() => {
      const filters = JSON.parse(localStorage.getItem("filters"));
      if (filters) FilterData(filters);
    });
  }, []);

  return (
    <HotelContext.Provider value={{ fetchData, data, FilterData }}>
      {props.children}
    </HotelContext.Provider>
  );
};

export default HotelState;