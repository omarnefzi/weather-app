import hotbg from '../assets/hot.jpg'
import coldbg from '../assets/cold.jpg'
import Description from '../components/Description';
import { useEffect, useState } from 'react';


import { getFormatedWeatherData } from '../Weather-service';


function Weather() {

  const [weather,setWeather]=useState(null)
  const [unit,setUnit]=useState('metric')
  const [city,setCity]=useState('tunis')
  const [bg,setBg]=useState(hotbg)


useEffect(() => {
  const fetchWeather= async ()=>{
    const data = await getFormatedWeatherData(city,unit)
  setWeather(data) 

  const threshold=unit=== 'metric' ? 20:60
  if(data.temp <=threshold)
    setBg(coldbg)
  else setBg(hotbg)
  }
  fetchWeather()
    
  }, [unit,city]);
 
const handleUnitClick=(e)=>{
const button =e.currentTarget
const currentUnit =button.innerText.slice(1)

const isCelsius =currentUnit ==='C'
button.innerText = isCelsius ? '°F' : '°C'
setUnit(isCelsius ? 'metric': 'imperial')
}

const enterKeyPress=(e)=>{
if(e.keyCode===13){
  setCity(e.currentTarget.value)
  e.currentTarget.blur()

}
}

  return (
    <div className="app" style={{backgroundImage:`url(${bg})`}}>
      <div className="overlay ">
        {
          weather && (
            <div className="container">
            <div className="section section__inputs">
             <input onKeyDown={enterKeyPress} type="text" name='city' placeholder='Enter city..' />
             <button onClick={(e)=>handleUnitClick(e)}>°F</button>
            </div>
   
            <div className="section section__temperature">
             <div className="icon">
               <h3>{`${weather.name} , ${weather.country}`}</h3>
               <img src={weather.iconUrl} alt="weatherIcon" />
               <h3>{weather.description}</h3>
             </div>
             <div className="temperature">
               <h1>{`${weather.temp.toFixed(0)} °${unit === 'metric' ? 'C' : 'F'}`}</h1>
             </div>
            </div>
            {
              
            }
            <Description weather={weather} unit={unit} />
           </div>
          )
        }
   
      </div>
    </div>
  );
}

export default Weather;
