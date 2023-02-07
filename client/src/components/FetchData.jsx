import { useEffect } from 'react';
import axios from 'axios';

import fetchDataStyles from './FetchData.module.css';

// CLIENT REQUEST
const FetchData = ({
  location,
  setLocation,
  condition,
  setCondition,
  dataFetched,
  setDataFetched,
}) => {
  const url = 'http://localhost:5000/api';
  const inputLocationHandler = (e) => {
    setLocation(e.target.value);
    console.log(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (location.length === 0) {
      alert('Please enter a location');
    } else {
      fetchWeather();
    }
  };

  // SERVER RESPONSE
  const fetchWeather = async () => {
    const { data } = await axios.get(`${url}/${location}`);
    setCondition([
      data.location?.name,
      data.location?.localtime,
      data.current?.condition.icon,
      data.current?.condition.text,
      data.current?.temp_c,
      data.current?.feelslike_c,
      data.current?.humidity,
      data.current?.wind_kph,
    ]);
    setDataFetched(true);
  };

  return (
    <div className={fetchDataStyles.container}>
      <div className={fetchDataStyles.inputContainer}>
        <input
          type="text"
          placeholder="Enter a location"
          onChange={inputLocationHandler}
        />
        <button onClick={submitHandler}>Search</button>
      </div>

      {dataFetched && (
        <div className={fetchDataStyles.weatherContainer}>
          <div>{condition[0]}</div>
          <div>{condition[1]}</div>
          <img
            className={fetchDataStyles.conditionIcon}
            src={`${condition[2]}`}
          />
          <div className={fetchDataStyles.condition}>{condition[3]}</div>

          <div className={fetchDataStyles.details}>
            <div className={fetchDataStyles.pair}>
              <div className={fetchDataStyles.detail}>
                {condition[4]} &#176;C
              </div>
              <div className={fetchDataStyles.label}>Temperature</div>
            </div>
            <div className={fetchDataStyles.pair}>
              <div className={fetchDataStyles.detail}>
                {condition[5]} &#176;C
              </div>
              <div className={fetchDataStyles.label}>Feels like</div>
            </div>
          </div>

          <div className={fetchDataStyles.details}>
            <div className={fetchDataStyles.pair}>
              <div className={fetchDataStyles.detail}>{condition[6]} </div>
              <div className={fetchDataStyles.label}>Humidity</div>
            </div>
            <div className={fetchDataStyles.pair}>
              <div className={fetchDataStyles.detail}>{condition[7]}</div>
              <div className={fetchDataStyles.label}>Wind kph </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default FetchData;
