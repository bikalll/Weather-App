let month;
chosen = 'New york'
getCurrentTime = new Date().getHours();

function currentData() {
  fetch(`http://api.weatherapi.com/v1/current.json?key=6a4a034ab08849ed86722720232205&&aqi=yes&q=${chosen}`).then((response) => response.json()).then((data) => {
    console.log(data)
    loading.style.display = 'none'
    mainbody.style.display = 'flex'
    if (!data.error) {
      lastplace=nameofplace.value;
      nameofplace.value = data.location.name
      lengthofplace = data.location.name.length
      shortdescription.textContent = data.current.condition.text
      temperature.textContent = data.current.temp_c + '°'
      humidity.textContent = 'H:' + data.current.humidity
      windspeed.textContent = 'WS:' + data.current.wind_kph
      icon.src = data.current.condition.icon
      feelslike.textContent = 'Feels :' + ' ' + data.current.feelslike_c + '°'
      if (lengthofplace > 16) {
        nameofplace.style.fontSize = '2vh'
        next.style.left = '80vw'
      }
      else {
        nameofplace.style.fontSize = '4vh'
        next.style.left = '75vw'
      }
    }
    else {
      nameofplace.style.animation = 'reject .5s 2'
      nameofplace.focus();
    }

  }).catch((error) => {
    console.log(error.code);
  })
}

currentData();

function futureData() {
  fetch(`http://api.weatherapi.com/v1/forecast.json?key=6a4a034ab08849ed86722720232205&q=${chosen}&days=7&aqi=yes`).then(response => response.json()).then((data) => {
    console.log(data)

    day1 = data.forecast.forecastday[2].date.slice(8, 11);
    day2 = data.forecast.forecastday[3].date.slice(8, 11);
    day3 = data.forecast.forecastday[4].date.slice(8, 11);
    day4 = data.forecast.forecastday[5].date.slice(8, 11);
    day5 = data.forecast.forecastday[6].date.slice(8, 11);
    myMonth = data.forecast.forecastday[2].date.slice(5, 7);
    if (myMonth == '01') {
      month = 'Jan'
    }
    else if (myMonth == '02') {
      month = 'Feb'
    }
    else if (myMonth == '03') {
      month = 'Mar'
    }
    else if (myMonth == '04') {
      month = 'Apr'
    }
    else if (myMonth == '05') {
      month = 'May'
    }
    else if (myMonth == '06') {
      month = 'Jun'
    }
    else if (myMonth == '07') {
      month = 'July'
    }
    else if (myMonth == '08') {
      month = 'Aug'
    }
    else if (myMonth == '09') {
      month = 'Sep'
    }
    else if (myMonth == '10') {
      month = 'Oct'
    }
    else if (myMonth == '11') {
      month = 'Nov'
    }
    else {
      month = 'Dec'
    }
    currenticon.src = data.forecast.forecastday[0].day.condition.icon
    fhi.src = data.forecast.forecastday[1].day.condition.icon
    shi.src = data.forecast.forecastday[2].day.condition.icon
    thi.src = data.forecast.forecastday[3].day.condition.icon
    fohi.src = data.forecast.forecastday[4].day.condition.icon
    fihi.src = data.forecast.forecastday[5].day.condition.icon
    sihi.src = data.forecast.forecastday[6].day.condition.icon
    sday.textContent = month + ' ' + day1
    tday.textContent = month + ' ' + day2
    foday.textContent = month + ' ' + day3
    fiday.textContent = month + ' ' + day4
    siday.textContent = month + ' ' + day5
quality = Object.values(data.current.air_quality);
    myValuesofair = quality[7];
if (myValuesofair == 1) {
      airword = 'Good'
    }
    else if (myValuesofair == 2) {
      airword = 'Moderate'
    }
    else if (myValuesofair == 3) {
      airword = 'Unhealthy For Sensitive Groups'
    }
    else if (myValuesofair == 4) {
      airword = 'Unhealthy'
    }
    else {
      airword = 'Hazardous'
    }
    air.innerText = `Air Quality : ${airword}`;
    
    sunrise.innerText = `Sunrise : ${data.forecast.forecastday[0].astro.sunrise}`
    sunset.innerText = `Sunset: ${data.forecast.forecastday[0].astro.sunset}`
    time.innerText=`Local Time :  ${data.location.localtime}`
    longitude.innerText=`Longitude : ${data.location.lon}`
  latitude.innerText=`Latitude : ${data.location.lat}`
  moon.innerText=`Moon : ${data.forecast.forecastday[0].astro.moon_phase}`
  }).catch((error) => {
    if (error.message == 'Failed to fetch') {
      loading.style.display = 'none'
      connect.style.display = 'flex'
      mainbody.style.display = 'none'
      warn.innerText += ` ( ${error.message} )`
    }

  })

}
futureData();
nameofplace.addEventListener('focus', () => {
  next.style.display = 'flex'
  nameofplace.value = ''
  next.style.paddingTop = '2.5vh'
})
nameofplace.addEventListener('input', () => {
  next.style.paddingTop = '1.4vh'
})
next.addEventListener('click', () => {
  chosen = nameofplace.value;
  currentData();
  futureData();
  nameofplace.style.animation = 'none'
  next.style.display = 'none'
})