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
  }

  render() {
    const clock = {
      margin: "5px",
      padding: "15px",
      borderRadius: "5px",
      backgroundColor: "#343434"
    }
    const ISOStringDateCET = this.state.date.addHours(1).toISOString();
    const ISOStringDatePST = this.state.date.addHours(-9).toISOString();
    const ISOStringDateKST = this.state.date.addHours(-7).toISOString();
    return (
        <div>
            <span style={clock}>CET: {ISOStringDateCET.substring(0, 19).replace('T', ' ').substring(11, 19)}</span>
            <span style={clock}>PST: {ISOStringDatePST.substring(0, 19).replace('T', ' ').substring(11, 19)}</span>
            <span style={clock}>KST: {ISOStringDateKST.substring(0, 19).replace('T', ' ').substring(11, 19)}</span>
        </div>
    );
  }
}

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}
