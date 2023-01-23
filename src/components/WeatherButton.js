import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, setCity, selectedCity }) => {
  return (
    <div className='weather-btn'>
      <Button 
        variant={`${selectedCity == null ? "outline-warning" : "warning"}`}
        onClick={()=>{setCity('')}}
      >
          Current Location
      </Button>
      {cities.map((item, idx) => (
        <Button 
          variant={`${selectedCity == null ? "outline-warning" : "warning"}`}
          key={idx} 
          onClick={()=>{setCity(item)}}
        >
          {item}
        </Button>
      ))}
    </div>
  )
}

export default WeatherButton
