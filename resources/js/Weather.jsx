import React, { useState, useEffect } from 'react';


const Weather = () => {
    const [ city, setCity ] = useState('Brisbane');
    const [ loading, setLoading ] = useState(false)
    const [ done, setDone ] = useState(false)
    const [ data, setData ] = useState({}) 

    const { location, forecast, current } = data;
    const forecastList = forecast?.forecastday
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const cities = ["Brisbane", "Sydney", "Melbourne", "Perth", "Tokyo", "London", "Seoul", "Wellington"]
    let report = []


    useEffect(() => {
      const loader = document.getElementById('loader')
      const fetchForecast = async () => {
        loader.style.display = 'flex'
        const res = await fetch(`/api/weather?city=${city}`);
        const data = await res.json()
        .then(data => {
          setData(data);
          loader.style.display = 'none'
        })
      };
      fetchForecast();
      }, [city]);


      const reportWriting = () => {
        setLoading(true)
        const fetchForecast = async (name) => {
          const res = await fetch(`/api/weather?city=${name}`);
          const data = await res.json().then(e => {
            const city = {}
            const dailyWeather = e.forecast.forecastday
            for (let i in dailyWeather) {
              const date = dailyWeather[i].date
              city[date] = dailyWeather[i].day.avgtemp_c
            }
            report[name] = city
          });
        }
        fetchForecast(cities[0])
        fetchForecast(cities[1])
        fetchForecast(cities[2])
        fetchForecast(cities[3])
        fetchForecast(cities[4])
        fetchForecast(cities[5])
        fetchForecast(cities[6])
        fetchForecast(cities[7]).then(e => {
          console.table(report)
        }).then(() => {
          setLoading(false)
          report = []
          alert("Report created in console.")
          }
        ).catch(e => {
          setLoading(false)
          alert("Error: " + e.message)
        })
      } 




    return (
      <div className="text-white w-fit h-fit">
        <div id="loader" style={{ display: 'none' } }className="bg-slate-800/80 w-[512px] h-[428px] absolute mt-7 rounded-lg flex justify-center items-center">
          <svg aria-hidden="true" role="status" className="inline w-12 h-12 text-white-200 animate-spin " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
          </svg>
        </div>
        <div className="places-input justify-center flex relative -bottom-9 mb-2 text-gray-800">
          <div className="flex w-11/12 justify-between items-center text-slate-500 ">
             <select defaultValue="DEFAULT" onChange={e => setCity(e.target.value)} placeholder="Select" className="bg-gray-900 pl-3  py-0 text-slate-500 h-5 w-25 text-center border text-xs  border-slate-700 block appearance-none rounded-md leading-normal">
              <option value="DEFAULT" className="text-slate-500"  disabled>Select</option>
              {
                cities.map((el, idx) => {
                  return <option key={idx} value={el}>{el}</option>
                })
              }
            </select>
            <button type="button" onClick={reportWriting} className="bg-gray-900 h-5 w-20 text-center border text-xs  border-slate-700 block appearance-none rounded-md leading-normal">
            { !loading ?
              "Report" : <svg aria-hidden="true" role="status" className="inline w-3 h-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
              </svg>}
            </button> 
          </div>
        </div>
        <div className="weather-container font-sans w-128 max-w-lg overflow-hidden rounded-lg bg-gray-900 shadow-lg mt-1.5">
          <div className="current-weather flex items-center justify-between px-6 py-8  h-[140px]">
            <div className="flex items-center">
              <div>
                <div className="text-3xl font-semibold"><span className="text-5xl">{Math.floor(current?.temp_c) || "--"}</span> &#8451;</div>
                <div className="text-xs">Feels like {Math.floor(current?.feelslike_c) || "--"} &#8451;</div>
              </div>
              <div className="mx-5 pl-1 pt-5">
                <div className="font-semibold">{current?.condition.text || "--"}</div>
                <div className="text-xs pt-1">{location?.name || "--"}, {location?.country || "--"}</div>
              </div> 
            </div>
            <div className="pt-6 pr-2"><img src={current?.condition.icon}></img></div>
          </div>
        {/* End current weather */}
          <div className="future-weather h-[288px] text-sm bg-gray-800 px-6 pt-4 pb-8 overflow-hidden">
            { 
              forecastList?.map((el, idx) => {
                return (
                  <div key={idx} className="flex items-center mt-4">
                  <div className="w-1/6 text-center pr-2 text-lg text-gray-200">{days[new Date(el.date).getDay()]}</div>
                  <div className="w-4/6 px-4 flex items-center">
                    <div><img src={el.day.condition.icon}></img></div>
                    <div className="ml-3">{el.day.condition.text}</div>
                  </div>
                  <div className="w-1/6 text-center">
                    <div>{Math.floor(el.day.maxtemp_c)} &#8451;</div>
                    <div>{Math.floor(el.day.mintemp_c)} &#8451;</div>
                  </div>
                </div>
                )}
                )
              || <h2></h2>
            }
          </div>
            {/* end future-weather */}
        </div>    
        <p className=" text-slate-700 text-xs text-right relative right-3 -top-6" >Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a></p>
      </div>
      // end weather container

    );
};





export default Weather;
