import React from 'react';

export default class Weather extends React.Component {
  constructor() {
    super();
    this.state = { name: "", temp: ""};
    this.setupCoord();
  }

  setupCoord() {
    navigator.geolocation.getCurrentPosition(this.getWeather.bind(this));
  }

  setWeatherData(data) {
    const { name, main: main, main: {temp} } = data;
    this.setState({ name, temp });
  }

  getWeather({coords: coords, coords:{latitude,longitude}}) {
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=564d0ad91e278cda8f0e7719670f2996`, true);
    xmlhttp.onload = function () {
      console.log(xmlhttp.responseText);
      this.setWeatherData(JSON.parse(xmlhttp.responseText));
    }.bind(this);
    xmlhttp.onerror = () => {
      console.log("ERROR");
    };

    xmlhttp.send();
  }

  render() {
    const { name, temp } = this.state;
    return(
      <div className="box weather">
        <h3>WEATHER!</h3>
        <div className="flex-container">
          <p className="flex-item">City: </p>
          <p className="flex-item">{name}</p>
        </div>
        <div className="flex-container">
          <p className="flex-item">Temperature: </p>
          <p className="flex-item">{temp}</p>
        </div>
      </div>
    );
  }
}
