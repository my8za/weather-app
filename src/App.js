import React, { useEffect, useState } from 'react';
// style sheet
import './App.scss';
// api
import { API_KEY } from './utils/constants/Config';
// components
import WeatherBox from './components/WeatherBox';
import WeatherButton from './components/WeatherButton';
// library
import {ClipLoader} from "react-spinners";

/*
  1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다
  2. 도시, 섭씨, 화씨, 날씨 상태정보가 보인다
  3. 5개의 버튼이 있다 (현재위치와 4개의 다른도시)
  4. 버튼 클릭시 해당 도시의 날씨상태정보 보인다.
  5. 현재위치 기반 날씨버튼 클릭 시, 다시 현재 위치 기반으로 돌아온다
  6. 데이터를 들고오는 동안 로딩스피너 실행
*/

// const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {

  const [ weather, setWeather ] = useState(null);
  const [ city, setCity ] = useState('');
  let [loading, setLoading] = useState(false);
  const [ apiError, setAPIError ] = useState('');
  const cities = ['PARIS', 'NEW YORK', 'TOKYO', 'SEOUL'];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      // console.log('현재 위치', lat, lon);
      getWeatherByCurrentLocation(lat, lon)
    });
  }

  // api 호출
  const getWeatherByCurrentLocation = async(lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      setLoading(true);
      let resp = await fetch(url);
      let data = await resp.json();

      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  }

  const getWeatherByCity = async() => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      setLoading(true);
      let resp = await fetch(url);
      let data = await resp.json();

      setWeather(data);
      setLoading(false);
    } catch(err) {
      setAPIError(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if(city === '') {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);
  // 상황에 맞춰 달리 호출

  return (
    <div>
      {loading ? (
        <div className='container'>
          <ClipLoader color='#ff8c6b' loading={loading} size={250} aria-label="Loading Spinner" data-testid="loader"/>
        </div>
      ) : (
        <div className='container'>
          <WeatherBox weather={weather}/>
          <WeatherButton cities={cities} setCity={setCity} selectedCity={city}/>
        </div>
      )}
    </div>
  );
}

export default App;