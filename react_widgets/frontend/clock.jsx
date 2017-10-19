import React from 'react';

export default class Clock extends React.Component {
  constructor() {
    super();
    this.state = { date: new Date() };
    this.tick = this.tick.bind(this);
  }

  tick() {
      this.setState({ date: new Date() });
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWilllUnmount() {
    clearInterval(this.interval);
    this.interval = 0;
  }

  render() {
    const { date } = this.state;
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    return (
      <div className="box clock">
        <h3>CLOCK!</h3>
        <div className="flex-container">
          <p className="flex-item">Time: </p>
          <p className="flex-item">{date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</p>
        </div>
        <div className="flex-container">
          <p className="flex-item">Date: </p>
          <p className="flex-item">{days[date.getDay()]} {months[date.getMonth()]} {date.getDate()} {date.getFullYear()}</p>
        </div>
      </div>

    );
  }

}
