import React from 'react';

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
    this.ISOStringDateCET = this.state.date.addHours(1).toISOString();
    this.ISOStringDatePST = this.state.date.addHours(-9).toISOString();
    this.ISOStringDateKST = this.state.date.addHours(-7).toISOString();
  }

  render() {
    const clock = {
      border: "2px white solid",
      padding: "10px",
      backgroundColor: "#343434"
    };
    return (
        <div>
            <span style={clock}>CET | {this.ISOStringDateCET ? this.ISOStringDateCET.substring(0, 19).replace('T', ' ').substring(11, 19) : ''}</span>
            <span style={clock}>PST | {this.ISOStringDatePST ? this.ISOStringDatePST.substring(0, 19).replace('T', ' ').substring(11, 19) : ''}</span>
            <span style={clock}>KST | {this.ISOStringDateKST ? this.ISOStringDateKST.substring(0, 19).replace('T', ' ').substring(11, 19) : ''}</span>
        </div>
    );
  }
}

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
};
